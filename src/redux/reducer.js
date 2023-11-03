import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  allpokemons: [],
  pokemon: {},
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
  },
});

export const { getAllPokemons, setTotalpokes, getPokeById } = pokeSlice.actions;
export default pokeSlice.reducer;
