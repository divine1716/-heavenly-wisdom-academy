const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const USERS_FILE = path.join(__dirname, 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
}

class FileStorage {
    static readUsers() {
        try {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error);
            return [];
        }
    }

    static writeUsers(users) {
        try {
            fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
            return true;
        } catch (error) {
            console.error('Error writing users file:', error);
            return false;
        }
    }

    static async createUser(userData) {
        const users = this.readUsers();
        
        // Check if user already exists
        const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create user object
        const user = {
            id: Date.now().toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email.toLowerCase(),
            password: hashedPassword,
            role: userData.role || 'student',
            phone: userData.phone || null,
            isActive: true,
            isVerified: false,
            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        users.push(user);
        this.writeUsers(users);

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async findUserByEmail(email) {
        const users = this.readUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    static async findUserById(id) {
        const users = this.readUsers();
        const user = users.find(u => u.id === id);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    static async updateUser(id, updates) {
        const users = this.readUsers();
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        users[userIndex] = { ...users[userIndex], ...updates };
        this.writeUsers(users);

        const { password, ...userWithoutPassword } = users[userIndex];
        return userWithoutPassword;
    }

    static async matchPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = FileStorage;