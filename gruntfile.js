module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            all: {
                files: {
                    "./dist/css/main.css": "./src/less/main.less"
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch', 'less', 'cssmin']);
};
