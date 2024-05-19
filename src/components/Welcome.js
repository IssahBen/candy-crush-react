import red from "../images/red.webp";

import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";

import { GameContext } from "../App";
import { useContext } from "react";
function Welcome() {
  const { setStatus } = useContext(GameContext);
  function handleStart() {
    setStatus((stat) => (stat = "loading"));
  }
  return (
    <div className={` flex flex-col   bg-white shape p-5 `}>
      <div className="flex justify-center mb-4">
        <img src={red} alt="" className="h-[50px] shake" />
        <img src={orange} alt="" className="h-[50px]  " />
        <img src={yellow} alt="" className="h-[50px]  " />
        <img src={purple} alt="" className="h-[50px]  shake" />
      </div>
      <div className="flex justify-center mb-5">
        <h1 className="font-bold text-5xl text-white font-sans">
          Welcome to CandyCrusher!
        </h1>
      </div>
      <div className="text-cool_gray text-xl tracking-widest text-center text-red font-sans">
        <p>
          Dear Sweet Player, Get ready to embark on a delightful journey through
          the world of Candy Crush! Whether you're a new player or a seasoned
          candy-matching master, we're thrilled to have you join our community.
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
  );
}
export default Welcome;
