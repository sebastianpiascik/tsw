/* jshint strict: global, esversion: 6, devel: true */
"use strict";

const fib = (arg)  => {
    console.log(arg);
    if (arg <= 0) {
        return 0;
    }
    if (arg === 1) {
        return 1;
    }
    return fib(arg - 1) + fib(arg - 2);
};

const memo = (cache, fun) => {
    return function(arg){
        console.log(arguments);
        if(typeof cache[arg] !== 'undefined'){
            return cache[arg];
        } else{
            return (cache[arg] = fibonacci(arg - 1) + fibonacci(arg - 2));
        }
    };
};

const fibonacci = memo([0, 1], (recur, n) => {
    return recur(n - 1) + recur(n - 2);
});


let n = 2;
// console.log(fib(n));
console.log(fibonacci(n));