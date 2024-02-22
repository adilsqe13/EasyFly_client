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
    const [bookings, setBookings] = useState(null);

    const getBookings = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/user/get-bookings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            });
            const json = await response.json();
            setBookings(json.reverse());
        } catch (error) {
            console.log(error);
        }
    }
    // Cancel Booking
    const handleCancel = async (bookingId) => {
        try {
            if (token) {
                const response = await fetch(`${apiUrl}/api/user/cancel-booking`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token
                    },
                    body: JSON.stringify({ bookingId })
                });
                const json = await response.json();
                if (json.success) {
                    window.location.reload();
                    showToast('Booking Cancelled', 'success');
                }
            } else if (adminToken) {
                showToast('You are in Rental Agency account', 'warning');
            } else {
                navigate('/customer-login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <>
            <section style={{ backgroundColor: "#ffffff" }}>
                <div className="container py-5">
                    <h1 className='mt-3'>My Bookings <small className='h6 text-secondary'>&nbsp; &nbsp; {bookings === null ? 0 : bookings.length} - bookings</small></h1>
                    <div className="row justify-content-center mb-3 mt-4">

                        <h5 className='text-danger text-align-center dfjcac'>{bookings === null ? '' : bookings.length === 0 ? 'No Bookings' : ''}</h5>
                        {bookings === null ? <Spinner height='70' width='70' /> : bookings.map((item, index) => {
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
                                                    <h4>{item.flight[0].companyName}</h4>
                                                    <div>
                                                        <h6><span className='bold'>Booking Id:</span> &nbsp;<span className='text-primary'> {item._id}</span> </h6>
                                                        <h6><span className='bold'>Flight Number:</span> &nbsp;<span className='text-primary'> {item.flight[0].flightNumber}</span> </h6>
                                                        <h6><span className='bold'>Time:</span> &nbsp;<span className='text-primary'> {item.flight[0].time}</span> </h6>
                                                        <h6><span className='bold'>FROM:</span> &nbsp;<span className='text-dark'> {item.flight[0].from}</span> </h6>
                                                        <h6><span className='bold'>TO:</span> &nbsp;<span className='text-dark'> {item.flight[0].to}</span> </h6>
                                                        <h6><span className='bold'>Persons:</span> &nbsp;<span className='text-dark'> {item.person}</span> </h6>
                                                        <h6><span className='bold'>Travel Date:</span> &nbsp;<span className='text-dark'> {item.date.slice(0, 10)}</span> </h6>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                    <div className='row'>
                                                        <div className="col">
                                                            <strong className='fs-4'>Amount Paid</strong>&nbsp; &nbsp;<small className='fs-6'>Rs.</small><span className='text-success bold fs-4'>{item.amount}/-</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column mt-5">
                                                        <button onClick={() => { handleCancel(item._id) }} className="btn btn-danger btn-sm mt-2 bold fs-5 rounded" type="button">
                                                            Cancel Booking
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
