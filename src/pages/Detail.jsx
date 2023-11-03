import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FisrtMayus } from "../helpers/FirstMayus";
import { getPokeByIdAction } from "../redux/actions";
import Loader from "../components/Loader";
import "../styles/Detail.css";

const Detail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemones.pokemon);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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

            <div className='container-info-pokemon'>
              <h1>{FisrtMayus(pokemon.name)}</h1>
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
              </div>
            </div>
          </div>

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
        </>
      )}
    </>
  );
};
export default Detail;
