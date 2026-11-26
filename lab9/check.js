/* COSC 219 — Lab 9 self-check
   Tests both halves: the async functions, and the Bootstrap markup.
   Open check.html with Live Server. */

import { fetchTrail, fetchBroken, delay, TRAIL_IDS } from "./api.js";
import { getTrailName, getTrailNames, getTrailSafe, loadSome,
         withTimeout, uiState } from "./app.js";

let pass = 0, fail = 0;
const results = [];

async function is(label, thunk, expected, note) {
  let actual, threw = null;
  try { actual = await (typeof thunk === "function" ? thunk() : thunk); }
  catch (err) { threw = err; }
  const e = JSON.stringify(expected);
  if (threw) {
    fail++;
    results.push({ ok: false, label, note,
                   detail: `threw ${threw.constructor.name}: ${threw.message}` });
    return;
  }
  const a = JSON.stringify(actual);
  const ok = a === e;
  ok ? pass++ : fail++;
  results.push({ ok, label, note, detail: ok ? "" : `expected ${e}, got ${a}` });
}
function group(name) { results.push({ group: name }); }

async function readText(path) {
  try { const r = await fetch(path); return r.ok ? await r.text() : ""; }
  catch { return ""; }
}

export async function runTests() {
  pass = 0; fail = 0; results.length = 0;

  group("1 · one call at a time");
  await is("getTrailName returns the name",
           () => getTrailName("knox"), "Knox Mountain");
  await is("it is an async function",
           () => getTrailName("knox").constructor.name, "Promise",
           "an async function always returns a promise");

  group("2 · several at once");
  await is("getTrailNames returns all three",
           () => getTrailNames(["knox", "myra", "bear"]),
           ["Knox Mountain", "Myra Canyon", "Bear Creek"]);
  await is("…and runs them in parallel",
           async () => {
             const started = Date.now();
             await getTrailNames(["knox", "myra", "bear"]);
             const ms = Date.now() - started;
             return ms < 300;
           }, true,
           "three 150ms calls: about 150ms together, 450ms one after another");

  group("3 · failure");
  await is("getTrailSafe returns null for a bad id",
           () => getTrailSafe("nope"), null);
  await is("getTrailSafe still works for a good one",
           async () => (await getTrailSafe("knox")).name, "Knox Mountain");

  group("4 · partial success");
  await is("loadSome keeps what worked",
           () => loadSome(["knox", "nope", "bear"]),
           { loaded: ["Knox Mountain", "Bear Creek"], failed: 1 },
           "Promise.all would have thrown all of it away");
  await is("loadSome with all good ids",
           () => loadSome(["knox", "myra"]),
           { loaded: ["Knox Mountain", "Myra Canyon"], failed: 0 });
  await is("loadSome with all bad ids",
           () => loadSome(["a", "b"]), { loaded: [], failed: 2 });

  group("5 · timeout");
  await is("a fast call survives a generous limit",
           async () => (await withTimeout(fetchTrail("knox"), 500)).name,
           "Knox Mountain");
  await is("a slow call is cut off",
           async () => {
             try { await withTimeout(fetchTrail("knox"), 50); return "no throw"; }
             catch (e) { return e.message; }
           }, "Timed out");
  await is("…and it gives up early, not late",
           async () => {
             const started = Date.now();
             try { await withTimeout(fetchTrail("knox"), 50); } catch {}
             return Date.now() - started < 120;
           }, true, "the whole point is not waiting for the slow one");

  group("6 · the four states");
  await is("loading wins over everything",
           () => uiState({ loading: true, error: new Error("x"), items: [1] }), "loading");
  await is("error next",   () => uiState({ error: new Error("x"), items: [1] }), "error");
  await is("empty array",  () => uiState({ items: [] }), "empty");
  await is("no items key", () => uiState({}), "empty");
  await is("loaded",       () => uiState({ items: [1, 2] }), "loaded");

  /* ---- the Bootstrap half ---- */
  const html = await readText("./index.html");
  const doc = new DOMParser().parseFromString(html, "text/html");
  const has = (sel) => doc.querySelectorAll(sel).length;

  group("7 · Bootstrap layout");
  await is("Bootstrap CSS is linked",
           () => /bootstrap[^"']*\.css/.test(html), true);
  await is("a .container wraps the content", () => has(".container") > 0, true);
  await is("a .row with responsive columns",
           () => has(".row") > 0 &&
                 has('[class*="col-md-"], [class*="col-lg-"], [class*="row-cols-md-"]') > 0,
           true, "col-12 col-md-6 — one column narrow, two from md up");
  await is("gutters set with g-*", () => has('[class*="g-"]') > 0, true);

  group("8 · Bootstrap components");
  await is("a navbar",            () => has(".navbar") > 0, true);
  await is("…that collapses on small screens",
           () => has(".navbar-toggler") > 0 && has(".navbar-collapse") > 0, true);
  await is("form controls use Bootstrap classes",
           () => has(".form-control") > 0 && has(".form-select") > 0, true);
  await is("every control still has a label",
           () => {
             const ids = new Set([...doc.querySelectorAll("label[for]")]
                                 .map(l => l.getAttribute("for")));
             return [...doc.querySelectorAll("input, select, textarea")]
               .filter(c => !c.closest("label") && !ids.has(c.id)).length;
           }, 0, "Bootstrap does not excuse you from Lab 2");
  await is("a .btn",              () => has(".btn") > 0, true);

  group("9 · the four states on the page");
  await is("a loading indicator",
           () => has(".spinner-border, .placeholder, .progress") > 0, true);
  await is("an error alert",   () => has(".alert-danger") > 0, true);
  await is("an empty message", () => has("#state-empty") > 0, true);
  await is("a container for the results", () => has("#state-loaded") > 0, true);
  await is("the panels start hidden with d-none",
           () => has(".d-none") >= 3, true,
           "one state visible at a time");
  await is("the spinner has hidden text for screen readers",
           () => has(".visually-hidden") > 0, true);

  group("10 · no duplicate ids");
  await is("every id is unique",
           () => {
             const ids = [...doc.querySelectorAll("[id]")].map(e => e.id);
             return ids.length - new Set(ids).size;
           }, 0);

  return { pass, fail, results };
}

/* ---- output ---- */
const out = typeof document !== "undefined" && document.querySelector("#output");
if (out) {
  runTests().then(({ pass, fail, results }) => {
    for (const r of results) {
      if (r.group) {
        const h = document.createElement("h2");
        h.textContent = r.group;
        out.append(h);
        continue;
      }
      const p = document.createElement("p");
      p.className = "res " + (r.ok ? "pass" : "fail");
      p.textContent = `${r.ok ? "PASS" : "FAIL"}  ${r.label}` +
                      (r.detail ? `  — ${r.detail}` : "");
      out.append(p);
      if (!r.ok && r.note) {
        const n = document.createElement("p");
        n.className = "hint";
        n.textContent = r.note;
        out.append(n);
      }
    }
    const s = document.createElement("p");
    s.className = "summary";
    s.textContent = `${pass} passed, ${fail} to fix.`;
    out.append(s);
  });
}
