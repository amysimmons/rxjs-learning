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
var suggestions = document.querySelector('.suggestions');
var refreshButton = document.querySelector('.refresh');

//listen to clicks on the refresh button
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

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
var render = function (suggestionNumber, user) {
  if (!user) {
    // hide the suggestion DOM element
    suggestions.children[suggestionNumber].classList.add('is-hidden')
    return;
  }

  // show the suggestion DOM element
  // and render the data
  var userLoginEl = document.createElement('div');
  userLoginEl.append(user.login);
  suggestions.append(userLoginEl);
}

var suggestion1Stream = responseStream
  .map(function(users){
    return users[0];
  })
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions

suggestion1Stream.subscribe(function(suggestion) {
  render(0, suggestion);
})

var suggestion2Stream = responseStream
  .map(function(users){
    return users[1];
  })
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions


suggestion2Stream.subscribe(function(suggestion) {
  render(1, suggestion);
})

var suggestion3Stream = responseStream
  .map(function(users){
    return users[2];
  })
  .merge(refreshClickStream.map(function(){return null;})) //on refresh, clear the suggestions

suggestion3Stream.subscribe(function(suggestion) {
  render(2, suggestion);
})


