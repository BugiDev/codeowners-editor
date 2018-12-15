const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Core: path.resolve(__dirname, '../src/core/'),
      UI: path.resolve(__dirname, '../src/ui/'),
    },
  },
};
