type FilterSidebarProps = {
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  maxPrice: number;
  onPriceChange: (value: number) => void;
  minRating: number;
  onRatingChange: (value: number) => void;
};

const availableCategories = [
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Home" },
  { id: "beauty", label: "Beauty" },
  { id: "fitness", label: "Fitness" },
  { id: "gadgets", label: "Gadgets" },
];

export function FilterSidebar({
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Category</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          {availableCategories.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={selectedCategories.includes(item.id)}
                onChange={() => onToggleCategory(item.id)}
                aria-label={`Filter category ${item.label}`}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Price Range</h3>
        <div className="mt-3 text-sm text-slate-600">
          <input
            type="range"
            className="w-full accent-slate-900"
            min={20}
            max={250}
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label="Maximum price filter"
          />
          <div className="mt-2 flex justify-between">
            <span>$0</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Rating</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          {[
            { value: 4.5, label: "4.5 & up" },
            { value: 4.0, label: "4.0 & up" },
            { value: 3.5, label: "3.5 & up" },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                className="h-4 w-4"
                checked={minRating === item.value}
                onChange={() => onRatingChange(item.value)}
                aria-label={`Minimum rating ${item.label}`}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
