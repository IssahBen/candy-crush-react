import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";

import { GameContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";
import LeaderBoard from "./LeaderBoard";
const URL = "http://localhost:3000/api/v1/scores";
function Result() {
  const { score, setScore, setStatus } = useContext(GameContext);
  const [scores, setScores] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const audioElement = useRef(null);
  function handleRestart() {
    setScore(0);
    setStatus((stat) => (stat = "loading"));
  }
  function handleQuit() {
    setScore(0);
    setStatus((stat) => (stat = "welcome"));
    const obj = { score: { score: score } };
    createScore(obj);
  }
  async function createScore(obj) {
    try {
      const res = await fetch(`${URL}`, {
        method: "Post",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } catch {
      alert("there was an error loading data..");
    } finally {
    }
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchScores() {
        try {
          setIsloading(true);
          const res = await fetch(`${URL}`);
          console.log(res);
          const data = await res.json();
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          setScores(data);
          console.log(data);
        } catch (error) {
          console.error(error.message);
        } finally {
          setIsloading(false);
        }
      }
      fetchScores();
      return () => controller.abort();
    },
    [setScores, setIsloading]
  );

  return (
    <>
      <div className="flex flex-col w-96 bg-black rounded-3xl p-8 mt-5   shadow">
        <LeaderBoard isLoading={isLoading} scores={scores} />
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
          <img src={orange} alt="" className="h-[50px] pulse " />
          <img src={yellow} alt="" className="h-[50px] " />
          <img src={purple} alt="" className="h-[50px] pulse " />
        </div>
        <div className="flex justify-center mt-5">
          <h1 className="font-bold text-red pulse text-2xl font-mono tracking-widest">
            HighScore:{score} Rank:{" "}
            {scores.reduce((acc, cur) => {
              return cur.score > score ? (acc += 1) : acc;
            }, 1)}
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
    </>
  );
}

export default Result;
