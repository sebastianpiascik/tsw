//jshint node: true, esversion: 6
"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
// const api = require('./routes/api/');

const uuidv1 = require('uuid/v1');

// obsługujemy dane typu application/json
app.use(bodyParser.json());
// oraz dane typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let gameMap = new Map();

app.get("/", (_req, res) => {
   res.send("Ahoj przygodo!");
});

app.post("/game/new", (req, res) => {
    req.body.game = uuidv1();

    let kod = [1, 3, 3, 2, 2];

    console.log(kod);

    gameMap.set(req.body.game, kod);

    res.json(req.body);
});

app.post("/game/move", (req, res) => {
    const result = ocena2(gameMap.get(req.body.game))(req.body.move);
    console.log(result);
    req.body.result = result;
    res.json(req.body);
});

app.post("/game/status", (req, res) => {
    console.log(gameMap.get(req.body.game));

    req.body.status = false;
    res.json(req.body);
});

// app.use('/api', api);

app.listen(port, () => {
	console.log(`Express działa na porcie ${port}`);
});



const ocena2 = kod => {
    return ruch => {
      // implementacja funkcji oceniającej
      if (kod.length !== ruch.length) {
        return "Tablice muszą być tej samej długości.";
      } else {
        let result = {
            "black": 0,
            "white": 0
        };
        let amountBlack = 0,
          amountWhite = 0;
  
        let mapKod = new Map();
        let mapRuch = new Map();
  
        kod.forEach(function(currentValue, index) {
          if (currentValue === ruch[index]) {
            result.black++;
            amountBlack++;
          }
          if (mapKod.has(currentValue)) {
            let amount = mapKod.get(currentValue);
            mapKod.set(currentValue, amount + 1);
          } else {
            mapKod.set(currentValue, 1);
          }
        });
  
        ruch.forEach(function(currentValue, index) {
          if (mapRuch.has(currentValue)) {
            let amount = mapRuch.get(currentValue);
            mapRuch.set(currentValue, amount + 1);
          } else {
            mapRuch.set(currentValue, 1);
          }
        });
  
        mapKod.forEach((valueKod, keyKod) => {
          mapRuch.forEach((valueRuch, keyRuch) => {
            if (keyKod === keyRuch) {
              if (valueKod <= valueRuch) {
                amountWhite += valueKod;
              } else {
                amountWhite += valueRuch;
              }
            }
          });
        });
  
        amountWhite -= amountBlack;
  
        for (let i = 0; i < amountWhite; i++) result.white++;
  
        return result;
      }
    };
  };