import { formatTime } from "../utils/TimerUtils";

function StatsScreen() {
  const getStatistics = () => {
    const completedGames =
      JSON.parse(localStorage.getItem("completedGames")) || [];

    // Total games completed
    const totalGames = completedGames.length;

    // Breakdown by difficulty
    const difficultyBreakdown = completedGames.reduce((acc, game) => {
      acc[game.difficulty] = (acc[game.difficulty] || []).concat(
        game.elapsedTime
      );
      return acc;
    }, {});

    // Average time per difficulty
    const averageTime = {};
    for (const difficulty in difficultyBreakdown) {
      const times = difficultyBreakdown[difficulty];
      averageTime[difficulty] =
        times.reduce((sum, time) => sum + time, 0) / times.length || 0;
    }

    return {
      totalGames,
      difficultyBreakdown,
      averageTime,
    };
  };

  const { totalGames, averageTime } = getStatistics();

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h1>Game Statistics</h1>
      </div>

      <div className="stats-section" id="total-games-section">
        <h2>Total Games Completed</h2>
        <div className="stats-item">
          <strong>Total Games:</strong> {totalGames}
        </div>
      </div>

      <div className="stats-section" id="difficulty-average-time-section">
        <h2>Average Time by Difficulty</h2>
        <div className="stats-item">
          <strong>Easy:</strong> {formatTime(averageTime?.easy?.toFixed(2))}
        </div>
        <div className="stats-item">
          <strong>Medium:</strong> {formatTime(averageTime?.medium?.toFixed(2))}
        </div>
        <div className="stats-item">
          <strong>Hard:</strong> {formatTime(averageTime?.hard?.toFixed(2))}
        </div>
      </div>
    </div>
  );
}

export default StatsScreen;
