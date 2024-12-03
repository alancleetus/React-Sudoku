import { useTimerContext } from "../contexts/TimerContext"; // Import the context here
import { formatTime } from "../utils/TimerUtils"; // Utility functions from a separate file

const TimerComponent = () => {
  const { elapsedTime } = useTimerContext();

  return <>{formatTime(elapsedTime)}</>;
};

export default TimerComponent;
