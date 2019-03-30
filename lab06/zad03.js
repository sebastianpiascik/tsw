/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const fun1 = (value, cb) => {
  setTimeout(() => {
    console.log(`fun1: ${value}`);
    cb(value + value);
  }, 1500);
};

const fun2 = (value, cb) => {
  setTimeout(() => {
    console.log(`fun2: ${value}`);
    cb(value + value);
  }, 1500);
};

const fun3 = (value, cb) => {
  setTimeout(() => {
    console.log(`fun3: ${value}`);
    cb(value + value);
  }, 1500);
};

const callback = value => {
  value = value + value;
  console.log(`callback: ${value}`);
};

const poKoleiTab = (funTab, cb) => {
  const repeat = (funTab, value) => {
    funTab[0](value, value => {
    console.log(`wynik: ${value}`);
      funTab.shift();
      if (funTab[0]) {
        repeat(funTab, value);
      } else{
          cb(value);
      }
    });
  };
  return repeat(funTab, 6);
};

poKoleiTab([fun1, fun2, fun3], callback);
