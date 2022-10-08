"use strict";

// Create players
const playerFactory = (name, marker) => {
  return { name, marker };
};

// Manage state of gameboard
const gameBoard = (() => {
  const array = ["", "", "", "", "", "", "", "", ""];

  const setIndex = (index, marker) => {
    if (index > array.length) return;
    array[index] = marker;
  };

  const getIndex = (index) => {
    if (index > array.length) return;
    return array[index];
  };

  return { setIndex, getIndex };
})();

// Manage view of game: interact with DOM & collect info to create players
const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");

  fieldElements.forEach((field) => {
    field.addEventListener("click", (e) => {
      // return if target fieldEl is played or if game is over
      if (e.target.textContent !== "") return;
      // tell gameController to play a round using fieldEl data index
      gameController.playRound(e.target.dataset.index);
      updateGameboard();
    });
  });

  // Render contents of the gameboard array to the webpage.
  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getIndex(i);
    }
  };
})();

// Manage flow of game: mediator between all other modules/functions
const gameController = (() => {
  const player1 = playerFactory("Player 1", "X");
  const player2 = playerFactory("Player 2", "O");
  let round = 1;

  const playRound = (index) => {
    gameBoard.setIndex(index, getPlayerMarker());
    round++;
  };

  const getPlayerMarker = () => {
    return round % 2 === 1 ? player1.marker : player2.marker;
  };

  return { playRound };
})();
