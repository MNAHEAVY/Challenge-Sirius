import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  allpokemons: [],
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
    getGlobalPokemons(state, action) {
      state.allpokemons = action.payload;
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
  setTotalpokes,
  getPokeById,
  getPokeEvo,
  getGlobalPokemons,
} = pokeSlice.actions;
export default pokeSlice.reducer;
