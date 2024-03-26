import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon, PokemonListResponse } from "@/app/lib/features/pokemon/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    isSearch: false,
    searchData: null as Pokemon | null,
  },
  reducers: {
    setSearchData: (state, action: PayloadAction<Pokemon | null>) => {
      const { data, isSearch } = action.payload;
      state.searchData = data;
      state.isSearch = isSearch;
    },
  },
});

export const { setSearchData } = pokemonSlice.actions;

export const pokemonSliceReducer = pokemonSlice.reducer;
export const pokemonApiSlice = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_POKEMON_API_URL }),
  tagTypes: ["Pokemon", "PokemonList"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: "Pokemon", id: name }],
    }),
    getPokemonList: builder.query<
      PokemonListResponse | any,
      { limit: number; offset: number }
    >({
      query: ({ limit = 20, offset = 0 }) =>
        `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ name }: any) => ({
                type: "Pokemon",
                id: name,
              })),
              { type: "PokemonList", id: "LIST" },
            ]
          : [{ type: "PokemonList", id: "LIST" }],
      onQueryStarted: async (
        arg,
        { queryFulfilled, dispatch, getState, requestId, extra },
      ) => {
        try {
          const { data } = await queryFulfilled;
          if (data.results.length > 20) {
            dispatch(pokemonSlice.actions.setSearchData(data.results));
          }
        } catch (error) {
          console.error("Failed to fetch pokemon list: ", error);
        }
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } =
  pokemonApiSlice;
