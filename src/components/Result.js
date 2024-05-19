import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";

import { GameContext } from "../App";
import { useContext, useEffect, useRef } from "react";
function Result() {
  const { score, setScore, setStatus } = useContext(GameContext);
  const audioElement = useRef(null);
  function handleRestart() {
    setScore(0);
    setStatus((stat) => (stat = "loading"));
  }
  function handleQuit() {
    setScore(0);
    setStatus((stat) => (stat = "welcome"));
  }
  useEffect(function () {}, []);
  return (
    <div className="flex flex-col w-96 bg-black rounded-3xl p-8 mt-5  border-2 shadow">
      <audio
        volume="0.4"
        ref={audioElement}
        autoPlay="true"
        loop={true}
        src="https://www.bensound.com/bensound-music/bensound-moose.mp3"
      ></audio>
      <div className="w-full flex flex-col justify-center items-center text-3xl text-pink-500 tracking-widest">
        <h1>CandyCrusher!</h1>
        <p>Great 🎉🎉🎉</p>
      </div>
      <div className="flex justify-center mt-5 space-x-5">
        <img src={orange} alt="" className="h-[70px] pulse " />
        <img src={yellow} alt="" className="h-[70px] " />
        <img src={purple} alt="" className="h-[70px] pulse " />
      </div>
      <div className="flex justify-center mt-5">
        <h1 className="font-bold text-red pulse text-2xl font-mono tracking-widest">
          HighScore:{score}
        </h1>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className="p-2 bounce2 bg-orange-600 rounded-3xl tracking-widest text-xl font-bold "
          onClick={handleRestart}
        >
          Restart🤩🤩🤩
        </button>
        <button
          className="p-2 flash bg-red rounded-3xl tracking-widest text-xl font-bold "
          onClick={handleQuit}
        >
          Quit😢😢😢
        </button>
      </div>
    </div>
  );
}

export default Result;
