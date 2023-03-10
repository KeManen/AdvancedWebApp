import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MyContainer from './components/MyContainer';
import About from './components/About';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={< MyContainer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
