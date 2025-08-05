const express = require('express');
const { body } = require('express-validator');
const { auth, validateRequest } = require('../middleware/auth');

const router = express.Router();

// Mock user data (replace with database)
let users = [
  {
    id: 1,
    name: 'Test User',
    email: 'user@example.com',
    phone: '+92 300 1234567',
    address: 'Lahore, Pakistan',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: {
      name: 'Emergency Contact',
      phone: '+92 300 9876543',
      relationship: 'Spouse'
    },
    medicalHistory: [],
    createdAt: new Date()
  }
];

// Validation rules
const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number'),
  body('address').optional().trim().isLength({ min: 5 }).withMessage('Address must be at least 5 characters'),
  body('dateOfBirth').optional().isDate().withMessage('Please enter a valid date'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Please select a valid gender'),
  body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Please select a valid blood group')
];

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfileValidation, validateRequest, async (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile
    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: users[userIndex]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/emergency-contact
// @desc    Add/Update emergency contact
// @access  Private
router.post('/emergency-contact', auth, [
  body('name').notEmpty().withMessage('Emergency contact name is required'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('relationship').notEmpty().withMessage('Relationship is required')
], validateRequest, async (req, res) => {
  try {
    const { name, phone, relationship } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update emergency contact
    users[userIndex].emergencyContact = {
      name,
      phone,
      relationship
    };
    users[userIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Emergency contact updated successfully',
      data: users[userIndex].emergencyContact
    });
  } catch (error) {
    console.error('Update emergency contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/medical-history
// @desc    Add medical history entry
// @access  Private
router.post('/medical-history', auth, [
  body('condition').notEmpty().withMessage('Medical condition is required'),
  body('diagnosisDate').isDate().withMessage('Please enter a valid diagnosis date'),
  body('medications').optional().isArray().withMessage('Medications must be an array'),
  body('notes').optional().trim()
], validateRequest, async (req, res) => {
  try {
    const { condition, diagnosisDate, medications, notes } = req.body;
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const medicalEntry = {
      id: users[userIndex].medicalHistory.length + 1,
      condition,
      diagnosisDate,
      medications: medications || [],
      notes: notes || '',
      createdAt: new Date()
    };

    users[userIndex].medicalHistory.push(medicalEntry);
    users[userIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Medical history entry added successfully',
      data: medicalEntry
    });
  } catch (error) {
    console.error('Add medical history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/medical-history
// @desc    Get user's medical history
// @access  Private
router.get('/medical-history', auth, async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      count: user.medicalHistory.length,
      data: user.medicalHistory
    });
  } catch (error) {
    console.error('Get medical history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/medical-history/:id
// @desc    Delete medical history entry
// @access  Private
router.delete('/medical-history/:id', auth, async (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const entryId = parseInt(req.params.id);
    const entryIndex = users[userIndex].medicalHistory.findIndex(entry => entry.id === entryId);
    
    if (entryIndex === -1) {
      return res.status(404).json({ message: 'Medical history entry not found' });
    }

    users[userIndex].medicalHistory.splice(entryIndex, 1);
    users[userIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Medical history entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete medical history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;