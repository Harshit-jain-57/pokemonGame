import React from "react";
import speaker from "/images/sound.png";
import mute from "/images/mute.png";

function SoundToggle({ sound, setSound, hasInteracted, setHasInteracted }) {
  const handleClick = () => {
    if (!hasInteracted) setHasInteracted(true);
    setSound(!sound);
  };

  return (
    <img
      className="soundBar"
      src={sound ? speaker : mute}
      alt="sound-toggle"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
}

export default SoundToggle;
