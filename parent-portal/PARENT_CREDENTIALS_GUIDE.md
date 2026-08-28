# Parent Portal Credentials Management Guide

## Overview
The parent portal uses **pre-assigned passwords** that YOU (the school admin) control. Parents cannot create their own accounts - you must provide them with login credentials.

## How It Works

### 1. Adding New Parents

To add a new parent, edit the file: `parent-portal/login/parent-credentials.js`

Add a new entry to the `parentCredentials` array:

```javascript
{
    id: 'P004',  // Unique parent ID
    fullName: 'Mr. Example Parent',  // EXACT name they must use to login
    password: 'PARENT2025004',  // Password you assign
    email: 'parent@example.com',
    phone: '08012345678',
    children: [
        {
            id: 'S006',  // Student ID
            name: 'Child Name',
            class: 'JSS 1',
            admissionNumber: 'ADM2023006'
        }
    ],
    address: 'Parent address here',
    dateCreated: '2025-03-07'
}
```

### 2. Password Format

Use this format for consistency:
- **Format:** `PARENT2025XXX`
- **Example:** `PARENT2025001`, `PARENT2025002`, etc.

The helper function `generateParentPassword(number)` can help:
```javascript
generateParentPassword(4)  // Returns: "PARENT2025004"
generateParentPassword(15) // Returns: "PARENT2025015"
```

### 3. Giving Credentials to Parents

When a parent enrolls their child, provide them with:

**Example Credential Card:**
```
═══════════════════════════════════════
   HEAVENLY WISDOM INTERNATIONAL ACADEMY
        PARENT PORTAL ACCESS
═══════════════════════════════════════

Full Name: Mr. John Doe
Password:  PARENT2025001

Login URL: https://yourschool.com/parent-portal/login

IMPORTANT:
- Use your EXACT full name as shown above
- Passwords are case-sensitive
- Keep this information secure
- Contact the school office if you forget

═══════════════════════════════════════
```

### 4. Current Parent Accounts

| ID   | Full Name           | Password       | Children | Status |
|------|---------------------|----------------|----------|--------|
| P001 | Mr. John Doe        | PARENT2025001  | 2        | Active |
| P002 | Mrs. Sarah Williams | PARENT2025002  | 1        | Active |
| P003 | Mr. Ahmed Ibrahim   | PARENT2025003  | 2        | Active |

### 5. Resetting Passwords

To reset a parent's password:

1. Open `parent-portal/login/parent-credentials.js`
2. Find the parent's entry
3. Change the `password` field
4. Save the file
5. Inform the parent of their new password

### 6. Removing Parent Access

To disable a parent's account:

1. Open `parent-portal/login/parent-credentials.js`
2. Find the parent's entry
3. Either:
   - Delete the entire entry, OR
   - Comment it out with `//` at the start of each line

### 7. Adding Multiple Children

If a parent has multiple children:

```javascript
children: [
    {
        id: 'S001',
        name: 'First Child',
        class: 'JSS 2',
        admissionNumber: 'ADM2023001'
    },
    {
        id: 'S002',
        name: 'Second Child',
        class: 'Primary 5',
        admissionNumber: 'ADM2023002'
    },
    {
        id: 'S003',
        name: 'Third Child',
        class: 'Nursery 1',
        admissionNumber: 'ADM2023003'
    }
]
```

### 8. Security Best Practices

✅ **DO:**
- Keep the credentials file secure
- Use unique passwords for each parent
- Change passwords if compromised
- Keep a backup of the credentials file
- Update parent info when children graduate/leave

❌ **DON'T:**
- Share the credentials file publicly
- Use simple passwords like "password123"
- Give multiple parents the same password
- Forget to update when students change classes

### 9. Troubleshooting

**Parent can't login:**
1. Check if their name is spelled EXACTLY as in the credentials file
2. Verify password is correct (case-sensitive)
3. Check if their account exists in `parent-credentials.js`
4. Clear browser cache and try again

**Parent sees wrong children:**
1. Check the `children` array in their account
2. Verify student IDs match your student database
3. Update and save the credentials file

### 10. Future Enhancements

Consider adding:
- Password change feature for parents
- Email notifications when credentials are issued
- Temporary passwords that expire
- Two-factor authentication
- Admin panel to manage credentials (instead of editing files)

## Support

For technical issues, contact your web developer.
For credential requests, parents should contact the school office.
