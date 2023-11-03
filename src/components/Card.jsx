/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Card.css";
import { FisrtMayus } from "../helpers/FirstMayus";

const CardPoke = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
      <div className='card-img'>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={`Pokemon ${pokemon.name}`}
        />
      </div>
      <div className='card-info'>
        <span className='pokemon-id'>N° {pokemon.id}</span>
        <h3>{FisrtMayus(pokemon.name)}</h3>
        <div className='card-types'>
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={type.type.name}>
              {FisrtMayus(type.type.name)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default CardPoke;
