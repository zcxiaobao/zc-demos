// 绘制棋盘
function createBoard() {
  let opeIndex = 0;
  const opetarors = shuffleArray([...tileOptions]);
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board.appendChild(buildTile(i, j));
    }
  }
  tiles = document.getElementsByClassName("cube");

  // 设置运营位置
  while (minesNum) {
    var mineIndex = Math.floor(Math.random() * 100);
    let x = Math.floor(mineIndex / 10),
      y = mineIndex % 10;
    let tile = tiles[x * 10 + y];
    if (!bombs.includes(`${x},${y}`)) {
      bombs.push(`${x},${y}`);
      tile.setAttribute("data-tile", opetarors[opeIndex++]);
      if (x > 0) numbers.push(`${x - 1},${y}`);
      if (x < boardSize - 1) numbers.push(`${x + 1},${y}`);
      if (y > 0) numbers.push(`${x},${y - 1}`);
      if (y < boardSize - 1) numbers.push(`${x},${y + 1}`);

      if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
      if (x < boardSize - 1 && y < boardSize - 1)
        numbers.push(`${x + 1},${y + 1}`);

      if (y > 0 && x < boardSize - 1) numbers.push(`${x + 1},${y - 1}`);
      if (x > 0 && y < boardSize - 1) numbers.push(`${x - 1},${y + 1}`);
      minesNum--;
    }
  }

  numbers.forEach((num) => {
    let coords = num.split(",");
    let tile = tiles[parseInt(coords[0]) * 10 + parseInt(coords[1])];
    let dataNum = parseInt(tile.getAttribute("data-num"));
    if (!dataNum) dataNum = 0;
    tile.setAttribute("data-num", dataNum + 1);
  });
}

reset.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  document.querySelectorAll(".cube").forEach((tile) => {
    tile.removeEventListener("click", () => clickTile(tile));
    tile.remove();
  });
  gameOver = false;
  minesNum = tileOptions.length;
  overlay.classList.add("hidden");
  bombs = [];
  numbers = [];
  createBoard();
}

function buildTile(i, j) {
  const tile = clone.cloneNode(true);
  tile.classList.remove("clone");
  tile.classList.add("cube");
  tile.setAttribute("data-id", `${i},${j}`);
  tile.addEventListener("click", function (e) {
    clickTile(tile);
  });
  tile.oncontextmenu = function (e) {
    e.preventDefault();
    flag(tile);
  };
  return tile;
}

function clickTile(tile) {
  if (
    tile.classList.contains("tile--checked") ||
    tile.classList.contains("tile--flagged") ||
    tile.classList.contains("flipped")
  )
    return;
  tile.classList.add("flipped");
  let coordinate = tile.getAttribute("data-id");
  let isMine = tile.getAttribute("data-tile");
  if (isMine) {
    gameOver = true;
    endGame(tile);
  } else {
    let num = tile.getAttribute("data-num");
    if (num != null) {
      tile.classList.add("tile--checked");
      tile.querySelectorAll(".face")[2].innerHTML = num;
      tile.querySelectorAll(".face")[2].style.color = numberColors[num - 1];
      setTimeout(() => {
        checkVictory();
      }, 100);
      return;
    }
    checkTile(tile, coordinate);
  }
  tile.classList.add("tile--checked");
}

function checkTile(tile, coordinate) {
  let coords = coordinate.split(",");
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);

  setTimeout(() => {
    if (x > 0) {
      let targetW = tiles[(x - 1) * 10 + y];
      clickTile(targetW, `${x - 1},${y}`);
    }
    if (x < boardSize - 1) {
      let targetE = tiles[(x + 1) * 10 + y];
      clickTile(targetE, `${x + 1},${y}`);
    }
    if (y > 0) {
      let targetN = tiles[x * 10 + y - 1];
      clickTile(targetN, `${x},${y - 1}`);
    }
    if (y < boardSize - 1) {
      let targetS = tiles[x * 10 + y + 1];
      clickTile(targetS, `${x},${y + 1}`);
    }

    if (x > 0 && y > 0) {
      let targetNW = tiles[(x - 1) * 10 + y - 1];
      clickTile(targetNW, `${x - 1},${y - 1}`);
    }
    if (x < boardSize - 1 && y < boardSize - 1) {
      let targetSE = tiles[(x + 1) * 10 + y + 1];
      clickTile(targetSE, `${x + 1},${y + 1}`);
    }

    if (y > 0 && x < boardSize - 1) {
      let targetNE = tiles[(x + 1) * 10 + y - 1];
      clickTile(targetNE, `${x + 1},${y - 1}`);
    }
    if (x > 0 && y < boardSize - 1) {
      let targetSW = tiles[(x - 1) * 10 + y + 1];
      clickTile(targetSW, `${x - 1},${y + 1}`);
    }
  }, 10);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flag(tile) {
  if (gameOver) return;
  if (!tile.classList.contains("flipped")) {
    if (!tile.classList.contains("tile--flagged")) {
      tile.querySelectorAll(".face")[0].innerHTML = "🚩";
      tile.classList.add("tile--flagged");
    } else {
      tile.querySelectorAll(".face")[0].innerHTML = "";
      tile.classList.remove("tile--flagged");
    }
  }
  setTimeout(() => {
    checkFlagVictory();
  }, 100);
}

function endGame(tile) {
  gameOver = true;
  for (let tile of tiles) {
    let coordinate = tile.getAttribute("data-id");
    if (bombs.includes(coordinate)) {
      tile.classList.remove("tile--flagged");
      tile.classList.add("flipped");
    }
  }
  overlay.classList.remove("hidden");
  infoP.innerHTML = "很遗憾，你没有找到所有运营!!!";
}

const checkVictory = () => {
  // 两种成功的情况
  let win = true;
  for (let tile of tiles) {
    let coordinate = tile.getAttribute("data-id");
    if (
      !tile.classList.contains("tile--checked") &&
      !bombs.includes(coordinate)
    ) {
      win = false;
    }
  }
  if (win) {
    gameOver = true;
    overlay.classList.remove("hidden");
    infoP.innerHTML = "恭喜你，成功找到所有运营!!!";
  }
};

function checkFlagVictory() {
  const flagNum = document.querySelectorAll(".tile--flagged").length;
  if (flagNum != tileOptions.length) {
    return;
  }
  let cnt = 0;
  for (let tile of tiles) {
    let coordinate = tile.getAttribute("data-id");
    if (
      tile.classList.contains("tile--flagged") &&
      bombs.includes(coordinate)
    ) {
      cnt++;
    }
  }
  let win = cnt === tileOptions.length ? true : false;
  if (win) {
    gameOver = true;
    overlay.classList.remove("hidden");
    infoP.innerHTML = "恭喜你，成功找到所有运营!!!";
  }
}

createBoard();
