const express = require('express');
const Admission = require('../models/Admission');

const router = express.Router();

// @desc    Submit new admission application
// @route   POST /api/admissions
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      // Section A: Pupil's Personal Data
      fullName, address, stateOrigin, dateOfBirth, placeOfBirth,
      religion, gender, classAppliedFor, disability, genotype,
      bloodGroup, hepatitisB, formerSchool,
      
      // Section B: Parent/Guardian Data
      guardianName, guardianAddress, guardianPhone, occupation,
      placeOfWork, nextOfKin, kinPhone, knowsWayHome,
      authorizedPersons, christianTraining, attestation
    } = req.body;

    // Create admission application
    const admission = await Admission.create({
      // Section A
      fullName, address, stateOrigin, 
      dateOfBirth: new Date(dateOfBirth), 
      placeOfBirth, religion, gender, classAppliedFor,
      disability: disability || 'None',
      genotype, bloodGroup, hepatitisB, formerSchool,
      
      // Section B
      guardianName, guardianAddress, guardianPhone,
      occupation, placeOfWork, nextOfKin, kinPhone,
      knowsWayHome, authorizedPersons, christianTraining, attestation
    });

    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully',
      data: {
        applicationNumber: admission.applicationNumber,
        submissionDate: admission.formattedSubmissionDate,
        status: admission.status,
        fullName: admission.fullName,
        classAppliedFor: admission.classAppliedFor
      }
    });

  } catch (error) {
    console.error('Admission submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get all admission applications (Admin only)
// @route   GET /api/admissions
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    // Build query
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { applicationNumber: { $regex: search, $options: 'i' } },
        { guardianPhone: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Admission.countDocuments(query);

    // Get applications with pagination
    const admissions = await Admission.find(query)
      .sort({ submissionDate: -1 })
      .skip(skip)
      .limit(limit)
      .populate('reviewedBy', 'firstName lastName email')
      .select('-__v');

    res.status(200).json({
      success: true,
      count: admissions.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: admissions
    });

  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get single admission application
// @route   GET /api/admissions/:id
// @access  Public (with application number) / Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let admission;

    // Check if it's an application number or MongoDB ObjectId
    if (id.startsWith('ADM')) {
      admission = await Admission.findOne({ applicationNumber: id })
        .populate('reviewedBy', 'firstName lastName email')
        .populate('user', 'firstName lastName email');
    } else {
      admission = await Admission.findById(id)
        .populate('reviewedBy', 'firstName lastName email')
        .populate('user', 'firstName lastName email');
    }

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: admission
    });

  } catch (error) {
    console.error('Get admission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Update admission application status (Admin only)
// @route   PUT /api/admissions/:id/status
// @access  Private/Admin
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    // Validate status
    const validStatuses = ['pending', 'under_review', 'approved', 'rejected', 'waitlist'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    const admission = await Admission.findById(id);
    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found'
      });
    }

    // Update admission status
    admission.status = status;
    admission.reviewDate = new Date();
    if (reviewNotes) {
      admission.reviewNotes = reviewNotes;
    }
    // Note: reviewedBy would be set from authenticated user in real implementation

    await admission.save();

    res.status(200).json({
      success: true,
      message: 'Admission status updated successfully',
      data: {
        applicationNumber: admission.applicationNumber,
        status: admission.status,
        reviewDate: admission.reviewDate,
        reviewNotes: admission.reviewNotes
      }
    });

  } catch (error) {
    console.error('Update admission status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @desc    Get admission statistics (Admin only)
// @route   GET /api/admissions/stats/summary
// @access  Private/Admin
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Admission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get total applications
    const totalApplications = await Admission.countDocuments();
    
    // Get recent applications (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentApplications = await Admission.countDocuments({
      submissionDate: { $gte: lastWeek }
    });

    // Format stats
    const formattedStats = {
      total: totalApplications,
      recent: recentApplications,
      byStatus: {}
    };

    // Initialize all statuses with 0
    ['pending', 'under_review', 'approved', 'rejected', 'waitlist'].forEach(status => {
      formattedStats.byStatus[status] = 0;
    });

    // Fill in actual counts
    stats.forEach(stat => {
      formattedStats.byStatus[stat._id] = stat.count;
    });

    res.status(200).json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Get admission stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

module.exports = router;