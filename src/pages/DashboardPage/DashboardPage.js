import React from 'react';
import styled from 'styled-components';
import { FaUser, FaCalendarAlt, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem 0;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const DashboardHeader = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text};
  }
`;

const AppointmentCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  .appointment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .doctor-name {
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
    
    .status {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1.2rem;
      font-weight: 600;
      
      &.upcoming {
        background: #dbeafe;
        color: #1d4ed8;
      }
      
      &.completed {
        background: #dcfce7;
        color: #166534;
      }
    }
  }
  
  .appointment-details {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.4rem;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const DashboardPage = () => {
  const mockAppointments = [
    {
      id: 1,
      doctorName: "Dr. Ahmed Khan",
      specialty: "Cardiology",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming"
    },
    {
      id: 2,
      doctorName: "Dr. Fatima Ali",
      specialty: "Dermatology",
      date: "2024-01-10",
      time: "02:30 PM",
      status: "completed"
    }
  ];

  return (
    <DashboardContainer>
      <DashboardContent>
        <DashboardHeader>
          <h1>Welcome back, User!</h1>
          <p>Manage your appointments and account settings</p>
        </DashboardHeader>

        <DashboardGrid>
          <DashboardCard>
            <h2>Upcoming Appointments</h2>
            {mockAppointments.filter(apt => apt.status === 'upcoming').map(appointment => (
              <AppointmentCard key={appointment.id}>
                <div className="appointment-header">
                  <span className="doctor-name">{appointment.doctorName}</span>
                  <span className={`status ${appointment.status}`}>
                    {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
                <div className="appointment-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{appointment.date} at {appointment.time}</span>
                  </div>
                  <div className="detail-item">
                    <FaUser />
                    <span>{appointment.specialty}</span>
                  </div>
                </div>
              </AppointmentCard>
            ))}
          </DashboardCard>

          <DashboardCard>
            <h2>Recent Appointments</h2>
            {mockAppointments.filter(apt => apt.status === 'completed').map(appointment => (
              <AppointmentCard key={appointment.id}>
                <div className="appointment-header">
                  <span className="doctor-name">{appointment.doctorName}</span>
                  <span className={`status ${appointment.status}`}>
                    {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </span>
                </div>
                <div className="appointment-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{appointment.date} at {appointment.time}</span>
                  </div>
                  <div className="detail-item">
                    <FaUser />
                    <span>{appointment.specialty}</span>
                  </div>
                </div>
              </AppointmentCard>
            ))}
          </DashboardCard>
        </DashboardGrid>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;