
import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/nav';
import AppRoute from './Routes/Route'

export default function App() {
  return (
    <div>
      <Nav></Nav>
      <AppRoute></AppRoute>
    </div>
  );
} 