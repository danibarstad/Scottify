let login = document.getElementById('login');
let track = document.getElementById('track');
let artist = document.getElementById('artist');
let redirectUri = 'http://127.0.0.1:5500/public/index.html';
let scopes = 'user-read-private playlist-read-private';

window.addEventListener('load', function() {
    if (window.location.href === redirectUri) {
        login.innerHTML = 'LOGIN';
    } else {
        login.innerHTML = 'Get a SCOTT Song!';
    }
});

login.addEventListener('click', function() {
    if (login.innerHTML === 'LOGIN') {
        getAccess();
    } else {
        getSong();
    }
});

function getAccess() {
    const responseType = 'token';
    const CLIENT_ID = '';   /* RESET ID BEFORE DEPLOYING */
    let redirect = `https://accounts.spotify.com/authorize?response_type=${responseType}&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location = redirect;
}

function getSong() {
    let token = getHashParams(window.location);
    let url = `https://api.spotify.com/v1/search?q=scott&type=artist,track&limit=50`;
    fetch(url, {
        method: 'GET', 
        headers: { 'Authorization': 'Bearer ' + token}
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            getSpotifyTrack(data);
        })
        .catch(function(err) {
            console.log(`ERROR: ${err}`);
        });
        function getSpotifyTrack(data) {
            /* gets random ARTIST*/
            // data = data['artists']['items'];
            // randomArtist = Math.floor(Math.random() * data.length);
            // let artist = data[randomArtist].id;

            /* gets random TRACK */
            data = data['tracks']['items'];
            randomTrack = Math.floor(Math.random() * data.length);
            trackId = data[randomTrack]['id'];
            trackName = data[randomTrack]['name'];
            trackArtist = data[randomTrack]['artists'][0]['name'];

            spotifyEmbed = `https://open.spotify.com/embed/track/${trackId}`
            document.getElementById('spotify').src = spotifyEmbed;

            track.innerHTML = trackName;
            artist.innerHTML = trackArtist;
        }
}

function getHashParams(url) {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = url.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams.access_token;
}