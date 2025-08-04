import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 4rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.6rem;
  }
`;

const LoginForm = styled.form`
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
  
  .input-group {
    position: relative;
  }
  
  input {
    width: 100%;
    padding: 1.5rem 1.5rem 1.5rem 4.5rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 12px;
    font-size: 1.6rem;
    outline: none;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
  
  .input-icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textLight};
    font-size: 1.8rem;
  }
  
  .password-toggle {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: ${props => props.theme.colors.textLight};
    cursor: pointer;
    font-size: 1.8rem;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }
  
  span {
    padding: 0 2rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.4rem;
  }
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.2rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  background: white;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
  
  &.google {
    &:hover {
      border-color: #ea4335;
      color: #ea4335;
    }
  }
  
  &.facebook {
    &:hover {
      border-color: #1877f2;
      color: #1877f2;
    }
  }
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.4rem;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  border: 1px solid #fecaca;
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Success - navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Handle social login
  };

  return (
    <LoginPageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LoginHeader>
          <h1>Welcome Back</h1>
          <p>Sign in to your MedX account</p>
        </LoginHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginForm onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </LoginButton>
        </LoginForm>

        <ForgotPassword>
          <Link to="/forgot-password">Forgot your password?</Link>
        </ForgotPassword>

        <Divider>
          <span>or continue with</span>
        </Divider>

        <SocialButtons>
          <SocialButton 
            type="button" 
            className="google"
            onClick={() => handleSocialLogin('Google')}
          >
            <FaGoogle />
            Google
          </SocialButton>
          <SocialButton 
            type="button" 
            className="facebook"
            onClick={() => handleSocialLogin('Facebook')}
          >
            <FaFacebook />
            Facebook
          </SocialButton>
        </SocialButtons>

        <SignUpLink>
          Don't have an account? <Link to="/register">Sign up</Link>
        </SignUpLink>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;