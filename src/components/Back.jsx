import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const BackButton = () => {
  return (
    <div style={{ position: "fixed", top: "4rem", left: "2rem" }}>
      <Tooltip title='Go back'>
        <Link to='/inicio'>
          <ArrowBackIosIcon fontSize='large' color='#ffffff' />
        </Link>
      </Tooltip>
    </div>
  );
};

export default BackButton;
