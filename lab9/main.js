/*
  COSC 219 — Lab 9 · main.js
  The only file that touches the page.
*/

// import TRAIL_IDS from ./api.js
// import loadSome and uiState from ./app.js


/* Collect the four state panels by id. */


/* show(state) — toggle d-none so exactly ONE panel is visible.

   Bootstrap's d-none is display:none, so this needs no CSS of your own:
     el.classList.toggle("d-none", name !== state);
*/


/* card(trail) — one column holding a .card.

   You may build the card's shell with a template string, because it
   contains no data. The trail's name and description go in AFTERWARDS
   with textContent. Lab 7's rule has not changed. */


/* load() — the sequence:

     1. show the loading state
     2. await the data
     3. work out the state with uiState, fill the grid if it is "loaded"
     4. show that state
     5. if anything throws, put the message in the error panel and show it
*/


/* Wire the Load button, then call load() once so the page is not blank. */
