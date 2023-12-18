import "./App.css";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MovieDetails, MovieGallery } from "./views/export";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/movie-info" element={<MovieGallery />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
