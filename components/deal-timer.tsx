"use client";

import { useEffect, useState } from "react";

export function DealTimer() {
  const [timeLeft, setTimeLeft] = useState(8 * 60 * 60 + 23 * 60 + 12);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold tracking-wide text-white">
      Ends in {h}:{m}:{s}
    </div>
  );
}
