/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let tekst = 'Ala i\nAs poszli w las';

function nbsp(txt){
    txt = txt.replace(/ (a|i|o|u|w|z)(\n| )/g, " $1&nbsp;");
    
    return txt;
}

console.log(nbsp(tekst));