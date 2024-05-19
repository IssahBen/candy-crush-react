import blue from "../images/blue.webp";
import orange from "../images/orange.webp";
import purple from "../images/purple.webp";

import { useContext, useEffect, useState } from "react";
import { GameContext } from "../App";

function Spinner() {
  const [loader, setLoader] = useState(0);
  const { setStatus } = useContext(GameContext);
  useEffect(
    function () {
      const loading = function () {
        setLoader((loader) => (loader += 12));
      };
      if (loader > 100) {
        setLoader(0);
        console.log(9);
        setStatus("active");
        return () => clearInterval(loading);
      }
      setInterval(loading, 1000);
      return () => clearInterval(loading);
    },

    [loader, setStatus, setLoader]
  );
  return (
    <div className="">
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
    </div>
  );
}

export default Spinner;
