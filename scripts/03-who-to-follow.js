/*
- On startup, load accounts data from the API and display 3 suggestions
    (1) do a request
    (2) get a response,
    (3) render the response
- On clicking "Refresh", load 3 other account suggestions into the 3 rows
- On click 'x' button on an account row, clear only that current account and display another
- Each row displays the account's avatar and links to their page
*/


//creates a stream of urls that we want to request
var requestStream = Rx.Observable.of('https://api.github.com/users');

//subscribe to, or watch, the stream
requestStream.subscribe(function(requestUrl){
  //execute the request

  //Rx is for dealing with asynchronous data streams. So the response
  //for the request can also be a stream, containing the data arriving at
  //some time in the future
  var responseStream = Rx.Observable.create(function(observer){
    fetch(requestUrl).then(function(response){
       return response.json()
    }).then(function(dataAsJson){
        //process the json data
        observer.next(dataAsJson);
    })
  });

  responseStream.subscribe(function(response){
    //do something with the response
  });
});