import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  allpokemons: [],
  users: [],
  allUsers: [],
  prodById: {},
  filteredpokemons: [],
};

const pokeSlice = createSlice({
  name: "pokemones",
  initialState,
  reducers: {
    getFavsItems(state, action) {
      state.favorites = action.payload;
    },
    // Mantén los elementos existentes en el carrito y agrega uno nuevo
    addToFavorites(state, action) {
      const newFav = action.payload;
      state.favorites = [...state.favorites, newFav];
    },

    // Elimina el artículo con el ID correspondiente del carrito
    deleteFavsItem(state, action) {
      const itemId = action.payload;
      state.favorites = state.favorites.filter((item) => item._id !== itemId);
    },

    getCartItems(state, action) {
      state.cart = action.payload;
    },
    // Mantén los elementos existentes en el carrito y agrega uno nuevo
    addToCart(state, action) {
      const newItem = action.payload;
      state.cart = [...state.cart, newItem];
    },

    // Elimina el artículo con el ID correspondiente del carrito
    deleteCartItem(state, action) {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemId);
    },

    getAllProducts(state, action) {
      state.allProducts = action.payload;
      const products = action.payload.slice(); // Clonar el array para no modificar el original
      products.sort((a, b) => b.precioBase - a.precioBase); // Ordenar por precio de menor a mayor
      state.products = products;
    },
  },
});

export const { increment, decrement } = pokeSlice.actions;
export default pokeSlice.reducer;
