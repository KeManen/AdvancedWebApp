import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import BookSender from './components/BookSender';
import Book from './components/Book';
import NotFound from './components/NotFound'

function App() {
  return <Router>
    <div className='App'>
      <h1>Books</h1>
      <Routes>
        <Route path='/' element={<BookSender />} />
        <Route path='/book/:bookName' element={<Book />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  </Router>
}

export default App;
