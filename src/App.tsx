import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokedexEntry, setPokedexEntry] = useState<string>('Loading...')
  const [pokemonName, setPokemonName] = useState<string>('')
  const [pokemonImage, setPokemonImage] = useState<string>('')

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`)
      .then((response) => response.json())
      .then((data) => {
        const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.slice(1)
        setPokemonName(capitalizedName)
        setPokedexEntry(
          data.flavor_text_entries
            .find((entry: any) => entry.language.name === 'en')
            .flavor_text.replace(/\s+/g, ' ')
        )

        // Fetch Pokémon image
        return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      })
      .then((response) => response.json())
      .then((data) => {
        setPokemonImage(data.sprites.front_default)
      })
      .catch(() => {
        setPokemonName('Unknown')
        setPokedexEntry('Failed to load Pokedex entry.')
        setPokemonImage('')
      })
  }, [])

  return (
    <>
      <h1>Fun fact about: <strong>{pokemonName}!</strong></h1>
      <h2>{pokedexEntry}</h2>
      {pokemonImage && <img src={pokemonImage} alt={pokemonName} style={{ width: '300px', height: '300px' }} />}
    </>
  )
}

export default App
