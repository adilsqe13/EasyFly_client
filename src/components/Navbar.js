import React from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const customerToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('flightId');
    navigate('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand logo-sales-app" href="/">&nbsp;<strong>easy<span className='logo-app'>Fly</span></strong></a>
          <button className="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse px-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <a className='navbar-item-link btn btn-bg border-0' href="/">
                <li className="nav-item text-black ">HOMEPAGE</li>
              </a>
              {customerToken && <Link className='navbar-item-link btn btn-bg border-0' to="/booking-page">
                <li className="nav-item text-black ">MY BOOKINGS</li>
              </Link>}
              {adminToken && <Link className='navbar-item-link btn btn-bg border-0' to="/get-orders">
                <li className="nav-item text-black ">BOOKING ORDERS</li>
              </Link>}
              {adminToken && <Link className='navbar-item-link btn btn-bg border-0' to="/get-my-flights">
                <li className="nav-item text-black ">MY FLIGHTS</li>
              </Link>}

              {adminToken && <Link className='navbar-item-link btn btn-bg border-0' to="/add-flight">
                <li className="nav-item text-black ">ADD FLIGHTS</li>
              </Link>}

              {
                (!customerToken && !adminToken) &&
                <Link className='navbar-item-link btn btn-bg border-0' to='/customer-login'>
                  <li className="nav-item login-black">LOGIN</li>
                </Link>
              }
              {(!customerToken && !adminToken) && <Link className='navbar-item-link btn-bg border-0 btn' to='/admin-login'>
                <li className="nav-item text-black">ADMIN</li>
              </Link>}

              {(customerToken || adminToken) &&
                <button onClick={handleLogout} className='navbar-item-link btn border border-danger logout-btn'>
                  <li className="nav-item text-danger">LOGOUT</li>
                </button>}

            </ul>
            {customerToken && <span className='text-light fs-5'>{localStorage.getItem('userFullName')}</span>}
            {adminToken && <span className='text-light fs-5'>Admin</span>}

          </div>

        </div>
      </nav>
    </>
  )
}
