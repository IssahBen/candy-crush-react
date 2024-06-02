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
    <div class="card flex w-max   items-center justify-evenly pr-10 space-x-5">
      <button class="qBtn" onClick={() => destroySession()}>
        <div class="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>

        <div class="text">Logout</div>
      </button>
      <Timer />
      <h1>Current Score:</h1>
      <h2>{score}</h2>
    </div>
  );
}
