# Scottify
Generate a song containing "Scott" in artist name or song title!

Scottify works by implementing Spotify's Implicit Grant Flow, which runs entirely on the client-side. This allows the user to login to their Spotify account, obtain an access token which is then used to make the calls to the Spotify API. Once the call is made, a list of songs and artists that contain "Scott" is return and one is selected randomly to be embedded on the page.

### Installation
```
git clone
cd Scottify
npm install
```

### Run
```
node server.js
```
