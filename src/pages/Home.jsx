import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemonsAction, searchedPokemons } from "../redux/actions";
import Grid from "@mui/material/Grid";
import CardPoke from "../components/Card";
import asset from "../assets/logoapp.png";
import "../styles/Home.css";
import Filters from "../components/Filters";
import { Box, Tooltip } from "@mui/material";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemones.pokemons);
  const searchedPokes = useSelector((state) => state.pokemones.searched);
  const totalPokes = useSelector((state) => state.pokemones.total);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 9;
  const offset = (currentPage - 1) * pokemonsPerPage;
  const [isLoading, setIsLoading] = useState(true);
  const [searchPokemons, setSearchPokemons] = useState(false);

  useEffect(() => {
    dispatch(getAllPokemonsAction(pokemonsPerPage, offset))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dispatch, offset]);

  const filterPokemons = (searchTerm) => {
    dispatch(searchedPokemons(searchTerm));
    setSearchPokemons(true);
  };

  return (
    <>
      {isLoading ? (
        <div className='loading'>
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ width: "auto", height: "180px", padding: "3rem" }}>
            <Link to='/'>
              <img className='img-logo' src={asset} alt='logo pikapikapp' />
            </Link>
            <SearchBar onSearch={filterPokemons} />
            {searchPokemons ? (
              <span
                style={{
                  position: "absolute",
                  top: "10rem",
                  right: "20rem",
                  color: "#fff57d",
                }}
              >
                Search results: {searchedPokes.length}
                <Tooltip title='Close search'>
                  <button
                    style={{
                      marginLeft: "1rem",
                      background: "none",
                      color: "burlywood",
                      borderRadius: "50%",
                    }}
                    onClick={() => setSearchPokemons(false)}
                  >
                    X
                  </button>
                </Tooltip>
              </span>
            ) : null}
          </div>
          <Filters />
          <Box className='scrollable-container'>
            <Grid container rowSpacing={16} columnSpacing={1}>
              {searchPokemons
                ? searchedPokes.map((pokemon, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <CardPoke pokemon={pokemon} key={pokemon.id} />
                    </Grid>
                  ))
                : pokemons.map((pokemon, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <CardPoke pokemon={pokemon} key={pokemon.id} />
                    </Grid>
                  ))}
            </Grid>
          </Box>
          <Pagination
            currentPage={currentPage}
            pokemonsPerPage={pokemonsPerPage}
            totalPokes={searchPokemons ? searchedPokes.length : totalPokes}
            paginate={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default Home;
