module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            options: {
                open: true
            },
            server: {
                options: {
                    port: 5000,
                    hostname: '*',
                    base: 'public/'
                }
            }
        },
        watch: {
            project: {
                files: ['!bower_components', 'public/*.*', 'public/**/*.*'],
                options: {
                    livereload: 20000,
                    keepAlive:true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['connect', 'watch']);
};
