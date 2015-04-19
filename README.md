# Yeoman Generator for an Express + CouchDB + Backbone Node App Skeleton

## Overview
This yeoman generator provides you with a node app skeleton for creating and deploying a one page dynamic html/js/css app with a node/express backend for apis or image processing or whatever.  It uses a bunch web technologies to help workflow, organization and rapid development, including gulp, nodemon and Browserify.

It uses:
* [Express](http://browserify.org/) as it's node framework.
* [Backbone](http://expressjs.com/) as it's front-end MVC.
* [LESS](http://lesscss.org/) as it's css pre-processor.
* [gulp](http://gulpjs.com/) as it's task runner.
* [Browserify](http://browserify.org/) as it's dependency manager.
* And several packages come pre-installed to help out with things (nodemon, Bootstrap, jQuery, lodash, BrowserSync, Font Awesome, async and more)

## Prerequisites
First, make sure you have [yeoman](http://yeoman.io/) installed globally. `npm install yo -g`

Once you have that you can install this generator. `npm install -g generator-node-app-skeleton`

Two major things this repo uses are gulp and nodemon. You'll need to set them up globally. `npm install -g gulp` and `npm install -g nodemon`

## Generating Your App
Create your project directory and cd into it: `mkdir {app-dirname} && cd {app-dirname}`

And run `yo node-app-skeleton`. 

You'll get a few prompts about customizing your app.

## Using Your App
There's a little bit of setup left to do before you can do everything you might need to.

#### Serving Your App and Listening for Changes

Run `gulp` start up the node server and listen for file changes.  Also to compile and watch all the less, js and copies the images, fonts, and markup into a .build folder for serving using BrowserSync.

#### More Gulp Commands

`gulp -c` or `gulp --clean=true` will first delete the previous build folder then watch and compile.

`gulp clean` only cleans out your build directory.