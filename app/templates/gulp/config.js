var dest = "./public";
var app = './ui';
var node_modules = './node_modules';
var bowerComponents = './bower_components';

var _ = require('lodash');

// USE THIS IF YOU NEED TO PROXY A URL
// var url = require('url');
// var proxy = require('proxy-middleware');
// var proxyOptions = url.parse('http://www.adultswim.com/<%= sluggedAppname %>');
// proxyOptions.route = '/<%= sluggedAppname %>';

var config = {
    browserSync: {
        // server: {
        //     middleware: [proxy(proxyOptions)]
        // },
        // proxy: {
        //     target: "localhost:3000",
        //     middleware: [proxy(proxyOptions)]
        // },
        proxy: 'localhost:3000',
        open: false,
        port: 3001,
        files: ['public/**/*']
    },
    nodemon: {
        options: {
            verbose: true,
            script: './bin/dev',
            ignore: [".git", 'public', 'ui', 'node_modules', 'gulp']
        }
    },
    open: {
        url: 'http://localhost:3001'
    },
    less: {
        src: app + "/styles/app.less",
        watchSrc: app + "/styles/**",
        dest: dest + "/css/",
        settings: {
            paths: [
                app + '/styles/',
                node_modules + '/',
                bowerComponents + '/'
            ]
        }
    },
    images: {
        src: app + "/images/**",
        dest: dest + "/images"
    },
    fonts: {
        src: [
            app + "/fonts/**",
            node_modules + '/font-awesome/fonts/**'
        ],
        dest: dest + "/fonts"
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: app + '/scripts/app.js',
            dest: dest,
            outputName: 'js/app.js',
            // Additional file extentions to make optional
            extensions: ['.ejs'],
            // list of modules to make require-able externally
            // require: ['jquery', 'lodash', 'keymaster']
        }]
    },
    minify: {
        cssSrc: dest + '/css/*.css',
        jsSrc: dest + '/js/*.js',
        cssDest: dest + '/css/',
        jsDest: dest + '/js/'
    }
};

module.exports = config;