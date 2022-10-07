"use strict";

// Create players
const playerFactory = (name, marker) => {
  return { name, marker };
};

// Manage state of gameboard
const gameBoard = (() => {
  const array = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  return { array };
})();

// Manage view of game: interact with DOM & collect info to create players
const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  fieldElements.forEach((field) => {
    field.addEventListener("click", (e) => {
      updateGameboard();
    });
  });

  // Render contents of the gameboard array to the webpage.
  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.array[i];
    }
  };
})();
