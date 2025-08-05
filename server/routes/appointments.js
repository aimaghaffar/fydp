const express = require('express');
const { body } = require('express-validator');
const { auth, validateRequest } = require('../middleware/auth');

const router = express.Router();

// Mock appointments data (replace with database)
let appointments = [
  {
    id: 1,
    userId: 1,
    doctorId: 1,
    doctorName: "Dr. Ahmed Khan",
    specialty: "Cardiology",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    symptoms: "Chest pain and shortness of breath",
    notes: "First consultation",
    createdAt: new Date()
  },
  {
    id: 2,
    userId: 1,
    doctorId: 2,
    doctorName: "Dr. Fatima Ali",
    specialty: "Dermatology",
    date: "2024-01-10",
    time: "02:30 PM",
    status: "completed",
    symptoms: "Skin rash and itching",
    notes: "Follow-up appointment",
    createdAt: new Date()
  }
];

// Validation rules
const appointmentValidation = [
  body('doctorId').isInt().withMessage('Doctor ID must be a number'),
  body('date').isDate().withMessage('Please enter a valid date'),
  body('time').notEmpty().withMessage('Time is required'),
  body('symptoms').notEmpty().withMessage('Symptoms are required'),
  body('name').notEmpty().withMessage('Patient name is required'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('email').isEmail().withMessage('Please enter a valid email')
];

// @route   POST /api/appointments
// @desc    Book a new appointment
// @access  Private
router.post('/', auth, appointmentValidation, validateRequest, async (req, res) => {
  try {
    const { doctorId, date, time, symptoms, notes, name, phone, email } = req.body;

    // Check if time slot is available (mock check)
    const existingAppointment = appointments.find(apt => 
      apt.doctorId === parseInt(doctorId) && 
      apt.date === date && 
      apt.time === time &&
      apt.status !== 'cancelled'
    );

    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Get doctor info (mock)
    const doctor = {
      name: "Dr. Ahmed Khan",
      specialty: "Cardiology"
    };

    // Create new appointment
    const newAppointment = {
      id: appointments.length + 1,
      userId: req.user.id,
      doctorId: parseInt(doctorId),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      status: 'confirmed',
      symptoms,
      notes: notes || '',
      patientName: name,
      patientPhone: phone,
      patientEmail: email,
      createdAt: new Date()
    };

    appointments.push(newAppointment);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/appointments
// @desc    Get user's appointments
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userAppointments = appointments.filter(apt => apt.userId === req.user.id);
    
    res.json({
      success: true,
      count: userAppointments.length,
      data: userAppointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = appointments.find(apt => 
      apt.id === parseInt(req.params.id) && apt.userId === req.user.id
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointmentIndex = appointments.findIndex(apt => 
      apt.id === parseInt(req.params.id) && apt.userId === req.user.id
    );
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment
    appointments[appointmentIndex] = {
      ...appointments[appointmentIndex],
      status: status || appointments[appointmentIndex].status,
      notes: notes || appointments[appointmentIndex].notes,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointments[appointmentIndex]
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel appointment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointmentIndex = appointments.findIndex(apt => 
      apt.id === parseInt(req.params.id) && apt.userId === req.user.id
    );
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Cancel appointment
    appointments[appointmentIndex].status = 'cancelled';
    appointments[appointmentIndex].cancelledAt = new Date();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/appointments/upcoming
// @desc    Get upcoming appointments
// @access  Private
router.get('/upcoming', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const upcomingAppointments = appointments.filter(apt => 
      apt.userId === req.user.id && 
      apt.date >= today && 
      apt.status === 'confirmed'
    );
    
    res.json({
      success: true,
      count: upcomingAppointments.length,
      data: upcomingAppointments
    });
  } catch (error) {
    console.error('Get upcoming appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;