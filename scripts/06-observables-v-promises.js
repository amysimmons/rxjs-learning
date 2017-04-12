// var promise = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log('promise timeout  hit')
//     resolve(42);
//   }, 1000);
//   console.log('promise started');
// })

// promise.then(x => console.log(x));

var observable = Rx.Observable.create((observer) => {
  var id = setTimeout(() => {
    console.log('observable timeout  hit')
    observer.next(42);
  }, 1000);

  console.log('observable started');

  return () => {
    console.log('dispose called');
    clearTimeout(id);
  }
})

var subscription = observable.subscribe(
  function(x) {
    console.log(x);
  }
);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
