import podium from "../images/podium.png";
import defaultpic from "../images/quagmire.jpeg";

function LeaderBoard({ scores, isLoading }) {
  return (
    <div className="w-full flex flex-col justify-center items-center mb-5     h-72 overflow-auto divide-y">
      <img
        src={podium}
        alt=""
        className={` mt-5 h-[50px] ${isLoading ? "flip" : ""}`}
      />
      {scores.map((item) => (
        <BoardItem score={item.score} scores={scores} key={item.id} />
      ))}
    </div>
  );
}

function BoardItem({ score, scores }) {
  return (
    <div className="flex items-center justify-center space-x-5  bg-white mt-1 px-5 py-1 rounded-3xl divide-x  ">
      <img src={defaultpic} alt="" className="h-8 rounded-3xl pulse" />
      <p className="font-bold  text-black text-md tracking-wide">
        Highest Score:{score}pts
      </p>
      <h1 className="text-red">
        Rank :{" "}
        {scores.reduce((acc, cur) => {
          return cur.score > score ? (acc += 1) : acc;
        }, 1)}
      </h1>
    </div>
  );
}

export default LeaderBoard;
