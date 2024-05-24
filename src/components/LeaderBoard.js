import defaultpic from "../images/quagmire.jpeg";
import { GameContext } from "../App";
import { useContext } from "react";
function LeaderBoard({ scores, isLoading }) {
  const { score, email } = useContext(GameContext);
  // const [newScores, setNewScores] = useState([]);
  const newScores = scores.map((item) =>
    item.highestscore === null
      ? { email: email, highestscore: { score: score } }
      : item.highestscore.score < score && item.email === email
      ? { email: email, highestscore: { score: score } }
      : item
  );
  console.log(scores);
  console.log(newScores);

  // useEffect(
  //   function () {
  //     for (let i = 0; i < scores.size; i++) {
  //       if (scores[i].email === email && scores[i].highestscore < score) {
  //         setNewScores(
  //           (scores) =>
  //             (scores = scores.push({ email: email, highestscore: score }))
  //         );
  //         (2);
  //       } else setNewScores((scores) => (scores = scores.push(score[i])));
  //     }
  //   },
  //   [email, score, scores]
  // );

  return (
    <div className="w-full relative   flex flex-col justify-center items-center mb-8    h-72 overflow-auto divide-y">
      <div className="flex flex-col overflow-scroll absolute h-44 bg-black">
        {newScores.map((item) => (
          <BoardItem item={item} newScores={newScores} key={item.email} />
        ))}
      </div>
    </div>
  );
}

function BoardItem({ item, newScores }) {
  const rank = newScores.reduce((acc, cur) => {
    return cur.highestscore?.score > item.highestscore?.score
      ? (acc += 1)
      : acc;
  }, 1);
  return (
    <div
      className={`${
        rank === 1
          ? "bg-purple-500 "
          : rank === 2
          ? "bg-orange-500 "
          : "bg-white"
      } flex items-center justify-center space-x-5  mt-1 px-5 py-1 rounded-3xl divide-x  `}
    >
      <img src={defaultpic} alt="" className="h-8 rounded-3xl pulse" />
      <p className="font-bold  text-black text-md tracking-wide">
        {item.email?.slice(0, 8)}:{item.highestscore?.score}pts
      </p>
      <h1 className="text-red">Rank :{rank}</h1>
    </div>
  );
}

export default LeaderBoard;
