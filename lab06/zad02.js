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

const callback = (value1, value2) => {
    value1 = value1 + value2;
    console.log(`callback: ${value1}`);
};

const razem = (fun1, fun2, cb) => {

    fun1(3, (value1) => {
        console.log(`wynik = ${value1}`);
        fun2(value1, (value2) => {
            console.log(`wynik = ${value2}`);
            cb(value1,value2);
        });
    });

    // const together = (fun1, fun2, cb) => {
    //     setTimeout(() => {
    //         let x = fun1(4);
    //         let y = fun2(6);
    //         cb(x,y);
    //       }, 2000);
    // }

    // together(fun1,fun2, cb)

    return true;
};

razem(fun1, fun2, callback);