import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pokemon } from "@/app/lib/features/pokemon/types";
import { setSearchData } from "@/app/lib/features/pokemon/pokemonSlice";
import { useAppDispatch } from "@/app/lib/hooks";

interface AutocompleteSearchProps {
  pokemons: Pokemon[];
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  pokemons,
}) => {
  const [input, setInput] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const filterPokemons = useCallback(() => {
    if (input.length > 1) {
      const filtered = pokemons.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase()),
      );
      dispatch(
        setSearchData({
          data: filtered.length > 0 ? filtered : null,
          isSearch: filtered.length > 0,
        }),
      );
    } else {
      dispatch(
        setSearchData({
          data: null,
          isSearch: false,
        }),
      );
    }
  }, [input, pokemons, dispatch]);

  useEffect(() => {
    const delayDebounce = setTimeout(filterPokemons, 300); // 300ms debounce time
    return () => clearTimeout(delayDebounce);
  }, [input, filterPokemons]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Pokémon..."
        style={{width: '100%'}}
        className="px-4 py-2 w-full rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AutocompleteSearch;
