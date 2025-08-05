const express = require('express');
const router = express.Router();

// Mock specialties data (replace with database)
const specialties = [
  {
    id: 1,
    name: "Cardiology",
    description: "Heart and cardiovascular system specialists",
    icon: "heart",
    doctorsCount: 45,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    name: "Dermatology",
    description: "Skin, hair, and nail specialists",
    icon: "skin",
    doctorsCount: 32,
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Bone, joint, and muscle specialists",
    icon: "bone",
    doctorsCount: 38,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Child healthcare specialists",
    icon: "child",
    doctorsCount: 28,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 5,
    name: "Neurology",
    description: "Brain and nervous system specialists",
    icon: "brain",
    doctorsCount: 22,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    name: "Psychiatry",
    description: "Mental health specialists",
    icon: "mind",
    doctorsCount: 25,
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 7,
    name: "Gynecology",
    description: "Women's health specialists",
    icon: "women",
    doctorsCount: 35,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 8,
    name: "Ophthalmology",
    description: "Eye and vision specialists",
    icon: "eye",
    doctorsCount: 18,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 9,
    name: "ENT",
    description: "Ear, nose, and throat specialists",
    icon: "ear",
    doctorsCount: 20,
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 10,
    name: "Urology",
    description: "Urinary system specialists",
    icon: "kidney",
    doctorsCount: 15,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 11,
    name: "Gastroenterology",
    description: "Digestive system specialists",
    icon: "stomach",
    doctorsCount: 30,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 12,
    name: "Endocrinology",
    description: "Hormone and metabolism specialists",
    icon: "hormone",
    doctorsCount: 12,
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// @route   GET /api/specialties
// @desc    Get all specialties
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      count: specialties.length,
      data: specialties
    });
  } catch (error) {
    console.error('Get specialties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/specialties/:id
// @desc    Get specialty by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const specialty = specialties.find(s => s.id === parseInt(req.params.id));
    
    if (!specialty) {
      return res.status(404).json({ message: 'Specialty not found' });
    }

    res.json({
      success: true,
      data: specialty
    });
  } catch (error) {
    console.error('Get specialty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/specialties/popular
// @desc    Get popular specialties
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const popularSpecialties = specialties
      .sort((a, b) => b.doctorsCount - a.doctorsCount)
      .slice(0, 6);

    res.json({
      success: true,
      count: popularSpecialties.length,
      data: popularSpecialties
    });
  } catch (error) {
    console.error('Get popular specialties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;