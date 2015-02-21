module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    var pushState = require("grunt-connect-pushstate/lib/utils").pushState;

    grunt.initConfig({
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                },
                transform: [ require('grunt-react').browserify ],
                external: ['react'],
                watch: true,
                keepAlive: true
            },
            client: {
                src: "js/index.js",
                dest: "dist/app.js"
            }
        },
        exorcise: {
            bundle: {
                options: {},
                files: {
                    'dist/app.js.map': ['dist/app.js'],
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: "localhost",
                    port: 8000,
                    middleware: function(connect, options) {
                        var middlewares = [pushState()];

                        if(!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ["connect", 'browserify:client', 'exorcise:bundle']);
};
