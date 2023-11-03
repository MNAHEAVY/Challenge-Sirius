import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Bottom from "./components/Bottom";
import Detail from "./pages/Detail";
import Evolution from "./pages/Evolution";

const App = () => {
  return (
    <Router>
      <Header />
      <Bottom />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/inicio' element={<Home />} />
        <Route exact path='/pokemon/:id' element={<Detail />} />
        <Route exact path='/evolution/:id' element={<Evolution />} />
      </Routes>
    </Router>
  );
};

export default App;
