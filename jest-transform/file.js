module.exports = {
  process() {
    return 'module.exports = "foo";';
  },
  getCacheKey() {
    return 'file';
  }
};
