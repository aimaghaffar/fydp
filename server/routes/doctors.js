const express = require('express');
const router = express.Router();

// Mock doctors data (replace with database)
const doctors = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    specialty: "Cardiology",
    hospital: "Shaukat Khanum Memorial Hospital",
    location: "Lahore",
    rating: 4.8,
    reviews: 127,
    experience: "15 years",
    consultationFee: "Rs. 2,500",
    availability: "Mon-Fri, 9AM-5PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - King Edward Medical University",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Fellowship in Cardiology - Aga Khan University"
    ],
    about: "Dr. Ahmed Khan is a highly experienced cardiologist with over 15 years of practice in Pakistan. He specializes in interventional cardiology and has performed thousands of successful procedures.",
    specialties: ["Interventional Cardiology", "Echocardiography", "Cardiac Catheterization", "Preventive Cardiology"],
    contact: {
      phone: "+92 300 1234567",
      email: "dr.ahmed.khan@medx.pk",
      address: "Shaukat Khanum Memorial Hospital, Lahore"
    }
  },
  {
    id: 2,
    name: "Dr. Fatima Ali",
    specialty: "Dermatology",
    hospital: "Aga Khan University Hospital",
    location: "Karachi",
    rating: 4.9,
    reviews: 89,
    experience: "12 years",
    consultationFee: "Rs. 3,000",
    availability: "Mon-Sat, 10AM-6PM",
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - Dow Medical College",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Diploma in Dermatology - Aga Khan University"
    ],
    about: "Dr. Fatima Ali is a renowned dermatologist specializing in cosmetic dermatology and skin cancer treatment.",
    specialties: ["Cosmetic Dermatology", "Skin Cancer", "Acne Treatment", "Hair Loss"],
    contact: {
      phone: "+92 300 2345678",
      email: "dr.fatima.ali@medx.pk",
      address: "Aga Khan University Hospital, Karachi"
    }
  },
  {
    id: 3,
    name: "Dr. Muhammad Hassan",
    specialty: "Orthopedics",
    hospital: "Pakistan Institute of Medical Sciences",
    location: "Islamabad",
    rating: 4.7,
    reviews: 156,
    experience: "18 years",
    consultationFee: "Rs. 2,800",
    availability: "Mon-Fri, 8AM-4PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - Rawalpindi Medical College",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Fellowship in Orthopedic Surgery - PIMS"
    ],
    about: "Dr. Muhammad Hassan is an expert orthopedic surgeon with extensive experience in joint replacement and sports medicine.",
    specialties: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Trauma"],
    contact: {
      phone: "+92 300 3456789",
      email: "dr.muhammad.hassan@medx.pk",
      address: "Pakistan Institute of Medical Sciences, Islamabad"
    }
  },
  {
    id: 4,
    name: "Dr. Ayesha Malik",
    specialty: "Pediatrics",
    hospital: "Children's Hospital",
    location: "Lahore",
    rating: 4.9,
    reviews: 203,
    experience: "10 years",
    consultationFee: "Rs. 2,200",
    availability: "Mon-Sat, 9AM-5PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - King Edward Medical University",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Specialization in Pediatric Care"
    ],
    about: "Dr. Ayesha Malik is a compassionate pediatrician dedicated to providing the best care for children.",
    specialties: ["Child Development", "Vaccination", "Nutrition", "Common Childhood Illnesses"],
    contact: {
      phone: "+92 300 4567890",
      email: "dr.ayesha.malik@medx.pk",
      address: "Children's Hospital, Lahore"
    }
  },
  {
    id: 5,
    name: "Dr. Usman Khan",
    specialty: "Neurology",
    hospital: "Jinnah Postgraduate Medical Centre",
    location: "Karachi",
    rating: 4.6,
    reviews: 78,
    experience: "20 years",
    consultationFee: "Rs. 3,500",
    availability: "Mon-Fri, 9AM-6PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - Dow Medical College",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Fellowship in Neurology - JPMC"
    ],
    about: "Dr. Usman Khan is a senior neurologist specializing in stroke treatment and neurological disorders.",
    specialties: ["Stroke Treatment", "Epilepsy", "Multiple Sclerosis", "Headache Disorders"],
    contact: {
      phone: "+92 300 5678901",
      email: "dr.usman.khan@medx.pk",
      address: "Jinnah Postgraduate Medical Centre, Karachi"
    }
  },
  {
    id: 6,
    name: "Dr. Sana Ahmed",
    specialty: "Psychiatry",
    hospital: "Institute of Psychiatry",
    location: "Rawalpindi",
    rating: 4.8,
    reviews: 92,
    experience: "14 years",
    consultationFee: "Rs. 2,800",
    availability: "Mon-Sat, 10AM-7PM",
    image: "https://images.unsplash.com/photo-1594824475544-9d5c8c2b5c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    qualifications: [
      "MBBS - Rawalpindi Medical College",
      "FCPS - College of Physicians and Surgeons Pakistan",
      "Specialization in Psychiatry"
    ],
    about: "Dr. Sana Ahmed is a compassionate psychiatrist helping patients with mental health challenges.",
    specialties: ["Depression", "Anxiety", "Bipolar Disorder", "Addiction Treatment"],
    contact: {
      phone: "+92 300 6789012",
      email: "dr.sana.ahmed@medx.pk",
      address: "Institute of Psychiatry, Rawalpindi"
    }
  }
];

// @route   GET /api/doctors
// @desc    Get all doctors with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialty, location, rating, experience, search } = req.query;
    let filteredDoctors = [...doctors];

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialty.toLowerCase() === specialty.toLowerCase()
      );
    }

    // Filter by location
    if (location) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by rating
    if (rating) {
      const minRating = parseFloat(rating);
      filteredDoctors = filteredDoctors.filter(doctor => doctor.rating >= minRating);
    }

    // Filter by experience
    if (experience) {
      filteredDoctors = filteredDoctors.filter(doctor => {
        const expYears = parseInt(doctor.experience.split(' ')[0]);
        return expYears >= parseInt(experience);
      });
    }

    // Search by name or specialty
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm) ||
        doctor.hospital.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      success: true,
      count: filteredDoctors.length,
      data: filteredDoctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/specialty/:specialty
// @desc    Get doctors by specialty
// @access  Public
router.get('/specialty/:specialty', async (req, res) => {
  try {
    const specialty = req.params.specialty.toLowerCase();
    const filteredDoctors = doctors.filter(doctor => 
      doctor.specialty.toLowerCase() === specialty
    );

    res.json({
      success: true,
      count: filteredDoctors.length,
      data: filteredDoctors
    });
  } catch (error) {
    console.error('Get doctors by specialty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;