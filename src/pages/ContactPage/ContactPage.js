import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane
} from 'react-icons/fa';

const ContactPageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const ContactHero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 6rem 0;
  text-align: center;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContactSection = styled.section`
  padding: 8rem 0;
  background: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
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
    margin-bottom: 3rem;
  }
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    svg {
      color: ${props => props.theme.colors.primary};
      font-size: 2rem;
    }
    
    .contact-details {
      h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: ${props => props.theme.colors.text};
      }
      
      p {
        color: ${props => props.theme.colors.textLight};
        font-size: 1.4rem;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
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

const ContactForm = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
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
  
  input, textarea, select {
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
    min-height: 120px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
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

const SuccessMessage = styled.div`
  background: #dcfce7;
  color: #166534;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  border: 1px solid #bbf7d0;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setLoading(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <ContactPageContainer>
      <ContactHero>
        <ContactContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4.8rem', fontWeight: '700', marginBottom: '2rem' }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '2rem', opacity: '0.9' }}
          >
            We're here to help with all your medical appointment needs
          </motion.p>
        </ContactContent>
      </ContactHero>

      <ContactSection>
        <ContactContent>
          <ContactGrid>
            <ContactInfo>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Contact Information
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Have questions about our services or need help booking an appointment? 
                Our support team is here to assist you 24/7.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <ContactCard>
                  <div className="contact-item">
                    <FaPhone />
                    <div className="contact-details">
                      <h3>Phone</h3>
                      <p>+92 300 1234567</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope />
                    <div className="contact-details">
                      <h3>Email</h3>
                      <p>info@medx.pk</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaMapMarkerAlt />
                    <div className="contact-details">
                      <h3>Address</h3>
                      <p>Lahore, Pakistan</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <FaClock />
                    <div className="contact-details">
                      <h3>Support Hours</h3>
                      <p>24/7 Available</p>
                    </div>
                  </div>
                </ContactCard>

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
              </motion.div>
            </ContactInfo>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ContactForm onSubmit={handleSubmit}>
                <h3>Send us a Message</h3>
                
                {success && (
                  <SuccessMessage>
                    Thank you for your message! We'll get back to you soon.
                  </SuccessMessage>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Appointment Booking</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Sending...' : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </SubmitButton>
              </ContactForm>
            </motion.div>
          </ContactGrid>
        </ContactContent>
      </ContactSection>
    </ContactPageContainer>
  );
};

export default ContactPage;