/*
- On startup, load accounts data from the API and display 3 suggestions
    (1) do a request
    (2) get a response,
    (3) render the response
- On clicking "Refresh", load 3 other account suggestions into the 3 rows
- On click 'x' button on an account row, clear only that current account and display another
- Each row displays the account's avatar and links to their page
*/

// get dom elements
var refreshButton = document.querySelector('.refresh');
var suggestion1 = document.querySelector('.suggestion-1');
var suggestion2 = document.querySelector('.suggestion-2');
var suggestion3 = document.querySelector('.suggestion-3');
var close1Button = document.querySelector('.close-1');
var close2Button = document.querySelector('.close-2');
var close3Button = document.querySelector('.close-3');

//listen to clicks on the refresh button
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

//listen to clicks on the close buttons
var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
var close2ClickStream = Rx.Observable.fromEvent(close2Button, 'click');
var close3ClickStream = Rx.Observable.fromEvent(close3Button, 'click');

// on each click of the refresh button, and on app startup, generate a new api url
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

// set up the render function
var render = function (into, data) {
  if (!data) {
    return;
  }
  into.innerHTML = data.login
}

// the startWith startup click is necessary because only
// when the two streams have produced a value can the
// combinedLatest produce one
var suggestion1Stream = close1ClickStream.startWith('startup click')
  .combineLatest(responseStream,
    function(click, users) {1
      return users[Math.floor(Math.random()*users.length)];
    }
  )
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions
  // .startWith(null)

suggestion1Stream.subscribe(function(suggestion) {
  render(suggestion1, suggestion);
})

var suggestion2Stream = responseStream
  .map(function(users){
    return users[1];
  })
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions


suggestion2Stream.subscribe(function(suggestion) {
  render(suggestion2, suggestion);
})

var suggestion3Stream = responseStream
  .map(function(users){
    return users[2];
  })
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions

suggestion3Stream.subscribe(function(suggestion) {
  render(suggestion3, suggestion);
})


