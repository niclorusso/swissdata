import { CantonDistortionMap } from "@/components/map/CantonDistortionMap";

export default function CantonsCartogramPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-swiss-gray-900">
          Distorted Switzerland by Canton Metrics
        </h1>
        <p className="text-sm sm:text-base text-swiss-gray-600 max-w-3xl">
          Interactive cartogram-style view where each canton shape expands or contracts
          proportionally to a selected metric (population, density, income proxy, rent,
          and more). This makes demographic and economic imbalances visible at a glance.
        </p>
      </header>

      <CantonDistortionMap />
    </div>
  );
}
