"use client";

import { useEffect, useState } from "react";

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

function formatTime(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function DealTimer() {
  // Start null so server and client first paint match — timer runs only after mount
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setTimeLeft(getSecondsUntilMidnight());
    const interval = setInterval(() => {
      setTimeLeft(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold tracking-wide text-white">
      Ends tonight {timeLeft === null ? "--:--:--" : formatTime(timeLeft)}
    </div>
  );
}
