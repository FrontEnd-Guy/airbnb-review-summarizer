import React from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';

function App() {

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;