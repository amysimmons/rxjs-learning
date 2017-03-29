/*
- On startup, load accounts data from the API and display 3 suggestions
    (1) do a request
    (2) get a response,
    (3) render the response
- On clicking "Refresh", load 3 other account suggestions into the 3 rows
- On click 'x' button on an account row, clear only that current account and display another
- Each row displays the account's avatar and links to their page
*/

//listen to clicks on the refresh button
var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// on each click of the refresh button, and on startup, generate a new api url
var requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset; //since is the id of the last user that you've seen
  });

var responseStream = requestStream
  .flatMap(function (requestUrl) { // return a stream of responses
    return fetch(requestUrl).then(function(response){ //execute the request
        return response.json()
    })
  })

responseStream.subscribe(function(response){ // subscribe to, or watch, the stream of responses
  console.log(response)
})
