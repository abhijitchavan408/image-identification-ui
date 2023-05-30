import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Single } from "./components/Pages/Single.js";
import { Double } from "./components/Pages/Double";
import { Multiple } from "./components/Pages/Multiple";
import { Contact } from "./components/Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Single />} />
            <Route path="/Double" element={<Double />} />
            <Route path="/Multiple" element={<Multiple />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
