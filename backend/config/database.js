const mongoose = require('mongoose');

/**
 * Database connection utility
 * Handles MongoDB connection with proper error handling and logging
 */
const connectDB = async () => {
  try {
    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log('🔗 Database Connection Details:');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    console.log(`🌐 Connection State: ${getConnectionState(conn.connection.readyState)}`);
    console.log(`⚡ Max Pool Size: ${options.maxPoolSize}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Log specific connection errors
    if (error.name === 'MongoNetworkError') {
      console.error('🌐 Network Error: Check if MongoDB is running and accessible');
    } else if (error.name === 'MongoParseError') {
      console.error('🔧 Parse Error: Check your MongoDB connection string format');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('🖥️  Server Selection Error: MongoDB server may be down');
    }
    
    process.exit(1);
  }
};

/**
 * Get human-readable connection state
 * @param {number} state - Mongoose connection state
 * @returns {string} Human-readable state
 */
const getConnectionState = (state) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  return states[state] || 'Unknown';
};

/**
 * Handle database connection events
 */
const setupConnectionEvents = () => {
  // Connection successful
  mongoose.connection.on('connected', () => {
    console.log('🎉 Mongoose connected to MongoDB');
  });

  // Connection error
  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
  });

  // Connection disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('📤 Mongoose disconnected from MongoDB');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', async () => {
    console.log('🔄 Gracefully shutting down...');
    await mongoose.connection.close();
    console.log('✅ Mongoose connection closed');
    process.exit(0);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    mongoose.connection.close();
    process.exit(1);
  });
};

/**
 * Check database connection health
 * @returns {Object} Connection health info
 */
const checkConnectionHealth = () => {
  const state = mongoose.connection.readyState;
  const isConnected = state === 1;
  
  return {
    isConnected,
    state: getConnectionState(state),
    host: mongoose.connection.host || 'Unknown',
    name: mongoose.connection.name || 'Unknown',
    port: mongoose.connection.port || 'Unknown'
  };
};

/**
 * Close database connection
 */
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed successfully');
  } catch (error) {
    console.error('❌ Error closing database connection:', error.message);
  }
};

module.exports = {
  connectDB,
  setupConnectionEvents,
  checkConnectionHealth,
  closeConnection,
  getConnectionState
};