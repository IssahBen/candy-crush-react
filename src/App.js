import { useState, createContext, useContext } from "react";

import logo from "./images/house.png";
import Spinner from "./components/Spinner";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import Welcome from "./components/Welcome";
import Result from "./components/Result";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

export const GameContext = createContext();

function App() {
  const [colorArrangement, setColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [compute, setCompute] = useState(false);
  const [status, setStatus] = useState("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [score, setScore] = useState(0);
  function gameOver() {
    setStatus((stat) => "game");
    setScore(0);
    console.log("gameover");
  }

  function HandleQuit() {
    setStatus("welcome");
    setScore(0);
    setToken("");
    setEmail("");
    setPassword("");
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
        email,
        setEmail,
        password,
        setPassword,
        compute,
        setToken,
        HandleQuit,
        token,
      }}
    >
      <div className="app relative">
        {status === "game" || status === "signup" ? "" : <Logo />}
        {status === "active" && <ScoreBoard />}

        <div
          className={`${
            status === "active" ? "p-1" : ""
          } w-full flex justify-center`}
        >
          {status === "welcome" && <Welcome />}
          {status === "login" && <Login />}
          {status === "signup" && <SignUp />}
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
    <div className={` `}>
      <img
        src={logo}
        alt=""
        className={`${
          status !== "game" ? "w-[200px] h-[250px] pt-5" : "w-[80] h-[100]"
        }`}
      />
    </div>
  );
}

export default App;
