import { configureStore } from "@reduxjs/toolkit";
import pokeReducer from "./reducer";

const store = configureStore({
  reducer: {
    pokemones: pokeReducer,
  },
});

export default store;
