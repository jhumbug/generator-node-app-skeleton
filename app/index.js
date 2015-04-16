var generators = require('yeoman-generator');
var _ = require("lodash");

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
		// this.scriptSuffix = (this.options.coffee ? ".coffee": ".js");

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

			this.promptInstall = function (options) {
			    var done = this.async();

			    var prompts = [
			    	{
						type    : 'input',
						name    : 'name',
						message : 'What\'s your project\'s name?',
						default : 'Super Terrific Happy App' // Default to current folder name
					} //,
					// {
					// 	type    : 'input',
					// 	name    : 'ftp',
					// 	message : 'Want FTP deployment? ',
					// 	default : false // Default to current folder name
					// } //,
				    // {
				    //     type    : 'input',
				    //     name    : 'devNpm',
				    //     message : 'Enter a comma separated list of extra dev npm modules to install',
				    //     default : '' // Default to none
				    // },
				    // {
				    //     type    : 'input',
				    //     name    : 'prodNpm',
				    //     message : 'Enter a comma separated list of extra production npm modules to install',
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

		  	this.changeAppName = function (name) {
		  		this.typedAppName = this.appname; // This has to work App
				this.humanAppname = _.startCase(this.appname); // This has to work app
				this.sluggedAppname = _.kebabCase(this.appname); // this-has-to-work-app
				this.camelCasedAppname = _.camelCase(this.appname.toLowerCase()); //thisHasToWorkApp

				this.allNames = {
					typedAppName: this.typedAppName,
					humanAppname: this.humanAppname,
					sluggedAppname: this.sluggedAppname,
					camelCasedAppname: this.camelCasedAppname
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
	  	copy: function () {
			this.template('./bower.json', './bower.json');
			this.template('./_.bowerrc', './.bowerrc');
			this.template('./_.gitignore', './.gitignore');
			this.template('./package.json', './package.json', this.allNames);
			this.template('./gulpfile.js', './gulpfile.js');
			this.template('./README.md', './README.md');
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
	  		// this.template('./app/index.html', './app/index.html', this.allNames);

	  		//styles
		    this.template(this.stylesDir + '/_default.less', this.stylesDir + '/' + this.sluggedAppname + '.less');
		    this.template(this.stylesDir + '/app.less', this.stylesDir + '/app.less', this.allNames);
		    this.copy(this.stylesDir + '/vars.less', this.stylesDir + '/vars.less');
		    this.copy(this.stylesDir + '/mixins.less', this.stylesDir + '/mixins.less');

		    //scripts
		    this.template(this.scriptsDir + '/router.js', this.scriptsDir + '/router.js', this.allNames);
		    this.copy(this.scriptsDir + '/app.js', this.scriptsDir + '/app.js');
		    this.template(this.scriptsDir + '/views/content.js', this.scriptsDir + '/views/content.js', this.allNames);
		    this.template(this.scriptsDir + '/views/_default.js', this.scriptsDir + '/views/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/templates/_default.ejs', this.scriptsDir + '/templates/' + this.sluggedAppname + '.ejs', this.allNames);
		    this.template(this.scriptsDir + '/templates/content.ejs', this.scriptsDir + '/templates/content.ejs', this.allNames );
		    this.template(this.scriptsDir + '/models/_default.js', this.scriptsDir + '/models/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/collections/_default.js', this.scriptsDir + '/collections/' + this.sluggedAppname + '.js');
		    this.template(this.scriptsDir + '/lib/_default.js', this.scriptsDir + '/lib/' + this.sluggedAppname + '.js', this.allNames );
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
			this.log('You\'ve got an app!  Run `gulp` to start it up.')
		}
	}

});