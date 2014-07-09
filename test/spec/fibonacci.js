'use strict';

describe('angular-lazylist: Fibonacci', function ( ) {
    beforeEach(function ( ) {
        module('angular-lazylist');
    });

    it('should be a Fibonacci sequence', inject(function ($q, $rootScope, lazylist) {
          var seq = [1, 2, 3, 5, 8, 13, 21, 34, 55];
          var i   = 0;
          var spy = jasmine.createSpy('callbackSpy');
          var fib = lazylist(function (prev) {
              var deferred = $q.defer( );

              if (prev && prev.prev( )) {
                prev.prev( ).promise( ).then(function (a) {
                    prev.promise( ).then(function (b) {
                        expect(a + b).toBe(seq[i++]);
                        deferred.resolve(a + b);
                    });
                });
              } else if (prev) {
                deferred.resolve(1);
              } else {
                deferred.resolve(0);
              }

              spy( );
              return deferred.promise;
          });

          fib = fib.next( ).next( ).next( ).next( ).next( ).next( ).next( ).next( ).next( ).next( );
          expect(spy).not.toHaveBeenCalled( );

          fib.promise( ).then(function (v) {
              expect(spy).toHaveBeenCalled( );
              expect(v).toBe(55);
          });

          $rootScope.$apply( );
    }));
});
