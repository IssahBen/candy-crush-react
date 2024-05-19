import { useContext } from "react";
import { GameContext } from "../App";
import Timer from "./Timer.js";
export default function ScoreBoard() {
  const { score } = useContext(GameContext);
  return (
    <div className="board gelatine mt-5">
      <Timer />
      <h1>Current Score:</h1>
      <h2>{score}</h2>
    </div>
  );
}
