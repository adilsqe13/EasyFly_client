import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toastContext from '../CONTEXT/context/toastContext';
import Spinner from '../components/Spinner';

export default function Homepage() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const myToastcontext = useContext(toastContext);
  const { showToast } = myToastcontext;
  const token = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const [flights, setFlights] = useState(null);
  const [personSelect, setPersonSelect] = useState('');
  const [dateSelect, setDateSelect] = useState('');
  const [searchDetails, setSearchDetails] = useState({ from: '', to: '' });
  const [processing, setProcessing] = useState(false);
  const [searching, setSearching] = useState(false);

  const getAllFlights = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/get-all-flights`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setFlights(json.reverse());
    } catch (error) {
      console.log(error);

    }
  }

  const handleBooking = async (flightId) => {
    setProcessing(true);
    try {
      if (token) {
        const response = await fetch(`${apiUrl}/api/user/booking`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ flightId: flightId, person: personSelect, date: dateSelect })
        });
        const json = await response.json();
        if (json.success) {
          setProcessing(false);
          showToast('Booking Successfully', 'success');
          navigate('/booking-page');
        } else {
          setProcessing(false);
          showToast('SEAT NOT AVAILABLE', 'error');
        }
      } else if (adminToken) {
        showToast('You are in Admin account', 'warning');
        setProcessing(false);
      } else {
        navigate('/customer-login');
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  }

  const onChange = (e) => {
    setSearchDetails({ ...searchDetails, [e.target.name]: e.target.value });
  }

  const handleSearch = async () => {
    setSearching(true);
    try {
      const response = await fetch(`${apiUrl}/api/get-searched-flights`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: searchDetails.from, to: searchDetails.to }),
      });
      const json = await response.json();
      setSearching(false);
      setSearchDetails({ from: '', to: '' });
      setFlights(json.reverse());
    } catch (error) {
      console.log(error);
      setSearching(false);
      setSearchDetails({ from: '', to: '' });
    }
  }

  useEffect(() => {
    getAllFlights();
  }, []);

  return (
    <>
      <div className="container  mt-4 p-3">
        <h3>Search Flight</h3>
        <div className="row mt-4 margin-auto">
          <div className="col-lg-5"><input type='text' onChange={onChange} value={searchDetails.from} name='from' className='form-control input-field fs-5' placeholder='FROM' /></div>
          <div className="col-lg-5"><input type='text' onChange={onChange} value={searchDetails.to} name='to' className='form-control input-field fs-5' placeholder='TO' /></div>
          <div className="col-lg-2 dfjcac">
            <button disabled={searchDetails.from === '' || searchDetails.to === ''} onClick={handleSearch} className='btn btn-primary w-100 fs-5'>
              {searching === true ? <Spinner height='22' width='22' /> : 'SEARCH'}
            </button>
          </div>
        </div>
      </div>
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-5">
          <h3 className='mt-3'>Available Flights <small className='h6 text-secondary'>&nbsp; &nbsp; {flights === null ? 0 : flights.length} - flights</small></h3>
          <div className="row justify-content-center mb-3 mt-4">

            <h5 className='text-danger text-align-center dfjcac'>{flights === null ? '' : flights.length === 0 ? 'No Flights' : ''}</h5>
            {flights === null ? <Spinner height='70' width='70' /> : flights.map((item, index) => {
              return (
                <div key={index} className="col-md-12 col-xl-12 p-0 mt-1">
                  <div className="card shadow-0 box-shadow-light rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0 dfjcac">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface dfjcac">
                            <img className="img-fluid rounded-3" src={'https://img.etimg.com/thumb/width-1200,height-900,imgsize-17030,resizemode-75,msid-98741577/industry/transportation/airlines-/-aviation/summers-here-with-fewer-flights.jpg'} alt='img'
                              width={250} />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                          <h4>{item.companyName}</h4>
                          <div>
                            <h6><span className='bold'>Flight Number:</span> &nbsp;<span className='text-primary'> {item.flightNumber}</span> </h6>
                            <h6><span className='bold'>Time:</span> &nbsp;<span className='text-dark'> {item.time}</span> </h6>
                            <h6><span className='bold'>FROM:</span> &nbsp;<span className='text-dark'> {item.from}</span> </h6>
                            <h6><span className='bold'>TO:</span> &nbsp;<span className='text-dark'> {item.to}</span> </h6>
                            <h6><span className='bold'>Seat Available:</span> &nbsp;<span className='text-primary'> {item.seating_capacity}</span> </h6>
                          </div>
                          <div className='row'>
                            <div className="col">
                              <strong className='fs-4'>Price: </strong><small className='fs-6'>Rs.</small><span className='text-success bold fs-5'>{item.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">

                          {token && <select onChange={(e) => setPersonSelect(e.target.value)} name='person-select' value={personSelect} className="form-select mt-2" aria-label="Default select example">
                            <option selected>Person</option>
                            <option name='1' value="1">1</option>
                            <option name='2' value="2">2</option>
                            <option name='3' value="3">3</option>
                            <option name='4' value="4">4</option>
                            <option name='5' value="5">5</option>
                          </select>}
                          {token && <p>
                            <label className='fs-6 mt-2' for="date">Choose travel date:</label>
                            <input className='form-control' onChange={(e) => { setDateSelect(e.target.value) }} type="date" id="date" name="date" value={dateSelect} />
                          </p>}
                          <div className="d-flex flex-column">
                            <button onClick={() => { handleBooking(item._id) }} className="btn btn-success btn-sm mt-2 bold fs-5 rounded" type="button">
                              {processing === true ? <Spinner height='22' width='22' /> : 'Book Flight'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </section>
    </>
  )
}
