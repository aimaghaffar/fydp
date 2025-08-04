import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaUserMd, 
  FaHospital, 
  FaCalendarAlt,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaHeartbeat,
  FaAward
} from 'react-icons/fa';

const HomePageContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 8rem 0 6rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 4.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 3.2rem;
    }
  }
  
  p {
    font-size: 1.8rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const SearchSection = styled.section`
  background: white;
  padding: 4rem 0;
  margin-top: -3rem;
  position: relative;
  z-index: 10;
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SearchCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 2rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
  
  input, select {
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
`;

const SearchButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: ${props => props.theme.colors.background};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    width: 8rem;
    height: 8rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    color: white;
    font-size: 3rem;
  }
  
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
  }
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.primary};
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  .number {
    font-size: 4.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: block;
  }
  
  .label {
    font-size: 1.8rem;
    opacity: 0.9;
  }
`;

const PopularSpecialtiesSection = styled.section`
  padding: 8rem 0;
  background: white;
`;

const SpecialtiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SpecialtyCard = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  border: 2px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.4rem;
  }
`;

const HomePage = () => {
  const features = [
    {
      icon: <FaUserMd />,
      title: "Expert Doctors",
      description: "Connect with qualified and experienced doctors across Pakistan"
    },
    {
      icon: <FaHospital />,
      title: "Top Hospitals",
      description: "Access to the best hospitals and medical facilities"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Booking",
      description: "Book appointments instantly with our user-friendly platform"
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description: "Your health information is protected with state-of-the-art security"
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your medical needs"
    },
    {
      icon: <FaUsers />,
      title: "Patient Reviews",
      description: "Read authentic reviews from real patients to make informed decisions"
    }
  ];

  const specialties = [
    { name: "Cardiology", icon: <FaHeartbeat />, description: "Heart specialists" },
    { name: "Dermatology", icon: <FaUserMd />, description: "Skin care experts" },
    { name: "Orthopedics", icon: <FaUserMd />, description: "Bone & joint specialists" },
    { name: "Pediatrics", icon: <FaUserMd />, description: "Child healthcare" },
    { name: "Neurology", icon: <FaUserMd />, description: "Brain & nerve specialists" },
    { name: "Psychiatry", icon: <FaUserMd />, description: "Mental health experts" }
  ];

  return (
    <HomePageContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Find the Best Doctors in Pakistan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Book appointments with qualified doctors, specialists, and healthcare providers 
              across Pakistan. Get the medical care you deserve with MedX.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HeroActions>
                <Link to="/search" className="btn btn-primary">
                  Find Doctors
                </Link>
                <Link to="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </HeroActions>
            </motion.div>
          </HeroText>
          <HeroImage>
            <motion.img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Medical professionals"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </HeroImage>
        </HeroContent>
      </HeroSection>

      <SearchSection>
        <SearchContainer>
          <SearchCard>
            <SearchForm>
              <FormGroup>
                <label>Specialty</label>
                <select>
                  <option>All Specialties</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Neurology</option>
                  <option>Psychiatry</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Location</label>
                <input type="text" placeholder="Enter city or area" />
              </FormGroup>
              <SearchButton type="submit">
                <FaSearch />
                Search Doctors
              </SearchButton>
            </SearchForm>
          </SearchCard>
        </SearchContainer>
      </SearchSection>

      <FeaturesSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose MedX?
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pakistan's trusted platform for connecting patients with the best healthcare providers
          </motion.p>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <span className="number">10,000+</span>
            <span className="label">Doctors</span>
          </StatCard>
          <StatCard>
            <span className="number">500+</span>
            <span className="label">Hospitals</span>
          </StatCard>
          <StatCard>
            <span className="number">50+</span>
            <span className="label">Cities</span>
          </StatCard>
          <StatCard>
            <span className="number">100,000+</span>
            <span className="label">Happy Patients</span>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <PopularSpecialtiesSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Popular Specialties
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find specialists in various medical fields across Pakistan
          </motion.p>
          <SpecialtiesGrid>
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SpecialtyCard to={`/search?specialty=${specialty.name.toLowerCase()}`}>
                  <div className="icon">{specialty.icon}</div>
                  <h3>{specialty.name}</h3>
                  <p>{specialty.description}</p>
                </SpecialtyCard>
              </motion.div>
            ))}
          </SpecialtiesGrid>
        </div>
      </PopularSpecialtiesSection>
    </HomePageContainer>
  );
};

export default HomePage;