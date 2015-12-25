/**
 * Created by mars on 25.12.15.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        slim: {
            options: {                       // Target options
                pretty: true
            },
            dist: {
                files: [
                    {'index.html': 'index.slim'},
                    {
                        expand: true,
                        cwd: 'app/templates',
                        src: ['{,*/}*.slim'],
                        dest: 'build/templates',
                        ext: '.html'
                    }
                ]
            }
        },
        tags: {
            devLogin: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'build/*.js'
                ],
                options: {
                    openTag: '/ start auto template tags',
                    closeTag: '/ end auto template tags',
                    linkTemplate: (function () {
                        return 'link  rel="stylesheet" href="{{ path }} " data-css-type="custom-theme"'
                    }()),
                    scriptTemplate: (function () {
                        return 'script type="text/javascript" src="{{ path }}"'
                    }())
                },
                dest: 'index.slim'
            }
        }
    });
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-slim');
}
