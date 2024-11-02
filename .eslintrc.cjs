module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "eslint:recommended",
    "airbnb/hooks",
    "airbnb",
    "plugin:@tanstack/query/recommended"
  ],
  ignorePatterns: [
    'dist', 
    '.eslintrc.cjs', 
    'postcss.config.cjs', 
    'tailwind.config.ts', 
    'vite.config.ts'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',  
    tsconfigRootDir: __dirname,  
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  "settings": {
    "import/resolver": {
      "typescript": {},
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: [
    'react-refresh',
    "react",
    "@typescript-eslint",
    "@tanstack/query",
  ],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": ["error"],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    "import/extensions": ["never" | "always"],
    "sort-imports": [
      "error",
      {
        "ignoreCase": true,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }
    ],
    "react/jsx-indent" : ["error", 2],
    "max-len": ["error", {
      "code": 130,
      "tabWidth": 4,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreRegExpLiterals": true
    }],
    "react/require-default-props": "off",
  }
}
