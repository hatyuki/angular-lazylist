'use strict';

describe('angular-lazylist: Counter', function ( ) {
    beforeEach(function ( ) {
        module('angular-lazylist');
    });

    it('should be a counter', inject(function ($q, $rootScope, lazylist) {
          var spy     = jasmine.createSpy('callbackSpy');
          var counter = lazylist(function (prev) {
              var deferred = $q.defer( );

              if (prev) {
                prev.promise( ).then(function (i) {
                    if (i < 10) {
                      deferred.resolve(i + 1);
                    } else {
                      deferred.reject(false);
                    }
                });
              } else {
                deferred.resolve(1);
              }

              spy( );
              return deferred.promise;
          });

          expect(spy).not.toHaveBeenCalled( );

          var i = 0;
          var callbacks = {
            success: function (j) { expect(j).toBe(i); },
            failure: function (j) { expect(j).toBeFalsy( ); }
          };

          while (i++ < 15) {
            counter.promise( ).then(callbacks.success, callbacks.failure);
            $rootScope.$apply( );
            counter = counter.next( );
          }
    }));
});
