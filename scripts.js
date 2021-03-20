let login = document.getElementById('login');
let scott = document.getElementById('scott');
// let spotify = document.getElementById('spotify');

let redirectUri = 'http://127.0.0.1:5500/loggedin.html';
let scopes = 'user-read-private playlist-read-private';

login.addEventListener('click', getAccess);
scott.addEventListener('click', getSong);

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
            appendData(data);
        })
        .catch(function(err) {
            console.log(`ERROR: ${err}`);
        });
        function appendData(data) {
            /* gets random ARTIST*/
            // data = data['artists']['items'];
            // randomArtist = Math.floor(Math.random() * data.length);
            // let artist = data[randomArtist].id;

            /* gets random TRACK */
            data = data['tracks']['items'];
            randomTrack = Math.floor(Math.random() * data.length);
            trackId = data[randomTrack].id;

            // console.log(data);

            spotifyEmbed = `https://open.spotify.com/embed/track/${trackId}`
            document.getElementById('spotify').src = spotifyEmbed;
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