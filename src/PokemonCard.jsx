import React, { useRef, useState } from "react";

function PokemonCard({ pokemon, startBattle, getTypeColor }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  function mouseEnter() {
    setIsHovered(true);
    videoRef.current && videoRef.current.play();
  }
  function mouseLeave() {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }
  return (
    <div style={{ margin: "10px", textAlign: "center" }}>
      <h3 style={{ color: "black" }}>{pokemon.id.toUpperCase()}</h3>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        style={{
          width: "475px",
          height: "500px",
          borderRadius: "50px",
          overflow: "hidden",
        }}
      >
        {isHovered ? (
          <video
            ref={videoRef}
            src={pokemon.video}
            height="475px"
            loop
            playsInline
            style={{
              borderRadius: "50px",
              objectFit: "cover",
              objectPosition: "center center",
              width: "500px",
              transition: "opacity 0.5s ease-in-out",
              opacity: isHovered ? 1 : 0,
            }}
          />
        ) : (
          <img
            src={pokemon.image}
            alt={pokemon.id}
            style={{
              width: "500px",
              height: "475px",
              transition: "0.3s ease-in-out",
              borderRadius: "50px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      <div>
        {pokemon.types.map((type) => (
          <button
            key={type}
            style={{
              background: getTypeColor(type),
              color: "black",
              margin: "10px",
              border: "none",
              padding: "10px 20px",
              borderRadius: "15px",
              fontSize: "16px",
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        onClick={() => startBattle(pokemon)}
        style={{
          background: "red",
          padding: "10px 30px",
          margin: "10px 20px",
          borderRadius: "10px",
          fontFamily: "Myfonts",
        }}
      >
        CHOOSE FOR BATTLE
      </button>
    </div>
  );
}

export default PokemonCard;
