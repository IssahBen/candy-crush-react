import { useContext } from "react";
import { GameContext } from "../App";
import Timer from "./Timer.js";

export default function ScoreBoard() {
  const { score, email, token, HandleQuit } = useContext(GameContext);

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
      const data = await res.json();
      if (!res.ok) {
        throw Error;
      }
      if (data.message) {
        console.log(data);

        HandleQuit();
      }
      console.log(data);
    } catch {
      alert("there was an error Quit");
    } finally {
    }
  }

  return (
    <div className="board gelatine mt-5">
      <button
        onClick={() => destroySession()}
        className="rounded-full  mr-5 p-1 bg-white shadow"
      >
        logout-🏃🏿‍♂️
      </button>
      <Timer />
      <h1>Current Score:</h1>
      <h2>{score}</h2>
    </div>
  );
}
