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
            dev: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                    'bower_components/angular-ui-router-anim-in-out/anim-in-out.js',
                    'build/**/*.js',
                    'module/**/_*.js',
                    'module/**/*.js',
                    'build/*.css',
                    'bower_components/angular-ui-router-anim-in-out/css/anim-in-out.css'
                ],

                dest: 'index.slim'
            },
            prod: {
                src: [
                    'build_prod/app.min.js',
                    'build_prod/index.min.css'
                ],
                dest: 'index.slim'
            }
        }
    });
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-slim');
};
