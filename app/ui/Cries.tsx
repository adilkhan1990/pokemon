// Cries.tsx
import React from "react";
import { PokemonCries } from "@/app/lib/features/pokemon/types";

interface CriesProps {
  cries: PokemonCries;
}

const Cries: React.FC<CriesProps> = ({ cries }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-4 text-white">Cries</h2>
      <div className="space-y-4">
        <audio controls className="mb-4">
          <source src={cries.latest} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio controls className="mb-4">
          <source src={cries.legacy} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Cries;
