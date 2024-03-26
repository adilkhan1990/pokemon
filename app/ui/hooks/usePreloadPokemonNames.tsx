"use client";
import { useState, useEffect } from "react";
import { useGetPokemonListQuery } from "@/app/lib/features/pokemon/pokemonSlice";
import { Pokemon } from "@/app/lib/features/pokemon/types";

export const usePreloadPokemonNames = (): string[] => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const { data, error, isLoading } = useGetPokemonListQuery({
    limit: 5000,
    offset: 0,
  }); // Adjust the limit as needed

  useEffect(() => {
    if (data && !isLoading && !error) {
      const pokemons = data.results;
      setPokemons(pokemons);
    }
  }, [data, isLoading, error]);

  return pokemons;
};
