import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaCalendarAlt, FaStethoscope, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { appointmentsAPI, doctorsAPI, usersAPI } from '../../services/api';

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
const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;
const TabButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.backgroundSecondary)};
  color: ${({ active, theme }) => (active ? 'white' : theme.colors.text)};
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: white;
  }
`;
const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ItemActions = styled.div`
  display: flex;
  gap: 1rem;
`;
const ViewButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: ${({ theme }) => theme.colors.primaryDark}; }
`;

const DashboardPage = () => {
  const [tab, setTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'appointments') {
        const res = await appointmentsAPI.getAll();
        setAppointments(res.data.data || []);
      } else if (tab === 'doctors') {
        const res = await doctorsAPI.getAll();
        setDoctors(res.data.data || []);
      } else if (tab === 'patients') {
        const res = await usersAPI.getAll();
        setPatients(res.data.data || []);
      }
    } catch (e) {
      setAppointments([]); setDoctors([]); setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <DashboardHeader>
          <h1>Welcome back, User!</h1>
          <p>Manage your appointments, doctors, and patients</p>
        </DashboardHeader>
        <Tabs>
          <TabButton active={tab === 'appointments'} onClick={() => setTab('appointments')}><FaCalendarAlt /> Appointments</TabButton>
          <TabButton active={tab === 'doctors'} onClick={() => setTab('doctors')}><FaStethoscope /> Doctors</TabButton>
          <TabButton active={tab === 'patients'} onClick={() => setTab('patients')}><FaUsers /> Patients</TabButton>
        </Tabs>
        {tab === 'appointments' && (
          <Section>
            <h2>Appointments</h2>
            {loading ? 'Loading...' : (
              <List>
                {appointments.map(apt => (
                  <ListItem key={apt.id}>
                    <ItemInfo>
                      <span><b>ID:</b> {apt.id}</span>
                      <span><b>Doctor:</b> {apt.doctorName || apt.doctorId}</span>
                      <span><b>Date:</b> {apt.date} {apt.time}</span>
                      <span><b>Status:</b> {apt.status}</span>
                    </ItemInfo>
                    <ItemActions>
                      <ViewButton to={`/appointment/${apt.id}`}>View Details</ViewButton>
                    </ItemActions>
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        )}
        {tab === 'doctors' && (
          <Section>
            <h2>Doctors</h2>
            {loading ? 'Loading...' : (
              <List>
                {doctors.map(doc => (
                  <ListItem key={doc.id}>
                    <ItemInfo>
                      <span><b>ID:</b> {doc.id}</span>
                      <span><b>Name:</b> {doc.name}</span>
                      <span><b>Specialty:</b> {doc.specialty}</span>
                    </ItemInfo>
                    <ItemActions>
                      <ViewButton to={`/doctor-detail/${doc.id}`}>View Details</ViewButton>
                    </ItemActions>
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        )}
        {tab === 'patients' && (
          <Section>
            <h2>Patients</h2>
            {loading ? 'Loading...' : (
              <List>
                {patients.map(pat => (
                  <ListItem key={pat.id}>
                    <ItemInfo>
                      <span><b>ID:</b> {pat.id}</span>
                      <span><b>Name:</b> {pat.name}</span>
                      <span><b>Email:</b> {pat.email}</span>
                    </ItemInfo>
                    <ItemActions>
                      <ViewButton to={`/patient/${pat.id}`}>View Details</ViewButton>
                    </ItemActions>
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        )}
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;