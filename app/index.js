'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
	// priorityName: {
	//     method: function () {},
	//     method2: function () {}
	// }

	// paths: function () {
		// this.destinationRoot();
		// returns '~/projects'

		// this.destinationPath('index.js');
		// returns '~/projects/index.js'

		// this.sourceRoot()
		// returns './templates'

		// this.templatePath('index.js');
		// returns './templates/index.js'
	// },

	// The name `constructor` is important here
	constructor: function () {
		// Calling the super constructor is important so our generator is correctly set up
		generators.Base.apply(this, arguments);

		// Next, add your custom code
		// this.option('coffee'); // This method adds support for a `--coffee` flag
		// And you can then access it later on this way; e.g.
		// this.scriptSuffix = (this.options.coffee ? '.coffee': '.js');

		// This makes `appname` a required argument.
		// this.argument('appname', { type: String, required: true });
		// And you can then access it later on this way; e.g. CamelCased
	},

  	initializing: {
  		init: function () {
			// this.extraNpmModules = {
			// 	dev: [],
			// 	production: []

			// };
			// this.extraBowerComponents = {
			// 	dev: [],
			// 	production: []

			// };

			this.appDir = './ui';
			this.scriptsDir = this.appDir + '/scripts';
			this.stylesDir = this.appDir + '/styles';

			this.promptInstall = function () {
			    var done = this.async();

			    var prompts = [
			    	{
						type    : 'input',
						name    : 'name',
						message : 'What\'s your project\'s name?',
						default : 'Super Terrific Happy App' // Default to current folder name
					}
				    // {
				    //     type    : 'input',
				    //     name    : 'devNpm',
				    //     message : 'Do you want to setup a database connection?',
				    //     default : '' // Default to none
				    // },
				    // {
				    //     type    : 'input',
				    //     name    : 'prodNpm',
				    //     message : 'Enter a database',
				    //     default : '' // Default to none
				    // },
				    // {
				    //     type    : 'input',
				    //     name    : 'devBower',
				    //     message : 'Enter a comma separated list of extra dev bower components to install',
				    //     default : '' // Default to none
				    // },
				    // {
				    //     type    : 'input',
				    //     name    : 'prodBower',
				    //     message : 'Enter a comma separated list of extra production bower components to install',
				    //     default : '' // Default to none
				    // }

			    ];


			    this.prompt(prompts, function (answers) {
			    	this.appname = answers.name;
			    	this.log('You\'ve named your app: ' + answers.name);

			    	this.configureFTP = answers.ftp;
			    	if (this.configureFTP) this.log('Creating .ftppass file');

					//strip whitespace and break into array
					// this.extraNpmModules.dev = answers.devNpm.replace(/ /g,'').split(',');
					// this.extraNpmModules.production = answers.prodNpm.replace(/ /g,'').split(',');
					// this.log(this.extraNpmModules);

					// //strip whitespace and break into array
					// this.extraBowerComponents.dev = answers.devBower.replace(/ /g,'').split(',');
					// this.extraBowerComponents.production = answers.prodBower.replace(/ /g,'').split(',');
					// this.log(this.extraBowerComponents);

					done();
			    }.bind(this));
			};

		  	this.changeAppName = function () {
		  		this.typedAppName = this.appname; // This has to work App
				this.humanAppname = _.startCase(this.appname); // This has to work app
				this.sluggedAppname = _.kebabCase(this.appname); // this-has-to-work-app
				this.camelCasedAppname = _.camelCase(this.appname.toLowerCase()); //thisHasToWorkApp
				this.upperCasedAppname = _.kebabCase(this.appname).toUpperCase(); //THIS-HAS-TO-WORK-APP

				this.allNames = {
					typedAppName: this.typedAppName,
					humanAppname: this.humanAppname,
					sluggedAppname: this.sluggedAppname,
					camelCasedAppname: this.camelCasedAppname,
					upperCasedAppname: this.upperCasedAppname
				};
		  	};
	  	}

  	},

  	prompting: {
  		install: function () {
			this.promptInstall();
	  	}
	},

	configuring: {
		setInitialState: function () {
			this.changeAppName(this.appname);
		}
	},

	writing: {
	  	root: function () {
			this.template('./bower.json', './bower.json');
			this.template('./_.bowerrc', './.bowerrc');
			this.template('./_.gitignore', './.gitignore');
			this.template('./_.jshintrc', './.jshintrc');
			this.template('./package.json', './package.json', this.allNames);
			this.template('./app.js', './app.js', this.allNames);
			this.template('./gulpfile.js', './gulpfile.js');
			this.template('./README.md', './README.md');
		    this.template('./_default.json', './' + this.sluggedAppname + '.json', this.allNames);
	  	},

	  	templates: function () {

	  		//gulp
			this.directory('./gulp', './gulp');
	  		this.template('./gulp/config.js', './gulp/config.js', this.allNames);
		    // !!! Use this to set ftppass info from prompts !!!
		    // if (this.configureFTP) {
		    // 	this.template('./gulp/config.js', './gulp/config.js',
			   //    	this.ftpInfo
			   //  );
		    // }
	  		this.template('./gulp/.ftppass.sample', './gulp/.ftppass');

	  		//jade templates
	  		this.directory('./views', './views');
	  		this.template('./views/api.jade', './views/api.jade', this.allNames);
	  		this.template('./views/index.jade', './views/index.jade', this.allNames);

	  		//styles
		    this.template(this.stylesDir + '/_default.less', this.stylesDir + '/' + this.sluggedAppname + '.less');
		    this.template(this.stylesDir + '/app.less', this.stylesDir + '/app.less', this.allNames);
		    this.copy(this.stylesDir + '/vars.less', this.stylesDir + '/vars.less');
		    this.copy(this.stylesDir + '/common.less', this.stylesDir + '/common.less');
		    this.copy(this.stylesDir + '/mixins.less', this.stylesDir + '/mixins.less');

		    //images & fonts
	  		this.directory(this.appDir + '/images', this.appDir + '/images');
	  		this.directory(this.appDir + '/fonts', this.appDir + '/fonts');

		    //scripts
		    this.template(this.scriptsDir + '/router.js', this.scriptsDir + '/router.js', this.allNames);
		    this.copy(this.scriptsDir + '/app.js', this.scriptsDir + '/app.js');
		    this.template(this.scriptsDir + '/views/main.js', this.scriptsDir + '/views/main.js', this.allNames);
		    this.template(this.scriptsDir + '/views/_default.js', this.scriptsDir + '/views/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/templates/_default.ejs', this.scriptsDir + '/templates/' + this.sluggedAppname + '.ejs', this.allNames);
		    this.template(this.scriptsDir + '/templates/main.ejs', this.scriptsDir + '/templates/main.ejs', this.allNames );
		    this.template(this.scriptsDir + '/models/_default.js', this.scriptsDir + '/models/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/collections/_default.js', this.scriptsDir + '/collections/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/lib/_default.js', this.scriptsDir + '/lib/' + this.sluggedAppname + '.js', this.allNames );

		    //services
		    this.template('./services/couchdb.js', './services/couchdb.js', this.allNames);
		    this.template('./services/mongodb.js', './services/mongodb.js', this.allNames);

		    //controllers
		    this.template('./controllers/database.js', './controllers/database.js', this.allNames);
		    this.template('./controllers/_default.js', './controllers/' + this.sluggedAppname + '.js', this.allNames);

		    //routes
		    this.template('./routes/_default.js', './routes/' + this.sluggedAppname + '.js', this.allNames);
		    this.template('./routes/api.js', './routes/api.js', this.allNames);
		    this.template('./routes/index.js', './routes/index.js', this.allNames);

		    //config
		    this.template('./config/_default.js', './config/' + this.sluggedAppname + '.js', this.allNames);

		    //start files
		    this.directory('./bin', './bin');
	  	}
	},

	install: {
		runDependencies: function () {
			// this.bowerInstall(); // bower
			this.installDependencies(); //npm and bower

			this.config.save(); //save yo-rc.json
	   		// this.npmInstall(['lodash'], { 'saveDev': true });
		}
	},

	end: {
		bye: function () {
			this.log('You\'ve got an app!  Run `gulp` to start it up.');
		}
	}

});