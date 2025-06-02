
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Addproduct from './Components/Addproduct';

export default function App() {
  return (  
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Addproduct' element={<Addproduct/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
