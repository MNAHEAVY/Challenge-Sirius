import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getPokeByIdAction, getPokeEvoAction } from "../redux/actions";

const Evolution = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const evolutionData = useSelector((state) => state.pokemones.evolution);
  const [evoDetails, setEvoDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pokemon = useSelector((state) => state.pokemones.pokemon);

  const collectEvolutionNames = (evolution) => {
    const names = [];
    let currentEvolution = evolution;
    while (currentEvolution) {
      if (currentEvolution.species) {
        names.push(currentEvolution.species.name);
      }
      if (currentEvolution.evolves_to && currentEvolution.evolves_to.length > 0) {
        currentEvolution = currentEvolution.evolves_to[0];
      } else {
        currentEvolution = null;
      }
    }
    return names;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getPokeEvoAction(id)),
          dispatch(getPokeByIdAction(id)),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar datos de evolución:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (evolutionData) {
      const evolutionNames = collectEvolutionNames(evolutionData.chain);
      if (evolutionNames.length > 0) {
        Promise.all(
          evolutionNames.map((name) =>
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`).then((response) =>
              response.json()
            )
          )
        )
          .then((evoData) => {
            setEvoDetails(evoData);
          })
          .catch((error) => {
            console.error("Error al cargar detalles de evolución:", error);
          });
      }
    }
  }, [evolutionData]);

  return (
    <div>
      {isLoading ? (
        <div className='loading'>
          <Loader />
        </div>
      ) : evoDetails.length > 0 ? (
        <div>
          <div
            style={{
              margin: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <h1>Evolution chain of {pokemon?.name}</h1>
          </div>
          <div
            style={{
              margin: "3rem",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {evoDetails.map((evoData) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: " 10rem",
                  height: " 10rem",
                }}
                key={evoData.name}
              >
                <h2>{evoData.name}</h2>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evoData.id}.svg`}
                  alt=''
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Evolution;
