"use client";
import { toNormalWords } from "@/app/lib/utils";
import { useGetPokemonByNameQuery } from "@/app/lib/features/pokemon/pokemonSlice";
import { usePathname } from "next/navigation";
import { PokemonData } from "@/app/lib/features/pokemon/types";
import * as React from "react";
import AbilityList from "@/app/ui/AbilityList";
import MoveList from "@/app/ui/MoveList";
import StatOverview from "@/app/ui/StatOverview";
import Sprites from "@/app/ui/Sprites";
import Cries from "@/app/ui/Cries";
import { Search } from "@/app/ui/Search";
import Hero from "@/app/ui/Hero";

// Define a function to check if a URL is an image URL

export default function Page() {
  const pathname = usePathname();
  const pokemon: PokemonData = useGetPokemonByNameQuery(
    pathname.split("/")[1],
  ).data;

  if (!pokemon || Object.keys(pokemon).length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <>
      <Search isSearch={false} />
      <div className="min-h-screen bg-gray-900 text-white">
        <Hero
          id={pokemon.id}
          image={pokemon.sprites?.other.dream_world.front_default}
          title={toNormalWords(pokemon.name)}
          description={`Standing at a height of ${pokemon.height} meters and weighing ${pokemon.weight} kilograms, this Pokémon boasts a base experience of ${pokemon.base_experience}. Originating from the ${toNormalWords(pokemon.species.name)} species, it holds a unique charm.`}
        />
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          {/* Abilities Section */}
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <AbilityList abilities={pokemon.abilities} />
              <Cries cries={pokemon.cries} />
            </div>

            {/* Stats Overview */}
            <StatOverview stats={pokemon.stats} />
          </div>
          {/* Moves Gallery */}
          <MoveList moves={pokemon.moves} />
          <Sprites sprites={pokemon.sprites} />
        </div>
      </div>
    </>
  );
}
