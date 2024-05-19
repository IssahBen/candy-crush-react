import { useContext, useEffect, useState } from "react";

import { GameContext } from "../App";
function Timer() {
  const { setStatus } = useContext(GameContext);
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        if (secondsRemaining === 0) setStatus("gameover");
        setSecondsRemaining((seconds) => (seconds -= 1));
      }, 1000);
      return () => clearInterval(id);
    },
    [secondsRemaining, setStatus]
  );
  return (
    <div className="timer font-sans tracking-widest text-2xl">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
