const path = require('path');

const sourcePath = path.join(__dirname, './src/');


module.exports = function(env, argv) {
  const config = require(`./config/${argv.conf}`);

  return config(sourcePath)
};
