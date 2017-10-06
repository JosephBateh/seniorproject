var REDIRECT_URI = 'http://localhost:3000/callback/';

if (process.env.NODE_ENV === 'production') {
    REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
}

export function searchSpotify(query) {
    console.log(REDIRECT_URI);
}