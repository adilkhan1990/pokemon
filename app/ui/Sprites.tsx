// Sprites.tsx
import React from "react";
import { PokemonSprites } from "@/app/lib/features/pokemon/types";
import { extractImageUrls } from "@/app/lib/utils";
import Image from "next/image";

interface SpritesProps {
  sprites: PokemonSprites;
}

const Sprites: React.FC<SpritesProps> = ({ sprites }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6">Sprites</h2>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {extractImageUrls(sprites).map((sprite, index) => (
          <div
            key={index}
            className="slider-thumb w-48 h-48 rounded-lg flex-none relative"
          >
            <Image
              src={sprite}
              alt={`Pokemon Sprite ${index + 1}`}
              layout="fill" // This makes the image cover the div, adjust as necessary
              objectFit="contain" // Adjust according to your needs
              unoptimized={true} // Set to false if your images are compatible with Next.js optimization
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sprites;
