
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}
