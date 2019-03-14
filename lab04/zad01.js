/* jshint strict: global, esversion: 6, devel: true */
"use strict";

function defFun(fun, types) {
  fun.typeConstr = arguments[1];
  return fun;
}

function appFun(fun, a, b) {
  let argumenty = Array.from(arguments);
  argumenty.shift(0);
  argumenty.forEach(function(element,index) {
      console.log(element);
    if (isNaN(element)) {
        console.log(element);
      throw { typerr: `Not a number at ${index}` };
    }
  });
//   fun.apply(this,argumenty);
//   if (fun.typeConstr) {
//     let arrayLength = fun.typeConstr.length;
//     fun.typeConstr.forEach(function(element) {
//       console.log(element);
//       if (element != "number") {
//         throw { typerr: "Not a number" };
//       }
//     });
//   } else {
//     throw { typerr: "…" };
//   }
}

const myfun = defFun((a, b) => a + b, ["number", "number"]);

try {
  console.log(appFun(myfun, 12, 15, 16, 17));
} catch (e) {
  console.log(e.typerr);
}
