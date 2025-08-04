import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.text};
  color: white;
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    color: #d1d5db;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.8rem;
  }
  
  a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    color: #d1d5db;
    
    svg {
      color: ${props => props.theme.colors.primary};
      font-size: 1.6rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
  color: #9ca3af;
  
  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .copyright {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .footer-links {
    display: flex;
    gap: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }
  
  a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
  
  @media (max-width: 768px) {
    .footer-bottom-content {
      flex-direction: column;
      text-align: center;
    }
  }
`;

const Newsletter = styled.div`
  margin-top: 1rem;
  
  .newsletter-form {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  
  input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1.4rem;
    outline: none;
  }
  
  button {
    padding: 1rem 2rem;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <h3>MedX</h3>
            <p>
              Pakistan's leading medical appointment booking platform. Connect with the best doctors 
              and healthcare providers across Pakistan for quality medical care.
            </p>
            <SocialLinks>
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Find Doctors</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Specialties</h3>
            <FooterLinks>
              <li><Link to="/search?specialty=cardiology">Cardiology</Link></li>
              <li><Link to="/search?specialty=dermatology">Dermatology</Link></li>
              <li><Link to="/search?specialty=orthopedics">Orthopedics</Link></li>
              <li><Link to="/search?specialty=pediatrics">Pediatrics</Link></li>
              <li><Link to="/search?specialty=neurology">Neurology</Link></li>
              <li><Link to="/search?specialty=psychiatry">Psychiatry</Link></li>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <div className="contact-item">
                <FaPhone />
                <span>+92 300 1234567</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@medx.pk</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Lahore, Pakistan</span>
              </div>
            </ContactInfo>
            
            <Newsletter>
              <h4>Subscribe to Newsletter</h4>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </Newsletter>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>© 2024 MedX. Made with</span>
              <FaHeart style={{ color: '#ef4444' }} />
              <span>in Pakistan</span>
            </div>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;