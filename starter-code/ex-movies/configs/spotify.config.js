var SpotifyWebApi = require('spotify-web-api-node');

var clientId = 'fe9039d71710493fa0c157e3020bf3ae';
var clientSecret = 'ad236d1290f9429297c01661ae36cf61';

var spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});

spotifyApi.clientCredentialsGrant()
.then(function(data) {
    console.log('CONNECTD TO SPOTIFY API');
    
    spotifyApi.setAccessToken(data.body['access_token']);
}, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

module.exports = spotifyApi;