const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  // Section A: Pupil's Personal Data
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot be more than 100 characters']
  },
  address: {
    type: String,
    required: [true, 'Residential address is required'],
    trim: true
  },
  stateOrigin: {
    type: String,
    required: [true, 'State of origin is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  placeOfBirth: {
    type: String,
    required: [true, 'Place of birth is required'],
    trim: true
  },
  religion: {
    type: String,
    required: [true, 'Religion is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female'],
  },
  classAppliedFor: {
    type: String,
    required: [true, 'Class applied for is required'],
    trim: true
  },
  disability: {
    type: String,
    trim: true,
    default: 'None'
  },
  genotype: {
    type: String,
    required: [true, 'Genotype is required'],
    enum: ['AA', 'AS', 'SS', 'AC', 'SC', 'CC'],
    trim: true
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    trim: true
  },
  hepatitisB: {
    type: String,
    required: [true, 'Hepatitis B status is required'],
    enum: ['Positive', 'Negative', 'Not Tested'],
    default: 'Not Tested'
  },
  formerSchool: {
    type: String,
    trim: true,
    default: 'None'
  },

  // Section B: Parent/Guardian Data
  guardianName: {
    type: String,
    required: [true, 'Parent/Guardian name is required'],
    trim: true
  },
  guardianAddress: {
    type: String,
    required: [true, 'Guardian address is required'],
    trim: true
  },
  guardianPhone: {
    type: String,
    required: [true, 'Guardian phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true
  },
  placeOfWork: {
    type: String,
    required: [true, 'Place of work is required'],
    trim: true
  },
  nextOfKin: {
    type: String,
    required: [true, 'Next of kin is required'],
    trim: true
  },
  kinPhone: {
    type: String,
    required: [true, 'Next of kin phone is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
  },
  knowsWayHome: {
    type: String,
    required: [true, 'Does child know way home is required'],
    enum: ['Yes', 'No']
  },
  authorizedPersons: {
    type: String,
    required: [true, 'Authorized persons to pick child is required'],
    trim: true
  },
  christianTraining: {
    type: String,
    required: [true, 'Christian training preference is required'],
    enum: ['Yes', 'No']
  },
  attestation: {
    type: String,
    required: [true, 'Attestation is required'],
    enum: ['Yes', 'No']
  },

  // File uploads
  passportPhoto: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  },

  // Application Status
  status: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'waitlist'],
    default: 'pending'
  },
  
  // Application tracking
  applicationNumber: {
    type: String,
    unique: true
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  reviewDate: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewNotes: {
    type: String,
    trim: true
  },

  // Associated user (if registered)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better performance
AdmissionSchema.index({ status: 1 });
AdmissionSchema.index({ submissionDate: -1 });
AdmissionSchema.index({ applicationNumber: 1 });
AdmissionSchema.index({ guardianPhone: 1 });

// Generate application number before saving
AdmissionSchema.pre('save', async function(next) {
  if (this.isNew && !this.applicationNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Count existing applications today
    const count = await this.constructor.countDocuments({
      submissionDate: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    });
    
    this.applicationNumber = `ADM${year}${month}${day}${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Virtual for age calculation
AdmissionSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for formatted submission date
AdmissionSchema.virtual('formattedSubmissionDate').get(function() {
  return this.submissionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialised
AdmissionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Admission', AdmissionSchema);