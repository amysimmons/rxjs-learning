//A counter stream that indicates how many times a button was clicked

var button = document.querySelector('button');
var observable = Rx.Observable.fromEvent(button, 'click');

observable
  .map(function(x){
    return x = 1;
  })
  .scan(function(x, y){
    return x + y;
  })
  .subscribe(function(x){
    console.log(x)
  })
