import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toast from './components/Toast';
import './App.css'
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/customer/Login';
import Register from './components/customer/Register';
import BookingPage from './components/customer/BookingPage';
import AdminLogin from './components/admin/AdminLogin';
import BookingOrders from './components/admin/BookingOrders';
import MyListedFlights from './components/admin/MyListedFlights';
import AddFlight from './components/admin/AddFlight';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toast />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/add-flight' element={<AddFlight />} />
          <Route exact path='/customer-login' element={<Login />} />
          <Route exact path='/customer-signup' element={<Register />} />
          <Route exact path='/booking-page' element={<BookingPage />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/get-orders' element={<BookingOrders />} />
          <Route exact path='/get-my-flights' element={<MyListedFlights />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
