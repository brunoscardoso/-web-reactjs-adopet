import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import AdoptPet from './pages/AdoptPet';
import RegisterPet from './pages/RegisterPet';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact/>
      <Route component={AdoptPet} path="/adopt-pet" />
      <Route component={RegisterPet} path="/register-pet" />
    </BrowserRouter>
  )
}

export default Routes;