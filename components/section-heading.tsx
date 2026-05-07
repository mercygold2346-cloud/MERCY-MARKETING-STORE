export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm text-slate-600 sm:text-base">{description}</p>}
      </div>
    </div>
  );
}
