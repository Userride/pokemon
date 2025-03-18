import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Fetch details for each Pokemon to get the images
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            return {
              id: detailData.id,
              name: detailData.name,
              image: detailData.sprites.front_default,
              types: detailData.types.map(type => type.type.name)
            };
          })
        );
        
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPokemons(filtered);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon App</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <PokemonList pokemons={filteredPokemons} />
      </main>
    </div>
  );
}

export default App;
