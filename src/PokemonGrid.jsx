import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonGrid({ belt, startBattle, getTypeColor }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {belt.map((pokemon, index) => (
        <PokemonCard
          key={index}
          pokemon={pokemon}
          startBattle={startBattle}
          getTypeColor={getTypeColor}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
