import React, { useState, useRef } from 'react';
import './Timer.css';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // holds the active interval ID for cleanup

  const startTimer = () => {
    if(!isActive) {
        setIsActive(true);
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }
  } // start the timer

  const pauseTimer = () => {
    setIsActive(false);
    if(intervalRef.current) {
        clearInterval(intervalRef.current);
    }
  }

  const resetTimer = () => {
    setSeconds(0);
    pauseTimer() // reset also stops the timer
  }



  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="timer-container">
      <h2>Timer</h2>
      <div className="timer-display">{seconds}s</div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={isActive}>Start</button>
        <button onClick={pauseTimer} disabled={!isActive}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;