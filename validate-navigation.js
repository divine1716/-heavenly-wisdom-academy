// Cross-Browser Navigation Validation Script
const fs = require('fs');

// Read the main HTML file to check navigation structure
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Check for required navigation elements
const checks = {
  'Desktop Navigation (.nav-links)': htmlContent.includes('class="nav-links"'),
  'Mobile Menu Button': htmlContent.includes('id="mobileMenuBtn"'),
  'Mobile Navigation Menu': htmlContent.includes('id="mobileNav"'),
  'Navigation Role Attribute': htmlContent.includes('role="navigation"'),
  'ARIA Labels Present': htmlContent.includes('aria-label'),
  'Required Home Link': htmlContent.includes('index.html'),
  'Required Admission Link': htmlContent.includes('ADMISSION/public/index.html'),
  'Required Fees Link': htmlContent.includes('FEES/index.html'),
  'Required Student Login Link': htmlContent.includes('PORTAL/student-login.html'),
  'Required About Link': htmlContent.includes('ABOUT US/index.html'),
  'Required Gallery Link': htmlContent.includes('GALLERY/index.html'),
  'Required News Link': htmlContent.includes('NEWS/index.html'),
  'Required FAQ Link': htmlContent.includes('FAQ/index.html'),
  'Required Calendar Link': htmlContent.includes('CALENDAR/index.html'),
  'Required Contact Link': htmlContent.includes('CONTACT/index.html')
};

console.log('🌐 Cross-Browser Navigation Structure Validation');
console.log('='.repeat(55));

let passed = 0;
let total = 0;

Object.entries(checks).forEach(([test, result]) => {
  total++;
  if (result) {
    passed++;
    console.log('✅', test, '- PASS');
  } else {
    console.log('❌', test, '- FAIL');
  }
});

console.log('\n📊 HTML Structure Results:');
console.log('Passed:', passed + '/' + total, '(' + ((passed/total)*100).toFixed(1) + '%)');

// Check CSS for responsive navigation
const cssContent = fs.readFileSync('style.css', 'utf8');

console.log('\n🎨 CSS Responsive Navigation Validation');
console.log('='.repeat(55));

const cssChecks = {
  'Desktop Media Query (≥769px)': cssContent.includes('@media (min-width: 769px)'),
  'Mobile Media Query (≤768px)': cssContent.includes('@media (max-width: 768px)'),
  'Flexbox Display': cssContent.includes('display: flex'),
  'Navigation Links Styling': cssContent.includes('.nav-links'),
  'Hover Effects': cssContent.includes(':hover'),
  'Top Bar Styling': cssContent.includes('.top-bar')
};

let cssPassed = 0;
let cssTotal = 0;

Object.entries(cssChecks).forEach(([test, result]) => {
  cssTotal++;
  if (result) {
    cssPassed++;
    console.log('✅', test, '- PASS');
  } else {
    console.log('❌', test, '- FAIL');
  }
});

console.log('\n📊 CSS Results:');
console.log('Passed:', cssPassed + '/' + cssTotal, '(' + ((cssPassed/cssTotal)*100).toFixed(1) + '%)');

console.log('\n🎯 Overall Cross-Browser Readiness:');
const overallPassed = passed + cssPassed;
const overallTotal = total + cssTotal;
const overallScore = ((overallPassed/overallTotal)*100).toFixed(1);
console.log('Total Score:', overallPassed + '/' + overallTotal, '(' + overallScore + '%)');

if (overallScore >= 90) {
  console.log('🟢 EXCELLENT - Ready for cross-browser testing');
} else if (overallScore >= 80) {
  console.log('🟡 GOOD - Minor issues may exist');
} else {
  console.log('🔴 NEEDS WORK - Significant issues found');
}

// Additional browser compatibility checks
console.log('\n🔍 Browser Compatibility Analysis:');
console.log('='.repeat(55));

const compatibilityChecks = {
  'CSS Grid Support': cssContent.includes('display: grid'),
  'CSS Transforms': cssContent.includes('transform:'),
  'CSS Transitions': cssContent.includes('transition:'),
  'Vendor Prefixes': cssContent.includes('-webkit-') || cssContent.includes('-moz-'),
  'Modern CSS Features': cssContent.includes('linear-gradient'),
  'Responsive Images': htmlContent.includes('img') && cssContent.includes('max-width'),
};

let compatPassed = 0;
let compatTotal = 0;

Object.entries(compatibilityChecks).forEach(([test, result]) => {
  compatTotal++;
  if (result) {
    compatPassed++;
    console.log('✅', test, '- SUPPORTED');
  } else {
    console.log('⚠️', test, '- CHECK NEEDED');
  }
});

console.log('\n📊 Compatibility Score:');
console.log('Supported:', compatPassed + '/' + compatTotal, '(' + ((compatPassed/compatTotal)*100).toFixed(1) + '%)');

console.log('\n📋 Cross-Browser Testing Recommendations:');
console.log('='.repeat(55));
console.log('1. Test desktop navigation at 1024px, 1366px, 1920px widths');
console.log('2. Test mobile navigation at 320px, 375px, 768px widths');
console.log('3. Verify hover effects work in Chrome, Firefox, Edge');
console.log('4. Test touch interactions on Safari (iOS)');
console.log('5. Validate keyboard navigation across all browsers');
console.log('6. Check ARIA attributes with screen readers');
console.log('7. Test responsive breakpoint transitions');
console.log('8. Verify all navigation links work correctly');

console.log('\n🌐 Browser Priority Testing Order:');
console.log('1. Chrome (Primary) - Most users');
console.log('2. Safari (Mobile) - iOS users');
console.log('3. Firefox (Secondary) - Privacy-focused users');
console.log('4. Edge (Windows) - Windows default browser');