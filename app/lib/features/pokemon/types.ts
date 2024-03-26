export type Pokemon = {} | any;

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface Ability {
  name: string;
  url: string;
}

export interface Move {
  move: Ability;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: Ability;
    version_group: Ability;
  }[];
}

// types.ts
export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

// types.ts
export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default: string;
  back_shiny: string;
  back_female?: string;
  back_shiny_female?: string;
  // Add other sprite URLs as needed
}
export interface PokemonCries {
  latest: string; // URL to the latest cry
  legacy: string; // URL to the legacy cry
  // Add other types of cries as needed
}

export interface PokemonData {
  abilities: {
    ability: Ability;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: Ability;
  }[];
  height: number;
  held_items: any[]; // Replace 'any' with appropriate type if available
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[]; // Replace 'any' with appropriate type if available
  past_types: any[]; // Replace 'any' with appropriate type if available
  species: Ability;
  sprites: {
    back_default: string;
    back_female?: string;
    back_shiny: string;
    back_shiny_female?: string;
    front_default: string;
    front_female?: string;
    front_shiny: string;
    front_shiny_female?: string;
    other: {
      dream_world: {
        front_default: string;
        front_female?: string;
      };
      home: {
        front_default: string;
        front_female?: string;
        front_shiny: string;
        front_shiny_female?: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female?: string;
        back_shiny: string;
        back_shiny_female?: string;
        front_default: string;
        front_female?: string;
        front_shiny: string;
        front_shiny_female?: string;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      // Add other generations here
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: Ability;
  }[];
  types: {
    slot: number;
    type: Ability;
  }[];
  weight: number;
}
