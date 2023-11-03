import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Bottom from "./components/Bottom";
//import Cart from "./pages/Cart/Cart";

const App = () => {
  return (
    <Router>
      <Header />
      <Bottom />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/inicio' element={<Home />} />
        {/* <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/cart' element={<Cart />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
