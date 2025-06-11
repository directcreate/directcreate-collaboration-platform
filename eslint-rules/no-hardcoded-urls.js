
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent hardcoded URLs in API calls',
      category: 'Best Practices',
      recommended: true
    },
    fixable: null,
    schema: []
  },
  create(context) {
    return {
      CallExpression(node) {
        // Check for fetch() calls with hardcoded URLs
        if (node.callee.name === 'fetch' && node.arguments.length > 0) {
          const firstArg = node.arguments[0];
          
          // Check for string literals containing URLs
          if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
            const url = firstArg.value;
            if (url.startsWith('http://') || url.startsWith('https://')) {
              context.report({
                node: firstArg,
                message: 'Hardcoded URLs are not allowed. Use apiClient instead of direct fetch() calls.'
              });
            }
          }
          
          // Check for template literals with URL patterns
          if (firstArg.type === 'TemplateLiteral') {
            const quasi = firstArg.quasis[0];
            if (quasi && quasi.value.raw.match(/^https?:\/\//)) {
              context.report({
                node: firstArg,
                message: 'Hardcoded URLs are not allowed. Use apiClient instead of direct fetch() calls.'
              });
            }
          }
        }
        
        // Check for axios calls with hardcoded URLs
        if (node.callee.property && 
            ['get', 'post', 'put', 'delete'].includes(node.callee.property.name) &&
            node.arguments.length > 0) {
          const firstArg = node.arguments[0];
          
          if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
            const url = firstArg.value;
            if (url.startsWith('http://') || url.startsWith('https://')) {
              context.report({
                node: firstArg,
                message: 'Hardcoded URLs are not allowed. Use apiClient instead.'
              });
            }
          }
        }
      }
    };
  }
};
