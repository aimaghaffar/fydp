import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { doctorsAPI } from '../../services/api';

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

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await doctorsAPI.getById(id);
        setDoctor(res.data.data);
      } catch (e) {
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <Container><Card>Loading...</Card></Container>;
  if (!doctor) return <Container><Card>Doctor not found.</Card></Container>;

  return (
    <Container>
      <Card>
        <Title>Doctor Details</Title>
        <Row><Label>Doctor ID:</Label> <Value>{doctor.id}</Value></Row>
        <Row><Label>Name:</Label> <Value>{doctor.name}</Value></Row>
        <Row><Label>Specialty:</Label> <Value>{doctor.specialty}</Value></Row>
        <Row><Label>Contact:</Label> <Value>{doctor.contact?.phone}</Value></Row>
        <Row><Label>Available Days:</Label> <Value>{doctor.availability}</Value></Row>
        <Row><Label>Rating:</Label> <Value>{doctor.rating}</Value></Row>
        <Row><Label>Created At:</Label> <Value>{doctor.createdAt ? doctor.createdAt : 'N/A'}</Value></Row>
        <Row><Label>Email:</Label> <Value>{doctor.contact?.email}</Value></Row>
        <Row><Label>Password:</Label> <Value>******</Value></Row>
      </Card>
    </Container>
  );
};

export default DoctorDetailPage;