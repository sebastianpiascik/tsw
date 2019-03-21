/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const fib = (arg)  => {
    if (arg <= 0) {
        return 0;
    }
    if (arg === 1) {
        return 1;
    }
    return fib(arg - 1) + fib(arg - 2);
};

const memo = (cache, fun) => {
    console.log('memo');
    return 1;
};

const fibonacci = memo([0, 1], (recur, n) => {
    return recur(n - 1) + recur(n - 2);
});


let n = 5;
console.log(fib(5));
console.log(fibonacci(n));