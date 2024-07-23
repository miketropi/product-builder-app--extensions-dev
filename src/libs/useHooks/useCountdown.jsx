import { useState, useEffect } from "react";

export default function useCountdown (start) {
  const [ counter, setCounter ] = useState(start);

  useEffect(() => {
    if (counter <= 0) { return; }
    let intervalId = setInterval(() => {
      setCounter((c => c - 1))
    }, 1000) 

    return () => clearInterval(intervalId);
  }, [counter]); 

  return counter;
}