// ========================================
// PARENT PORTAL CREDENTIALS
// ========================================
// ADMIN: You control these passwords
// Give these credentials to parents directly
// ========================================

const parentCredentials = [
    {
        id: 'P001',
        fullName: 'Mr. John Doe',
        password: 'PARENT2025001',
        email: 'johndoe@example.com',
        phone: '08012345678',
        children: [
            {
                id: 'S001',
                name: 'Jane Doe',
                class: 'JSS 2',
                admissionNumber: 'ADM2023001'
            },
            {
                id: 'S002',
                name: 'John Doe Jr.',
                class: 'Primary 5',
                admissionNumber: 'ADM2023002'
            }
        ],
        address: '123 Main Street, Lagos',
        dateCreated: '2025-01-15'
    },
    {
        id: 'P002',
        fullName: 'Mrs. Sarah Williams',
        password: 'PARENT2025002',
        email: 'sarah.williams@example.com',
        phone: '08098765432',
        children: [
            {
                id: 'S003',
                name: 'Michael Williams',
                class: 'SS 1',
                admissionNumber: 'ADM2023003'
            }
        ],
        address: '45 Victoria Island, Lagos',
        dateCreated: '2025-01-20'
    },
    {
        id: 'P003',
        fullName: 'Mr. Ahmed Ibrahim',
        password: 'PARENT2025003',
        email: 'ahmed.ibrahim@example.com',
        phone: '08123456789',
        children: [
            {
                id: 'S004',
                name: 'Fatima Ibrahim',
                class: 'Primary 3',
                admissionNumber: 'ADM2023004'
            },
            {
                id: 'S005',
                name: 'Yusuf Ibrahim',
                class: 'Primary 1',
                admissionNumber: 'ADM2023005'
            }
        ],
        address: '78 Ikeja Road, Lagos',
        dateCreated: '2025-02-01'
    }
    // ADD MORE PARENTS HERE AS NEEDED
];

// ========================================
// PASSWORD GENERATION HELPER
// ========================================
// Use this format: PARENT2025XXX
// Where XXX is a sequential number
// ========================================

function generateParentPassword(parentNumber) {
    return `PARENT2025${String(parentNumber).padStart(3, '0')}`;
}

// Example usage:
// generateParentPassword(4) returns "PARENT2025004"
// generateParentPassword(15) returns "PARENT2025015"
