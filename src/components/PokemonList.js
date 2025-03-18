import React from 'react';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

function PokemonList({ pokemons }) {
  if (pokemons.length === 0) {
    return <div className="no-results">No Pokémon found. Try a different search.</div>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList; 