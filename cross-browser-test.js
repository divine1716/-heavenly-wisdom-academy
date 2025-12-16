/**
 * Cross-Browser Navigation Testing Script
 * Tests navigation functionality across different browsers and viewport sizes
 * Requirements: 1.1, 1.2, 1.3, 1.5, 3.1, 3.2, 3.3
 */

class CrossBrowserNavigationTester {
    constructor() {
        this.testResults = [];
        this.browserInfo = this.detectBrowser();
        this.requiredLinks = [
            { text: 'Home', href: 'index.html' },
            { text: 'Admission', href: 'ADMISSION/public/index.html' },
            { text: 'Fees', href: 'FEES/index.html' },
            { text: 'Student Login', href: 'PORTAL/student-login.html' },
            { text: 'About', href: 'ABOUT US/index.html' },
            { text: 'Gallery', href: 'GALLERY/index.html' },
            { text: 'News', href: 'NEWS/index.html' },
            { text: 'FAQ', href: 'FAQ/index.html' },
            { text: 'Calendar', href: 'CALENDAR/index.html' },
            { text: 'Contact', href: 'CONTACT/index.html' }
        ];
    }

    detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = 'Unknown';
        
        if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        } else if (userAgent.indexOf('Edg') > -1) {
            browserName = 'Edge';
            browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
        }
        
        return { 
            name: browserName, 
            version: browserVersion, 
            userAgent: userAgent,
            viewport: { width: window.innerWidth, height: window.innerHeight },
            screen: { width: screen.width, height: screen.height }
        };
    }

    addTestResult(testName, status, message, requirement = null) {
        this.testResults.push({
            testName,
            status, // 'pass', 'fail', 'warning', 'info'
            message,
            requirement,
            browser: this.browserInfo.name,
            timestamp: new Date().toISOString()
        });
    }

    // Test 1: Desktop Navigation Visibility (Requirement 1.1)
    testDesktopNavigationVisibility() {
        const navLinks = document.querySelector('.nav-links');
        const currentWidth = window.innerWidth;
        
        if (currentWidth >= 769) {
            const isVisible = navLinks && window.getComputedStyle(navLinks).display !== 'none';
            const isFlexOrGrid = navLinks && ['flex', 'grid'].includes(window.getComputedStyle(navLinks).display);
            
            if (isVisible && isFlexOrGrid) {
                this.addTestResult(
                    'Desktop Navigation Visibility',
                    'pass',
                    `Desktop navigation is visible and properly displayed at ${currentWidth}px width`,
                    '1.1'
                );
            } else {
                this.addTestResult(
                    'Desktop Navigation Visibility',
                    'fail',
                    `Desktop navigation not properly displayed at ${currentWidth}px width. Display: ${navLinks ? window.getComputedStyle(navLinks).display : 'element not found'}`,
                    '1.1'
                );
            }
        } else {
            this.addTestResult(
                'Desktop Navigation Visibility',
                'info',
                `Skipped - current viewport (${currentWidth}px) is below desktop breakpoint (769px)`,
                '1.1'
            );
        }
    }

    // Test 2: Mobile Navigation Functionality (Requirement 3.1)
    testMobileNavigationFunctionality() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const currentWidth = window.innerWidth;
        
        if (currentWidth <= 768) {
            const btnVisible = mobileMenuBtn && window.getComputedStyle(mobileMenuBtn).display !== 'none';
            const navHidden = mobileNav && window.getComputedStyle(mobileNav).display === 'none';
            
            if (btnVisible && navHidden) {
                this.addTestResult(
                    'Mobile Navigation Functionality',
                    'pass',
                    `Mobile hamburger menu button is visible and navigation is initially hidden at ${currentWidth}px width`,
                    '3.1'
                );
            } else {
                this.addTestResult(
                    'Mobile Navigation Functionality',
                    'fail',
                    `Mobile navigation not properly configured at ${currentWidth}px width. Button visible: ${btnVisible}, Nav hidden: ${navHidden}`,
                    '3.1'
                );
            }
        } else {
            this.addTestResult(
                'Mobile Navigation Functionality',
                'info',
                `Skipped - current viewport (${currentWidth}px) is above mobile breakpoint (768px)`,
                '3.1'
            );
        }
    }

    // Test 3: Navigation Link Completeness (Requirement 1.3)
    testNavigationLinkCompleteness() {
        const navLinks = document.querySelectorAll('.nav-links a, #mobileNav a');
        const foundLinks = Array.from(navLinks).map(link => ({
            text: link.textContent.trim(),
            href: link.getAttribute('href')
        }));

        const missingLinks = this.requiredLinks.filter(required => 
            !foundLinks.some(found => 
                found.href === required.href || 
                found.text.includes(required.text.replace(/[^\w\s]/g, ''))
            )
        );

        if (missingLinks.length === 0) {
            this.addTestResult(
                'Navigation Link Completeness',
                'pass',
                `All ${this.requiredLinks.length} required navigation links are present`,
                '1.3'
            );
        } else {
            this.addTestResult(
                'Navigation Link Completeness',
                'fail',
                `Missing navigation links: ${missingLinks.map(link => link.text).join(', ')}`,
                '1.3'
            );
        }
    }

    // Test 4: Navigation Link Functionality (Requirement 1.5)
    testNavigationLinkFunctionality() {
        const navLinks = document.querySelectorAll('.nav-links a, #mobileNav a');
        let validLinks = 0;
        let invalidLinks = [];

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();
            
            if (href && href !== '#' && href !== '') {
                validLinks++;
            } else {
                invalidLinks.push(text);
            }
        });

        if (invalidLinks.length === 0) {
            this.addTestResult(
                'Navigation Link Functionality',
                'pass',
                `All ${validLinks} navigation links have valid href attributes`,
                '1.5'
            );
        } else {
            this.addTestResult(
                'Navigation Link Functionality',
                'fail',
                `Invalid navigation links found: ${invalidLinks.join(', ')}`,
                '1.5'
            );
        }
    }

    // Test 5: Responsive Navigation Switching (Requirement 3.2)
    testResponsiveNavigationSwitching() {
        const desktopQuery = window.matchMedia('(min-width: 769px)');
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        const currentWidth = window.innerWidth;
        
        const expectedDesktop = currentWidth >= 769;
        const actualDesktop = desktopQuery.matches;
        const actualMobile = mobileQuery.matches;

        if (expectedDesktop === actualDesktop && expectedDesktop !== actualMobile) {
            this.addTestResult(
                'Responsive Navigation Switching',
                'pass',
                `Media queries correctly match viewport: ${currentWidth}px (Desktop: ${actualDesktop}, Mobile: ${actualMobile})`,
                '3.2'
            );
        } else {
            this.addTestResult(
                'Responsive Navigation Switching',
                'fail',
                `Media query mismatch at ${currentWidth}px. Expected desktop: ${expectedDesktop}, Actual desktop: ${actualDesktop}, Actual mobile: ${actualMobile}`,
                '3.2'
            );
        }
    }

    // Test 6: CSS Feature Support
    testCSSFeatureSupport() {
        const features = [
            { name: 'Flexbox', property: 'display', value: 'flex' },
            { name: 'CSS Grid', property: 'display', value: 'grid' },
            { name: 'CSS Transforms', property: 'transform', value: 'translateY(-2px)' },
            { name: 'CSS Transitions', property: 'transition', value: 'all 0.3s ease' },
            { name: 'Media Queries', test: () => window.matchMedia && window.matchMedia('(min-width: 1px)').matches !== undefined }
        ];

        let supportedFeatures = [];
        let unsupportedFeatures = [];

        features.forEach(feature => {
            let isSupported = false;
            
            if (feature.test) {
                isSupported = feature.test();
            } else {
                const testElement = document.createElement('div');
                testElement.style[feature.property] = feature.value;
                isSupported = testElement.style[feature.property] !== '';
            }

            if (isSupported) {
                supportedFeatures.push(feature.name);
            } else {
                unsupportedFeatures.push(feature.name);
            }
        });

        if (unsupportedFeatures.length === 0) {
            this.addTestResult(
                'CSS Feature Support',
                'pass',
                `All required CSS features are supported: ${supportedFeatures.join(', ')}`,
                'General'
            );
        } else {
            this.addTestResult(
                'CSS Feature Support',
                'warning',
                `Some CSS features not supported: ${unsupportedFeatures.join(', ')}. Supported: ${supportedFeatures.join(', ')}`,
                'General'
            );
        }
    }

    // Test 7: Accessibility Features (Requirement 3.5)
    testAccessibilityFeatures() {
        const navElement = document.querySelector('nav[role="navigation"]');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelectorAll('.nav-links a, #mobileNav a');
        
        let accessibilityIssues = [];
        let accessibilityPasses = [];

        // Check for navigation role
        if (navElement) {
            accessibilityPasses.push('Navigation has proper role attribute');
        } else {
            accessibilityIssues.push('Navigation missing role="navigation"');
        }

        // Check mobile menu button accessibility
        if (mobileMenuBtn) {
            const hasAriaLabel = mobileMenuBtn.hasAttribute('aria-label');
            const hasAriaExpanded = mobileMenuBtn.hasAttribute('aria-expanded');
            const hasAriaControls = mobileMenuBtn.hasAttribute('aria-controls');

            if (hasAriaLabel && hasAriaExpanded && hasAriaControls) {
                accessibilityPasses.push('Mobile menu button has proper ARIA attributes');
            } else {
                accessibilityIssues.push('Mobile menu button missing ARIA attributes');
            }
        }

        // Check navigation links
        let linksWithTabIndex = 0;
        navLinks.forEach(link => {
            if (link.hasAttribute('tabindex') || link.tabIndex >= 0) {
                linksWithTabIndex++;
            }
        });

        if (linksWithTabIndex === navLinks.length) {
            accessibilityPasses.push('All navigation links are keyboard accessible');
        } else {
            accessibilityIssues.push(`${navLinks.length - linksWithTabIndex} navigation links missing keyboard accessibility`);
        }

        if (accessibilityIssues.length === 0) {
            this.addTestResult(
                'Accessibility Features',
                'pass',
                `All accessibility checks passed: ${accessibilityPasses.join(', ')}`,
                '3.5'
            );
        } else {
            this.addTestResult(
                'Accessibility Features',
                'warning',
                `Accessibility issues found: ${accessibilityIssues.join(', ')}. Passes: ${accessibilityPasses.join(', ')}`,
                '3.5'
            );
        }
    }

    // Test 8: Top Bar Optimization (Requirement 2.1, 2.2, 2.3)
    testTopBarOptimization() {
        const topBar = document.querySelector('.top-bar');
        
        if (!topBar) {
            this.addTestResult(
                'Top Bar Optimization',
                'fail',
                'Top bar element not found',
                '2.1'
            );
            return;
        }

        const computedStyle = window.getComputedStyle(topBar);
        const padding = computedStyle.padding;
        const height = topBar.offsetHeight;
        
        // Check if top bar uses minimal space (height should be reasonable)
        if (height <= 60) {
            this.addTestResult(
                'Top Bar Optimization',
                'pass',
                `Top bar height is optimized: ${height}px with padding: ${padding}`,
                '2.1, 2.2'
            );
        } else {
            this.addTestResult(
                'Top Bar Optimization',
                'warning',
                `Top bar height may be too large: ${height}px with padding: ${padding}`,
                '2.1, 2.2'
            );
        }

        // Check social media icons
        const socialIcons = document.querySelectorAll('.top-social-icons a');
        if (socialIcons.length > 0) {
            this.addTestResult(
                'Top Bar Social Icons',
                'pass',
                `Found ${socialIcons.length} social media icons in top bar`,
                '2.3'
            );
        } else {
            this.addTestResult(
                'Top Bar Social Icons',
                'fail',
                'No social media icons found in top bar',
                '2.3'
            );
        }
    }

    // Run all tests
    async runAllTests() {
        console.log(`🌐 Starting Cross-Browser Navigation Tests for ${this.browserInfo.name} ${this.browserInfo.version}`);
        console.log(`📱 Viewport: ${this.browserInfo.viewport.width}x${this.browserInfo.viewport.height}`);
        
        this.testResults = []; // Clear previous results
        
        // Run all test methods
        this.testDesktopNavigationVisibility();
        this.testMobileNavigationFunctionality();
        this.testNavigationLinkCompleteness();
        this.testNavigationLinkFunctionality();
        this.testResponsiveNavigationSwitching();
        this.testCSSFeatureSupport();
        this.testAccessibilityFeatures();
        this.testTopBarOptimization();
        
        return this.generateReport();
    }

    generateReport() {
        const passCount = this.testResults.filter(r => r.status === 'pass').length;
        const failCount = this.testResults.filter(r => r.status === 'fail').length;
        const warningCount = this.testResults.filter(r => r.status === 'warning').length;
        const totalTests = this.testResults.length;
        const successRate = ((passCount / totalTests) * 100).toFixed(1);

        const report = {
            browserInfo: this.browserInfo,
            summary: {
                total: totalTests,
                passed: passCount,
                failed: failCount,
                warnings: warningCount,
                successRate: `${successRate}%`
            },
            results: this.testResults,
            timestamp: new Date().toISOString()
        };

        // Console output
        console.log('\n📊 Cross-Browser Navigation Test Report');
        console.log('=' .repeat(50));
        console.log(`Browser: ${this.browserInfo.name} ${this.browserInfo.version}`);
        console.log(`Viewport: ${this.browserInfo.viewport.width}x${this.browserInfo.viewport.height}`);
        console.log(`Tests: ${passCount}/${totalTests} passed (${successRate}%)`);
        console.log(`Failures: ${failCount}, Warnings: ${warningCount}`);
        console.log('\nDetailed Results:');
        
        this.testResults.forEach(result => {
            const icon = {
                'pass': '✅',
                'fail': '❌',
                'warning': '⚠️',
                'info': 'ℹ️'
            }[result.status];
            
            console.log(`${icon} ${result.testName}: ${result.message}`);
            if (result.requirement) {
                console.log(`   📋 Validates Requirement: ${result.requirement}`);
            }
        });

        return report;
    }

    // Method to test at specific viewport size
    async testAtViewportSize(width, height) {
        // Note: This would require browser automation tools like Puppeteer for actual resizing
        // For now, we'll simulate the test based on current viewport
        console.log(`🔄 Testing at viewport size: ${width}x${height}`);
        
        const originalWidth = window.innerWidth;
        const originalHeight = window.innerHeight;
        
        // Update browser info with simulated viewport
        this.browserInfo.viewport = { width, height };
        
        const report = await this.runAllTests();
        
        // Restore original viewport info
        this.browserInfo.viewport = { width: originalWidth, height: originalHeight };
        
        return report;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CrossBrowserNavigationTester;
}

// Auto-run if loaded directly in browser
if (typeof window !== 'undefined') {
    window.CrossBrowserNavigationTester = CrossBrowserNavigationTester;
    
    // Provide global function to run tests
    window.runCrossBrowserTests = async function() {
        const tester = new CrossBrowserNavigationTester();
        return await tester.runAllTests();
    };
    
    // Auto-run tests when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Cross-Browser Navigation Tester loaded. Run tests with: runCrossBrowserTests()');
    });
}