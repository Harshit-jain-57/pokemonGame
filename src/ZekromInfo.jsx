import React, { useState, useEffect } from "react";

const addZekrom = ({pokemonList}) => {
    [...pokemonList,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png"];
    useEffect(() => {
        const fetchZekrom = async () => {
            try {
                const response= await fetch("https://pokeapi.co/api/v2/pokemon/Zekrom")
                const data = await response.json();
                const move1 =data.move[7]
            } catch (error) {
                console.error("Error fetching Zekrom", error);
                setLoading(false);
            }
        };

export default addZekrom;
