import { SwissWealth3DMap } from "@/components/map/SwissWealth3DMap";

export default function Wealth3DPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-swiss-gray-900">
          Swiss Wealth Distribution - 3D
        </h1>
        <p className="text-sm sm:text-base text-swiss-gray-600 max-w-3xl">
          3D municipality towers across Switzerland with a historical timeline.
          The current animated view uses ESTV municipality tax records (2010-2019),
          with average taxable income as a proxy to visualize long-run wealth
          dynamics. Drag the year slider or play the animation to watch the towers
          evolve over time.
        </p>
      </header>

      <SwissWealth3DMap />
    </div>
  );
}
