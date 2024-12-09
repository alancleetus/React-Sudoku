import { formatTime } from "../utils/TimerUtils";
function StatsScreen() {
  const getStatistics = () => {
    const completedGames =
      JSON.parse(localStorage.getItem("completedGames")) || [];

    console.log("completedGames:", completedGames);
    // Total games completed
    const totalGames = completedGames.length;

    // Breakdown by difficulty
    const difficultyBreakdown = completedGames.reduce((acc, game) => {
      if (!acc[game.difficulty]) {
        acc[game.difficulty] = [];
      }
      acc[game.difficulty].push(game.elapsedTime);
      return acc;
    }, {});

    console.log("difficultyBreakdown:", difficultyBreakdown);
    // Average time per difficulty
    const averageTime = {};
    for (const difficulty in difficultyBreakdown) {
      const times = difficultyBreakdown[difficulty];
      averageTime[difficulty] =
        times.reduce((sum, time) => sum + time, 0) / times.length || 0;
    }

    console.log("averageTime:", averageTime);
    return {
      totalGames,
      difficultyBreakdown,
      averageTime,
    };
  };

  const { totalGames, difficultyBreakdown, averageTime } = getStatistics();

  return (
    <>
      <div className="stats-header">
        <h2>Game Statistics</h2>
      </div>

      <div className="stats-container">
        <div className="stats-section" id="total-games-section">
          <h4>Total Games Completed</h4>
          <div className="stats-item">
            <h5>
              <strong>Total Games:</strong> {totalGames}
            </h5>
          </div>
        </div>

        <div className="stats-section" id="difficulty-breakdown-section">
          <h4>Games by Difficulty</h4>

          {Object.keys(difficultyBreakdown).map((difficulty) => {
            return (
              <div className="stats-item" key={difficulty}>
                <h5>
                  <strong>{difficulty}:</strong>{" "}
                  {difficultyBreakdown[difficulty].length || 0}
                </h5>
              </div>
            );
          })}
        </div>
        <div className="stats-section" id="difficulty-average-time-section">
          <h4>Average Time by Difficulty</h4>
          {Object.keys(averageTime).map((difficulty) => {
            return (
              <div className="stats-item" key={difficulty}>
                {" "}
                <h5>
                  <strong>{difficulty}:</strong>{" "}
                  {formatTime(averageTime[difficulty].toFixed(2) || 0)}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StatsScreen;
