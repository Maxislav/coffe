/**
 * Created by mars on 25.12.15.
 */
module.exports = function ( grunt ) {
    grunt.initConfig({
        slim: {
            options: {                       // Target options
                pretty: true
            },
            dist: {
                files: {
                    'slim/day.html': 'slim/day.slim'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-slim');
}
