/* jshint strict: global, esversion: 6, devel: true */
"use strict";

let szablon =
  '<table border="{border}">' +
  "  <tr><td>{first}</td><td>{last}</td></tr>" +
  "</table>";

let dane = {
  first: "Jan",
  last: "Kowalski",
  pesel: "97042176329"
};

String.prototype.podstaw = function(dane){
  let variables = this.match(/{[a-zA-Z]*}/g);
  let that = this;

  variables.forEach(function(el){
    let elWithoutBrackets = el.slice(0,-1).substring(1);
    if ( dane.hasOwnProperty(elWithoutBrackets) ) {
        let re = new RegExp(`${el}`, 'gi');
        that = that.replace(re,dane[elWithoutBrackets]);
    }
  });

  return that;
};

console.log(szablon.podstaw(dane));
