// Test setup for navigation UI tests
const fs = require('fs');
const path = require('path');

// Load HTML and CSS for testing
global.loadTestHTML = () => {
  const htmlPath = path.join(__dirname, 'index.html');
  const cssPath = path.join(__dirname, 'style.css');
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Parse HTML and extract body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*)<\/head>/i);
  
  if (bodyMatch) {
    document.body.innerHTML = bodyMatch[1];
  }
  
  if (headMatch) {
    document.head.innerHTML = headMatch[1];
  }
  
  // Add CSS to document
  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);
  
  return { htmlContent, cssContent };
};

// Helper to simulate viewport width
global.setViewportWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

// Helper to get computed styles
global.getComputedStyle = (element, property) => {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    return window.getComputedStyle(element).getPropertyValue(property);
  }
  // Fallback for testing - simulate CSS property values
  const style = element.style || {};
  return style[property] || '';
};