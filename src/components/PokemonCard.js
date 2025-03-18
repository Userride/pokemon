import React from 'react';
import '../styles/PokemonCard.css';

function PokemonCard({ pokemon }) {
  const { id, name, image, types } = pokemon;

  return (
    <div className="pokemon-card">
      <div className="pokemon-image">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-info">
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <p>#{id}</p>
        <div className="pokemon-types">
          {types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard; 