import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaHeartbeat,
  FaEmergency,
  FaShieldAlt
} from 'react-icons/fa';
import { usersAPI } from '../../services/api';

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
  text-align: center;
  
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.6rem;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  h2 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const ProfileForm = styled.form`
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

const SaveButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1.2rem 2.4rem;
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
  
  &:disabled {
    background: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`;

const MedicalHistoryItem = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h4 {
      font-size: 1.6rem;
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      
      button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.4rem;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &.edit {
          color: ${props => props.theme.colors.primary};
          
          &:hover {
            background: ${props => props.theme.colors.backgroundSecondary};
          }
        }
        
        &.delete {
          color: ${props => props.theme.colors.error};
          
          &:hover {
            background: #fef2f2;
          }
        }
      }
    }
  }
  
  .history-details {
    color: ${props => props.theme.colors.textLight};
    font-size: 1.4rem;
    
    .detail-item {
      margin-bottom: 0.5rem;
      
      strong {
        color: ${props => props.theme.colors.text};
      }
    }
  }
`;

const AddButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
    transform: translateY(-2px);
  }
`;

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: ''
  });
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await usersAPI.getProfile();
      const userData = response.data.data;
      
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
        bloodGroup: userData.bloodGroup || ''
      });

      if (userData.emergencyContact) {
        setEmergencyContact(userData.emergencyContact);
      }

      if (userData.medicalHistory) {
        setMedicalHistory(userData.medicalHistory);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleEmergencyContactChange = (e) => {
    setEmergencyContact({
      ...emergencyContact,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await usersAPI.updateProfile(profile);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmergencyContact = async () => {
    setLoading(true);
    try {
      await usersAPI.addEmergencyContact(emergencyContact);
    } catch (error) {
      console.error('Error updating emergency contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicalHistory = () => {
    const newEntry = {
      id: Date.now(),
      condition: '',
      diagnosisDate: '',
      medications: [],
      notes: '',
      isEditing: true
    };
    setMedicalHistory([...medicalHistory, newEntry]);
  };

  const handleMedicalHistoryChange = (id, field, value) => {
    setMedicalHistory(medicalHistory.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSaveMedicalHistory = async (entry) => {
    try {
      const { isEditing, ...entryData } = entry;
      await usersAPI.addMedicalHistory(entryData);
      fetchProfile(); // Refresh data
    } catch (error) {
      console.error('Error saving medical history:', error);
    }
  };

  const handleDeleteMedicalHistory = async (id) => {
    try {
      await usersAPI.deleteMedicalHistory(id);
      setMedicalHistory(medicalHistory.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting medical history:', error);
    }
  };

  return (
    <ProfilePageContainer>
      <ProfileContent>
        <ProfileHeader>
          <h1>My Profile</h1>
          <p>Manage your account settings and medical information</p>
        </ProfileHeader>

        <ProfileGrid>
          <ProfileCard>
            <h2>
              <FaUser />
              Personal Information
            </h2>
            <ProfileForm>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleProfileChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  disabled={!editing}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleProfileChange}
                  disabled={!editing}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {editing ? (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <SaveButton onClick={handleSaveProfile} disabled={loading}>
                    <FaSave />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </SaveButton>
                  <SaveButton 
                    onClick={() => setEditing(false)}
                    style={{ background: props => props.theme.colors.textLight }}
                  >
                    <FaTimes />
                    Cancel
                  </SaveButton>
                </div>
              ) : (
                <SaveButton onClick={() => setEditing(true)}>
                  <FaEdit />
                  Edit Profile
                </SaveButton>
              )}
            </ProfileForm>
          </ProfileCard>

          <ProfileCard>
            <h2>
              <FaEmergency />
              Emergency Contact
            </h2>
            <ProfileForm>
              <div className="form-group">
                <label htmlFor="emergencyName">Contact Name</label>
                <input
                  type="text"
                  id="emergencyName"
                  name="name"
                  value={emergencyContact.name}
                  onChange={handleEmergencyContactChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="phone"
                  value={emergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="relationship">Relationship</label>
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  value={emergencyContact.relationship}
                  onChange={handleEmergencyContactChange}
                />
              </div>

              <SaveButton onClick={handleSaveEmergencyContact} disabled={loading}>
                <FaSave />
                {loading ? 'Saving...' : 'Save Emergency Contact'}
              </SaveButton>
            </ProfileForm>
          </ProfileCard>
        </ProfileGrid>

        <ProfileCard style={{ marginTop: '2rem' }}>
          <h2>
            <FaHeartbeat />
            Medical History
          </h2>
          
          <AddButton onClick={handleAddMedicalHistory}>
            <FaPlus />
            Add Medical History Entry
          </AddButton>

          {medicalHistory.map((entry) => (
            <MedicalHistoryItem key={entry.id}>
              <div className="history-header">
                <h4>{entry.condition || 'New Entry'}</h4>
                <div className="actions">
                  {entry.isEditing ? (
                    <button 
                      className="edit"
                      onClick={() => handleSaveMedicalHistory(entry)}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button className="edit">
                      <FaEdit />
                    </button>
                  )}
                  <button 
                    className="delete"
                    onClick={() => handleDeleteMedicalHistory(entry.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              
              {entry.isEditing ? (
                <div>
                  <div className="form-group">
                    <label>Medical Condition</label>
                    <input
                      type="text"
                      value={entry.condition}
                      onChange={(e) => handleMedicalHistoryChange(entry.id, 'condition', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Diagnosis Date</label>
                    <input
                      type="date"
                      value={entry.diagnosisDate}
                      onChange={(e) => handleMedicalHistoryChange(entry.id, 'diagnosisDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Notes</label>
                    <input
                      type="text"
                      value={entry.notes}
                      onChange={(e) => handleMedicalHistoryChange(entry.id, 'notes', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="history-details">
                  <div className="detail-item">
                    <strong>Condition:</strong> {entry.condition}
                  </div>
                  <div className="detail-item">
                    <strong>Diagnosis Date:</strong> {entry.diagnosisDate}
                  </div>
                  {entry.notes && (
                    <div className="detail-item">
                      <strong>Notes:</strong> {entry.notes}
                    </div>
                  )}
                </div>
              )}
            </MedicalHistoryItem>
          ))}
        </ProfileCard>
      </ProfileContent>
    </ProfilePageContainer>
  );
};

export default ProfilePage;