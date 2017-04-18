var promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('promise timeout  hit')
    resolve(32);
  }, 1000);
  console.log('promise started');
})

promise.then(x => console.log(x));

var observable = Rx.Observable.create((observer) => {
  var id = setTimeout(() => {
    console.log('observable timeout  hit')
    observer.next(42);
  }, 1000);

  console.log('observable started');

  //this function will be called to tear dowm my observable if i cancel it
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

//the observable starts
//then after 500ms my disposal method is called, clearing the timeout
//the observable is cancelled before it emits the value 42
//unlike promises, observables can be cancelled
//they embody everything that's necessary to tear themselves down
setTimeout(() => {
  subscription.unsubscribe();
}, 500);
