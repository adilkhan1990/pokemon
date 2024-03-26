"use client";
import React, { FC } from "react";
import { usePreloadPokemonNames } from "@/app/ui/hooks/usePreloadPokemonNames";
import AutocompleteSearch from "@/app/ui/AutocompleteSearch";
import Link from "next/link";
import Image from "next/image";

interface Props {
  isSearch: boolean;
}
export const Search: FC<Props> = ({ isSearch }) => {
  const pokemons = usePreloadPokemonNames();
  return (
    <header className="bg-gray-800 p-4 fl">
      <div className="container md:w-1/2 sm:w-full mx-auto flex items-center flex-col justify-between">
        <div className="m-5">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={200} height={200} />
          </Link>
        </div>
        {isSearch && <AutocompleteSearch pokemons={pokemons} />}
      </div>
    </header>
  );
};
