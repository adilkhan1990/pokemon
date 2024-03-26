"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetPokemonListQuery } from "@/app/lib/features/pokemon/pokemonSlice";
import { useAppSelector } from "@/app/lib/hooks";
import { getIdByUrl, getImage } from "@/app/lib/utils";

const imageStyle = {
  height: "230px",
  // maxHeight: "300px",
};

export const CardList: FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { data, error, isLoading } = useGetPokemonListQuery({
    limit,
    offset: (page - 1) * limit,
  });
  const pokemonSliceReducer = useAppSelector(
    (state) => state?.["pokemonSliceReducer"],
  );

  const { searchData, isSearch } = pokemonSliceReducer;

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever search data changes
  }, [searchData]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  const pokemons = isSearch ? searchData : data.results;

  // Calculate total number of pages
  const totalPages = Math.ceil(
    (isSearch ? searchData.length : data.count) / limit,
  );
  const renderPagination = totalPages > 1;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
      <h2 className="sr-only">List of Pokémon</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((pokemon: any, idx: number) => (
          <Link
            key={pokemon.name}
            href={`/${getIdByUrl(pokemon.url)}`}
            className="group rounded-lg flex flex-col justify-between overflow-hidden bg-gray-200 hover:opacity-75"
          >
            <div className="flex justify-center items-center h-full p-2 aspect-w-1 aspect-h-1">
              <Image
                src={getImage(getIdByUrl(pokemon.url))}
                alt={pokemon.name}
                width={200}
                height={200}
                quality={1}
                className="rounded-t-sm"
                priority
                style={imageStyle}
              />
            </div>
            <div className="flex justify-between p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {pokemon.name}
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                #{getIdByUrl(pokemon.url)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {renderPagination && (
        <div className="flex justify-center mt-4">
          <div>
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
