import { useState, useEffect, createContext } from "react";
import red from "./images/red.webp";
import blue from "./images/blue.webp";
import orange from "./images/orange.webp";
import yellow from "./images/yellow.webp";
import purple from "./images/purple.webp";
import green from "./images/green.webp";
import blank from "./images/blank.png";
import logo from "./images/logo.png";
import Spinner from "./components/Spinner";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import Result from "./components/Result";
export const GameContext = createContext();
const width = 8;
const candyColors = [red, green, orange, purple, blue, yellow];
function App() {
  const [colorArrangement, setColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [compute, setCompute] = useState(false);
  const [status, setStatus] = useState("welcome");

  const [score, setScore] = useState(0);
  function gameOver() {
    setStatus((stat) => "game");
    setScore(0);
    console.log("gameover");
  }
  // eslint-disable-next-line
  function checkFor3Col() {
    for (let i = 0; i <= 47; i++) {
      const col3 = [i, i + width, i + width * 2];
      const decidedColor = colorArrangement[i];
      const isBlank = colorArrangement[i] === blank;
      if (
        col3.every((square) => colorArrangement[square] === decidedColor) &&
        !isBlank
      ) {
        setScore((score) => (score += 3));
        col3.forEach((square) => (colorArrangement[square] = blank));
        return true;
      }
    }
  }
  // eslint-disable-next-line
  function checkFor4Col() {
    for (let i = 0; i <= 39; i++) {
      const col4 = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = colorArrangement[i];
      const isBlank = colorArrangement[i] === blank;
      if (
        col4.every((square) => colorArrangement[square] === decidedColor) &&
        !isBlank
      ) {
        setScore((score) => (score += 4));
        col4.forEach((square) => (colorArrangement[square] = blank));
        return true;
      }
    }
  }

  // eslint-disable-next-line
  function checkFor3Row() {
    for (let i = 0; i < 64; i++) {
      const row3 = [i, i + 1, i + 2];
      const decidedColor = colorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      const isBlank = colorArrangement[i] === blank;
      if (
        row3.every((square) => colorArrangement[square] === decidedColor) &&
        !isBlank
      ) {
        setScore((score) => (score += 3));
        row3.forEach((square) => (colorArrangement[square] = blank));
        return true;
      }
    }
  }
  // eslint-disable-next-line
  function checkFor4Row() {
    for (let i = 0; i < 64; i++) {
      const row4 = [i, i + 1, i + 2, i + 3];
      const decidedColor = colorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      const isBlank = colorArrangement[i] === blank;
      if (
        row4.every((square) => colorArrangement[square] === decidedColor) &&
        isBlank
      ) {
        setScore((score) => (score += 4));
        row4.forEach((square) => (colorArrangement[square] = blank));
        return true;
      }
    }
  }
  // eslint-disable-next-line
  function moveToSquareBelow() {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && colorArrangement[i] === blank) {
        let randomNum = Math.floor(Math.random() * candyColors.length);
        colorArrangement[i] = candyColors[randomNum];
      }
      if (colorArrangement[i + width] === blank) {
        colorArrangement[i + width] = colorArrangement[i];
        colorArrangement[i] = blank;
      }
    }
  }

  function handleClick(e) {
    if (squareBeingDragged === null) {
      setSquareBeingDragged((c) => (c = e.target));
      console.log("set dragged");
    }

    if (squareBeingReplaced === null && squareBeingDragged !== null) {
      setSquareBeingReplaced((c) => (c = e.target));
      setCompute(true);
      console.log("set replaced");
    }
  }

  if (compute) {
    const replacedId = parseInt(squareBeingReplaced?.getAttribute("data-id"));
    const draggedId = parseInt(squareBeingDragged?.getAttribute("data-id"));
    colorArrangement[replacedId] = squareBeingDragged?.getAttribute("src");
    colorArrangement[draggedId] = squareBeingReplaced?.getAttribute("src");
    const validMoves = [
      draggedId - 1,
      draggedId - width,
      draggedId + 1,
      draggedId + width,
    ];

    const validMove = validMoves.includes(replacedId);
    const isRow3 = checkFor3Row();
    const isRow4 = checkFor4Row();
    const isCol3 = checkFor3Col();
    const isCol4 = checkFor4Col();

    if (replacedId && validMove && (isRow3 || isRow4 || isCol3 || isCol4)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setCompute(false);
      console.log("correct move");
    } else {
      colorArrangement[replacedId] = squareBeingReplaced?.getAttribute("src");
      colorArrangement[draggedId] = squareBeingDragged?.getAttribute("src");
      setColorArrangement((colors) => (colors = [...colorArrangement]));

      setCompute(false);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    }
  }
  function createBoard() {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setColorArrangement((arr) => (arr = [...randomColorArrangement]));
  }
  useEffect(() => createBoard(), []);
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      checkFor4Col();
      checkFor3Col();
      checkFor3Row();
      checkFor4Row();
      moveToSquareBelow();

      setColorArrangement([...colorArrangement]);
    }, 800);

    return () => clearInterval(timer);
  }, [
    checkFor4Col,
    checkFor3Col,
    checkFor3Row,
    checkFor4Row,
    moveToSquareBelow,
    colorArrangement,
  ]);

  return (
    <GameContext.Provider
      value={{
        score,
        colorArrangement,
        squareBeingDragged,
        squareBeingReplaced,
        handleClick,
        setStatus,
        setScore,
        gameOver,
        setCompute,
      }}
    >
      <div className="app">
        <Logo />
        {status === "active" && <ScoreBoard />}
        <div className={`${status === "active" ? "p-24" : ""}`}>
          {status === "welcome" && <Welcome />}
          {status === "loading" && <Spinner />}
          {status === "active" && <GameBoard />}
          {status === "game" && <Result />}
        </div>
      </div>
    </GameContext.Provider>
  );
}
function Logo() {
  return (
    <div className="logo btn">
      <img src={logo} alt="" />
    </div>
  );
}
export default App;