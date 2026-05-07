export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-3">
      <div className="h-48 rounded-2xl bg-slate-200" />
      <div className="mt-4 h-3 w-2/3 rounded-full bg-slate-200" />
      <div className="mt-2 h-3 w-1/3 rounded-full bg-slate-200" />
      <div className="mt-4 h-10 rounded-full bg-slate-200" />
    </div>
  );
}
