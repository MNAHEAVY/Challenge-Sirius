import styles from "./Loader.module.css";
import asset from "../assets/pokeball.png";

const Loader = () => {
  return (
    <div className={styles.loaderContent}>
      <div
        style={{
          animationName: "spin",
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
        className={styles.circle}
      ></div>

      <div className={styles.loader}>
        <img src={asset} alt='Loader' style={{ width: "20vh" }} />
      </div>
    </div>
  );
};

export default Loader;
