// Leave this as-is and the Music tab shows a "not set up yet" message —
// nothing else on the site is affected.
//
// To turn on the "connect Spotify" feature:
//   1. Go to https://developer.spotify.com/dashboard and log in with any
//      Spotify account, then click "Create app".
//   2. App name/description: anything (e.g. "Meine Bao's World").
//   3. Redirect URI: paste the exact URL this site is hosted at, e.g.
//      https://brucewynebusiness-spec.github.io/meine-bao/
//      (must match exactly, including the trailing slash).
//   4. API used: pick "Web API".
//   5. Save, open the app, click "Settings", and copy the Client ID below.
//      (There is no secret to copy — this flow never needs one.)
window.SPOTIFY_CLIENT_ID = "8afcc09104a44bce9bea4dff7030f807";
