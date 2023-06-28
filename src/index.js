import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Users from './screens/Users';
import Technicians from './screens/technicians';
import CreateTechnician from './screens/CreateTechnician';
import Settings from './screens/Settings';
import CategoriesPage from './screens/Categories';
import CreateCategoryPage from './screens/CreateCategory';
import PopularTechniciansPage from './screens/PopularTechnicians';
import AddPopularTechnicianPage from './screens/AddPopularTechnician';
import ReservationPage from './screens/Reservations';
import CompletedReservationsPage from './screens/CompletedReservations';
import UpdateTechnician from './screens/UpdateTechnician';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='/' exact element={<App />} />
          <Route path='/users' element={<Users />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/technicians' element={<Technicians />} />
          <Route path='/updateTechnicians/:id' element={<UpdateTechnician />} />
          <Route path='/reservations' element={<ReservationPage />} />
          <Route path='/completedReservations' element={<CompletedReservationsPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/popularTechnicians' element={<PopularTechniciansPage />} />
          <Route path='/popularTechnicians/create' element={<AddPopularTechnicianPage />} />
          <Route path='/technicians/create' element={<CreateTechnician />} />
          <Route path='/categories/create' element={<CreateCategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

