import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Single } from "./components/Pages/Single";
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
            <Route path="/double" element={<Double />} />
            <Route path="/multiple" element={<Multiple />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
