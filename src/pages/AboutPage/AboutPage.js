import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaAward, FaShieldAlt } from 'react-icons/fa';

const AboutPageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const AboutHero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 8rem 0 6rem;
  text-align: center;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutSection = styled.section`
  padding: 8rem 0;
  background: white;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-size: 1.8rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 2rem;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const MissionSection = styled.section`
  padding: 8rem 0;
  background: ${props => props.theme.colors.background};
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const MissionCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
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

const AboutPage = () => {
  const missions = [
    {
      icon: <FaHeart />,
      title: "Patient-Centered Care",
      description: "We prioritize patient well-being and ensure every individual receives personalized, compassionate healthcare."
    },
    {
      icon: <FaUsers />,
      title: "Connect Communities",
      description: "Bridging the gap between patients and healthcare providers across Pakistan for better access to medical care."
    },
    {
      icon: <FaAward />,
      title: "Quality Healthcare",
      description: "Partnering with the best doctors and hospitals to ensure high-quality medical services for all patients."
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust & Security",
      description: "Maintaining the highest standards of data security and privacy for all our users' health information."
    }
  ];

  return (
    <AboutPageContainer>
      <AboutHero>
        <AboutContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4.8rem', fontWeight: '700', marginBottom: '2rem' }}
          >
            About MedX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '2rem', opacity: '0.9' }}
          >
            Pakistan's leading medical appointment booking platform
          </motion.p>
        </AboutContent>
      </AboutHero>

      <AboutSection>
        <AboutContent>
          <AboutGrid>
            <AboutText>
              <h2>Our Story</h2>
              <p>
                MedX was founded with a simple yet powerful mission: to make quality healthcare 
                accessible to every Pakistani. We understand the challenges patients face when 
                trying to find the right doctor, book appointments, and manage their healthcare journey.
              </p>
              <p>
                Our platform connects patients with qualified doctors, specialists, and healthcare 
                providers across Pakistan. We believe that everyone deserves access to quality 
                medical care, regardless of their location or background.
              </p>
            </AboutText>
            <AboutImage>
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Medical professionals" 
              />
            </AboutImage>
          </AboutGrid>
        </AboutContent>
      </AboutSection>

      <MissionSection>
        <AboutContent>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are committed to transforming healthcare in Pakistan through technology and innovation
          </motion.p>
          
          <MissionGrid>
            {missions.map((mission, index) => (
              <MissionCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{mission.icon}</div>
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
              </MissionCard>
            ))}
          </MissionGrid>
        </AboutContent>
      </MissionSection>
    </AboutPageContainer>
  );
};

export default AboutPage;