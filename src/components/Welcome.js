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
    <div className="w-full md:w-1/3  ">
      <div className={` flex flex-col   bg-white  p-5   `}>
        <div className="flex justify-center mb-5">
          <h1 className="font-bold text-4xl text-pink-700 font-mono">
            Welcome to CandyCrusher!
          </h1>
        </div>
        <div className="text-cool_gray text-xl tracking-wide text-center text-pink-600 font-mono">
          <p>
            Dear Sweet Player, Get ready to embark on a delightful journey
            through the world of Candy Crush! Whether you're a new player or a
            seasoned candy-matching master, we're thrilled to have you join our
            community.
          </p>
        </div>
        <div className="flex flex-col justify-center  items-center mt-5">
          <button class="uiverse" onClick={handleStart}>
            <div class="wrapper">
              <span>Start</span>
              <div class="circle circle-12"></div>
              <div class="circle circle-11"></div>
              <div class="circle circle-10"></div>
              <div class="circle circle-9"></div>
              <div class="circle circle-8"></div>
              <div class="circle circle-7"></div>
              <div class="circle circle-6"></div>
              <div class="circle circle-5"></div>
              <div class="circle circle-4"></div>
              <div class="circle circle-3"></div>
              <div class="circle circle-2"></div>
              <div class="circle circle-1"></div>
            </div>
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
