/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const fun1 = (value,cb) => {
    setTimeout(() => {
        console.log(`fun1: ${value}`);
        cb(value+value);
    }, 1500);
};

const fun2 = (value,cb) => {
      setTimeout(() => {
        console.log(`fun2: ${value}`);
        cb(value+value);
      }, 1500);
};

const fun3 = (value,cb) => {
      setTimeout(() => {
        console.log(`fun3: ${value}`);
        cb(value+value);
      }, 1500);
};

const callback = (value) => {
    value = value + value;
    console.log(`callback: ${value}`);
};

const poKoleiTab = (funTab, cb) => {
    let index = 0;

    funTab[0](5, (value) => {
        funTab.shift();
        if(funTab[0]){
            poKoleiTab(funTab, (value2) => {
                console.log(`wynik = ${value2}`);
                cb(value2);
            });
        }
    });
  return true;
};

poKoleiTab([fun1,fun2,fun3], callback);
