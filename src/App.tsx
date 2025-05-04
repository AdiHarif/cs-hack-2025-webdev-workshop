import { useEffect, useState } from 'react';
import './App.css';
import { getEnglishFlavorText } from './utils';

function App() {
  const [pokemon, setPokemon] = useState({
    name: '',
    entry: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true); // Start loading and clear previous data
      setPokemon({ name: '', entry: '', image: '' });
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

        setPokemon({
          name:
            speciesData.name.charAt(0).toUpperCase() +
            speciesData.name.slice(1),
          entry: getEnglishFlavorText(speciesData.flavor_text_entries),
          image: imageData.sprites.front_default,
        });
      } catch {
        setPokemon({
          name: 'Unknown',
          entry: 'Failed to load Pokedex entry.',
          image: '',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>
            Fun fact about: <strong>{pokemon.name}!</strong>
          </h1>
          <h2>{pokemon.entry}</h2>
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{ width: '300px', height: '300px' }}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
