/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let tekst = "Ala i\nAs poszli w las";

String.prototype.nbsp2 = function(){
    return this.replace(/ (a|i|o|u|w|z)(\n| )/g, " $1&nbsp;");
};

console.log(tekst.nbsp2());