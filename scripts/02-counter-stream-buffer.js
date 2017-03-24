//A counter stream that indicates how many times a button was clicked every 2000ms

var button = document.querySelector('button');

//Create an observable that emits when button is clicked
var observable = Rx.Observable.fromEvent(button, 'click')

observable
  .bufferTime(2000) //after 2 seconds have passed, emit buffered values as an array
  .subscribe(x => console.log('Click count: ', x.length));
