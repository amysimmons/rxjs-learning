/*
hot observable example:

- publish() creates a hot ovservable
- publish shares a single subscription to multiple subscribers
- the hot observable starts on connect(), not subscribe
*/

console.log('Time at start: ', new Date(Date.now()));

var observable = Rx.Observable.interval(1000);

//converts the observable into a hot sequence
var hot = observable.publish();

//subscribe the first observer
var observer1 = hot.take(10).subscribe(
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

console.log('Time after first subscription: ', new Date(Date.now()));

//idle for 3 seconds
setTimeout(function () {

  //hot will begin pushing values to subscribers
  hot.connect();

  console.log('Time after connect: ', new Date(Date.now()))

  //idle for another 3 seconds
  setTimeout(function () {

    //subscribe the second observer
    var observer2 = hot.take(10).subscribe(
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

    console.log('Time after second subscription: ', new Date(Date.now()));
  }, 3000)

}, 3000)


