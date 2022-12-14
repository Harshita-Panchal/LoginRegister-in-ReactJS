import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Details from './components/details';
import { Routes, Route } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState()


  //  store isLoggedIn in localStorage so that user can not go details page without login
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const stateChange = (bool) =>{
    setIsLoggedIn(bool)
  }

  return (
    <div className='App'>
      {/* set routing */}
      <Routes>
        <Route path='/' element={<Login stateChange={stateChange}/> } />
        <Route path='/register' element={<Register />} />
        <Route path='/details' element={isLoggedIn ? <Details stateChange={stateChange} /> : <Login  stateChange={stateChange} />} />
      </Routes>
    </div>
  );
}

export default App;
