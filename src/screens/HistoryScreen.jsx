import { useSudokuContext } from "../contexts/SudokuProvider";
import "../assets/styles/HistoryScreen.css";
import { SlFlag } from "react-icons/sl";
import { CiTimer } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { PiPersonSimpleWalk } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { RiProgress1Line } from "react-icons/ri";
import { formatTime } from "../utils/TimerUtils";
import { useGameHistoryContext } from "../contexts/GameHistoryProvider";

function HistoryScreen() {
  const { loadHistoricalGame } = useSudokuContext();

  const { deleteGameFromHistory, gameHistory } = useGameHistoryContext();

  const loadGame = (gameId) => {
    const game = gameHistory.find((g) => g.gameId === gameId);
    if (game) {
      console.log("Loading game:", game);
      loadHistoricalGame(gameId);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const calculateProgress = (solutionGrid, sudokuGrid) => {
    const preFilledCells = sudokuGrid
      .flat()
      .filter((cell) => cell !== 0).length;

    const filledCells = solutionGrid.flat().filter((cell) => cell !== 0).length;
    return Math.round(
      ((filledCells - preFilledCells) / (81 - preFilledCells)) * 100
    );
  };

  return (
    <div className="history-screen">
      <div className="history-title">
        <h3>Game History</h3>
      </div>
      {gameHistory.length === 0 ? (
        <p>No saved games found.</p>
      ) : (
        <div className="history-list">
          {gameHistory.map((game) => (
            <div key={game.gameId} className="history-card">
              <p className="card-title">
                <CiCalendarDate /> {formatDate(game.gameId)}
              </p>
              <div className="card-detail">
                <p>
                  <SlFlag />
                  {game.gameDifficulty}
                </p>
                <p>
                  <RiProgress1Line />
                  {calculateProgress(game.solutionGrid, game.sudokuGrid)}%
                </p>
                <p>
                  <CiTimer />
                  {formatTime(game.elapsedTime)}
                </p>
              </div>
              <div className="card-buttons">
                <button
                  className="delete-button"
                  onClick={() => deleteGameFromHistory(game.gameId)}
                >
                  <MdDeleteOutline />
                  Delete
                </button>
                <div style={{ flexGrow: "2" }}></div>
                <button
                  className="load-button"
                  onClick={() => loadGame(game.gameId)}
                >
                  Continue <PiPersonSimpleWalk />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;
