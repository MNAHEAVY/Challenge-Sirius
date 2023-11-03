import axios from "axios";

import {
  getAllPokemons,
  setTotalpokes,
  getPokeById,
  getPokeEvo,
  getGlobalPokemons,
} from "./reducer";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getAllPokemonsAction = (limit, offset) => {
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
export const getGlobalPokemonsAction = () => {
  return async (dispatch) => {
    try {
      const pokemons = await axios(`${API_BASE_URL}/pokemon?limit=1300&offset=0`);
      const pokemonData = pokemons.data.results;
      const detailedPokemons = [];
      for (const pokemon of pokemonData) {
        const detailedPokemon = await axios(pokemon.url);
        detailedPokemons.push(detailedPokemon.data);
      }
      dispatch(getGlobalPokemons(detailedPokemons));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const getPokeByIdAction = (pokeId) => {
  return async (dispatch) => {
    try {
      const pokemons = await axios(`${API_BASE_URL}/pokemon/${pokeId}`);
      dispatch(getPokeById(pokemons.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const getPokeEvoAction = (pokeId) => {
  return async (dispatch) => {
    try {
      const pokemons = await axios(`${API_BASE_URL}/pokemon-species/${pokeId}`);
      const evoData = await axios(pokemons.data.evolution_chain.url);
      dispatch(getPokeEvo(evoData.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
