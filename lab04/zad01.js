/* jshint strict: global, esversion: 6, devel: true */
"use strict";

function defFun(fun, types) {
  console.log(arguments);
  fun.typeConstr = arguments[1];
  return fun;
}

function appFun(fun, a, b) {
  let argumenty = Array.from(arguments);
  argumenty.shift(0);
  argumenty.forEach(function(element,index) {
    if (typeof element !== 'number') {
      throw { typerr: `Not a number at ${index}` };
    }
  });
}

const myfun = defFun((a, b) => a + b, ["number", "number"]);

try {
  console.log(appFun(myfun, 12, 15,'-.-', 16, 17));
} catch (e) {
  console.log(e.typerr);
}
