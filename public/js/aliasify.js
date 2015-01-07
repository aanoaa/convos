var through = require('through2');

module.exports = function(file) {
  return through(function(buf, enc, next) {
    //if (buf.toString('utf8').match(/require\s*\(.react.\)/)) console.log(file) ;
      this.push(buf.toString('utf8').replace(/\brequire\s*\(.react.\)/g, "require('react/addons')"));
      next();
  });
};
