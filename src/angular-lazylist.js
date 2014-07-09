'use strict';

angular.module('angular-lazylist', [ ]).factory(
  'lazylist', function ( ) {
    function LazyList (generator, prev) {
      if (!angular.isFunction(generator)) {
        throw('generator must be a function (' + generator + ')');
      }

      this.generator = generator;
      this._promise  = null;
      this._prev     = null;
      this._next     = null;

      if (prev) {
        if (!(prev instanceof LazyList)) {
          throw('prev must be a instance of LazyList');
        }

        this._prev = prev;
      }
    }

    LazyList.prototype.promise = function ( ) {
      if (!this._promise) {
        var promise = this.generator(this.prev( ));

        if (!angular.isFunction(promise.then)) {
          throw('generator must return a Promise Object (' + promise + ')');
        }

        this._promise = promise;
      }

      return this._promise;
    };

    LazyList.prototype.prev = function ( ) {
      return this._prev;
    };

    LazyList.prototype.next = function ( ) {
      if (!this._next) {
        this._next = new LazyList(this.generator, this);
      }

      return this._next;
    };

    LazyList.prototype.root = function ( ) {
      var prev = this._prev;
      return prev ? prev.root( ) : this;
    };

    return function (generator, prev) {
      return new LazyList(generator, prev);
    };
});
