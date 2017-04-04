/*
cold observable example:

- starts on subscription
- values not shared among subscribers

Note: the source example used .unsibscribe() to cancel the
streams after 5000ms.

 setTimeout(function () {
   observer1.unsubscribe();
   observer2.unsubscribe();
 }, 5000);

With unsibscribe, onComplete was never being logged out.

I looked into this and changed my code to use .take(5) as
per Ben Lesh's advice in this blog post:
https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87
*/

var observable = Rx.Observable.interval(1000);

var observer1 = observable.take(5).subscribe(
  function(x) {
    console.log('observer1 onNext: ' + x)
  },
  function (e) {
    console.log('observer1 onError: ' + e)
  },
  function () {
    console.log('observer1 onCompleted')
  }
);

var observer2 = observable.take(5).subscribe(
  function(x) {
    console.log('observer2 onNext: ' + x)
  },
  function (e) {
    console.log('observer2 onError: ' + e)
  },
  function () {
    console.log('observer2 onCompleted')
  }
);
