'use strict';

module.exports = function(grunt) {

  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long grunt task take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //Configure grunt
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      options: {
        banner: grunt.file.read('src/banner')
      },
      main: {
        files: {
          'dist/css/nya-bs-select.css': 'less/nya-bs-select.less'
        }
      },
      docs: {
        files: {
          'docs/dist/css/main.css': 'docs/src/less/main.less'
        }
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.',
            'examples'
          ]
        }
      },
      docs: {
        options: {
          open: true,
          base: [
            'docs/dist'
          ]
        }
      }
    },

    //Watch files for changes, and run tasks base on the changed files.
    watch: {
      css: {
        files: ['less/*.less'],
        tasks: ['newer:less:main'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'examples/*.html',
          'examples/{,*/*.js}',
          'examples{,*/}*.css',
          'examples/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'docs/dist/*.html',
          'docs/dist/partials/*.html'
        ]
      },
      'docs-less': {
        files: ['docs/src/less/*.less'],
        tasks: ['newer:less:docs'],
        options: {
          livereload: true
        }
      },
      'docs-js': {
        files: ['docs/dist/js/*.js'],
        options: {
          livereload: true
        }
      },
      'docs-md': {
        files: ['docs/src/content/{,*/}*.md'],
        tasks: ['newer:markdown:docs'],
        options: {
          livereload: true
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'src/*.js',
        'examples/{,*/}*.js'
      ],
      docs: [
        'docs/dist/js/*.js'
      ]
    },

    // Test

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      locally: {
        configFile: 'test/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        browsers: ['Chrome', 'Firefox', 'PhantomJS']
      }
    },

    concat: {
      options:{
        banner: grunt.file.read('src/banner')
      },
      dist: {
        src: ['src/nya.prefix', 'src/nya-bs-public.js', 'src/nya-bs-config.js', 'src/nya-bs-select-ctrl.js', 'src/nya-bs-select.js', 'src/nya-bs-option.js', 'src/nya.suffix'],
        dest: 'dist/js/nya-bs-select.js'
      }
    },

    uglify: {
      options: {
        banner: grunt.file.read('src/banner')
      },
      dist: {
        src: ['dist/js/nya-bs-select.js'],
        dest: 'dist/js/nya-bs-select.min.js'
      }
    },

    cssmin: {
      options: {
        banner: grunt.file.read('src/banner')
      },
      dist: {
        src: ['dist/css/nya-bs-select.css'],
        dest: 'dist/css/nya-bs-select.min.css'
      }
    },

    copy: {
      docs: {
        files:[
          {
            expand: true,
            cwd: 'bower_components/',
            flatten: true,
            src: [
              'angular/angular.js',
              'angular-ui-router/release/angular-ui-router.js',
              'jquery/dist/jquery.js',
              'bootstrap/dist/js/bootstrap.js'
            ],
            dest: 'docs/dist/js/'
          },
          {
            expand: true,
            cwd: 'bower_components',
            flatten: true,
            src: [
              'bootstrap/dist/fonts/*'
            ],
            dest: 'docs/dist/fonts/'
          },
          {
            expand: true,
            flatten: true,
            src: ['dist/js/nya-bs-select.js'],
            dest: 'docs/dist/js/'
          },
          {
            expand: true,
            flatten: true,
            src: ['dist/css/nya-bs-select.css'],
            dest: 'docs/dist/css/'
          },
          {
            expand: true,
            cwd: 'bower_components/svg-loaders',
            src: ['svg-loaders/*'],
            dest: 'docs/dist/'
          }
        ]
      }
    },

    markdown: {
      docs: {
        options:{
          template: 'docs/src/markdown-template.html'
        },
        files: [
          {
            expand: true,
            cwd: 'docs/src/content/',
            src: '**/*.md',
            dest: 'docs/dist/partials/',
            ext: '.html'
          }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'docs/dist',
        dotfiles: true
      },
      src: ['**']
    },

    'remove-logging': {
      dist: {
        src: ['dist/js/nya-bs-select.js'],
        dest: 'dist/js/nya-bs-select.js'
      }
    }
  });

  require('./docs/tasks/markdown')(grunt);
  require('./tasks/remove-logging')(grunt);

  // Creates the 'serve' task
  grunt.registerTask('serve', [
    'less:main',
    'connect:livereload',
    'watch'
  ]);

  // Creates the 'test' task
  grunt.registerTask('test', ['karma:unit']);

  // Creates the 'test-local' task
  grunt.registerTask('test-local', ['karma:locally']);

  // Build distribution files
  grunt.registerTask('build', [
    'less:main',
    'test',
    'concat:dist',
    'remove-logging:dist',
    'uglify:dist',
    'cssmin:dist'
  ]);

  grunt.registerTask('buildDocs', [
    'copy:docs',
    'markdown',
    'less:docs',
    'gh-pages'
  ]);
  grunt.registerTask('serveDocs', [
    'copy:docs',
    'markdown',
    'less:docs',
    'connect:docs',
    'watch'
  ]);
};
