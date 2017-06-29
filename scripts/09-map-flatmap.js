/*
logs 0 to 9 integers multiplied by 2
*/
var source1 = Rx.Observable.interval(100)
  .take(10)
  .map(x => x * 2);

/*
logs 10 objects which are observables

the timer waits for half a second then maps to the same value,
so the map returns an observable
*/
var source2 = Rx.Observable.interval(100)
  .take(10)
  .map(x => Rx.Observable.timer(500).map(() => x));

/*
logs 0 to 9

mergeAll takes in a stream of observables and merges them
together as they come in

it subscribes to each one and pumps them into one output stream
*/
var source3 = Rx.Observable.interval(100)
  .take(10)
  .map(x => Rx.Observable.timer(500).map(() => x))
  .mergeAll();

/*
logs 0 to 9

flatMap is a more concise version of mergeAll
it performs the mapping function, then subscribes to each
observable returned by the map
*/
var source4 = Rx.Observable.interval(100)
  .take(10)
  .flatMap(x => Rx.Observable.timer(500).map(() => x))


// source1.subscribe(x => console.log('source1', x));
// source2.subscribe(x => console.log('source2', x));
// source3.subscribe(x => console.log('source3', x));
source4.subscribe(x => console.log('source4', x));







