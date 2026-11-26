/*
  COSC 219 — Lab 9 · app.js
  The asynchronous half. No DOM in this file.

  api.js is provided and pretends to be a server: every call takes 150ms
  and may reject. Do not change it.
*/

import { fetchTrail, delay } from "./api.js";


/* 1 — getTrailName(id)

     await getTrailName("knox")   →   "Knox Mountain"

   An async function ALWAYS returns a promise, even when the body looks
   like ordinary code. Forget the await on fetchTrail and `trail` is a
   Promise, so trail.name is undefined — with no error to tell you.
   ---------------------------------------------------------------------- */

export async function getTrailName(id) {
  const trail = await fetchTrail(id);
  return trail.name;
}


/* 2 — getTrailNames(ids)

     await getTrailNames(["knox", "myra", "bear"])
       →  ["Knox Mountain", "Myra Canyon", "Bear Creek"]

   All of them, AT THE SAME TIME. Three 150ms calls should take about
   150ms in total, not 450.

   A for loop with an await inside runs them one after another. Start them
   all first — map gives you an array of promises — then wait for the lot
   with Promise.all.

   There is a timing test. Get this wrong and it fails.
   ---------------------------------------------------------------------- */

export async function getTrailNames(ids) {
  const promises = ids.map(id => getTrailName(id));
  return await Promise.all(promises);
}


/* 3 — getTrailSafe(id)

     await getTrailSafe("knox")   →   { id: "knox", name: "Knox Mountain", ... }
     await getTrailSafe("nope")   →   null

   fetchTrail REJECTS for an unknown id. Catch it and return null instead
   of letting it escape.

   try/catch around an await works exactly as it does around ordinary
   code. That is most of the reason async/await exists.
   ---------------------------------------------------------------------- */

export async function getTrailSafe(id) {
  try {
    const trail = await fetchTrail(id);
    return trail;
  } catch (error) {
    return null;
  }
}


/* 4 — loadSome(ids)

     await loadSome(["knox", "nope", "bear"])
       →  { loaded: ["Knox Mountain", "Bear Creek"], failed: 1 }

   Some ids are good, some are not, and you want everything that worked.

   Promise.all is the WRONG tool here: it rejects the moment any one
   promise rejects, throwing away the results that succeeded. Use the one
   that waits for every outcome and reports each — each result has a
   .status of "fulfilled" or "rejected".
   ---------------------------------------------------------------------- */

export async function loadSome(ids) {

}


/* 5 — withTimeout(promise, ms)

     await withTimeout(fetchTrail("knox"), 500)  →  the trail (takes 150ms)
     await withTimeout(fetchTrail("knox"), 50)   →  throws "Timed out" (takes 50ms)

   Put a ceiling on how long a user waits. Race the real promise against a
   timer that throws, and take whichever settles first.

   delay(ms) is provided in api.js.
   ---------------------------------------------------------------------- */

export async function withTimeout(promise, ms) {

}


/* 6 — uiState({ loading, error, items })

   Which of the four states should the page be in? Check in this order:

     loading is truthy            →  "loading"
     error is truthy              →  "error"
     items missing or empty       →  "empty"
     otherwise                    →  "loaded"

   All four have to exist. A page that only handles "loaded" shows a blank
   rectangle whenever anything else is true, and the user cannot tell
   working from broken.

   This one is not async at all.
   ---------------------------------------------------------------------- */

export function uiState({ loading, error, items }) {

}
