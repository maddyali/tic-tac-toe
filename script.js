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
      if (e.target.textContent !== "" || gameController.gameOver()) return;
      gameController.playRound(parseInt(e.target.dataset.index));
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
  let isOver = false;

  const playRound = (index) => {
    gameBoard.setIndex(index, getCurrentPlayerMarker());
    if (checkWinner(index)) {
      isOver = true;
      console.log("We have a winner!");
      return;
    }
    if (round === 9) {
      isOver = true;
      console.log("It's a tie!");
    }
    round++;
  };

  const getCurrentPlayerMarker = () => {
    return round % 2 === 1 ? player1.marker : player2.marker;
  };

  const checkWinner = (index) => {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    /*
        Filter for combinations where the current index played is present to get possible winning combinations
        check if there is Some combination where Every index
        is used to fetch gameboard to compare against current player's marker
        if every index is the same marker return true, winning conditions met
    */

    return winCondition
      .filter((combination) => combination.includes(index))
      .some((combination) =>
        combination.every(
          (index) => gameBoard.getIndex(index) === getCurrentPlayerMarker()
        )
      );
  };

  const gameOver = () => {
    return isOver;
  };

  return { playRound, gameOver };
})();
