import querystring from 'querystring'

const clientId = process.env.REACT_APP_SPOTIFY_API_CLIENT_ID || ""
const clientSecret = process.env.REACT_APP_SPOTIFY_API_CLIENT_SECRET || ""
const redirect_uri = process.env.REACT_APP_SPOTIFY_API_REDIRECT_URI || ""

const generateRandomString = function(length:number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const requestAuthorization = () => {
  const scopes = ['user-read-private', 'user-read-email'],
        state = generateRandomString(16);
  const redirectUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state
    });
  return {redirectUrl,state}
}
