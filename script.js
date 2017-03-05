const button = document.querySelector('button');
const clicks = Rx.Observable.fromEvent(button, 'click');

clicks.forEach(e => {
  alert("clicked")
});
