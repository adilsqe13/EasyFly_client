import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toastContext from '../../CONTEXT/context/toastContext';
import Spinner from '../Spinner';

export default function Homepage() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const myToastcontext = useContext(toastContext);
  const { showToast } = myToastcontext;
  const token = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const [flights, setFlights] = useState(null);
  const [processing, setProcessing] = useState(false);


  const getMyFlights = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/admin/get-my-flights`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": adminToken
        },
      });
      const json = await response.json();
      setFlights(json.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (flightId) => {
    setProcessing(true);
    try {
      if (adminToken) {
        const response = await fetch(`${apiUrl}/api/admin/delete-flight`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "auth-token": adminToken
          },
          body: JSON.stringify({ flightId: flightId })
        });
        const json = await response.json();
        if (json.success) {
          window.location.reload();
        }
      } else if (token) {
        showToast('You are in a customer account', 'warning');
        setProcessing(false);
      } else {
        navigate('/agency-login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyFlights();
  }, []);

  return (
    <>
      <section style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-5">
          <h1 className='mt-3'>My Listed Flights <small className='h6 text-secondary'>&nbsp; &nbsp; {flights === null ? 0 : flights.length} - flights</small></h1>
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
                              height={168}
                              width={250} />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                          <h4>{item.companyName}</h4>
                          <div>
                            <h6><span className='bold'>Flight Number:</span> &nbsp;<span className='text-dark'> {item.flightNumber}</span> </h6>
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

                          <div className="d-flex flex-column mt-5">
                            <button onClick={() => { handleDelete(item._id) }} className="btn btn-danger btn-sm mt-2 bold fs-5 rounded" type="button">
                              {processing === true ? <Spinner height='22' width='22' /> : 'Remove Flight'}
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
