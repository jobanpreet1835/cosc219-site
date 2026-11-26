/* COSC 219 — Lab 9 · api.js
   PROVIDED. Do not change this file.

   A pretend server. Every call takes time and may fail, exactly as a real
   one does — but with no network involved, so the timings are predictable
   and you can work offline. Lab 10 replaces it with a real fetch. */

const TRAILS = {
  knox:       { id: "knox",       name: "Knox Mountain",   km: 2.8,  rating: "moderate" },
  myra:       { id: "myra",       name: "Myra Canyon",     km: 12.0, rating: "easy"     },
  bear:       { id: "bear",       name: "Bear Creek",      km: 5.5,  rating: "moderate" },
  pincushion: { id: "pincushion", name: "Pincushion Peak", km: 4.0,  rating: "hard"     },
};

export const TRAIL_IDS = ["knox", "myra", "bear", "pincushion"];

/* Wait, then continue. This is the whole of "asynchronous" in one line. */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Resolves with a trail after 150ms, or REJECTS if the id is unknown.
   Note it rejects with an Error, the way a real failure arrives. */
export async function fetchTrail(id) {
  await delay(150);

  const trail = TRAILS[id];
  if (!trail) {
    throw new Error(`No trail with id "${id}"`);
  }
  return { ...trail };
}

/* Always fails, after the same delay. Useful for testing error paths. */
export async function fetchBroken() {
  await delay(150);
  throw new Error("The server is having a bad day");
}
