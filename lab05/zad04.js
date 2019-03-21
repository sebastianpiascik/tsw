/* jshint strict: global, esversion: 6, devel: true */
"use strict";

// const ocena = kod => {
//   return ruch => {
//     // implementacja funkcji oceniającej
//     if (kod.length !== ruch.length) {
//       return "Tablice muszą być tej samej długości.";
//     } else {
//       let result = [];
//       let ratedKod = new Array(kod.length);
//       let ratedRuch = new Array(kod.length);
//       ratedKod.fill(0);
//       ratedRuch.fill(0);

//       console.log(kod);
//       console.log(ruch);

//       kod.forEach(function(currentValue, index) {
//         if (currentValue === ruch[index]) {
//           result.push("black");
//           ratedKod[index] = 1;
//           ratedRuch[index] = 1;
//         }
//       });

//       ruch.forEach(function(currentValue, index) {
//         kod.forEach(function(currentValueKod, indexKod) {
//           if (
//             ratedRuch[index] === 0 &&
//             ratedKod[indexKod] === 0 &&
//             ruch[currentValue] === kod[currentValueKod]
//           ) {
//             result.push("white");
//             ratedRuch[index] = 1;
//             ratedKod[indexKod] = 1;
//           }
//         });
//       });

//       return result;
//     }
//   };
// };

// console.log(ocena([1, 3, 3, 2, 2])([2, 2, 3, 9, 2]));

const ocena2 = kod => {
  return ruch => {
    // implementacja funkcji oceniającej
    if (kod.length !== ruch.length) {
      return "Tablice muszą być tej samej długości.";
    } else {
      let result = [];
      let amountBlack = 0,
        amountWhite = 0;

      console.log(kod);
      console.log(ruch);

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
