if (process.env.NODE_ENV === 'development') {
  module.exports = require('./src/main');
} else {
  module.exports = require('./dist/main.esm.js');
}
