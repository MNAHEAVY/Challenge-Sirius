import asset from "../assets/triangles.png";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className='header-images'>
      <div className='image'>
        <img src={asset} alt='' />
      </div>
      <div className='image'>
        <img src={asset} alt='' style={{ transform: " scaleX(-1)" }} />
      </div>
      <div className='image'>
        <img src={asset} alt='' />
      </div>
      <div className='image'>
        <img src={asset} alt='' style={{ transform: " scaleX(-1)" }} />
      </div>
    </div>
  );
};

export default Header;
