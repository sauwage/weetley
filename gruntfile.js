module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            js: {
                src: './src/js/app.js',
                dest: './dist/js/app.js'
            }
        },

        less: {
            all: {
                files: {
                    './dist/css/main.css': './src/less/main.less'
                }
            }
        },

        cssmin: {
          build: {
            files: {
              'dist/css/main.min.css': 'dist/css/main.css'
            }
          }
        },

        watch: {
            js: {
                files: ['./src/js/app.js'],
                tasks: ['browserify']
            },
            less: {
                files: ['**/*.less'],
                tasks: ['less', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch', 'less', 'browserify', 'cssmin']);
};
