# MedX - Medical Appointment Booking Platform

A comprehensive medical appointment booking platform built with React frontend and Node.js backend, specifically designed for Pakistan's healthcare sector.

## Features

### Frontend Features
- 🏠 **Modern Homepage** with hero section and features
- 🔍 **Doctor Search** with advanced filters
- 👨‍⚕️ **Doctor Profiles** with detailed information and reviews
- 📅 **Appointment Booking** with time slot selection
- 👤 **User Authentication** (Login/Register)
- 📊 **User Dashboard** for appointment management
- 👤 **Profile Management** with medical history
- 📞 **Contact Page** with support form
- 📱 **Responsive Design** for all devices

### Backend Features
- 🔐 **JWT Authentication** with secure login/register
- 👨‍⚕️ **Doctor Management** with search and filtering
- 📅 **Appointment System** with booking and management
- 👤 **User Profile Management** with medical history
- 🏥 **Specialties Management** for medical fields
- 🔒 **Protected Routes** with middleware
- ✅ **Input Validation** with express-validator

## Tech Stack

### Frontend
- **React 18** - UI Framework
- **React Router** - Navigation
- **Styled Components** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=7d
   BCRYPT_ROUNDS=12
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to root directory:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Doctors
- `GET /api/doctors` - Get all doctors with filters
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialty/:specialty` - Get doctors by specialty

### Appointments
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/upcoming` - Get upcoming appointments

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/emergency-contact` - Add emergency contact
- `GET /api/users/medical-history` - Get medical history
- `POST /api/users/medical-history` - Add medical history
- `DELETE /api/users/medical-history/:id` - Delete medical history

### Specialties
- `GET /api/specialties` - Get all specialties
- `GET /api/specialties/:id` - Get specialty by ID
- `GET /api/specialties/popular` - Get popular specialties

## Project Structure

```
medx/
├── server/                 # Backend
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── src/                   # Frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── styles/           # Global styles and theme
│   └── App.js            # Main app component
├── public/               # Static files
└── package.json          # Frontend dependencies
```

## Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Search Doctors** - Find doctors by specialty, location, or name
3. **View Profiles** - See detailed doctor information and reviews
4. **Book Appointments** - Schedule appointments with preferred doctors
5. **Manage Profile** - Update personal information and medical history
6. **Track Appointments** - View upcoming and past appointments

### For Developers
1. **Frontend Development** - Run `npm start` in root directory
2. **Backend Development** - Run `npm run dev` in server directory
3. **API Testing** - Use tools like Postman or Thunder Client
4. **Database Integration** - Replace mock data with actual database

## Mock Data

The application currently uses mock data for demonstration. To integrate with a real database:

1. **Choose a Database** (MongoDB, PostgreSQL, MySQL)
2. **Update Models** - Create database models
3. **Replace Mock Data** - Update routes to use database
4. **Add Migrations** - Set up database schema

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: info@medx.pk
- Phone: +92 300 1234567

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time notifications
- [ ] Video consultations
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Integration with hospital systems

---

**Made with ❤️ for Pakistan's Healthcare Sector**
