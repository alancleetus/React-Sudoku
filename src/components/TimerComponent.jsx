import { useTimerContext } from "../contexts/TimerContext"; // Import the context here
import { formatTime } from "../utils/TimerUtils"; // Utility functions from a separate file

const TimerComponent = () => {
  const { elapsedTime } = useTimerContext();

  return (
    <div className="timer-div">
      <div className="timer">{formatTime(elapsedTime)}</div>
    </div>
  );
};

export default TimerComponent;
