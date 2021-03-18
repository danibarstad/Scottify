let button = document.getElementById('btn');

let redirectUri = 'http://127.0.0.1:5500/index.html';
let scopes = 'user-read-private playlist-read-private';

let artist = document.getElementById('artist');
let song = document.getElementById('song');
let album = document.getElementById('album');

button.addEventListener('click', () => {
    let acc_tok = getAccess();
    getSong(acc_tok);
});

function getAccess() {
    const responseType = 'token';
    const CLIENT_ID;
    let redirect = `https://accounts.spotify.com/authorize?response_type=${responseType}&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location = redirect;
    return getHashParams(window.location);
}

function getSong(a_t) {
    console.log(a_t);
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