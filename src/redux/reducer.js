import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  allpokemons: [],
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
  },
});

export const { getAllPokemons, setTotalpokes } = pokeSlice.actions;
export default pokeSlice.reducer;
