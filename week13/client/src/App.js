import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import BookSender from './components/BookSender';
import Book from './components/Book';


function App() {
  return <Router>
    <div className='App'>
      <Routes>
        <Route path='/' element={<BookSender />} />
        <Route path='/book/:bookName' element={<Book />} />
      </Routes>
    </div>
  </Router>
}

export default App;
