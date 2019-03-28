/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const fun1 = (value,cb) => {
    setTimeout(() => {
        console.log(`fun1: ${value}`);
        cb(value+value);
    }, 2000);
};

const fun2 = (value,cb) => {
      setTimeout(() => {
        console.log(`fun2: ${value}`);
        cb(value+value);
      }, 2000);
};

const callback = (value) => {
    value = value + value;
    console.log(`callback: ${value}`);
};

const poKolei = (fun1, fun2, cb) => {
    fun1(3, (value1) => {
        console.log(`wynik = ${value1}`);
        fun2(value1, (value2) => {
            console.log(`wynik = ${value2}`);
            cb(value2);
        });
    });
  return true;
};

poKolei(fun1, fun2, callback);
