let login = document.getElementById('login');
let scott = document.getElementById('scott')

let redirectUri = 'http://127.0.0.1:5500/index.html';
let scopes = 'user-read-private playlist-read-private';

let artist = document.getElementById('artist');
let song = document.getElementById('song');
let album = document.getElementById('album');

login.addEventListener('click', getAccess);
scott.addEventListener('click', getSong);

function getAccess() {
    const responseType = 'token';
    const CLIENT_ID = '60cca6ace06b49ceb88cf4f491d49bfe';
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
            appendData(data);
        })
        .catch(function(err) {
            console.log(`ERROR: ${err}`);
        });
        function appendData(data) {
            // data = data['artists']['items'];
            // randomArtist = Math.floor(Math.random() * data.length);
            // let artist = data[randomArtist].id;

            data = data['tracks']['items'];
            randomTrack = Math.floor(Math.random() * data.length);
            trackId = data[randomTrack].id;

            // console.log(data);
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