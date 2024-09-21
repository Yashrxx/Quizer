import React from 'react'
import { useState, useEffect } from 'react';
const Timer = () => {
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
  
    return (
      <div>
        {formatTime(time)}
      </div>
    );
  };
  export default Timer;