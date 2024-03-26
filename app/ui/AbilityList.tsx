// AbilityList.tsx
import React from "react";
import { PokemonAbility } from "@/app/lib/features/pokemon/types";
import { toNormalWords } from "@/app/lib/utils";

interface AbilityListProps {
  abilities: PokemonAbility[];
}

const AbilityList: React.FC<AbilityListProps> = ({ abilities }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4">Abilities</h2>
      <ul className="space-y-2">
        {abilities.map((ability, index) => (
          <li
            key={index}
            className="ability-tag px-4 py-2 rounded-full inline-block"
          >
            {toNormalWords(ability.ability.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AbilityList;
