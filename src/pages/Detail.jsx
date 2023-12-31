import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FirstMayus } from "../helpers/FirstMayus";
import { getPokeByIdAction } from "../redux/actions";
import Loader from "../components/Loader";
import "../styles/Detail.css";
import BackButton from "../components/Back";

const Detail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemones.pokemon);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [moveDetails, setMoveDetails] = useState([]);

  useEffect(() => {
    dispatch(getPokeByIdAction(id))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el Pokemon:", error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (pokemon && pokemon.moves) {
      const moveUrls = pokemon.moves.map((move) => move.move.url);

      // Realiza una solicitud para obtener detalles de cada movimiento
      Promise.all(
        moveUrls.map((moveUrl) => fetch(moveUrl).then((response) => response.json()))
      )
        .then((moveData) => {
          setMoveDetails(moveData);
        })
        .catch((error) => {
          console.error("Error al cargar detalles de movimientos:", error);
        });
    }
  }, [pokemon]);

  console.log(moveDetails);
  return (
    <>
      {isLoading ? (
        <div className='loading'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='header-main-pokemon'>
            <span className='number-pokemon'>#{pokemon.id}</span>
            <div className='container-img-pokemon'>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>
            <BackButton />
            <div className='container-info-pokemon'>
              <h1>{FirstMayus(pokemon.name)}</h1>
              <div className='card-types info-pokemon-type'>
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className='info-pokemon'>
                <div className='group-info'>
                  <p>Height</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className='group-info'>
                  <p>Weight</p>
                  <span>{pokemon.weight}KG</span>
                </div>
                <div className='group-info'>
                  <p>XP</p>
                  <span>{pokemon.base_experience}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", padding: "0rem 0rem 4rem 3rem" }}>
            <div className='container-stats'>
              <h1>Stats</h1>
              <div className='stats'>
                <div className='stat-group'>
                  <span>Hp</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[0].base_stat}</span>
                </div>
                <div className='stat-group'>
                  <span>Attack</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[1].base_stat}</span>
                </div>
                <div className='stat-group'>
                  <span>Defense</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[2].base_stat}</span>
                </div>
                <div className='stat-group'>
                  <span>Special Attack</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[3].base_stat}</span>
                </div>
                <div className='stat-group'>
                  <span>Special Defense</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[4].base_stat}</span>
                </div>
                <div className='stat-group'>
                  <span>Speed</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{pokemon.stats[5].base_stat}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to={`/evolution/${id}`} className='bn5'>
                See Evolution
              </Link>
              <div className='moves'>
                <h2>Moves</h2>
                <ul className='unor'>
                  {pokemon.moves.map((move, index) => (
                    <li className='list' key={index}>
                      {move.move.name}
                      <div className='moves-detail'>
                        <strong>Accuracy: </strong>{" "}
                        <p>{moveDetails[index]?.accuracy || "N/A"}</p>
                        <strong>Damage: </strong>{" "}
                        <p>{moveDetails[index]?.damage_class.name || "N/A"}</p>
                        <strong>Power: </strong>{" "}
                        <p>{moveDetails[index]?.power || "N/A"}</p>
                        <strong>Type: </strong>{" "}
                        <p>{moveDetails[index]?.type.name || "N/A"}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Detail;
