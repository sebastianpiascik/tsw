//jshint node: true, esversion: 6

const uuidv1 = require("uuid/v1");

const generateRandomCode = (colorsAmount, size) => {
  let code = [];
  let random, lastRandom;
  let min=1,max=colorsAmount;

  for (let i = 0; i < size; i++) {
    if (lastRandom === undefined) {
      random = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      random = Math.floor(Math.random() * (max - min)) + min;
      if (random >= lastRandom) random += 1;
    }
    lastRandom = random;
    code.push(random);
  }

  return code;
};

const generateRandomCode2 = (colorsAmount, size) => {
  let code = [];
  let colorsIndexes = [];
  let min=0,max=0,randomIndex = 0;

  for (let j = 0; j < colorsAmount; j++){
    colorsIndexes.push(j+1);
  }
  
  for (let i = 0; i < size; i++) {
    min=0;
    max = colorsIndexes.length-1;
    randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    code.push(colorsIndexes[randomIndex]);
    colorsIndexes.splice(randomIndex,1);
    if(colorsIndexes.length === 0){
      for (let j = 0; j < colorsAmount; j++){
        colorsIndexes.push(j+1);
      }
    }
  }

  return code;
};

exports.index = (req, res) => {
  res.render("index", {
    title: "MasterMind"
  });
};

let gameMap = new Map();

exports.createNewGame = (req, res) => {
  let code = generateRandomCode2(req.body.colors, req.body.size);

  req.body.game = uuidv1();
  req.body.code = code;

  let singleGame = {
    code: code,
    size: req.body.size,
    colors: req.body.colors,
    steps: req.body.steps,
    moves: [],
    status: false
  };

  gameMap.set(req.body.game, singleGame);

  res.json(req.body);
};

exports.makeMove = (req, res) => {
  let singleGame = gameMap.get(req.body.game);

  const result = ocena2(singleGame.code)(req.body.move);
  if (result.black === singleGame.size) {
    singleGame.status = true;
  }

  let move = {
    "move": req.body.move,
    "result": result
  };

  singleGame.moves.push(move);
  singleGame.steps--;

  gameMap.set(req.body.game, singleGame);

  req.body.result = result;
  req.body.steps = singleGame.steps;
  res.json(req.body);
};

exports.getCurrentGame = (req, res) => {
  let singleGame = gameMap.get(req.body.game);
  //req.body.currentGame = singleGame;
  res.json(singleGame);
};

exports.checkStatus = (req, res) => {
  let singleGame = gameMap.get(req.body.game);

  req.body.status = singleGame.status;
  res.json(req.body);
};

const ocena2 = code => {
  return ruch => {
    // implementacja funkcji oceniającej

    let result = {
      black: 0,
      white: 0
    };
    let amountBlack = 0,
      amountWhite = 0;

    let mapcode = new Map();
    let mapRuch = new Map();

    code.forEach(function(currentValue, index) {
      if (currentValue === ruch[index]) {
        result.black++;
        amountBlack++;
      }
      if (mapcode.has(currentValue)) {
        let amount = mapcode.get(currentValue);
        mapcode.set(currentValue, amount + 1);
      } else {
        mapcode.set(currentValue, 1);
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

    mapcode.forEach((valuecode, keycode) => {
      mapRuch.forEach((valueRuch, keyRuch) => {
        if (keycode === keyRuch) {
          if (valuecode <= valueRuch) {
            amountWhite += valuecode;
          } else {
            amountWhite += valueRuch;
          }
        }
      });
    });

    amountWhite -= amountBlack;

    for (let i = 0; i < amountWhite; i++) result.white++;

    return result;
  };
};
