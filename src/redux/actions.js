import axios from "axios";

import { getAllPokemons, setTotalpokes } from "./reducer";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getAllPokemonsAction = (limit, offset) => {
  console.log(limit, offset);
  return async (dispatch) => {
    try {
      const pokemons = await axios(
        `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      const pokemonData = pokemons.data.results;
      const totalPokes = pokemons.data.count;

      const detailedPokemons = [];

      for (const pokemon of pokemonData) {
        const detailedPokemon = await axios(pokemon.url);
        detailedPokemons.push(detailedPokemon.data);
      }

      dispatch(getAllPokemons(detailedPokemons));
      dispatch(setTotalpokes(totalPokes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
