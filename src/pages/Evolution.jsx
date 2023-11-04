import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getPokeByIdAction, getPokeEvoAction } from "../redux/actions";
import BackButton from "../components/Back";
import asset from "../assets/arrows.png";
import "../styles/Evolution.css";
import { FirstMayus } from "../helpers/FirstMayus";

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
  console.log(evoDetails);
  return (
    <div>
      {isLoading ? (
        <div className='loading'>
          <Loader />
        </div>
      ) : evoDetails.length > 0 ? (
        <div>
          <div className='evo-header'>
            <h1>Evolution chain of {pokemon?.name}</h1>
          </div>
          <BackButton />
          <div className='evo-contain'>
            {evoDetails.map((evoData) => (
              <div className='evo-card' key={evoData.name}>
                <h2
                  style={{
                    fontSize: "2rem",
                    color: "white",
                  }}
                >
                  {FirstMayus(evoData.name)}
                </h2>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evoData.id}.svg`}
                  alt=''
                />
              </div>
            ))}
          </div>{" "}
          <img className='arrow-a' src={asset} alt='' />
          <img className='arrow-b' src={asset} alt='' />
        </div>
      ) : null}
    </div>
  );
};

export default Evolution;
