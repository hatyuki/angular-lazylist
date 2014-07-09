'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
      // Project settings
      yeoman: appConfig,

      watch: {
        js: {
          files: ['<%= yeoman.src %>/*.js'],
          tasks: ['newer:jshint:main']
        },
        test: {
          files: ['test/spec/*.js'],
          tasks: ['newer:jshint:test', 'karma']
        }
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        main: {
          src: [
            'Gruntfile.js',
            '<%= yeoman.src%>/*.js'
          ]
        },
        test: {
          options: {
            jshintrc: 'test/.jshintrc'
          },
          src: ['test/spec/*.js']
        }
      },

      clean: {
        dist: [
          '<%= yeoman.dist %>/*.js',
          '.tmp/*.js'
        ]
      },

      ngmin: {
        dist: {
            expand: true,
            cwd: '<%= yeoman.src %>',
            src: ['*.js'],
            dest: '.tmp'
        }
      },

      uglify: {
        dist: {
          files: {
            '<%= yeoman.dist %>/angular-lazylist.min.js': ['.tmp/angular-lazylist.js']
          }
        }
      },

      // Test settings
      karma: {
        unit: {
          configFile: 'test/karma.conf.js',
          singleRun: true
        }
      }
  });

  grunt.registerTask('devel', [
      'jshint:main',
      'watch'
  ]);

  grunt.registerTask('test', [
      'karma'
  ]);

  grunt.registerTask('build', [
      'clean:dist',
      'ngmin:dist',
      'uglify:dist'
  ]);

  grunt.registerTask('default', [
      'newer:jshint',
      'test',
      'build'
  ]);
};
