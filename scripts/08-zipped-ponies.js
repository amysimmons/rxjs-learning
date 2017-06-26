//zip function

const swiftSongs = Rx.Observable.from([
    "Blank Space",
    "22",
    "Red",
    "Our song",
    "Bad Blood",
    "Style"
]);

const songTime = Rx.Observable.zip(
    Rx.Observable.interval(500),
    swiftSongs,
    // function to only return the song
    // otherwise zip returns an array with the value and index
    // eg [1, Blank Space]
    (skip, song) => song
)

songTime
    .filter(song => song.includes('e'))
    .map(song => 'I love ' + song)
    .subscribe(x => console.log(x))

