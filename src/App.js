import { useState, createContext, useContext } from "react";

import logo from "./images/logo.png";
import Spinner from "./components/Spinner";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import Result from "./components/Result";
import LeaderBoard from "./components/LeaderBoard";
export const GameContext = createContext();

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

  return (
    <GameContext.Provider
      value={{
        score,
        colorArrangement,
        squareBeingDragged,
        squareBeingReplaced,
        setStatus,
        setScore,
        gameOver,
        setCompute,
        setSquareBeingDragged,
        setSquareBeingReplaced,
        setColorArrangement,
        compute,
      }}
    >
      <div className="app">
        {status !== "game" ? <Logo /> : ""}
        {status === "active" && <ScoreBoard />}
        <div
          className={`${
            status === "active" ? "p-1" : ""
          } w-full flex justify-center`}
        >
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
  const { status } = useContext(GameContext);
  return (
    <div className={`logo  ${status === "ending" ? "flash" : "btn"}`}>
      <img src={logo} alt="" />
    </div>
  );
}
export default App;
