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
      state.allpokemons = action.payload;
      state.pokemons = action.payload;
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

export const { getAllPokemons, setTotalpokes, getPokeById, getPokeEvo } =
  pokeSlice.actions;
export default pokeSlice.reducer;
