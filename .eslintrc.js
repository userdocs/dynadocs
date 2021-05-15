module.exports = {
    env: {
        browser: true,
        es2021: true,
        jquery: true
    },
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
    // If you prefer 4 indentation spaces, add this rule
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 'first',
                outerIIFEBody: 0
            }
        ],
        // If you prefer single quotes, add this rule
        quotes: [
            'error',
            'single',
            {avoidEscape: true}
        ],
        // If you prefer curlies for all, add this rule
        curly: 'error',
        // If you prefer non block statements to be beside, add this rule
        'nonblock-statement-body-position': 'error'
    }
};
