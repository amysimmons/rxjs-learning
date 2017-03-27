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

[1]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

[2]: http://reactivex.io/tutorials.html

[3]: https://docs.google.com/spreadsheets/d/1l4uFkSI15vMgNfXrdAl-QjQ_bHjAkXAKh0Dxsz5qgoA/edit?usp=sharing

---