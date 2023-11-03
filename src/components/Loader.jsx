import asset from "../assets/pokeball.png";
import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className='loaderContent'>
      <div
        style={{
          animationName: "spin",
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
        className='circle'
      ></div>

      <div className='loader'>
        <img src={asset} alt='Loader' style={{ width: "20vh" }} />
      </div>
    </div>
  );
};

export default Loader;
