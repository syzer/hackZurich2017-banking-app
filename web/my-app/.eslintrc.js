module.exports = {
  extends: ['standard', "plugin:react/recommended"],
  rules: {
    semi: ['error', 'never']
  },
  plugins: ['react'],
  ecmaFeatures: {
    jsx: true,
    modules: true,
  }
}