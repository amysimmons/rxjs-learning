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

```
var responseMetastream = requestStream
  .map(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });
```

Or using flatMap we could return a stream of responses, where each emitted value is a JSON object:

```
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

### Notes from [Creating and Subscribing to Simple Observable Sequences][3]

**Cold vs Hot Observables**

Cold observables:

- start running upon subscription, i.e., the observable sequence only starts pushing values to the observers when Subscribe is called.
- values are not shared among subscribers

Hot observables:

- produce values even before a subscription is active, eg mouse move events or stock tickers
- When an observer subscribes to a hot observable sequence, it will get all values in the stream that are emitted after it subscribes
- The hot observable sequence is shared among all subscribers

Hot observables replayed:



[1]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

[2]: http://reactivex.io/tutorials.html

[3]: https://docs.google.com/spreadsheets/d/1l4uFkSI15vMgNfXrdAl-QjQ_bHjAkXAKh0Dxsz5qgoA/edit?usp=sharing

[4]: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables
---