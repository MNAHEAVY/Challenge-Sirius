import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BackButton = () => {
  return (
    <div style={{ position: "fixed", top: 20, left: 20 }}>
      <a href='/'>
        <ArrowBackIosIcon />
      </a>
    </div>
  );
};

export default BackButton;
