import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import HomePage from './pages/HomePage/HomePage';
import SearchDoctorsPage from './pages/SearchDoctorsPage/SearchDoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage/DoctorProfilePage';
import BookingPage from './pages/BookingPage/BookingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AppointmentDetailPage from './pages/AppointmentDetailPage/AppointmentDetailPage';
import DoctorDetailPage from './pages/DoctorDetailPage/DoctorDetailPage';
import PatientProfilePage from './pages/PatientProfilePage/PatientProfilePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchDoctorsPage />} />
              <Route path="/doctor/:id" element={<DoctorProfilePage />} />
              <Route path="/booking/:doctorId" element={<BookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/appointment/:id" element={<AppointmentDetailPage />} />
              <Route path="/doctor-detail/:id" element={<DoctorDetailPage />} />
              <Route path="/patient/:id" element={<PatientProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;