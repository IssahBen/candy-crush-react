import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";
import cat from "../images/cat.png";

import { GameContext } from "../App";
import { useContext, useEffect, useRef, useState } from "react";
import LeaderBoard from "./LeaderBoard";
const URL = "https://candyapi-8f14641708f8.herokuapp.com/api/v1/scores";
function Result() {
  const { score, setScore, setStatus, HandleQuit, email, token } =
    useContext(GameContext);
  const [scores, setScores] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const audioElement = useRef(null);
  function handleRestart() {
    setScore(0);
    setStatus((stat) => (stat = "loading"));
  }

  async function destroySession(obj) {
    try {
      const res = await fetch(
        `https://candyapi-8f14641708f8.herokuapp.com/api/v1/logout`,
        {
          method: "delete",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            "X-User-Token": token,
            "X-User-Email": email,
          },
        }
      );

      if (!res.ok) {
        throw Error;
      }
    } catch {
      alert("there was an error Quit");
    } finally {
    }
  }
  async function createScore(obj) {
    try {
      console.log(obj);
      await fetch(`${URL}`, {
        method: "Post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          "X-User-Token": token,
          "X-User-Email": email,
        },
      });
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

          const data = await res.json();
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          setScores(data);
        } catch (error) {
          alert(error.message);
        } finally {
          setIsloading(false);
        }
      }
      fetchScores();
      return () => controller.abort();
    },
    [setScores, setIsloading]
  );
  function handleQuit() {
    const obj = { score: { score: score } };
    createScore(obj);
    destroySession();
    HandleQuit();
  }
  window.addEventListener("DOMContentLoaded", (event) => {
    audioElement.current.volume = 0.2;
    audioElement.current.pause = "false";
    console.log(audioElement);
  });
  return (
    <div className="relative">
      <img
        src={cat}
        alt=""
        className="absolute top-[25px] left-[120px] h-40 -z-5 bounce1"
      />
      <div className="flex    flex-col w-96 leaderBoard rounded-3xl p-8 mt-5   shadow">
        <LeaderBoard isLoading={isLoading} scores={scores} />

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
              return cur.highestscore?.score > score ? (acc += 1) : acc;
            }, 1)}
          </h1>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="p-2 bounce2 bg-orange-600 rounded-3xl tracking-widest text-xl font-bold "
            onClick={handleRestart}
          >
            Restart🤩
          </button>
          <button
            className="p-2 flash bg-red rounded-3xl tracking-widest text-xl font-bold "
            onClick={handleQuit}
          >
            Quit😢😢
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

export default Result;
