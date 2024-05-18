import { useContext } from "react";
import { GameContext } from "../App";
function GameBoard() {
  const {
    colorArrangement,
    squareBeingDragged,
    squareBeingReplaced,
    handleClick,
  } = useContext(GameContext);
  return (
    <div className="game shape">
      {colorArrangement.map((candyColor, index) => (
        <div
          className={`image ${
            Number(squareBeingDragged?.getAttribute("data-id")) === index
              ? "dragged"
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
    </div>
  );
}

export default GameBoard;
