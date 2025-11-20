# Portal Backend API

A Node.js/Express backend API for the School Portal with MongoDB integration.

## 🚀 Features

- **User Authentication** - JWT-based authentication system
- **Admission Management** - Handle school admission applications
- **MongoDB Integration** - Using Mongoose ODM
- **RESTful API** - Well-structured REST endpoints
- **Error Handling** - Comprehensive error handling
- **Validation** - Data validation with Mongoose schemas

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env` file and update the values:
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/portal_database
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   - **Local MongoDB**: Start the MongoDB service
   - **MongoDB Atlas**: Use the connection string from your cluster

## 🏃‍♂️ Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📊 Database Information

### Database Name
- **Default**: `portal_database`
- **Configurable via**: `MONGODB_URI` environment variable

### Collections
- **users** - User accounts and authentication
- **admissions** - Admission applications

### Connection Details
When you start the server, you'll see:
```
✅ MongoDB Connected: localhost:27017
📊 Database Name: portal_database
🌐 Connection State: Connected
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Admission Routes (`/api/admissions`)
- `POST /api/admissions` - Submit admission application
- `GET /api/admissions` - Get all applications (Admin)
- `GET /api/admissions/:id` - Get single application
- `PUT /api/admissions/:id/status` - Update application status
- `GET /api/admissions/stats/summary` - Get admission statistics

### Health Check
- `GET /` - Basic API info
- `GET /api/health` - Health check endpoint

## 📝 Example Usage

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "adorableheavenlywisdom@gmail.com",
    "password": "ufjntfytfqybhpkq",
    "role": "student"
  }'
```

### Submit Admission Application
```bash
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "address": "123 Main St",
    "stateOrigin": "Lagos",
    "dateOfBirth": "2010-01-15",
    "placeOfBirth": "Lagos",
    "religion": "Christianity",
    "gender": "Female",
    "classAppliedFor": "Primary 1",
    "genotype": "AA",
    "bloodGroup": "O+",
    "hepatitisB": "Negative",
    "guardianName": "Mrs. Smith",
    "guardianAddress": "123 Main St",
    "guardianPhone": "08012345678",
    "occupation": "Teacher",
    "placeOfWork": "ABC School",
    "nextOfKin": "Mr. Smith",
    "kinPhone": "08087654321",
    "knowsWayHome": "Yes",
    "authorizedPersons": "Mrs. Smith, Mr. Smith",
    "christianTraining": "Yes",
    "attestation": "Yes"
  }'
```

## 🗂️ Project Structure

```
backend/
├── models/          # Database models
│   ├── User.js     # User model
│   └── Admission.js # Admission model
├── routes/          # API routes
│   ├── auth.js     # Authentication routes
│   └── admissions.js # Admission routes
├── config/          # Configuration files
│   └── database.js # Database connection utility
├── .env            # Environment variables
├── server.js       # Main server file
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/portal_database |
| `JWT_SECRET` | JWT secret key | (required) |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `BCRYPT_ROUNDS` | Bcrypt salt rounds | 12 |

## 🚨 Important Notes

1. **Database Name**: The database name is `portal_database` by default
2. **JWT Secret**: Change the JWT secret in production
3. **MongoDB**: Make sure MongoDB is running before starting the server
4. **Environment**: Update `.env` file with your actual values

## 📈 Monitoring

The application provides detailed logging for:
- Database connections
- API requests
- Error handling
- Authentication events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.