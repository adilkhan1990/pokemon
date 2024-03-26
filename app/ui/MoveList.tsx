// MoveList.tsx
import React, { useState } from "react";
import { PokemonMove } from "@/app/lib/features/pokemon/types";
import { toNormalWords } from "@/app/lib/utils";

interface MoveListProps {
  moves: PokemonMove[];
}

const MoveList: React.FC<MoveListProps> = ({ moves }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Moves</h2>
      <ul className="space-y-2">
        {isExpanded
          ? moves.map((move, index) => (
              <li
                key={index}
                className="bg-gray-700 px-4 py-2 rounded-full inline-block"
              >
                {toNormalWords(move.move.name)}
              </li>
            ))
          : moves.slice(0, 25).map((move, index) => (
              <li
                key={index}
                className="bg-gray-700 px-4 py-2 rounded-full inline-block"
              >
                {toNormalWords(move.move.name)}
              </li>
            ))}
      </ul>
      {moves.length > 20 && (
        <button
          onClick={toggleExpanded}
          className="mt-4 text-blue-500 hover:text-blue-700 transition duration-200"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default MoveList;
