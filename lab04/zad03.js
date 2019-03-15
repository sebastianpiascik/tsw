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

function podstaw(szablon,dane) {
  let variables = szablon.match(/{[a-zA-Z]*}/g);

  variables.forEach(function(el){
    let elWithoutBrackets = el.slice(0,-1).substring(1);
    if ( dane.hasOwnProperty(elWithoutBrackets) ) {
        let re = new RegExp(`${el}`, 'gi');
        szablon = szablon.replace(re,dane[elWithoutBrackets]);
    }
  });

  return szablon;
}

console.log(podstaw(szablon,dane));
