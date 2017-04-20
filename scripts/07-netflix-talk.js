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
  event => console.log(event),
  //optional error handler
  error => console.log(e),
  //optional done handler
  () => console.log('complete')
);

// Netflix search

var searchResultSets =
  keyPresses.
    throttle(250).
    map(key =>
      getJSON("/searchResults?q=" + input.value).
        retry(3).
        takeUntil(keyPresses)).
    concatAll();

searchResultSets.forEach(
  resultSet => updateSearchResults(resultSet),
  error => showMessage("server appears to be down")
)

