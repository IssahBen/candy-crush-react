import { useContext, useEffect } from "react";
import { GameContext } from "../App";
const URL = "https://candyapi-8f14641708f8.herokuapp.com/api/v1/login";
function Login() {
  const { email, setEmail, password, setPassword, setToken, setStatus } =
    useContext(GameContext);
  async function createSession(obj) {
    try {
      const res = await fetch(`${URL}`, {
        method: "Post",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error;
      }
      if (data.message) {
        return alert(data.message);
      } else if (data.id) {
        setStatus("loading");
        setToken(data.authentication_token);
      }
    } catch {
      alert("Server Offline");
    } finally {
    }
  }
  function handlePlay(e) {
    e.preventDefault();
    const obj = { user: { email: email, password: password } };
    createSession(obj);
  }
  function ResetParams() {
    setEmail("");
    setPassword("");
  }
  useEffect(ResetParams, [setEmail, setPassword]);
  return (
    <div className="px-10 flex w-full lg:w-1/2 justify-center items-center  bg-white rounded-[8px]">
      <div className="relative flex items-center">
        <div className="w-full z-10">
          <div className="text-center">
            <h2 className="  mt-2 text-3xl font-bold text-gray-700">
              Welcome Crusher!
            </h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to play</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePlay}>
            <input type="hidden" name="remember" value="true" />
            <div className="relative">
              <label className=" text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" rounded-lg w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="mail@gmail.com"
              />
            </div>
            <div className="mt-8 content-center">
              <label className="text-sm  pulse font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" rounded-lg w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
            </div>
            <div>
              {/* <button
                type="submit"
                className="w-full  flip flex justify-center shadow  bg-red text-gray-100 p-1 mb-5  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Play
              </button> */}
              <button class=" ebtn  bg-pink-500 neo-pop-tilted-button">
                <span className="text-white">Play</span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex ml-2 flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Don't have an account?</span>
          <button
            onClick={() => setStatus("signup")}
            className="pulse text-red hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
