export default function ScoreBoard({ score }) {
  return (
    <div className="board">
      <h1>Current Score:</h1>
      <h2>{score}</h2>
    </div>
  );
}
