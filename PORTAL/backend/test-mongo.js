// Test MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('\n🔧 Trying alternative connection...');
    
    // Try without srv
    const altUri = process.env.MONGO_URI.replace('mongodb+srv://', 'mongodb://');
    mongoose.connect(altUri)
      .then(() => {
        console.log('✅ Alternative MongoDB connection successful!');
        process.exit(0);
      })
      .catch(err2 => {
        console.error('❌ Alternative connection also failed:', err2.message);
        console.log('\n💡 Suggestions:');
        console.log('1. Check your internet connection');
        console.log('2. Verify MongoDB Atlas cluster is running');
        console.log('3. Check IP whitelist in MongoDB Atlas');
        console.log('4. Try using a different network (mobile hotspot)');
        process.exit(1);
      });
  });