import red from "../images/red.webp";
import blue from "../images/blue.webp";
import orange from "../images/orange.webp";
import yellow from "../images/yellow.webp";
import purple from "../images/purple.webp";
import green from "../images/green.webp";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";

function Spinner() {
  const [loader, setLoader] = useState(0);
  const { setStatus } = useContext(GameContext);
  useEffect(
    function () {
      const loading = function () {
        setLoader((loader) => (loader += 12));
        if (loader > 100) {
          console.log(loader);
          setLoader(0);
          setStatus("active");
        }
      };
      setInterval(loading, 1000);
      return () => clearInterval(loading);
    },

    [loader, setStatus]
  );
  return (
    <>
      <div className="flex justify-center w-full items-center mt-12">
        <img src={purple} alt="" className="spin" />
        <img src={orange} alt="" className="bounce2" />
        <img src={blue} alt="" className="spin" />
      </div>
      <div className="flex justify-center items-center w-full">
        <progress value={loader} max="100">
          {loader}
        </progress>
      </div>
    </>
  );
}

export default Spinner;
