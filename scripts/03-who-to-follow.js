/*
- On startup, load accounts data from the API and display 3 suggestions
    (1) do a request
    (2) get a response,
    (3) render the response
- On clicking "Refresh", load 3 other account suggestions into the 3 rows
- On click 'x' button on an account row, clear only that current account and display another
- Each row displays the account's avatar and links to their page
*/


// create a stream of urls that we want to request
var requestStream = Rx.Observable.of('https://api.github.com/users');

var responseStream = requestStream
  .flatMap(function (requestUrl) { // return a stream of responses
    fetch(requestUrl).then(function(response){ //execute the request
        return response.json()
    }).then(function (dataAsJson) {
        return dataAsJson;
    })
  })

responseStream.subscribe(function(response){ // subscribe to, or watch, the stream of responses
  console.log(response)
})

//Error: Uncaught TypeError: You provided 'undefined' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.