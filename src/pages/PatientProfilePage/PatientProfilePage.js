import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usersAPI } from '../../services/api';

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

const PatientProfilePage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // For demo, use getProfile (should be get by id in real app)
        const res = await usersAPI.getProfile();
        setPatient(res.data.data);
      } catch (e) {
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) return <Container><Card>Loading...</Card></Container>;
  if (!patient) return <Container><Card>Patient not found.</Card></Container>;

  return (
    <Container>
      <Card>
        <Title>Patient Profile</Title>
        <Row><Label>Patient ID:</Label> <Value>{patient.id}</Value></Row>
        <Row><Label>Name:</Label> <Value>{patient.name}</Value></Row>
        <Row><Label>Age:</Label> <Value>{patient.dateOfBirth ? (new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()) : 'N/A'}</Value></Row>
        <Row><Label>Contact:</Label> <Value>{patient.phone}</Value></Row>
        <Row><Label>Gender:</Label> <Value>{patient.gender}</Value></Row>
        <Row><Label>Created At:</Label> <Value>{patient.createdAt ? patient.createdAt : 'N/A'}</Value></Row>
        <Row><Label>Email:</Label> <Value>{patient.email}</Value></Row>
        <Row><Label>Password:</Label> <Value>******</Value></Row>
      </Card>
    </Container>
  );
};

export default PatientProfilePage;