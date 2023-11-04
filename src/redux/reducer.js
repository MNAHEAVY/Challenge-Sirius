import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  filtered: [],
  searched: [],
  pokemon: {},
  evolution: {},
  total: 0,
};

const pokeSlice = createSlice({
  name: "pokemones",
  initialState,
  reducers: {
    getAllPokemons(state, action) {
      state.pokemons = action.payload;
    },
    setSearchedPokemons(state, action) {
      state.searched = action.payload;
    },
    setFilteredPokemons(state, action) {
      state.filtered = action.payload;
    },
    setTotalpokes(state, action) {
      state.total = action.payload;
    },
    getPokeById(state, action) {
      state.pokemon = action.payload;
    },
    getPokeEvo(state, action) {
      state.evolution = action.payload;
    },
  },
});

export const {
  getAllPokemons,
  setSearchedPokemons,
  setTotalpokes,
  getPokeById,
  getPokeEvo,
  getGlobalPokemons,
  setFilteredPokemons,
} = pokeSlice.actions;
export default pokeSlice.reducer;
