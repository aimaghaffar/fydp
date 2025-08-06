import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { appointmentsAPI } from '../../services/api';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 4rem 0;
`;
const Card = styled.div`
  background: white;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 3rem;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
`;
const Label = styled.span`
  color: ${props => props.theme.colors.textLight};
`;
const Value = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await appointmentsAPI.getById(id);
        setAppointment(res.data.data);
      } catch (e) {
        setAppointment(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  if (loading) return <Container><Card>Loading...</Card></Container>;
  if (!appointment) return <Container><Card>Appointment not found.</Card></Container>;

  return (
    <Container>
      <Card>
        <Title>Appointment Details</Title>
        <Row><Label>Appointment ID:</Label> <Value>{appointment.id}</Value></Row>
        <Row><Label>Doctor ID:</Label> <Value>{appointment.doctorId}</Value></Row>
        <Row><Label>Patient ID:</Label> <Value>{appointment.userId}</Value></Row>
        <Row><Label>Appointment Time:</Label> <Value>{appointment.date} {appointment.time}</Value></Row>
        <Row><Label>Status:</Label> <Value>{appointment.status}</Value></Row>
      </Card>
    </Container>
  );
};

export default AppointmentDetailPage;