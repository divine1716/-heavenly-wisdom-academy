// Local Authentication System (Frontend-only for Vercel static hosting)

class LocalAuth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('heavenly_users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('heavenly_current_user') || 'null');
  }

  // Simple password hashing (client-side)
  hashPassword(password) {
    // Simple hash for demo - use proper hashing in production
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Generate simple JWT-like token
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    return btoa(JSON.stringify(payload));
  }

  // Verify token
  verifyToken(token) {
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp < Date.now()) {
        return null; // Token expired
      }
      return payload;
    } catch (error) {
      return null;
    }
  }

  // Signup
  async signup(name, email, password, role) {
    try {
      // Validate input
      if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
      }

      // Check if user exists
      const exists = this.users.find(u => u.email === email);
      if (exists) {
        throw new Error('Email already registered');
      }

      // Create user
      const user = {
        id: Date.now().toString(),
        name,
        email,
        passwordHash: this.hashPassword(password),
        role,
        createdAt: new Date().toISOString()
      };

      // Save user
      this.users.push(user);
      localStorage.setItem('heavenly_users', JSON.stringify(this.users));

      // Generate token
      const token = this.generateToken(user);
      
      // Set current user
      const userInfo = {
        id: user.id,
        name: user.name,
        fullName: user.name,
        email: user.email,
        role: user.role
      };
      
      this.currentUser = userInfo;
      localStorage.setItem('heavenly_current_user', JSON.stringify(userInfo));
      localStorage.setItem('heavenly_token', token);

      return {
        success: true,
        message: 'Account created successfully!',
        token,
        user: userInfo
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Login
  async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Find user
      const user = this.users.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password
      const passwordHash = this.hashPassword(password);
      if (passwordHash !== user.passwordHash) {
        throw new Error('Invalid email or password');
      }

      // Generate token
      const token = this.generateToken(user);
      
      // Set current user
      const userInfo = {
        id: user.id,
        name: user.name,
        fullName: user.name,
        email: user.email,
        role: user.role
      };
      
      this.currentUser = userInfo;
      localStorage.setItem('heavenly_current_user', JSON.stringify(userInfo));
      localStorage.setItem('heavenly_token', token);

      return {
        success: true,
        message: 'Login successful!',
        token,
        user: userInfo
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get current user
  getCurrentUser() {
    const token = localStorage.getItem('heavenly_token');
    if (!token) {
      return null;
    }

    const payload = this.verifyToken(token);
    if (!payload) {
      this.logout();
      return null;
    }

    return this.currentUser;
  }

  // Logout
  logout() {
    this.currentUser = null;
    localStorage.removeItem('heavenly_current_user');
    localStorage.removeItem('heavenly_token');
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }
}

// Create global instance
window.localAuth = new LocalAuth();

// Admission form submission (local storage)
window.submitAdmissionForm = async function(formData, passportFile) {
  try {
    // Get existing submissions
    const submissions = JSON.parse(localStorage.getItem('heavenly_admissions') || '[]');
    
    // Create submission
    const submission = {
      ...formData,
      passport: passportFile ? passportFile.name : null,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    // Save submission
    submissions.push(submission);
    localStorage.setItem('heavenly_admissions', JSON.stringify(submissions));
    
    console.log('✅ Admission form submitted locally:', formData.fullName);
    
    return {
      success: true,
      message: 'Admission form submitted successfully! You will be contacted soon.'
    };
  } catch (error) {
    console.error('Admission submission error:', error);
    return {
      success: false,
      error: 'Failed to submit admission form. Please try again.'
    };
  }
};