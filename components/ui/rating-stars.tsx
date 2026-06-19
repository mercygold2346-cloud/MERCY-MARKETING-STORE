import { Star } from "lucide-react";

export function RatingStars({
  rating,
  reviews,
  hideCount,
}: {
  rating: number;
  reviews?: number;
  hideCount?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1 text-amber-400"
      aria-label={reviews ? `Rated ${rating} out of 5 from ${reviews} reviews` : `Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < Math.round(rating) ? "currentColor" : "none"} aria-hidden />
      ))}
      {!hideCount && (
        <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
          {rating.toFixed(1)}
          {reviews !== undefined && ` (${reviews})`}
        </span>
      )}
    </div>
  );
}
