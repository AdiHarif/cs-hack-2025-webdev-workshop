// API utility for fetching Pokémon data from PokeAPI
// Returns a Pokémon object with name, entry, and image
import { getEnglishFlavorText } from './utils';

export async function fetchPokemonData(): Promise<{
  name: string;
  entry: string;
  image: string;
}> {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
    );
    const speciesData = await speciesResponse.json();
    const imageResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const imageData = await imageResponse.json();

    return {
      name:
        speciesData.name.charAt(0).toUpperCase() + speciesData.name.slice(1),
      entry: getEnglishFlavorText(speciesData.flavor_text_entries),
      image: imageData.sprites.front_default,
    };
  } catch {
    // Throw error to be handled by the caller
    throw new Error('Failed to fetch Pokémon data');
  }
}
