import { useContext } from "react";
import { GameContext } from "../App";
export default function ScoreBoard() {
  const { score } = useContext(GameContext);
  return (
    <div className="board">
      <h1>Current Score:</h1>
      <h2>{score}</h2>
    </div>
  );
}
