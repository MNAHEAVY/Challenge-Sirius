import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div style={{ position: "fixed", top: 32, left: 20 }}>
      <Link to='/inicio'>
        <ArrowBackIosIcon fontSize='large' color='#ffffff' />
      </Link>
    </div>
  );
};

export default BackButton;
