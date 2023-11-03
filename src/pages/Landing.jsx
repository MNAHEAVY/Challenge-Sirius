import Particles from "../components/Particles";
import asset from "../assets/logoapp.png";
import sirius from "../assets/sirius_logo.png";
import pokeball from "../assets/pokeball.png";
import "../styles/Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className='nav-container'>
        <div className='brand'>
          <img src={sirius} alt='' style={{ width: "30px", height: "30px" }} />
          <div style={{ paddingLeft: "15px" }}> SIRIUS FRONT-END CHALLENGE</div>
        </div>
        <div className='nav-items-container'>
          <div className='contact-us'>Araujo Martin</div>
        </div>
      </div>
      <Particles id='tsparticles' />
      <img className='logo-portaid' src={asset} alt='' />
      <div className='bnp'>
        <Link to='/inicio' className='bn'>
          <img src={pokeball} alt='' style={{ width: "45px", paddingRight: "15px" }} />{" "}
          Ingresar
        </Link>
      </div>
    </div>
  );
};
export default Landing;
