const board = document.querySelector(".board");
const clone = document.querySelector(".clone");
const overlay = document.querySelector(".overlay");
const reset = document.querySelector(".reset");
const infoP = document.querySelector(".info");
const boardSize = 10;
const tileOptions = operator.map((item) => item.id);

let minesNum = tileOptions.length;
let gameOver = false;
let bombs = [];
let numbers = [];
let tiles = [];

let numberColors = [
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#9b59b6",
  "#f1c40f",
  "#1abc9c",
  "#34495e",
  "#7f8c8d",
];
