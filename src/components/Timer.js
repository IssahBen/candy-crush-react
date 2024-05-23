import { useContext, useEffect, useState } from "react";

import { GameContext } from "../App";
function Timer() {
  const { setStatus } = useContext(GameContext);
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      if (secondsRemaining === 0) {
        setStatus((stat) => (stat = "game"));

        return;
      }
      const id = setInterval(function () {
        if (secondsRemaining !== 0) {
          setSecondsRemaining((seconds) => (seconds -= 1));
        }
        console.log(2);
      }, 1000);

      return () => clearInterval(id);
    },
    [setStatus, secondsRemaining]
  );
  return (
    <div className="timer font-sans tracking-widest text-2xl pulse">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
