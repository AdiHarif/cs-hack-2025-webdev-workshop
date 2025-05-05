import React, { useEffect, useState } from 'react';
import './App.css';
import { getEnglishFlavorText } from './utils';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_KEY = 'adi-harif-is-the-man'!;

async function generateFakeEntry(
  pokemonName: string,
  types: string[],
  realEntry: string
): Promise<string> {
  // Give the LLM more context for better fake news generation
  const entryWithContext = `Pokémon: ${pokemonName}\nType: ${types.join(
    ', '
  )}\nReal Pokédex Entry: ${realEntry}\n\nTask: Write a funny, fake Pokédex entry for ${pokemonName}.`;
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a game engine. The game is a fake-news detection game. You will be given a Pokémon fact, and you will need to generate a fake version of the fact. Make it funny and interesting—2 sentences max.',
        },
        { role: 'user', content: entryWithContext },
      ],
    }),
  });
  const { choices } = await res.json();
  return choices[0].message.content.trim();
}

interface Pokemon {
  name: string;
  entry: string;
  image: string;
  types: string[];
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: '',
    entry: '',
    image: '',
    types: [],
  });
  const [isFake, setIsFake] = useState<boolean>(false);
  const [displayedEntry, setDisplayedEntry] = useState<string>('');
  const [userGuess, setUserGuess] = useState<'fake' | 'true' | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const loadRound = async () => {
    // reset state
    setUserGuess(null);
    setFeedback('');
    setDisplayedEntry('');
    setPokemon({ name: '', entry: '', image: '', types: [] });

    try {
      // 1. fetch a random Pokémon
      const id = Math.floor(Math.random() * 151) + 1;
      const spRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const spData = await spRes.json();
      const imgRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const imgData = await imgRes.json();

      const real = getEnglishFlavorText(spData.flavor_text_entries);
      const name = spData.name[0].toUpperCase() + spData.name.slice(1);
      const image = imgData.sprites.front_default;
      const types = imgData.types.map(
        (t: { slot: number; type: { name: string; url: string } }) =>
          t.type.name
      );

      setPokemon({ name, entry: real, image, types });

      // 2. generate the fake version
      const fake = await generateFakeEntry(name, types, real);

      // 3. pick which one to show
      // This is a true 50-50 coin flip
      const pickFake = Math.random() < 0.5;
      setIsFake(pickFake);
      setDisplayedEntry(pickFake ? fake : real);
    } catch (e) {
      console.error(e);
      setPokemon({
        name: 'Unknown',
        entry: 'Failed to load Pokedex entry.',
        image: '',
        types: [],
      });
      setDisplayedEntry('Failed to load game data.');
    }
  };

  useEffect(() => {
    loadRound();
  }, []);

  const handleGuess = (guess: 'fake' | 'true') => {
    setUserGuess(guess);
    const correct =
      (guess === 'fake' && isFake) || (guess === 'true' && !isFake);
    setFeedback(correct ? '🎉 Correct!' : '❌ Nope!');
  };

  return (
    <div className="App">
      <h1>
        Fun fact about: <strong>{pokemon.name}</strong>
      </h1>

      {/* show loading while entry is empty */}
      <h2>{displayedEntry || 'Loading…'}</h2>

      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: 300, height: 300 }}
        />
      )}

      {/* before guessing */}
      {!userGuess ? (
        <div style={{ marginTop: 20 }}>
          <button onClick={() => handleGuess('true')}>True</button>
          <button
            onClick={() => handleGuess('fake')}
            style={{ marginLeft: 10 }}
          >
            Fake
          </button>
        </div>
      ) : (
        /* after guessing */
        <div style={{ marginTop: 20 }}>
          <p>{feedback}</p>
          <button onClick={loadRound}>Next Pokémon</button>
        </div>
      )}
    </div>
  );
}

export default App;
