
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using apiClient for API calls',
      category: 'Best Practices',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },
  create(context) {
    return {
      CallExpression(node) {
        // Check for direct fetch() calls
        if (node.callee.name === 'fetch') {
          context.report({
            node,
            message: 'Use apiClient.get() or apiClient.post() instead of direct fetch() calls.',
            fix(fixer) {
              // Simple fix suggestion - replace fetch with apiClient
              const source = context.getSourceCode();
              const fetchCall = source.getText(node);
              
              if (node.arguments.length === 1) {
                // GET request
                const url = source.getText(node.arguments[0]);
                return fixer.replaceText(node, `apiClient.get(${url})`);
              } else if (node.arguments.length === 2) {
                // POST request with options
                const url = source.getText(node.arguments[0]);
                const options = source.getText(node.arguments[1]);
                return fixer.replaceText(node, `apiClient.post(${url}, ${options})`);
              }
            }
          });
        }
        
        // Check for axios imports/usage
        if (node.callee.name === 'axios' || 
            (node.callee.object && node.callee.object.name === 'axios')) {
          context.report({
            node,
            message: 'Use apiClient instead of axios for API calls to maintain consistency.'
          });
        }
      },
      
      ImportDeclaration(node) {
        // Check for axios imports
        if (node.source.value === 'axios') {
          context.report({
            node,
            message: 'Import apiClient from config/apiConfig instead of axios.'
          });
        }
        
        // Check for fetch polyfill imports
        if (node.source.value === 'isomorphic-fetch' || 
            node.source.value === 'node-fetch') {
          context.report({
            node,
            message: 'Use apiClient instead of fetch polyfills.'
          });
        }
      }
    };
  }
};
