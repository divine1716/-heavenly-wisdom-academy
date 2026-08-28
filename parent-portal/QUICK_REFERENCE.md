# 🚀 Quick Reference - Parent Portal

## Add a New Parent (3 Steps)

1. Open: `parent-portal/login/parent-credentials.js`

2. Add this at the end of the array (before the closing `]`):

```javascript
,
{
    id: 'P004',
    fullName: 'Parent Full Name Here',
    password: 'PARENT2025004',
    email: 'parent@email.com',
    phone: '08012345678',
    children: [
        {
            id: 'S001',
            name: 'Child Name',
            class: 'JSS 1',
            admissionNumber: 'ADM2023001'
        }
    ],
    address: 'Parent address',
    dateCreated: '2025-03-07'
}
```

3. Save the file

## Print Credentials

1. Open: `parent-portal/print-credentials.html`
2. Click "Print All Cards"
3. Give card to parent

## Reset Password

1. Open: `parent-portal/login/parent-credentials.js`
2. Find the parent
3. Change the `password` field
4. Save
5. Tell parent the new password

## Test Login

**URL:** `yoursite.com/parent-portal/login`

**Test Account:**
- Name: `Mr. John Doe`
- Password: `PARENT2025001`

## Password Format

Always use: `PARENT2025XXX`

Examples:
- `PARENT2025001`
- `PARENT2025002`
- `PARENT2025015`
- `PARENT2025100`

## Common Issues

**Parent can't login?**
- Check spelling of full name (must be EXACT)
- Check password (case-sensitive)
- Clear browser cache

**Need to add multiple children?**
```javascript
children: [
    { id: 'S001', name: 'First Child', class: 'JSS 1', admissionNumber: 'ADM001' },
    { id: 'S002', name: 'Second Child', class: 'Primary 3', admissionNumber: 'ADM002' }
]
```

## Important Files

- **Credentials:** `parent-portal/login/parent-credentials.js`
- **Login Page:** `parent-portal/login/index.html`
- **Print Cards:** `parent-portal/print-credentials.html`
- **Full Guide:** `parent-portal/PARENT_CREDENTIALS_GUIDE.md`

---

**That's it! Keep this handy for quick reference.** 📌
