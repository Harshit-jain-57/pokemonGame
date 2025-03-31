import { useState, useEffect, useRef } from "react";
import music from "/sound/pokemonDisplay.mp3";
import BattleArea from "./BattleArea";
import SoundToggle from "./SoundToggle";
import PokemonGrid from "./PokemonGrid";
import "./index.css";

function App() {
  const [belt, setBelt] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [battleMode, setBattleMode] = useState(null);
  const [sound, setSound] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const loopStart = 5;
  const loopEnd = 37;

  const pokemons = [644, 484, 483, 643, 384, 383, 382, 645, 493, 9, 10034, 3];

  // Audio Setup with partial loop
  useEffect(() => {
    const audio = new Audio(music);
    audio.loop = false;
    audio.currentTime = loopStart;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= loopEnd) {
        audio.currentTime = loopStart;
        audio.play();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.play()
      .then(() => setSound(true))
      .catch(() => console.log("Autoplay blocked. Waiting for user interaction."));

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (sound) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [sound]);

  // Fetch Pokémon data
  useEffect(() => {
    async function fetchPokemons() {
      const promises = pokemons.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        return {
          id: data.name,
          types: data.types.map((t) => t.type.name),
          hp: Math.floor(Math.random() * 100) + 100,
          image: data.sprites.other["official-artwork"].front_default,
          moves: data.moves.slice(0, 5).map((m) => m.move.name),
          video: `/videos/${data.name}.mp4`
        };
      });

      const pokemonData = await Promise.all(promises);
      setBelt(pokemonData);
    }

    fetchPokemons();
  }, []);

  const startBattle = (pokemon) => {
    setSelectedPokemon(pokemon);
    const randomOpponent = belt[Math.floor(Math.random() * belt.length)];
    setOpponent(randomOpponent);
    setBattleMode(true);
  };

  const getTypeColor = (type) => {
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
    return types[type] || "white";
  };

  if (battleMode && selectedPokemon && opponent) {
    return <BattleArea player={selectedPokemon} opponent={opponent} />;
  }

  return (
    <>
      <SoundToggle
        sound={sound}
        setSound={setSound}
        hasInteracted={hasInteracted}
        setHasInteracted={setHasInteracted}
      />
      <PokemonGrid
        belt={belt}
        startBattle={startBattle}
        getTypeColor={getTypeColor}
      />
    </>
  );
}

export default App;
