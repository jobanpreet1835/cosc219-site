// COSC219 - Lab 4
// Part A1 - Predictions

// 1.  "7" + 3                -> Error (my original prediction)
// 2.  "7" - 3                -> 4
// 3.  7 + 3 + "1"            -> "101"
// 4.  "7" * "2"              -> 14
// 5.  10 / 3                 -> 3.3333333333333335
// 6.  typeof null            -> "number" (my original prediction)
// 7.  typeof NaN             -> "string" (my original prediction)
// 8.  Boolean("false")       -> true
// 9.  Boolean("0")           -> false (my original prediction)
// 10. 0 || "fallback"        -> "fallback"
// 11. 0 ?? "fallback"        -> 0
// 12. "" || "empty"          -> "empty"
// 13. "10" == 10             -> true
// 14. "10" === 10            -> false
// 15. Number("12abc")        -> 12 (my original prediction)
// 16. parseInt("12abc")      -> 12
// 17. " hi ".trim()          -> "hi"
// 18. "cat".includes("a")    -> true

// Part A2 - Run and Compare

console.log("7" + 3);
console.log("7" - 3);
console.log(7 + 3 + "1");
console.log("7" * "2");
console.log(10 / 3);
console.log(typeof null);
console.log(typeof NaN);
console.log(Boolean("false"));
console.log(Boolean("0"));
console.log(0 || "fallback");
console.log(0 ?? "fallback");
console.log("" || "empty");
console.log("10" == 10);
console.log("10" === 10);
console.log(Number("12abc"));
console.log(parseInt("12abc"));
console.log(" hi ".trim());
console.log("cat".includes("a"));

// Part A2 - Reflection

// I was surprised that typeof null returns "object" instead of
// "number", which was my original prediction.
// I learned that this is a historical JavaScript bug.

// I also expected Boolean("0") to return false,
// but it returns true because "0" is a non-empty string.