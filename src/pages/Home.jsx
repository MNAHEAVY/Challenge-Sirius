import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemonsAction } from "../redux/actions";
import Grid from "@mui/material/Grid";
import CardPoke from "../components/Card";
import asset from "../assets/LogoApp.png";
import "../styles/Home.css";
import Filters from "../components/Filters";
import { Box } from "@mui/material";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemones.pokemons);
  const totalPokes = useSelector((state) => state.pokemones.total);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 9; // Número de pokemons por página
  const offset = (currentPage - 1) * pokemonsPerPage;
  console.log(pokemons[0]);
  useEffect(() => {
    dispatch(getAllPokemonsAction(pokemonsPerPage, offset));
  }, [dispatch, offset]);

  // const totalPages = Math.ceil(totalPokes / pokemonsPerPage);

  // const paginate = (pageNumber) => {
  //   if (pageNumber >= 1 && pageNumber <= totalPages) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  return (
    <>
      <div style={{ width: "auto", height: "180px", padding: "3rem" }}>
        <img className='img-logo' src={asset} alt='logo pikapikapp' />
      </div>
      <Filters />
      <Box className='scrollable-container'>
        <Grid container rowSpacing={16} columnSpacing={1}>
          {pokemons?.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardPoke pokemon={pokemon} key={pokemon.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        currentPage={currentPage}
        pokemonsPerPage={pokemonsPerPage}
        totalPokes={totalPokes}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default Home;
