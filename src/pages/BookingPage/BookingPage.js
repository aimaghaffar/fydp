import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const BookingPageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem 0;
`;

const BookingContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BookingCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const BookingHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.6rem;
  }
`;

const BookingForm = styled.form`
  .form-section {
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${props => props.theme.colors.text};
    }
  }
  
  .form-group {
    margin-bottom: 2rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    font-size: 1.4rem;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 1.2rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    font-size: 1.4rem;
    outline: none;
    transition: border-color 0.3s ease;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const TimeSlot = styled.button`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.4rem;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &.selected {
    background: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &.disabled {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const BookingButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`;

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    symptoms: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSlotClick = (time) => {
    setBookingData({
      ...bookingData,
      time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert('Appointment booked successfully!');
      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  return (
    <BookingPageContainer>
      <BookingContent>
        <BookingCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BookingHeader>
            <h1>Book Appointment</h1>
            <p>Schedule your appointment with Dr. Ahmed Khan</p>
          </BookingHeader>

          <BookingForm onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Select Date & Time</h2>
              
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Available Time Slots</label>
                <TimeSlots>
                  {timeSlots.map((time) => (
                    <TimeSlot
                      key={time}
                      type="button"
                      className={bookingData.time === time ? 'selected' : ''}
                      onClick={() => handleTimeSlotClick(time)}
                    >
                      {time}
                    </TimeSlot>
                  ))}
                </TimeSlots>
              </div>
            </div>

            <div className="form-section">
              <h2>Patient Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={bookingData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={bookingData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={bookingData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Appointment Details</h2>
              
              <div className="form-group">
                <label htmlFor="symptoms">Symptoms/Reason for Visit</label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="Please describe your symptoms or reason for the appointment"
                  value={bookingData.symptoms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional information you'd like to share"
                  value={bookingData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <BookingButton type="submit" disabled={loading}>
              {loading ? 'Booking Appointment...' : 'Confirm Booking'}
            </BookingButton>
          </BookingForm>
        </BookingCard>
      </BookingContent>
    </BookingPageContainer>
  );
};

export default BookingPage;