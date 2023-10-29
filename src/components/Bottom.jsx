import asset from "../assets/triangles.png";
import "../styles/Bottom.css";

const Bottom = () => {
  return (
    <div className='footer-images'>
      <div className='image'>
        <img src={asset} alt='' />
      </div>
      <div className='image'>
        <img src={asset} alt='' style={{ transform: "scaleX(-1)" }} />
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

export default Bottom;
