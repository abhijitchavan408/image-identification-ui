import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SingleImage } from "./components/Pages/SingleImage";
import { TwoImages } from "./components/Pages/TwoImages";
import { MultipleImages } from "./components/Pages/MultipleImages";
import { Contact } from "./components/Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<SingleImage />} />
            <Route path="/double" element={<TwoImages />} />
            <Route path="/multiple" element={<MultipleImages />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
