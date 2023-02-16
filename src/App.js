import './App.css';
import About from './components/About';
import {Home} from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            {/* <Route path="/" element={<Textform showAlert={showAlert} mode={mode} heading="Enter text to analyze below" />} /> */}
          </Routes>
          </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
