import axios from "axios";

import {
  getAllPokemons,
  setTotalpokes,
  getPokeById,
  getPokeEvo,
  setSearchedPokemons,
  setFilteredPokemons,
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

      const detailedPokemons = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const detailedPokemon = await axios(pokemon.url);
          return detailedPokemon.data;
        })
      );

      dispatch(getAllPokemons(detailedPokemons));
      dispatch(setTotalpokes(totalPokes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const searchedPokemons = (searchTerm) => {
  return async (dispatch) => {
    const allPokemons = await axios(`${API_BASE_URL}/pokemon?limit=1300&offset=0}`);

    const filteredPokemons = allPokemons.data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pokemons = await Promise.all(
      filteredPokemons.map(async (pokemon) => {
        const pokemons = await axios(pokemon.url);
        return pokemons.data;
      })
    );

    dispatch(setSearchedPokemons(pokemons));
  };
};

export const filteredPokemons = (filterTerm) => {
  console.log(filterTerm);
  return async (dispatch) => {
    const allPokemonsResponse = await axios(
      `${API_BASE_URL}/pokemon?limit=1300&offset=0}`
    );
    const allPokemons = allPokemonsResponse.data.results;

    if (allPokemons) {
      const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(filterTerm)
      );

      const pokemons = await Promise.all(
        filteredPokemons.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios(pokemon.url);
          return pokemonDetailsResponse.data;
        })
      );

      dispatch(setFilteredPokemons(pokemons));
    } else {
      // Manejo de errores o notificación en caso de que la respuesta sea undefined
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
