import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import './BookingCar.css'

const BookingCar = () => {
  const location = useLocation();
  const { car } = location.state || {};
  console.log(location);

  const context = useContext(noteContext);
  const { bookings, getallbookings , getbookings } = context;

  useEffect(() => {
    getallbookings(); 
  }, []); 

  const [mobileNumber, setMobileNumber] = useState('');
  const[color , setcolor] = useState('');
  const [chasis, setchasis] = useState('');
  const [bookingSuccessful, setBookingSuccessful] = useState(false);
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handlecolorChange = (e) => {
    setcolor(e.target.value);
  };

  const handlechesisChange = (e) => {
    setchasis(e.target.value);
  };

  console.log(car._id);

  const [booking, setBooking] = useState({
    bookeduser: localStorage.getItem('id'),
    bookedusername:localStorage.getItem('name'),
    Used_for:car.Used_for,
    car_id: car._id,
    mobileNumber: '',
    color:'',
    chasis:'',
    carname: car.name,
    carcost: car.cost,
    carphoto: car.images,
  });

  const handleClick = (e) => {
    e.preventDefault();
  
    
  
    // Create a copy of the current booking state with the updated mobileNumber
    const updatedBooking = {
      ...booking,
      mobileNumber: mobileNumber,
      color:color,
      chasis:chasis
    };
  
    // Call getbookings with the updated booking state
    getbookings(
      updatedBooking.bookeduser,
      updatedBooking.bookedusername,
      updatedBooking.Used_for,
      updatedBooking.car_id,
      updatedBooking.mobileNumber,
      updatedBooking.color,
      updatedBooking.chasis,
      updatedBooking.carname,
      updatedBooking.carcost,
      updatedBooking.images
    );
  
    console.log('Booking Successful');
    
  
    // Set the updated booking state and mark booking as successful
    setBooking(updatedBooking);
    setBookingSuccessful(true); 
  };
  

  return (
    <>
      <div className="booking-details">
          <div class="booking-car-details">
              <div className="booking-car-image">
                <img src={`/images/$car.images[0]`} alt="..." />
              </div>

              <div className="booking-cost-details-info">
                <div className="booking-car-information">
                  <div className="booking-car-name">
                    <h2>{car.name}</h2>
                  </div>
                  <div className="booking-car-description">
                    <p>{car.description}</p>
                  </div>
                </div>

                <div className="booking-car-cost">
                  <span>₹{car.cost}</span>
                </div>
              </div>
          </div>

          
          <div className="user-bookings-info">
              <form onSubmit={handleClick}>
                <div class="user-mobile-number">
                  <label class="form-label mobileLabel" htmlFor="mobileNumber">MOBILE NUMBER</label>
                          <input
                            type="text"
                            id="mobileNumber"
                            class="form-control"
                            name="mobileNumber"
                            placeholder="Please Enter your Mobile Number"
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            required
                          />
                    <div id="emailHelp" class="form-text">*Privacy is our priority</div>
                </div>
                <div class="mb-3">
              <label class="form-label" htmlFor="color">Color:</label>
              <select
                class="form-select"
                id="color"
                name="color"
                value={color}
                onChange={handlecolorChange}
                required
              >
                <option value="">Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="chasis">Chasis:</label>
              <select
                class="form-select"
                id="chasis"
                name="chasis"
                value={chasis}
                onChange={handlechesisChange}
                required
              >
                <option value="">Select Chasis</option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
                <option value="Type C">Type C</option>
                {/* Add more options as needed */}
              </select>
            </div>
                <button type="submit" class="engage-button">BUY NOW</button>
                {bookingSuccessful && <div className="alert alert-success my-3" role="alert">Booking Successful!</div>}
              </form>
          </div>
      </div>
    </>
    );
  };
export default BookingCar;


            
            
            

