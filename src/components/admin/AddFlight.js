import React, { useState, useContext } from 'react';
import axios from 'axios';
import toastContext from '../../CONTEXT/context/toastContext';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const context = useContext(toastContext);
  const { showToast } = context;
  const token = localStorage.getItem('adminToken');
  const [productDetails, setProductDetails] = useState({
    companyName: '',
    flightNumber: '',
    from: '',
    to: '',
    time: '',
    seating_capacity: '',
    price: '',
  });

  const [processing, setProcessing] = useState(false);

  const handleAddFlight = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await axios.post(
        `${apiUrl}/api/admin/add-flight`,
        {
          ...productDetails,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        }
      );
      window.scrollTo(0, 0);
      navigate('/get-my-flights');
    } catch (error) {
      console.error('Error uploading product:', error);
      window.scrollTo(0, 0);
      setProcessing(false);
      showToast('Error uploading flight', 'error');
    }
  };


  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container margin-top-md mt-5">
        <div className="row">
          <div className=" col-lg-3 col-sm-0"></div>
          <div className=" col-lg-6 col-sm-12 mini-container">
            <h1>Add New Flight</h1>
            <form className='form-group'>
              <label className=' fs-4 mt-1' >Company Name</label>
              <input type='text' onChange={onChange} name='companyName' value={productDetails.companyName} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 ' >Flight Number</label>
              <input type='text' onChange={onChange} name='flightNumber' value={productDetails.flightNumber} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1' >From</label>
              <input type='text' onChange={onChange} name='from' value={productDetails.from} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1' >To</label>
              <input type='text' onChange={onChange} name='to' value={productDetails.to} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1' >Time</label>
              <input type='text' onChange={onChange} name='time' value={productDetails.time} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1 ' >Seating Capacity</label>
              <input type='number' onChange={onChange} name='seating_capacity' value={productDetails.seating_capacity} className='form-control input-field fs-4' />
              <label className=' fs-4 mt-1' >Price</label>
              <input type='number' onChange={onChange} name='price' value={productDetails.price} className='form-control input-field fs-4' />

              <button disabled={productDetails.companyName === '' ||
                productDetails.flightNumber === '' ||
                productDetails.from === '' ||
                productDetails.to === '' ||
                productDetails.time === '' ||
                productDetails.seating_capacity === '' ||
                productDetails.price === ''
              } onClick={handleAddFlight} className='btn btn-dark form-control mt-4 fs-4 bold '>
                {processing === true ? <Spinner height='30' width='30' /> : 'Submit'}
              </button>
            </form>
          </div>
          <div className=" col-lg-3 col-sm-0"></div>
        </div>
      </div>
    </>
  )
}
