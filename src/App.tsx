import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokedexEntry, setPokedexEntry] = useState<string>('Loading...');
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonImage, setPokemonImage] = useState<string>('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${randomId}`
        );
        const speciesData = await speciesResponse.json();
        const capitalizedName =
          speciesData.name.charAt(0).toUpperCase() + speciesData.name.slice(1);
        setPokemonName(capitalizedName);
        setPokedexEntry(
          speciesData.flavor_text_entries
            .find((entry: any) => entry.language.name === 'en')
            .flavor_text.replace(/\s+/g, ' ')
        );

        // Fetch Pokémon image
        const imageResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const imageData = await imageResponse.json();
        setPokemonImage(imageData.sprites.front_default);
      } catch (error) {
        setPokemonName('Unknown');
        setPokedexEntry('Failed to load Pokedex entry.');
        setPokemonImage('');
      }
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      <h1>
        Fun fact about: <strong>{pokemonName}!</strong>
      </h1>
      <h2>{pokedexEntry}</h2>
      {pokemonImage && (
        <img
          src={pokemonImage}
          alt={pokemonName}
          style={{ width: '300px', height: '300px' }}
        />
      )}
    </>
  );
}

export default App;
