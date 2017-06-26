# Learning RxJS

I am currently working my way through a list of resources on the [ReactiveX website][2].

I am tracking my progress [here][3], and making comments on how valuable I find each of the resources.

This repo contains my notes, code and resources.

### Notes from [The introduction to Reactive Programming you've been missing by Andre Staltz][1]

**Streams are observables**

A stream can emit three things:
- A value
- An error
- or a completed signal

Our stream is the observable being observed.

The stream, or the observable, has functions attached to it like map and filter.

These functions return new streams or observables. They do not modify the original. #immutability

**Subscribing to a stream**

We listen to the stream by subscribing to it.

**Observers watch the stream**

We can define functions that will execute when a value is emitted from the stream, when an erorr is emitted, and when a signal is completed.

These functions are the observers.

**Buffers**

The buffer method periodically gathers items emitted by a source Observable into buffers, and emits these buffers as its own emissions.

**Observables and promises**

In Rx you can convert a promise to an observable by doing

```var stream = Rx.Observable.fromPromise(promise).```

A Promise is simply an Observable with one single emitted value.

Rx streams go beyond promises by allowing many returned values.

**Map and flatMap**

In the who to follow example, we begin by subscribing to our response stream inside the subscribe to our request stream. The creation of one is dependent on the other.

What we can do instead is create new streams out of others with functions like map.

Using map we could return a stream of streams, where each emitted value is a pointer to another stream:

```javascript
var responseMetastream = requestStream
  .map(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });
```

Or using flatMap we could return a stream of responses, where each emitted value is a JSON object:

```javascript
var responseStream = requestStream
  .flatMap(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });
```

**Merging streams**

In the who to follow example, we created a stream of events for when the user clicks the refresh button. This stream would return request urls with offsets.

But in doing that we lost the initial api request on app startup.

To solve this you can have two streams and merge them together with either .merge(Rx.Observable.of(...)).

Or you can use .startWith(x).

We used .startWith(x) in this case because we just need the first value in our stream to be a request url emitted on startup.

**combineLatest**

combineLatest takes two streams as inputs, and whenever either stream emits a value, it joins the two most recently emitted values from both streams and outputs the values.

If one of the streams hasn't emitted anything, combineLatest() cannot produce a value on the output stream.

This is why in the who to follow example, we simulated a button click on start up with startWith('startup, click')

### Notes from [Creating and Subscribing to Simple Observable Sequences][4]

**Cold vs Hot Observables**

Cold observables:

- start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called.
- values are not shared among subscribers

Hot observables:

- produce values even before a subscription is active, eg mouse move events or stock tickers
- When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes
- The hot observable sequence is shared among all subscribers

### Notes from [RxJS Observables vs Promises][5]

Observables are lazy and promises are not.

A promise is always going to fire the block inside of it, or the asynchronous call.

An observable can emobody its own setup and teardown. So unlike promoses, they can be cancelled.

In the example, 06-observables-v-promises, unsubscribe is used to tear down the observable before the subscribe function is executed.

Note: the downside of using .unsubscribe() is that your observable never actually [completes][6]. Ben Lesh recommends using other operators like .takeUntil(), .take(n), etc to kill an observable stream.

### Notes from [Netflix JavaScript Talks - Async JavaScript with Reactive Extensions][7]

Talk by Jafar Husain, technical lead at Netflix.

With asynchronous programming in JavaScript in 2014, Netflix encountered the following problems:

**Callback hell:**

If I have two callbakcs that are both in flight and I want to wait til they are both finished, the only way to do that is to introduce a variable, and to track the state of both of those callbacks.

It gets difficuly to scale an app that way because you add state, which needs to be maintained.

Then you add more state to deal with exceptions.

And there's the risk of memory leaks. You add an event listener to a cancel button and then forget to unsubscribe.

**Design patterns:**

The iterator design pattern:

With the iterator pattern you allow a consumer to pull data from a collection. You ask the data structure for an iterator and then you ask for the next item for that iterator, and you keep asking for more items until there is no more data.

The observer design pattern:

A producer sends data to a consumer, one item at a time.

Both patterns are about progressively sending information to the consumer. But with the iterator pattern, the consumer is in control. With the Observer pattern, you give a callback to a data producer and it calls you again and again.

**Observables**

An observable is a collection of items over time.

They are capable of modelling events, data requests and animations.

**takeUntil()**

takeUntil means the source event stream will be listened to until the stop event stream fires.

takeUntil creates a new collection from another collection, just like map and filter.

```javascript
{...1...2.........3}.takeUntil(
{.............4}
)

{...1...2...}
```

This is beneficial because, by allowing observables to say 'I'm done' or 'I've completed', they can free your subscription at the same time.

Don't unsubscribe from events. Complete them when another event has completed. Then the clean up is done for us.

**Netflix example code**

Search results:

```javascript
var searchResultSets =
  keyPresses. //keypresses collection
    throttle(250).
    map(key =>
      getJSON("/searchResults?q=" + input.value).
        retry(3). //allows for 3 errors before fwding it along
        takeUntil(keyPresses)). //if they type a, then b, it will take ab
    concatAll();

searchResultSets.forEach(
  resultSet => updateSearchResults(resultSet),
  error => showMessage("server appears to be down")
)

```

Player with Observable:

```javascript
var authorizations =
  player.
    init(). //listen for all intializations
    map(() => //map over them
      playAttempts. //listen for all attempts to play a movie
        map(movieId => //map over them
          player.authorize(movieId). //authorize the movie
            retry(3).
            takeUntil(cancels)). //take until the user cancels playing
        concatAll())).
    concatAll();

    authorizations.forEach(
      license => player.play(license),
      error => showDialog("Sorry, can't play rightnow"))

```

### Notes from [What Every Hipster Should Know About Functional Reactive Programming][8]



[1]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

[2]: http://reactivex.io/tutorials.html

[3]: https://docs.google.com/spreadsheets/d/1l4uFkSI15vMgNfXrdAl-QjQ_bHjAkXAKh0Dxsz5qgoA/edit?usp=sharing

[4]: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables

[5]: https://egghead.io/lessons/rxjs-rxjs-observables-vs-promises

[6]: https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87

[7]: https://www.youtube.com/watch?v=XRYN2xt11Ek

[8]: https://www.infoq.com/presentations/game-functional-reactive-programming

