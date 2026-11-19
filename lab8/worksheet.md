# Lab 8 — Debugging worksheet

Fill one block in for each fault you find. **The reasoning is what is marked**,
not the fix — a one-line correction with no explanation earns very little.

Copy the block as many times as you need.

---

## Fault 1

**Symptom** — The heading levels were skipped.


**How I found it** — I was just reading through the HTML structure and checking it.


**Cause** — The page was using h3 immediately after an h1, skipping h2 level.


**Fix** — Changed h3 to h2


**Lecture** — HTML structures.


---

## Fault 2

**Symptom** - The search input did not have a proper label.


**How I found it** - I was reading thru the code and noticed the missing label and also used elemental panel to confirm.


**Cause** - A placeholder was used instead of a label. Placeholders are just hints and not associated names.


**Fix** - Added a label with for="search" to match inputs id.


**Lecture** - Lecture 3 - HTML forms and labels.


---

## Fault 3

**Symptom** - The search extended beyond the page at a narrow screen width.


**How I found it** - I used the browsers device toolbar to test the page at 400px wide and noticed the overflow.


**Cause** - The default content-box sizing adds padding and borders outside the declared width, making the input too wide.


**Fix** - Added box-sizing: border- box,


**Lecture** -  lecture 4 - CSS box model.


---

## Fault 4

**Symptom** - There was no visible highlight when i was navigating through the form using the Tab key.


**How I found it** - I pressed Tab through the form and noticed that focused elements had no visible outline. Then I checked the CSS in styles.


**Cause** - The CSS was not allowing the browser to show which element was selected when using the keyword. This made it difficult for me to navigate the form using the Tab key.


**Fix** - Replaced outline: none with a visible 2px solid outline and added outline-offset.


**Lecture** - Lecture 4 - CSS focus and accessibility.


---

## Fault 5

**Symptom** - The checker reported that filtering was comparing values without strict equality.


**How I found it** - I checked the JavaScript code and noticed the == operator in the matches() function.


**Cause** - the == operator can convert data types before comparing values, which can produce unexpected results during filtering.


**Fix** - Replaced both == operators with === to compare values without converting their types. 


**Lecture** - lecture 7 - JavaScript comparisons.


---

## Fault 6

**Symptom** - The trails were not displayed in distance order.


**How I found it** - I observed the incorrect order on the webcage and checked the sortByDistance function in app.js.


**Cause** - The sort method was used without a comparator, so it did not compare the numerical distances. Also, sort changes the original array.


**Fix** - Created a copy of the array and used a comparator to sort trails by their km values.


**Lecture** - Lecture 9 - JavaScript arrays and sorting.


---

## Fault 7

**Symptom** - The checker reported that a trail name was being inserted as HTML instead of plain text.


**How I found it** - I checked the render() function after seeing the failing DOM test and found innerHTML was being used with trail data.


**Cause** - innerHTML interprets strings as HTML, so unsafe content could be treated as code instead of displayed as normal text.


**Fix** - Used textContent to safely insert the trail name and distance into their elements.


**Lecture** - Lecture 13 - DOM manipulation.


---

## Fault 8

**Symptom** - The page reloaded when I clicked the Apply button.


**How I found it** - I tested the form using Live Server and noticed the page reset after clicking Apply.


**Cause** - The browser performs a default auction when a form is sibmitted, which can reload the page.


**Fix** - Added event.preventDefault() to stop the
default form submission and allow JavaScript to update the results.


**Lecture** - Lecture 14 — JavaScript events and forms.


---

## One more thing

**Which fault took you longest, and why?**

The sorting fault took me the longest because I had to understand how the comparator works and why I needed to copy the array before sorting it.


**Which one would you never have found without the checker?**

The strict equality fault because the filtering appeared to work, but the checker helped me discover that using == could cause unexpected results.
