
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple validation script to check for API pattern violations
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  
  // Check for hardcoded URLs
  const urlPattern = /fetch\s*\(\s*['"`](https?:\/\/[^'"`]+)['"`]/g;
  let match;
  while ((match = urlPattern.exec(content)) !== null) {
    violations.push({
      type: 'hardcoded-url',
      line: content.substring(0, match.index).split('\n').length,
      url: match[1],
      message: 'Hardcoded URL found. Use apiClient instead.'
    });
  }
  
  // Check for direct fetch usage
  const fetchPattern = /\bfetch\s*\(/g;
  while ((match = fetchPattern.exec(content)) !== null) {
    violations.push({
      type: 'direct-fetch',
      line: content.substring(0, match.index).split('\n').length,
      message: 'Direct fetch() usage. Use apiClient.get() or apiClient.post() instead.'
    });
  }
  
  return violations;
}

function validateDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalViolations = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalViolations += validateDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      const violations = validateFile(filePath);
      if (violations.length > 0) {
        console.log(`\n📁 ${filePath}:`);
        violations.forEach(violation => {
          console.log(`  ❌ Line ${violation.line}: ${violation.message}`);
          if (violation.url) {
            console.log(`     URL: ${violation.url}`);
          }
        });
        totalViolations += violations.length;
      }
    }
  });
  
  return totalViolations;
}

console.log('🔍 Validating API usage patterns...\n');
const violations = validateDirectory('./src');

if (violations === 0) {
  console.log('✅ No API pattern violations found!');
} else {
  console.log(`\n❌ Found ${violations} violation(s). Please fix them to maintain code consistency.`);
  console.log('\nGuidelines:');
  console.log('- Use apiClient.get(endpoint) instead of fetch(url)');
  console.log('- Use apiClient.post(endpoint, data) instead of fetch(url, options)');
  console.log('- Avoid hardcoded URLs in API calls');
}
