# Security Packages Installation

## Install the new security packages:

```bash
cd PORTAL/backend
npm install
```

This will install:
- **express-rate-limit**: Prevents brute force attacks by limiting requests
- **express-validator**: Validates and sanitizes user inputs
- **helmet**: Adds security headers to protect against common vulnerabilities
- **validator**: Additional email and input validation

## What was added:

### 1. Input Validation ✅
- Email format validation
- Name validation (letters and spaces only)
- Password strength validation
- Role validation (only allowed roles)
- All inputs are sanitized to prevent XSS attacks

### 2. Rate Limiting ✅
- **General API**: 100 requests per 15 minutes per IP
- **Auth routes (login/signup)**: 5 attempts per 15 minutes per IP
- **Password reset**: 3 attempts per hour per IP

### 3. Security Headers ✅
- Helmet adds security headers automatically
- Protects against XSS, clickjacking, and other attacks

### 4. Input Sanitization ✅
- All user inputs are trimmed and escaped
- Email addresses are normalized
- Prevents SQL/NoSQL injection attacks

## Testing:

1. Try signing up with invalid email - should reject
2. Try signing up with weak password - should reject
3. Try making 6 login attempts quickly - should be rate limited
4. Try SQL injection in name field - should be sanitized

## Rate Limit Messages:

If you see "Too many authentication attempts", wait 15 minutes or restart the server for testing.
