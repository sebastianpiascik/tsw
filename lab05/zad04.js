/* jshint strict: global, esversion: 6, devel: true */
"use strict";


const ocena2 = kod => {
  return ruch => {
    // implementacja funkcji oceniającej
    if (kod.length !== ruch.length) {
      return "Tablice muszą być tej samej długości.";
    } else {
      let result = [];
      let amountBlack = 0,
        amountWhite = 0;

      let mapKod = new Map();
      let mapRuch = new Map();

      kod.forEach(function(currentValue, index) {
        if (currentValue === ruch[index]) {
          result.push("black");
          amountBlack++;
        }
        if (mapKod.has(currentValue)) {
          let amount = mapKod.get(currentValue);
          mapKod.set(currentValue, amount + 1);
        } else {
          mapKod.set(currentValue, 1);
        }
      });

      ruch.forEach(function(currentValue, index) {
        if (mapRuch.has(currentValue)) {
          let amount = mapRuch.get(currentValue);
          mapRuch.set(currentValue, amount + 1);
        } else {
          mapRuch.set(currentValue, 1);
        }
      });

      mapKod.forEach((valueKod, keyKod) => {
        mapRuch.forEach((valueRuch, keyRuch) => {
          if (keyKod === keyRuch) {
            if (valueKod <= valueRuch) {
              amountWhite += valueKod;
            } else {
              amountWhite += valueRuch;
            }
          }
        });
      });

      amountWhite -= amountBlack;

      for (let i = 0; i < amountWhite; i++) result.push("white");

      return result;
    }
  };
};

console.log(ocena2([1, 3, 3, 2, 2])([2, 2, 3, 9, 2]));
