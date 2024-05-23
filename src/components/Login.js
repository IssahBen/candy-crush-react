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
      alert("there was an error loading data..");
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
    <div className="px-10 flex w-full lg:w-1/2 justify-center items-center shadow bg-white rounded-[8px]">
      <div className="relative flex items-center">
        <div className="w-full z-10">
          <div className="text-center">
            <h2 className=" pulse mt-6 text-3xl font-bold text-gray-900">
              Welcome Crusher!
            </h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to play</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePlay}>
            <input type="hidden" name="remember" value="true" />
            <div className="relative">
              <div className="absolute right-0 mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <label className=" text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type=""
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
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full  flip flex justify-center shadow  bg-red text-gray-100 p-1 mb-5  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Play
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
