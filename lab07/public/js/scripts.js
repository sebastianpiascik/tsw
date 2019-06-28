/* jshint esversion: 6, browser: true, devel: true */

document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  let selectedColors = [];
  let currentGame = {};

  const createNode = (node, attributes) => {
    const el = document.createElement(node);
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
    return el;
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomColors = () => {
    currentGame.colorCodes = [];
    for (let i = 1; i <= currentGame.colors; i++) {
      let randomColor = getRandomColor();
      currentGame.colorCodes.push(randomColor);
    }
  };

  const buildMovesTable = movesContainer => {
    let filledMovesNumber = 0;
    if (currentGame.moves) {
      filledMovesNumber = currentGame.moves.length;
    }
    let movesTable = createNode("div", { class: "game-table" });
    let movesTableInner = createNode("div", { class: "game-table__inner" });
    for (let i = currentGame.steps + filledMovesNumber; i >= 1; i--) {
      let movesTableRow = createNode("div", {
        class: `game-table__row game-table__row-${i}`
      });
      for (let j = 1; j <= currentGame.size; j++) {
        let movesTableRowElement = createNode("div", {
          class: `game-table__row__element game-table__row__element-${i}${j}`
        });

        let colorElement = createNode("button", {
          class: "single-color"
        });
        movesTableRowElement.appendChild(colorElement);

        movesTableRow.appendChild(movesTableRowElement);
      }
      let movesTableRowElement = createNode("div", {
        class: `game-table__row__element game-table__row__element-result`
      });
      movesTableRow.appendChild(movesTableRowElement);
      movesTableInner.appendChild(movesTableRow);
    }
    movesTable.appendChild(movesTableInner);
    movesContainer.appendChild(movesTable);
  };

  const showPreviousMoves = () => {
    currentGame.moves.forEach(element => {
      element.move.forEach((el, index) => {
        let colorElement = document.querySelector(
          `.game-table__row__element-${currentStep}${index + 1} button`
        );
        colorElement.style.backgroundColor = currentGame.colorCodes[el - 1];
      });

      printResult(element.result);
      currentStep++;
    });
  };

  const showAvailableColors = movesContainer => {
    let movesTable = document.querySelector(".game-table");
    let movesTableRow = createNode("div", {
      class: `game-table__row game-table__row-colors`,
      style: "border-top:1px solid rgba(255,255,255,0.1)"
    });
    for (let i = 1; i <= currentGame.colors; i++) {
      let movesTableRowElement = createNode("div", {
        class: `game-table__row__element game-table__row__element-color`
      });

      let colorElement = createNode("button", {
        class: "single-color active",
        "data-color": `${i}`,
        style: "margin-top:10px"
      });

      colorElement.style.backgroundColor = currentGame.colorCodes[i - 1];
      colorElement.addEventListener("click", selectColor);
      movesTableRowElement.appendChild(colorElement);

      movesTableRow.appendChild(movesTableRowElement);
    }
    movesTable.appendChild(movesTableRow);
    movesContainer.appendChild(movesTable);
  };

  const buildNewGameUI = () => {
    // Empty div inner html, show checkColors button
    let movesContainer = document.querySelector(".game__moves__table");
    movesContainer.innerHTML = "";
    document.getElementById("checkColors").style.display = "inline-block";
    document.getElementById("previousMove").style.display = "inline-block";

    generateRandomColors();

    // Create game table
    buildMovesTable(movesContainer);
    showAvailableColors(movesContainer);
  };

  const buildPreviousGameUI = () => {
    // Empty div inner html, show checkColors button
    let movesContainer = document.querySelector(".game__moves__table");
    movesContainer.innerHTML = "";
    document.getElementById("checkColors").style.display = "inline-block";
    document.getElementById("previousMove").style.display = "inline-block";

    generateRandomColors();

    // Create game table
    buildMovesTable(movesContainer);
    showPreviousMoves(movesContainer);
    showAvailableColors(movesContainer);
  };

  const buildResultUI = gameStatus => {
    localStorage.clear();
    let welcomeButtonLoad = document.getElementById("welcomeButtonLoad");
    let movesContainer = document.querySelector(".game__moves__table");
    let progressScreen = document.querySelector(".game__progress");
    let checkColorsButton = document.getElementById("checkColors");
    let previousMoveButton = document.getElementById("previousMove");
    previousMoveButton.style.display = "none";
    progressScreen.style.display = "none";
    checkColorsButton.style.display = "none";
    welcomeButtonLoad.style.display = "none";

    if (gameStatus === 1) {
      movesContainer.innerHTML = "<h2>You won! The end</h2>";
    } else if (gameStatus == 2) {
      movesContainer.innerHTML = "<h2>You lost! Number of steps eq 0</h2>";
    }

    setTimeout(() => {
      showNewGameScreen();
    }, 1500);
  };

  const scrollGameMovesSection = e => {

    let gameTableInner = document.querySelector('.game-table__inner');
    gameTableInner.scrollTop = gameTableInner.scrollHeight - ((currentStep+3) * 50);

  };

  const selectColor = e => {
    if (selectedColors.length == currentGame.size) {
      printError("Nie można wykonać ruchu");
      return;
    }
    let selectedColor = Number(e.target.dataset.color);
    let selectedColorBg = e.target.style.backgroundColor;
    selectedColors.push(selectedColor);
    printGameProgress(
      `Wybrano kolor: ${selectedColorBg}, id: ${selectedColor}, twój ruch: ${selectedColors}`
    );

    let colorElement = document.querySelector(
      `.game-table__row__element-${currentStep}${selectedColors.length} button`
    );
    colorElement.style.backgroundColor = selectedColorBg;
  };

  const undoColorSelect = e => {
    if (selectedColors.length == 0) {
      printError("Nie można cofnąc ruchu");
      return;
    }

    selectedColors.pop();
    printGameProgress(`Cofnięto kolor: , twój ruch: ${selectedColors}`);

    let colorElement = document.querySelector(
      `.game-table__row__element-${currentStep}${selectedColors.length +
        1} button`
    );
    colorElement.style.backgroundColor = "rgba(255,255,255,0.15)";
  };

  const printResult = result => {
    let resultsContainer = document.querySelector(
      `.game-table__row-${currentStep} .game-table__row__element-result`
    );

    for (let i = 0; i < result.black; i++) {
      let resultElement = createNode("span", {
        class: "single-result",
        style: "background-color:#000"
      });
      resultsContainer.appendChild(resultElement);
    }

    for (let i = 0; i < result.white; i++) {
      let resultElement = createNode("span", {
        class: "single-result",
        style: "background-color:#fff"
      });
      resultsContainer.appendChild(resultElement);
    }
  };

  const printError = err => {
    console.log("==== Error: " + err);
  };

  const printGameProgress = txt => {
    let gameProgressList = document.querySelector(".game__progress ul");
    let listElement = createNode("li", {});

    let listElementText = document.createTextNode(txt);
    listElement.appendChild(listElementText);

    gameProgressList.appendChild(listElement);
  };

  const isFormValid = inputArr => {
    let isValid = true;

    inputArr.forEach(el => {
      let inputErr = el.parentNode.querySelector(".err");
      if (inputErr) {
        el.parentNode.removeChild(inputErr);
      }

      if (!el.value) {
        let formErr = createNode("span", { class: "err" });
        let formErrText = document.createTextNode("Uzupełnij to pole");
        formErr.appendChild(formErrText);
        el.parentNode.appendChild(formErr);
        isValid = false;
      }
    });

    return isValid;
  };

  const createNewGame = e => {
    e.preventDefault();
    const http = new XMLHttpRequest();
    const url = "/game/new";

    let formData = {};

    let inputSize = document.getElementById("size");
    let inputColors = document.getElementById("colors");
    let inputSteps = document.getElementById("steps");

    let inputsArr = new Array(inputSize, inputColors, inputSteps);

    if (!isFormValid(inputsArr)) {
      return;
    }

    formData[inputSize.name] = Number(inputSize.value);
    formData[inputColors.name] = Number(inputColors.value);
    formData[inputSteps.name] = Number(inputSteps.value);

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(formData));
    http.onreadystatechange = e => {
      if (http.readyState == 4 && http.status == 200) {
        let jsonResponse = JSON.parse(http.responseText);
        console.log(jsonResponse);

        currentGame = jsonResponse;
        currentStep = 1;
        selectedColors = [];

        localStorage.setItem("gameId", jsonResponse.game);

        printGameProgress(
          `Utworzono nową grę, id: ${jsonResponse.game}, wielkość: ${
            jsonResponse.size
          }, ilość kolorów: ${jsonResponse.colors}, ilość dostępnych ruchów: ${
            jsonResponse.steps
          }, kod do zgadnięcia: ${jsonResponse.code}`
        );

        buildNewGameUI();
        showGameScreen();
      } else {
        printError("Nie można utworzyć nowej gry.");
      }
    };
  };

  const makeMove = e => {
    e.preventDefault();

    if (selectedColors.length != currentGame.size) {
      printError(`Zaznacz ${currentGame.size} kolorów`);
      return;
    }

    const http = new XMLHttpRequest();
    const url = "/game/move";

    let params = {
      game: localStorage.getItem("gameId"),
      move: selectedColors
    };

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));
    http.onreadystatechange = e => {
      if (http.readyState == 4 && http.status == 200) {
        let jsonResponse = JSON.parse(http.responseText);
        console.log(jsonResponse);

        printGameProgress(
          `Wykonano ruch, id: ${jsonResponse.game}, ilość dostępnych ruchów: ${
            jsonResponse.steps
          }, twój ruch: ${jsonResponse.move}, wynik: ${JSON.stringify(
            jsonResponse.result
          )}`
        );

        printResult(jsonResponse.result);

        currentStep++;
        selectedColors = [];

        if (jsonResponse.result.black === jsonResponse.move.length) {
          buildResultUI(1);
        }
        if (jsonResponse.steps === 0) {
          buildResultUI(2);
        }
        scrollGameMovesSection();
      } else {
        printError("Nie można wykonać ruchu");
      }
    };
  };

  const getCurrentGame = e => {
    e.preventDefault();

    const http = new XMLHttpRequest();
    const url = "/game/current";

    let params = {
      game: localStorage.getItem("gameId")
    };

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));
    http.onreadystatechange = e => {
      if (http.readyState == 4 && http.status == 200) {
        let jsonResponse = JSON.parse(http.responseText);
        console.log(jsonResponse);

        currentGame = jsonResponse;
        currentStep = 1;
        selectedColors = [];

        printGameProgress(
          `Pobrano poprzednią grę, id: ${jsonResponse.game}, wielkość: ${
            jsonResponse.size
          }, ilość kolorów: ${jsonResponse.colors}, ilość dostępnych ruchów: ${
            jsonResponse.steps
          }, kod do zgadnięcia: ${jsonResponse.code}`
        );

        buildPreviousGameUI();
        showGameScreen();
      }
    };
  };

  const showWelcomeScreen = () => {
    let welcomeScreen = document.querySelector(".game__welcome");
    let newGameScreen = document.querySelector(".game__new");
    let gameScreen = document.querySelector(".game__moves");
    let progressScreen = document.querySelector(".game__progress");
    let backHomeArrow = document.querySelector(".back-home");
    let welcomeButtonLoad = document.getElementById("welcomeButtonLoad");
    backHomeArrow.style.display = "none";
    welcomeScreen.style.display = "block";
    newGameScreen.style.display = "none";
    gameScreen.style.display = "none";
    progressScreen.style.display = "none";
    if (localStorage.getItem("gameId")) {
      welcomeButtonLoad.style.display = "inline-block";
    } else {
      welcomeButtonLoad.style.display = "none";
    }
  };

  const showNewGameScreen = () => {
    let welcomeScreen = document.querySelector(".game__welcome");
    let newGameScreen = document.querySelector(".game__new");
    let backHomeArrow = document.querySelector(".back-home");
    backHomeArrow.style.display = "inline-block";
    welcomeScreen.style.display = "none";
    newGameScreen.style.display = "block";
  };

  const showGameScreen = () => {
    let welcomeScreen = document.querySelector(".game__welcome");
    let newGameScreen = document.querySelector(".game__new");
    let gameScreen = document.querySelector(".game__moves");
    let progressScreen = document.querySelector(".game__progress");
    let backHomeArrow = document.querySelector(".back-home");
    backHomeArrow.style.display = "inline-block";
    welcomeScreen.style.display = "none";
    newGameScreen.style.display = "none";
    gameScreen.style.display = "block";
    progressScreen.style.display = "block";

    let gameTableInner = document.querySelector('.game-table__inner');
    gameTableInner.scrollTop = gameTableInner.scrollHeight;
  };

  let welcomeButtonCreate = document.getElementById("welcomeButtonCreate");
  let welcomeButtonLoad = document.getElementById("welcomeButtonLoad");

  if (localStorage.getItem("gameId")) {
    welcomeButtonLoad.style.display = "inline-block";
  }

  welcomeButtonCreate.addEventListener("click", showNewGameScreen);
  welcomeButtonLoad.addEventListener("click", getCurrentGame);

  let newGameButton = document.getElementById("createNewGame");
  let makeMoveButton = document.getElementById("checkColors");
  let previousMoveButton = document.getElementById("previousMove");

  newGameButton.addEventListener("click", createNewGame, false);
  makeMoveButton.addEventListener("click", makeMove, false);
  previousMoveButton.addEventListener("click", undoColorSelect, false);

  let backHomeArrow = document.querySelector(".back-home");
  backHomeArrow.addEventListener("click", showWelcomeScreen);

  

  printGameProgress(
    `Witaj w grze MasterMind ${localStorage.getItem("gameId")}`
  );
});
