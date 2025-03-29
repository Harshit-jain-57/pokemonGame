import { useState, useEffect } from "react";
// import zekrom from "../public/gifs/zekrom.gif"
import BattleArea from "./BattleArea";
import "./index.css"
function App() {
  const [belt, setBelt] = useState([]);
  const [selectedPokemon,setSelectedPokemon]=useState(null);
  const [opponent,setOpponent]=useState(null);
  const [battleMode,setBattleMode]=useState(null)
  const pokemons = [644, 484, 483,643,384,383,382,645,493,9,10034,3];

  function pokemonType(type) {
    const types = {
      grass: "green",
      fire: "#ff5a00",
      water: "blue",
      electric: "#ffff33",
      fighting: "brown",
      ground: "sienna",
      flying: "skyblue",
      steel: "slategray",
      dragon: "darkblue",
      normal: "lightgray",
      poison: "violet",
    };
    return types[type];
  }

  useEffect(() => {
    async function fetchPokemons() {
      const promises = pokemons.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();

        return {
          id: data.name,
          types: data.types.map((t) => t.type.name),
          hp: Math.floor(Math.random()*100)+100,
          image: data.sprites.other["official-artwork"].front_default,
          moves: data.moves.slice(0, 5).map((m) => m.move.name),
          gif:`/gifs/${data.name}.gif`
        };
      });

      const pokemonData = await Promise.all(promises);
      setBelt(pokemonData);
    }

    fetchPokemons();
  }, []);
  function startBattle(pokemon){
    setSelectedPokemon(pokemon)
    const randomOpponent=belt[Math.floor(Math.random()* belt.length)]
    setOpponent(randomOpponent)
    setBattleMode(true)
  }
  if (battleMode && selectedPokemon && opponent) {
    return (<BattleArea player={selectedPokemon} opponent={opponent}/>)
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {belt.map((pokemon, index) => (
        <div key={index} style={{ margin: "10px", textAlign: "center" }}>
          <h3 className="poke-name">{pokemon.id.toUpperCase()}</h3>
          <img src={pokemon.image} 
          alt={pokemon.id}
          onMouseEnter={(e)=>e.target.src=pokemon.gif}
          onMouseLeave={(e)=>e.target.src=pokemon.image}
          onError={(e) => e.target.src = pokemon.image} // Fallback if GIF doesn't exist
          style={{transition:"0.3s ease-in-out",width:"475px",height:"500px",borderRadius:"50px"}}/>
          <div>
            {pokemon.types.map((type) => (
              <button key={type} style={{ 
                background: pokemonType(type), 
                color: "black", 
                margin: "10px", 
                padding: "10px 20px", 
                borderRadius: "5px",
                fontSize:"16px"
              }}>
                {type.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={()=>{startBattle(pokemon)}} style={{background:"red",padding:"10px 30px",margin:"10px 20px",borderRadius:"10px",fontFamily:"Myfonts"}}>CHOOSE FOR BATTLE</button>
        </div>
      ))}
    </div>
  );
}

export default App;
