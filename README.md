# angular-lazylist

angular-lazylist is a lazy list built on AngularJS Deferred/Promise API.

This is useful to implement counter, fibonacci function with memoization, Ajax pager, and so on.


## Counter

```javascript
'use strict';

angular.module(
  'myApp', ['angular-lazylist']
).controller(
  'MainCtrl', function ($q, $log, lazylist) {

    var counter = lazylist(function (prev) {
        var deferred = $q.defer( );

        if (prev) {
          prev.promise( ).then(function (i) {
              if (i < 10) {
                deferred.resolve(i+1);
              } else {
                deferred.reject( );
              }
          });
        } else {
          deferred.resolve(0);
        }
        return deferred.promise;
    });

    for (var i = 0; i <= 13; i++) {
      counter.promise( ).then(function (j) {
          $log.log(j);
        }, function ( ) {
          $log.log('failed');
      });
      counter = counter.next( );
    }
});
```

### Output

```
0
1
2
3
4
5
6
7
8
9
10
failed
```


## Fibonacci sequence

```javascript
'use strict';

angular.module(
  'myApp', ['angular-lazylist']
).controller(
  'MainCtrl', function ($q, $log, lazylist) {

    var fib = lazylist(function (prev) {
        $log.log('generate');
        var deferred = $q.defer( );

        if (prev && prev.prev( )) {
          prev.prev( ).promise( ).then(function (a) {
              prev.promise( ).then(function (b) {
                  $log.log(a + ' + ' + b + ' = ' + (a + b));
                  deferred.resolve(a + b);
              });
          });
        } else if (prev) {
          deferred.resolve(1);
        } else {
          deferred.resolve(0);
        }
        return deferred.promise;
    });

    fib.next( ).next( ).next( ).next( ).next( )
       .next( ).next( ).next( ).next( ).next( )
       .promise( ).then(function (v) { $log.log(v); });
});
```

### Output

```
generate
generate
generate
generate
generate
generate
generate
0 + 1 = 1
generate
1 + 1 = 2
1 + 2 = 3
generate
2 + 3 = 5
3 + 5 = 8
generate
5 + 8 = 13
8 + 13 = 21
generate
13 + 21 = 34
21 + 34 = 55
55
```

# Acknowledgement
angular-lazylist is a port of [jquery-lazylist](https://github.com/hitode909/jquery-lazylist).
