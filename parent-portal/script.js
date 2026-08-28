// ========== CONFIGURATION ==========
const PAYSTACK_PUBLIC_KEY = 'pk_test_your_key_here'; // Replace with your actual key

// ========== SAMPLE DATA (Replace with API calls) ==========
let currentParent = {
    id: 'P001',
    name: 'Mr. John Doe',
    email: 'john.doe@example.com',
    phone: '08012345678',
    address: '123 Main Street, Lagos'
};

let children = [
    {
        id: 'S001',
        name: 'Jane Doe',
        class: 'JSS 2',
        admissionNumber: 'ADM2023001',
        feesOwed: 45000,
        feesPaid: 30000
    },
    {
        id: 'S002',
        name: 'John Doe Jr.',
        class: 'Primary 5',
        admissionNumber: 'ADM2023002',
        feesOwed: 35000,
        feesPaid: 35000
    }
];

let paymentHistory = [
    {
        id: 'PAY001',
        date: '2024-01-15',
        childId: 'S001',
        childName: 'Jane Doe',
        feeType: 'Tuition Fee',
        term: 'First Term',
        amount: 30000,
        status: 'Completed',
        reference: 'PSK_001'
    }
];

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadDashboard();
    initializePaymentForm();
    loadProfile();
});

// ========== NAVIGATION ==========
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Load section-specific data
            loadSectionData(sectionId);
        });
    });
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'children':
            loadChildrenDetails();
            break;
        case 'payment-history':
            loadPaymentHistory();
            break;
        case 'results':
            loadResults();
            break;
        case 'attendance':
            loadAttendance();
            break;
        case 'messages':
            loadMessages();
            break;
    }
}

// ========== DASHBOARD ==========
function loadDashboard() {
    // Update stats
    document.getElementById('totalChildren').textContent = children.length;
    
    const totalPaid = children.reduce((sum, child) => sum + child.feesPaid, 0);
    const totalOwed = children.reduce((sum, child) => sum + child.feesOwed, 0);
    const pending = totalOwed - totalPaid;
    
    document.getElementById('paidFees').textContent = `₦${totalPaid.toLocaleString()}`;
    document.getElementById('pendingFees').textContent = `₦${pending.toLocaleString()}`;
    document.getElementById('unreadMessages').textContent = '3';
    
    // Load children cards
    const childrenList = document.getElementById('childrenList');
    childrenList.innerHTML = children.map(child => `
        <div class="stat-card">
            <div class="stat-icon blue">
                <i class="fas fa-user-graduate"></i>
            </div>
            <div class="stat-info">
                <h3>${child.name}</h3>
                <p>${child.class}</p>
                <p style="color: ${child.feesOwed === child.feesPaid ? 'green' : 'orange'}">
                    ${child.feesOwed === child.feesPaid ? 'Fees Paid' : `₦${(child.feesOwed - child.feesPaid).toLocaleString()} pending`}
                </p>
            </div>
        </div>
    `).join('');
    
    // Load recent activity
    loadRecentActivity();
}

function loadRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    activityList.innerHTML = `
        <div style="padding: 10px; border-left: 3px solid #3b82f6; margin-bottom: 10px;">
            <strong>Payment Received</strong>
            <p>₦30,000 - Jane Doe (Tuition Fee)</p>
            <small style="color: #6b7280;">2 days ago</small>
        </div>
        <div style="padding: 10px; border-left: 3px solid #10b981; margin-bottom: 10px;">
            <strong>Result Published</strong>
            <p>First Term results for John Doe Jr.</p>
            <small style="color: #6b7280;">5 days ago</small>
        </div>
        <div style="padding: 10px; border-left: 3px solid #f59e0b; margin-bottom: 10px;">
            <strong>New Message</strong>
            <p>From Class Teacher - Parent-Teacher Meeting</p>
            <small style="color: #6b7280;">1 week ago</small>
        </div>
    `;
}

// ========== CHILDREN DETAILS ==========
function loadChildrenDetails() {
    const childrenDetailList = document.getElementById('childrenDetailList');
    childrenDetailList.innerHTML = children.map(child => `
        <div class="section-card">
            <h3><i class="fas fa-user-graduate"></i> ${child.name}</h3>
            <p><strong>Class:</strong> ${child.class}</p>
            <p><strong>Admission Number:</strong> ${child.admissionNumber}</p>
            <p><strong>Fees Owed:</strong> ₦${child.feesOwed.toLocaleString()}</p>
            <p><strong>Fees Paid:</strong> ₦${child.feesPaid.toLocaleString()}</p>
            <p><strong>Balance:</strong> <span style="color: ${child.feesOwed === child.feesPaid ? 'green' : 'red'}">
                ₦${(child.feesOwed - child.feesPaid).toLocaleString()}
            </span></p>
        </div>
    `).join('');
}

// ========== PAYMENT FORM ==========
function initializePaymentForm() {
    // Populate child select dropdowns
    const selectElements = ['selectChild', 'filterChild', 'resultsChild', 'attendanceChild'];
    selectElements.forEach(elementId => {
        const select = document.getElementById(elementId);
        if (select) {
            children.forEach(child => {
                const option = document.createElement('option');
                option.value = child.id;
                option.textContent = `${child.name} - ${child.class}`;
                select.appendChild(option);
            });
        }
    });
    
    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        initiatePayment();
    });
    
    // Update summary on amount change
    document.getElementById('amount').addEventListener('input', updatePaymentSummary);
}

function updatePaymentSummary() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const processingFee = amount * 0.015 + 100; // 1.5% + ₦100
    const total = amount + processingFee;
    
    document.getElementById('summaryAmount').textContent = `₦${amount.toLocaleString()}`;
    document.getElementById('summaryFee').textContent = `₦${processingFee.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `₦${total.toLocaleString()}`;
    document.getElementById('feeSummary').style.display = amount > 0 ? 'block' : 'none';
}

// ========== PAYSTACK INTEGRATION ==========
function initiatePayment() {
    const childId = document.getElementById('selectChild').value;
    const feeType = document.getElementById('feeType').value;
    const term = document.getElementById('term').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (!childId || !feeType || !term || !amount) {
        alert('Please fill all fields');
        return;
    }
    
    const child = children.find(c => c.id === childId);
    const processingFee = amount * 0.015 + 100;
    const totalAmount = amount + processingFee;
    
    // Initialize Paystack
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: currentParent.email,
        amount: totalAmount * 100, // Convert to kobo
        currency: 'NGN',
        ref: 'PAY_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Parent Name",
                    variable_name: "parent_name",
                    value: currentParent.name
                },
                {
                    display_name: "Child Name",
                    variable_name: "child_name",
                    value: child.name
                },
                {
                    display_name: "Fee Type",
                    variable_name: "fee_type",
                    value: feeType
                },
                {
                    display_name: "Term",
                    variable_name: "term",
                    value: term
                }
            ]
        },
        callback: function(response) {
            verifyPayment(response.reference, {
                childId,
                childName: child.name,
                feeType,
                term,
                amount,
                totalAmount
            });
        },
        onClose: function() {
            alert('Payment cancelled');
        }
    });
    
    handler.openIframe();
}

function verifyPayment(reference, paymentData) {
    // In production, verify with your backend
    // For now, simulate successful payment
    
    const payment = {
        id: 'PAY' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        childId: paymentData.childId,
        childName: paymentData.childName,
        feeType: paymentData.feeType,
        term: paymentData.term,
        amount: paymentData.amount,
        status: 'Completed',
        reference: reference
    };
    
    paymentHistory.unshift(payment);
    
    // Update child's fees paid
    const child = children.find(c => c.id === paymentData.childId);
    if (child) {
        child.feesPaid += paymentData.amount;
    }
    
    // Show receipt
    generateReceipt(payment);
    
    // Reset form
    document.getElementById('paymentForm').reset();
    document.getElementById('feeSummary').style.display = 'none';
    
    // Reload dashboard
    loadDashboard();
}

// ========== RECEIPT GENERATION ==========
function generateReceipt(payment) {
    const receiptContent = document.getElementById('receiptContent');
    const receiptDate = new Date(payment.date).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    receiptContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1e3a8a; margin: 0;">SCHOOL NAME</h2>
            <p style="margin: 5px 0;">School Address</p>
            <p style="margin: 5px 0;">Phone: 0801234567</p>
            <hr style="margin: 15px 0;">
            <h3 style="color: #2563eb;">PAYMENT RECEIPT</h3>
        </div>
        
        <div style="margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Receipt No:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${payment.id}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Date:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${receiptDate}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Parent Name:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${currentParent.name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Student Name:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${payment.childName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Fee Type:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${payment.feeType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Term:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${payment.term}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Payment Method:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Online Payment</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Reference:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${payment.reference}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                    <td style="padding: 12px; font-size: 18px;"><strong>Amount Paid:</strong></td>
                    <td style="padding: 12px; font-size: 18px; color: #10b981;"><strong>₦${payment.amount.toLocaleString()}</strong></td>
                </tr>
            </table>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #6b7280;">
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p style="margin-top: 10px;">Thank you for your payment!</p>
        </div>
    `;
    
    // Show modal
    document.getElementById('receiptModal').style.display = 'flex';
}

function printReceipt() {
    const receiptContent = document.getElementById('receiptContent').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Payment Receipt</title>');
    printWindow.document.write('<style>body{font-family: Arial, sans-serif; padding: 20px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function downloadReceipt() {
    alert('PDF download feature coming soon! For now, please use Print and save as PDF.');
}

// Close modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal')) {
        document.getElementById('receiptModal').style.display = 'none';
    }
});

// ========== PAYMENT HISTORY ==========
function loadPaymentHistory() {
    const tableBody = document.getElementById('paymentHistoryTable');
    tableBody.innerHTML = paymentHistory.map(payment => `
        <tr>
            <td>${new Date(payment.date).toLocaleDateString()}</td>
            <td>${payment.childName}</td>
            <td>${payment.feeType}</td>
            <td>${payment.term}</td>
            <td>₦${payment.amount.toLocaleString()}</td>
            <td><span style="color: green; font-weight: 500;">${payment.status}</span></td>
            <td>
                <button onclick='viewReceipt(${JSON.stringify(payment)})' class="btn btn-primary" style="padding: 5px 10px; font-size: 12px;">
                    <i class="fas fa-receipt"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

function viewReceipt(payment) {
    generateReceipt(payment);
}

// ========== OTHER SECTIONS (Placeholders) ==========
function loadResults() {
    document.getElementById('resultsDisplay').innerHTML = '<p>Select a child to view results</p>';
}

function loadAttendance() {
    document.getElementById('attendanceDisplay').innerHTML = '<p>Select a child to view attendance</p>';
}

function loadMessages() {
    document.getElementById('messagesList').innerHTML = `
        <div class="section-card">
            <h3>Welcome Message</h3>
            <p>Welcome to the Parent Portal! You can now view your children's results, pay fees, and communicate with teachers.</p>
            <small style="color: #6b7280;">1 week ago</small>
        </div>
    `;
}

// ========== PROFILE ==========
function loadProfile() {
    document.getElementById('profileName').textContent = currentParent.name;
    document.getElementById('profileEmail').textContent = currentParent.email;
    document.getElementById('fullName').value = currentParent.name;
    document.getElementById('email').value = currentParent.email;
    document.getElementById('phone').value = currentParent.phone;
    document.getElementById('address').value = currentParent.address;
    document.getElementById('parentName').textContent = `Welcome, ${currentParent.name.split(' ')[0]}`;
}

// ========== LOGOUT ==========
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../PORTAL/index.html';
    }
}
