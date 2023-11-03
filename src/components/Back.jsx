import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div style={{ position: "fixed", top: 20, left: 20 }}>
      <Link href='/inicio'>
        <ArrowBackIosIcon />
      </Link>
    </div>
  );
};

export default BackButton;
