/**
 * remove console.log for distribution files.
 */

var groundskeeper = require('groundskeeper');

module.exports = function(grunt) {

  grunt.registerMultiTask('remove-logging', 'remove console.log for distribution files', function() {
    this.files.forEach(function(file) {
      file.src.filter(function(filepath) {
        if(!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
        .map(function(filepath) {
          var content = grunt.file.read(filepath);
          var cleaner = groundskeeper();
          cleaner.write(content);
          grunt.file.write(file.dest, cleaner.toString());
        })
    })
  })
};
