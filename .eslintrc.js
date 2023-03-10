module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    // "semi": [2, "always"],//语句强制分号结尾
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
