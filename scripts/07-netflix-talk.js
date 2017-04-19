// The legacy way of subscribing to events

// "sbuscribe"
// var handler = (e) => console.log(e);
// document.addEventListener("mousemove", handler);

// // "unsibscribe"
// setTimeout(() => {
//   document.removeEventListener("mousemove", handler);
// }, 2000);


// The RxJS way of subscribing to events

var mouseMoves = Rx.Observable
  .fromEvent(document, "mousemove")
  .takeUntil(Rx.Observable.timer(2000)); //unsubscribe after 2s

var subscription = mouseMoves.subscribe( //subscribe
  function (x) {
    console.log(x);
  },
  function (e) {
    console.log(e)
  },
  function () {
    console.log('complete')
  }
);

