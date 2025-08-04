import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaStar, 
  FaMapMarkerAlt, 
  FaPhone,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaClock,
  FaEye
} from 'react-icons/fa';

const SearchPageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const SearchHeader = styled.div`
  background: white;
  padding: 3rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
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

const SearchContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text};
  
  input[type="checkbox"] {
    width: auto;
    margin: 0;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ResultsSection = styled.div`
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }
  }
  
  .results-count {
    font-size: 1.6rem;
    color: ${props => props.theme.colors.textLight};
  }
  
  .sort-select {
    padding: 0.8rem 1.2rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    font-size: 1.4rem;
    outline: none;
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const DoctorCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const DoctorHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DoctorImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DoctorInfo = styled.div`
  flex: 1;
  
  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  .specialty {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.colors.accent};
    font-weight: 600;
  }
`;

const DoctorDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: ${props => props.theme.colors.textLight};
    
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const DoctorActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  &.btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
    }
  }
  
  &.btn-outline {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h3 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.6rem;
  }
`;

const SearchDoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    rating: '',
    experience: '',
    availability: ''
  });

  // Mock data for doctors
  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Ahmed Khan",
      specialty: "Cardiology",
      hospital: "Shaukat Khanum Memorial Hospital",
      location: "Lahore",
      rating: 4.8,
      experience: "15 years",
      consultationFee: "Rs. 2,500",
      availability: "Mon-Fri, 9AM-5PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Dr. Fatima Ali",
      specialty: "Dermatology",
      hospital: "Aga Khan University Hospital",
      location: "Karachi",
      rating: 4.9,
      experience: "12 years",
      consultationFee: "Rs. 3,000",
      availability: "Mon-Sat, 10AM-6PM",
      image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Dr. Muhammad Hassan",
      specialty: "Orthopedics",
      hospital: "Pakistan Institute of Medical Sciences",
      location: "Islamabad",
      rating: 4.7,
      experience: "18 years",
      consultationFee: "Rs. 2,800",
      availability: "Mon-Fri, 8AM-4PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Dr. Ayesha Malik",
      specialty: "Pediatrics",
      hospital: "Children's Hospital",
      location: "Lahore",
      rating: 4.9,
      experience: "10 years",
      consultationFee: "Rs. 2,200",
      availability: "Mon-Sat, 9AM-5PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      name: "Dr. Usman Khan",
      specialty: "Neurology",
      hospital: "Jinnah Postgraduate Medical Centre",
      location: "Karachi",
      rating: 4.6,
      experience: "20 years",
      consultationFee: "Rs. 3,500",
      availability: "Mon-Fri, 9AM-6PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      name: "Dr. Sana Ahmed",
      specialty: "Psychiatry",
      hospital: "Institute of Psychiatry",
      location: "Rawalpindi",
      rating: 4.8,
      experience: "14 years",
      consultationFee: "Rs. 2,800",
      availability: "Mon-Sat, 10AM-7PM",
      image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching with filters:', filters);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleBookAppointment = (doctorId) => {
    // Navigate to booking page
    console.log('Booking appointment for doctor:', doctorId);
  };

  const handleViewProfile = (doctorId) => {
    // Navigate to doctor profile
    console.log('Viewing profile for doctor:', doctorId);
  };

  return (
    <SearchPageContainer>
      <SearchHeader>
        <SearchHeaderContent>
          <SearchForm onSubmit={handleSearch}>
            <FormGroup>
              <label>Specialty</label>
              <select 
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
              >
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="neurology">Neurology</option>
                <option value="psychiatry">Psychiatry</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Location</label>
              <input 
                type="text" 
                placeholder="Enter city or area"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label>Experience</label>
              <select 
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">Any Experience</option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </FormGroup>
            <SearchButton type="submit">
              <FaSearch />
              Search
            </SearchButton>
          </SearchForm>
        </SearchHeaderContent>
      </SearchHeader>

      <SearchContent>
        <FiltersSection>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: '600' }}>
            <FaFilter style={{ marginRight: '0.8rem' }} />
            Filters
          </h2>
          
          <FilterGroup>
            <h3>Rating</h3>
            <FilterOption>
              <input type="checkbox" />
              <span>4.5+ Stars</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>4.0+ Stars</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>3.5+ Stars</span>
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <h3>Availability</h3>
            <FilterOption>
              <input type="checkbox" />
              <span>Available Today</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>Available This Week</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>Weekend Available</span>
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <h3>Consultation Fee</h3>
            <FilterOption>
              <input type="checkbox" />
              <span>Under Rs. 2,000</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>Rs. 2,000 - 3,000</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>Rs. 3,000 - 5,000</span>
            </FilterOption>
            <FilterOption>
              <input type="checkbox" />
              <span>Above Rs. 5,000</span>
            </FilterOption>
          </FilterGroup>
        </FiltersSection>

        <ResultsSection>
          <div className="results-header">
            <div className="results-count">
              {loading ? 'Searching...' : `${doctors.length} doctors found`}
            </div>
            <select className="sort-select">
              <option>Sort by: Relevance</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Experience</option>
              <option>Sort by: Fee</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <p>Loading doctors...</p>
            </div>
          ) : doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <DoctorCard
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DoctorHeader>
                  <DoctorImage>
                    <img src={doctor.image} alt={doctor.name} />
                  </DoctorImage>
                  <DoctorInfo>
                    <h3>{doctor.name}</h3>
                    <div className="specialty">{doctor.specialty}</div>
                    <div className="location">
                      <FaMapMarkerAlt />
                      {doctor.hospital}, {doctor.location}
                    </div>
                    <div className="rating">
                      <FaStar />
                      {doctor.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                    </div>
                  </DoctorInfo>
                </DoctorHeader>

                <DoctorDetails>
                  <div className="detail-item">
                    <FaUserMd />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="detail-item">
                    <FaHospital />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{doctor.consultationFee}</span>
                  </div>
                </DoctorDetails>

                <DoctorActions>
                  <ActionButton 
                    className="btn-primary"
                    onClick={() => handleBookAppointment(doctor.id)}
                  >
                    <FaCalendarAlt />
                    Book Appointment
                  </ActionButton>
                  <ActionButton 
                    className="btn-outline"
                    onClick={() => handleViewProfile(doctor.id)}
                  >
                    <FaEye />
                    View Profile
                  </ActionButton>
                  <ActionButton className="btn-outline">
                    <FaPhone />
                    Call Now
                  </ActionButton>
                </DoctorActions>
              </DoctorCard>
            ))
          ) : (
            <NoResults>
              <h3>No doctors found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </NoResults>
          )}
        </ResultsSection>
      </SearchContent>
    </SearchPageContainer>
  );
};

export default SearchDoctorsPage;