/*
  COSC 219 — Lab 7 · app.js
  The only file that touches the page. Open index.html with Live Server.
*/

// import from ./storage.js, ./render.js and ./trails.js

import { loadTrails, saveTrails, clearTrails } from "./storage.js";

import { renderTrails, summaryText } from "./render.js";

import {
    isValidTrail,
    makeTrail,
    addTrail,
    removeTrail,
    toggleTrail,
    findAction
} from "./trails.js";

/* Load the saved trails into a `let` — the array is replaced, not edited,
   every time something changes. */

let trails = loadTrails();


/* update() — redraw the list, rewrite the summary, and save.
   Call it whenever the data changes, and once at the very bottom of this
   file so the page is not blank on load. */

function update() {
   renderTrails(trails, document.querySelector("#trail-list"));

   document.querySelector("#summary").textContent = summaryText(trails);

   saveTrails(trails);
}


/* The add form.

   A submit reloads the page by default, throwing away everything in
   memory. Stop that first, then validate, then add.

   When the input is invalid: put a message in #error, focus the name
   field, and return without changing anything.
   When it is valid: clear #error, add the trail, reset the form. */

const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const kmInput = document.querySelector("#km");
const error = document.querySelector("#error");

form.addEventListener("submit", (event) => {
   event.preventDefault();

   const name = nameInput.value;
   const km = kmInput.value;

   if(!isValidTrail(name, km)) {
      error.textContent = "Give the trail a name and a distance above zero.";
      nameInput.focus();
      return;
   }

   error.textContent = "";

   const trail = makeTrail(name, km);
   trails = addTrail(trails, trail);

   form.reset();
   update();
});

/* The list.

   ONE listener on #trail-list — not one per button. The buttons are
   destroyed and rebuilt on every render, so a listener on a button would
   not survive the first redraw.

   Use findAction(event.target) to work out what was clicked.

   Clear #error here too — once the user clicks something in the list they
   have moved on from the form, and a stale validation message left on
   screen is just noise. */

   const trailList = document.querySelector("#trail-list");

   trailList.addEventListener("click", (event) => {
      const result = findAction(event.target);

      if(!result) {
         return;
      }


      error.textContent = "";

      if(result.action === "toggle") {
         trails = toggleTrail(trails, result.id);
      }

      if(result.action === "delete") {
         trails = removeTrail(trails, result.id);
      }

      update();
   });


/* The Clear all button: empty the array, clear storage, update. */

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
   trails = [];
   clearTrails();
   error.textContent = "";
   update();
});

update();