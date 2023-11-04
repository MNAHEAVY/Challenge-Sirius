import TuneIcon from "@mui/icons-material/Tune";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import "../styles/Filters.css";
import TitleIcon from "@mui/icons-material/Title";
import EggIcon from "@mui/icons-material/Egg";
import ScaleIcon from "@mui/icons-material/Scale";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { filteredPokemons } from "../redux/actions";
import { useDispatch } from "react-redux";

const colors = [
  "black",
  "blue",
  "brown",
  "gray",
  "green",
  "pink",
  "purple",
  "red",
  "white",
  "yellow",
];
const types = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];

const Filters = () => {
  const dispatch = useDispatch();
  // toggle section

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };
  // filter color section

  const [selectedColor, setSelectedColor] = useState("");

  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const customStyles = {
    container: {
      height: "25%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "grey",
      gap: "15px",
    },
    contain: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  };

  // filter color section

  const [selectedTypes, setSelectedTypes] = useState("");
  const handleChangeTypes = (event) => {
    setSelectedTypes(event.target.value);
    dispatch(filteredPokemons(selectedTypes));
  };

  // is baby section
  const [checked, setChecked] = useState(true);

  const handleChangeBaby = (event) => {
    setChecked(event.target.checked);
  };
  // weigth section
  const [value, setValue] = useState([20, 37]);

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleChangeWeight = (event, newValue) => {
    setValue(newValue);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          height: "8vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ padding: "1vh", color: "grey" }}>Filter section</h2>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "2rem",
          height: "90vh",
        }}
      >
        <Box sx={customStyles.container}>
          <Box sx={customStyles.contain}>
            <TitleIcon color='blue' /> Types
          </Box>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={selectedTypes}
                onChange={handleChangeTypes}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {types.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={customStyles.container}>
          <Box sx={customStyles.contain}>
            <EggIcon /> Is Baby?
          </Box>
          <Box>
            <Switch
              checked={checked}
              onChange={handleChangeBaby}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </Box>
        <Box sx={customStyles.container}>
          <Box sx={customStyles.contain}>
            <ScaleIcon /> Weigth
          </Box>
          <Box sx={{ width: 150 }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChangeWeight}
              s
              valueLabelDisplay='auto'
              getAriaValueText={valuetext}
              min={0}
              max={9999}
            />
          </Box>
        </Box>
        <Box sx={customStyles.container}>
          <Box sx={customStyles.contain}>
            <ColorLensIcon /> Color
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={selectedColor}
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {colors.map((color, index) => (
                <MenuItem key={index} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
  return (
    <div className='filter-contain'>
      <div className='filter-button'>
        <Button onClick={toggleDrawer(true)}>
          <TuneIcon />
        </Button>
        <h3 style={{ color: "#f3f3f3" }}>Filters</h3>
      </div>
      <SwipeableDrawer
        anchor='left'
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
};

export default Filters;
