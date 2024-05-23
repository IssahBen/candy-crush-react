import red from "../images/red.webp";

import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";

import { GameContext } from "../App";
import { useContext, useRef } from "react";
function Welcome() {
  const { setStatus } = useContext(GameContext);
  const audioElement = useRef(null);
  function handleStart() {
    setStatus((stat) => (stat = "login"));
  }

  return (
    <div className="w-full md:w-1/3 mt-5 ">
      <div className={` flex flex-col   bg-white shape p-5   m`}>
        <div className="flex justify-center mb-4 space-x-5 ">
          <img src={red} alt="" className="h-[50px] flash" />
          <img src={orange} alt="" className="h-[50px]  gelatine" />
          <img src={yellow} alt="" className="h-[50px]  pulse" />
          <img src={purple} alt="" className="h-[50px]  shake" />
        </div>
        <div className="flex justify-center mb-5">
          <h1 className="font-bold text-4xl text-white font-mono">
            Welcome to CandyCrusher!
          </h1>
        </div>
        <div className="text-cool_gray text-xl tracking-widest text-center text-red font-mono">
          <p>
            Dear Sweet Player, Get ready to embark on a delightful journey
            through the world of Candy Crush! Whether you're a new player or a
            seasoned candy-matching master, we're thrilled to have you join our
            community.
          </p>
        </div>
        <div className="flex flex-col justify-center  items-center mb-4">
          <button
            className="rounded-xl bg-green-500 p-5 text-xl flip"
            onClick={handleStart}
          >
            Start Game
          </button>
        </div>
      </div>
      <audio
        ref={audioElement}
        autoPlay="true"
        loop={true}
        src="https://www.bensound.com/bensound-music/bensound-badass.mp3"
      ></audio>
    </div>
  );
}
export default Welcome;
