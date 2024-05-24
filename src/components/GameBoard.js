import { useContext, useEffect } from "react";
import { GameContext } from "../App";
import blank from "../images/blank.png";
import red from "../images/red.webp";
import blue from "../images/blue.webp";
import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";
import green from "../images/green.webp";
import { useRef } from "react";

const width = 8;
const candyColors = [red, green, orange, purple, blue, yellow];

function GameBoard() {
  const {
    colorArrangement,
    squareBeingDragged,
    squareBeingReplaced,
    setScore,
    setSquareBeingDragged,
    setSquareBeingReplaced,
    compute,
    setCompute,
    setColorArrangement,
  } = useContext(GameContext);

  const audioElement = useRef(null);
  const CorrectMoveEffectElement = useRef(null);
  const WrongMoveEffectElement = useRef(null);
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
      CorrectMoveEffectElement.current.play();
      console.log("correct move");
    } else {
      colorArrangement[replacedId] = squareBeingReplaced?.getAttribute("src");
      colorArrangement[draggedId] = squareBeingDragged?.getAttribute("src");
      setColorArrangement((colors) => (colors = [...colorArrangement]));
      WrongMoveEffectElement.current.play();

      setCompute(false);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    }
  }
  // eslint-disable-next-line
  function createBoard() {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setColorArrangement((arr) => (arr = [...randomColorArrangement]));
  }
  // eslint-disable-next-line
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
    }, 500);

    return () => clearInterval(timer);
  }, [
    checkFor4Col,
    checkFor3Col,
    checkFor3Row,
    checkFor4Row,
    moveToSquareBelow,
    colorArrangement,
    setColorArrangement,
  ]);

  return (
    <div className="game  rounded-2xl shadow mt-5 bg-[#2B2730] bounce-in-right ">
      {colorArrangement.map((candyColor, index) => (
        <div
          key={index}
          className={`image ${
            Number(squareBeingDragged?.getAttribute("data-id")) === index
              ? "dragged pulse"
              : ""
          } ${
            Number(squareBeingReplaced?.getAttribute("data-id")) === index
              ? "replaced"
              : ""
          }`}
        >
          {" "}
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            onClick={(e) => handleClick(e)}
          />
        </div>
      ))}
      <audio
        ref={audioElement}
        autoPlay="true"
        loop={true}
        src="https://www.bensound.com/bensound-music/bensound-badass.mp3"
      ></audio>
      <audio
        ref={CorrectMoveEffectElement}
        src="https://cdn.freesound.org/previews/260/260432_4855185-lq.mp3"
      >
        <audio
          ref={WrongMoveEffectElement}
          src="https://cdn.freesound.org/previews/203/203380_3569783-lq.mp3"
        ></audio>
      </audio>
    </div>
  );
}

export default GameBoard;
