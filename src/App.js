import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SingleImage } from "./components/Pages/SingleImage";
import { TwoImages } from "./components/Pages/TwoImages";
import { MultipleImages } from "./components/Pages/MultipleImages";
import { SingleAdharCard } from "./components/Pages/SingleAdharCard";
import { TwoAdharCards } from "./components/Pages/TwoAdharCards";
import { MultipleAdharCards } from "./components/Pages/MultipleAdharCards";
import { Contact } from "./components/Pages/Contact";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/single-image" element={<SingleImage />} />
            <Route path="/two-images" element={<TwoImages />} />
            <Route path="/multiple-images" element={<MultipleImages />} />
            <Route path="/single-adharcard" element={<SingleAdharCard />} />
            <Route path="/two-adharcards" element={<TwoAdharCards />} />
            <Route path="/multiple-adharcards" element={<MultipleAdharCards />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
