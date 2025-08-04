import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaHospital,
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaCheckCircle
} from 'react-icons/fa';

const ProfilePageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem 0;
`;

const ProfileContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProfileHeader = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const DoctorImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DoctorInfo = styled.div`
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  .specialty {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.colors.accent};
    font-weight: 600;
    font-size: 1.6rem;
  }
`;

const BookingCard = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  
  .fee {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .availability {
    font-size: 1.4rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const BookButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: 1.2rem 3rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.6rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  .section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    
    h2 {
      font-size: 2.4rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${props => props.theme.colors.text};
    }
  }
`;

const AboutSection = styled.div`
  .qualifications {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .qualification-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: ${props => props.theme.colors.backgroundSecondary};
      border-radius: 8px;
      
      svg {
        color: ${props => props.theme.colors.primary};
        font-size: 1.8rem;
      }
    }
  }
  
  .experience {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
    font-size: 1.6rem;
  }
`;

const ReviewsSection = styled.div`
  .review {
    border-bottom: 1px solid ${props => props.theme.colors.border};
    padding: 1.5rem 0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      .reviewer {
        font-weight: 600;
        color: ${props => props.theme.colors.text};
      }
      
      .rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${props => props.theme.colors.accent};
      }
    }
    
    .review-text {
      color: ${props => props.theme.colors.textLight};
      line-height: 1.6;
    }
  }
`;

const Sidebar = styled.div`
  .sidebar-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    
    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${props => props.theme.colors.text};
    }
  }
  
  .contact-info {
    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      color: ${props => props.theme.colors.textLight};
      
      svg {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
  
  .specialties {
    .specialty-tag {
      display: inline-block;
      background: ${props => props.theme.colors.backgroundSecondary};
      color: ${props => props.theme.colors.primary};
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin: 0.5rem;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
`;

const DoctorProfilePage = () => {
  const { id } = useParams();
  
  // Mock doctor data
  const doctor = {
    id: id,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiology",
    hospital: "Shaukat Khanum Memorial Hospital",
    location: "Lahore, Pakistan",
    rating: 4.8,
    reviews: 127,
    experience: "15 years",
    consultationFee: "Rs. 2,500",
    availability: "Mon-Fri, 9AM-5PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - King Edward Medical University",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Fellowship in Cardiology - Aga Khan University"
    ],
    about: "Dr. Ahmed Khan is a highly experienced cardiologist with over 15 years of practice in Pakistan. He specializes in interventional cardiology and has performed thousands of successful procedures. Dr. Khan is known for his compassionate approach to patient care and his commitment to staying updated with the latest medical advancements.",
    specialties: ["Interventional Cardiology", "Echocardiography", "Cardiac Catheterization", "Preventive Cardiology"],
    contact: {
      phone: "+92 300 1234567",
      email: "dr.ahmed.khan@medx.pk",
      address: "Shaukat Khanum Memorial Hospital, Lahore"
    },
    reviews: [
      {
        id: 1,
        reviewer: "Fatima Ali",
        rating: 5,
        text: "Excellent doctor with great bedside manner. Very thorough in his examination and explained everything clearly."
      },
      {
        id: 2,
        reviewer: "Muhammad Hassan",
        rating: 4,
        text: "Very professional and knowledgeable. The waiting time was reasonable and the staff was helpful."
      },
      {
        id: 3,
        reviewer: "Ayesha Malik",
        rating: 5,
        text: "Dr. Khan is one of the best cardiologists I've consulted. His diagnosis was accurate and treatment effective."
      }
    ]
  };

  return (
    <ProfilePageContainer>
      <ProfileContent>
        <ProfileHeader>
          <DoctorImage>
            <img src={doctor.image} alt={doctor.name} />
          </DoctorImage>
          
          <DoctorInfo>
            <h1>{doctor.name}</h1>
            <div className="specialty">{doctor.specialty}</div>
            <div className="location">
              <FaMapMarkerAlt />
              {doctor.hospital}, {doctor.location}
            </div>
            <div className="rating">
              <FaStar />
              {doctor.rating} ({doctor.reviews} reviews)
            </div>
          </DoctorInfo>
          
          <BookingCard>
            <div className="fee">{doctor.consultationFee}</div>
            <div className="availability">{doctor.availability}</div>
            <BookButton to={`/booking/${doctor.id}`}>
              Book Appointment
            </BookButton>
          </BookingCard>
        </ProfileHeader>

        <ProfileDetails>
          <MainContent>
            <AboutSection className="section">
              <h2>About Dr. {doctor.name.split(' ')[1]}</h2>
              <div className="qualifications">
                {doctor.qualifications.map((qual, index) => (
                  <div key={index} className="qualification-item">
                    <FaGraduationCap />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
              <p className="experience">{doctor.about}</p>
            </AboutSection>

            <ReviewsSection className="section">
              <h2>Patient Reviews</h2>
              {doctor.reviews.map((review) => (
                <div key={review.id} className="review">
                  <div className="review-header">
                    <span className="reviewer">{review.reviewer}</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} style={{ color: i < review.rating ? '#f59e0b' : '#e5e7eb' }} />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </ReviewsSection>
          </MainContent>

          <Sidebar>
            <div className="sidebar-card">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FaPhone />
                  <span>{doctor.contact.phone}</span>
                </div>
                <div className="contact-item">
                  <FaHospital />
                  <span>{doctor.contact.address}</span>
                </div>
                <div className="contact-item">
                  <FaClock />
                  <span>{doctor.availability}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Specialties</h3>
              <div className="specialties">
                {doctor.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Experience</h3>
              <div className="contact-item">
                <FaUserMd />
                <span>{doctor.experience} of experience</span>
              </div>
              <div className="contact-item">
                <FaAward />
                <span>Board Certified</span>
              </div>
              <div className="contact-item">
                <FaUsers />
                <span>1000+ patients treated</span>
              </div>
            </div>
          </Sidebar>
        </ProfileDetails>
      </ProfileContent>
    </ProfilePageContainer>
  );
};

export default DoctorProfilePage;