import { cache, useCallback } from "react";

export const fetchPokemonList = cache(async (limit = 10) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
  );

  const data = await response.json();
  return data.results;
});
export const fetchPokemon = cache(async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
});

/**
 * Calculates previous, current, and next indices in a circular list.
 * Assumes 1-based indexing for the currentIndex.
 * @param currentIndex The current index in the list (1-based).
 * @param totalIndices The total number of indices in the list. Defaults to 1000.
 * @returns An array of three numbers: [previousIndex, currentIndex, nextIndex]
 */
export const getIndices = (
  currentIndex: number,
  totalIndices: number = 1000,
): number[] =>
  [
    (currentIndex - 2 + totalIndices) % totalIndices,
    currentIndex - 1,
    currentIndex % totalIndices,
  ].map((index) => (index + 1) % totalIndices);

export const toCamelCase = (obj: any): any => {
  const camelCaseKey = (key: string): string => {
    return key.replace(/([-_][a-zA-Z])/g, (match) =>
      match.toUpperCase().replace(/[-_]/, ""),
    );
  };

  const convertKeys = (data: any): any => {
    if (typeof data !== "object" || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(convertKeys);
    }

    const camelCasedObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = camelCaseKey(key);
      camelCasedObj[camelKey] = convertKeys(value);
    }
    return camelCasedObj;
  };

  return convertKeys(obj);
};

export const toNormalWords = (str: string): string => {
  return str
    ?.split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getImage = (idx: string | number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx}.svg`;
};

export const getIdByUrl = (url: string): string => url.split("/").reverse()[1];

function isImageUrl(url: string): boolean {
  const imageExtensions: string[] = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];
  return (
    typeof url === "string" &&
    imageExtensions.some((extension) => url.toLowerCase().endsWith(extension))
  );
}

export function extractImageUrls(
  data: any,
  imageUrls: string[] = [],
): string[] {
  if (Array.isArray(data)) {
    // If the current data structure is an array, iterate through its items
    data.forEach((item) => extractImageUrls(item, imageUrls));
  } else if (typeof data === "object" && data !== null) {
    // If the current data structure is an object, iterate through its values
    Object.values(data).forEach((value: any) => {
      if (isImageUrl(value)) {
        // If the value is a URL pointing to an image, add it to the list
        imageUrls.push(value);
      } else if (typeof value === "object") {
        // If the value is another object or array, recurse through it
        extractImageUrls(value, imageUrls);
      }
    });
  }
  // Base case: if it's neither an array nor an object, do nothing
  return imageUrls;
}
