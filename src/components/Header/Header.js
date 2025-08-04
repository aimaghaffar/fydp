import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaPhone,
  FaMapMarkerAlt 
} from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderTop = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.8rem 0;
  font-size: 1.4rem;
`;

const HeaderTopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderMain = styled.div`
  padding: 1.5rem 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  span {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem 1.2rem 4.8rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 50px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textLight};
  font-size: 1.6rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundSecondary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.4rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &.btn-outline {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
  
  &.btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
      border-color: ${props => props.theme.colors.primaryDark};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2.4rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1001;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.8rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        <HeaderTopContent>
          <ContactInfo>
            <ContactItem>
              <FaPhone />
              <span>+92 300 1234567</span>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Lahore, Pakistan</span>
            </ContactItem>
          </ContactInfo>
          <div>
            <span>24/7 Medical Support</span>
          </div>
        </HeaderTopContent>
      </HeaderTop>
      
      <HeaderMain>
        <HeaderContent>
          <Logo to="/">
            <span>MedX</span>
          </Logo>
          
          <SearchBar>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search for doctors, specialties, or hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon />
            </form>
          </SearchBar>
          
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Find Doctors</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Nav>
          
          <AuthButtons>
            <Button className="btn-outline" onClick={() => navigate('/login')}>
              <FaUser />
              Login
            </Button>
            <Button className="btn-primary" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </AuthButtons>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </HeaderContent>
      </HeaderMain>
      
      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <MobileMenuHeader>
            <Logo to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <span>MedX</span>
            </Logo>
            <MobileMenuButton onClick={toggleMobileMenu}>
              <FaTimes />
            </MobileMenuButton>
          </MobileMenuHeader>
          
          <MobileNav>
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/search" onClick={() => setIsMobileMenuOpen(false)}>
              Find Doctors
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </MobileNavLink>
            <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>
              Sign Up
            </MobileNavLink>
          </MobileNav>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;