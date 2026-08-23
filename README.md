# Meine Bao's World

A private anniversary site: a walk-through gallery of her drawings, scratch-off
love notes, a home-workout companion with unlockable rewards, and a shared
sketchpad.

## 1. Turn on GitHub Pages (one-time, ~1 minute)

1. Go to this repo on GitHub → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Set **Branch** to `main`, folder `/ (root)`, then **Save**.
4. After a minute or two the site is live at:
   `https://<your-github-username>.github.io/<this-repo-name>/`

Any time you push new commits to `main`, the live site updates automatically.

## 2. (Optional but recommended) Turn on cross-device syncing

Right now the site works immediately, but everything (gallery, notes,
rewards you queue, her workout streak) is saved only in the browser it was
used in — normal `localStorage`, not shared between your phone and hers.

To make it a real shared site — so what you add from your admin panel shows
up on her phone, and her streak/progress isn't stuck on one device — connect
a free Firebase project:

1. Go to https://console.firebase.google.com → **Add project** → give it any
   name (e.g. "meine-bao-world") → you can skip Google Analytics → **Create**.
2. In the project, click the **`</>`** (web) icon to register a web app →
   give it any nickname → **Register app**. Firebase shows you a
   `firebaseConfig` object — copy it.
3. Open `firebase-config.js` in this repo and paste your values into the
   matching fields (`apiKey`, `authDomain`, `projectId`, etc).
4. In the Firebase console, go to **Build → Firestore Database** → **Create
   database** → start in **production mode** → pick any region → **Enable**.
5. Still in Firestore, go to the **Rules** tab and replace the rules with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /site/{docId} {
         allow read, write: if true;
       }
     }
   }
   ```

   This keeps things simple (no login required for her), but it does mean
   anyone who discovers your exact Firestore project could read/write it —
   fine for a low-stakes personal gift, but don't reuse this project for
   anything sensitive.

6. Commit and push `firebase-config.js` with your real keys. Reload the
   site — the small banner on the admin page will say "☁️ connected" once
   it's working.

## 3. Using it

- **Home** — a live "days together" counter and a note to her.
- **Gallery** — a walkable corridor. Drag, use arrow keys/WASD, or the
  on-screen buttons to move; a "view this painting ✦" button appears when
  you're near one of her drawings.
- **Notes** — scratch-off cards revealing little notes.
- **Workout** — no-equipment routines; finishing one unlocks the next queued
  reward (text now, or a photo/video/voice note once you add one).
- **Sketch** — a canvas she can draw on and save as a PNG.
- **Admin** (small "♡ admin" link at the very bottom) — add gallery
  drawings, scratch notes, and queue rewards. Keep uploaded photos/videos
  reasonably small (a few MB at most) — everything is stored as-is in the
  database/browser.
