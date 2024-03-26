import React from "react";
import { PokemonStat } from "@/app/lib/features/pokemon/types";
import { toNormalWords } from "@/app/lib/utils";

interface StatOverviewProps {
  stats: PokemonStat[];
}

const statColorMap: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-blue-500",
  defense: "bg-green-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-yellow-500",
  speed: "bg-indigo-500",
};

const StatOverview: React.FC<StatOverviewProps> = ({ stats }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-8">
      <h2 className="text-3xl font-semibold mb-4">Stats Overview</h2>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index}>
            <span>{toNormalWords(stat.stat.name)}</span>
            <div className="w-full stat-bar-fill rounded-full h-2.5">
              <div
                className={`stat-bar-fill h-2.5 rounded-full ${statColorMap[stat.stat.name] || "bg-gray-500"}`}
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatOverview;
