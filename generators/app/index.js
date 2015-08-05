'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');


module.exports = yeoman.generators.Base.extend({
  	prompting: function () {
		var done = this.async();
    	// Have Yeoman greet the user.
    	this.log(yosay(
      		'Welcome to the laudable ' + chalk.red('CSCC') + ' generator!'
    	));
    	
    	var prompts = [{
	    	name: 'appName',
    	  	message: 'What\' the project\'s name ?',
      		default: this.appname
    	}, {
    		name: "style",
    		message: 'css or less or sass ?',
    		default: "css"
    	}, {
    		name: "material",
    		message: "material ui or not ? (Y/N)",
    		default: 'Y'
    	}, {
    		name: "bootstrap",
    		message: "bootstrap or not ? (Y/N)",
    		default: 'Y'
    	}, {
    		name: "routers",
    		message: "what routes do you want to create ? (use , to split)",
    		default: "Home",
    	}, {
    		name: "folderNameDev",
    		message: "what folder name do you want to build for develop ?",
    		default: "dev"
    	}, {
    		name: "folderNamePro",
    		message: "what folder name do you want to build for production",
    		default: "build"
    	}, {
    		name: "eslint",
    		message: "do you want to check coding style? (Y/N)",
    		default: 'Y'
    	}];

    	this.prompt(prompts, function (props) {
     	 	this.appName = props.appName;
     	 	this.style = props.style ;
     	 	this.material = (props.material=='Y') ? true : false;
     	 	this.bootstrap = (props.bootstrap=='Y') ? true : false;
     	 	this.routers = props.routers.split(",");
     	 	this.folderNameDev = props.folderNameDev;
     	 	this.folderNamePro = props.folderNamePro;
     	 	this.eslint = (props.eslint=='Y') ? true : false;
    	  	done();
	    }.bind(this));
  	},

  	writing: {
  		app: function () {
      		var done = this.async();
      		mkdirp("client");
      		mkdirp("client/src/assets/images");
      		mkdirp("client/src/assets/styles");
      		mkdirp("client/src/js/actions");
    		mkdirp("client/src/js/components");  		
			mkdirp("client/src/js/stores");
			mkdirp("client/src/js/utils");
      		this.fs.copyTpl(
      			this.templatePath('webpack.config.js'),
		        this.destinationPath('client/webpack.config.js'),
		        { 
		        	folder: this.folderNameDev,
		        	eslint: this.eslint,
					style: this.style
		        }
    		);
    		this.fs.copyTpl(
      			this.templatePath('webpack.production.config.js'),
		        this.destinationPath('client/webpack.production.config.js'),
		        { 
		        	folder: this.folderNamePro,
		        	eslint: this.eslint,
              style: this.style
		        }
    		);

	     	this.fs.copyTpl(
      			this.templatePath('package.json'),
		        this.destinationPath('package.json'),
		      		{ 
		      			title: this.appName,
		      			bootstrap: this.bootstrap,
		      			style: this.style,
		      			material: this.material,
                		eslint: this.eslint
		      		}
    		);

	     	this.fs.copyTpl(
      			this.templatePath('src/index.html'),
		        this.destinationPath('client/src/index.html'),
		      		{ title: this.appName }
    		);

	     	this.fs.copyTpl(
      			this.templatePath('src/boot.js'),
		        this.destinationPath('client/src/boot.js'),
		      		{ bootstrap: this.bootstrap }
    		);
    		this.fs.copy(
    			this.templatePath('src/js/alt.js'),
    			this.destinationPath('client/src/js/alt.js')
    		);
    		this.fs.copyTpl(
      			this.templatePath('src/js/routes.jsx'),
		        this.destinationPath('client/src/js/routes.jsx'),
		      		{ 
		      			routers: this.routers,
		      			material: this.material
		      		}
    		);
    		this.fs.copy(
      			this.templatePath('src/js/components/NotFound.jsx'),
		        this.destinationPath('client/src/js/components/pages/NotFound.jsx')
    		);
    		for (var i in this.routers) {
    			this.fs.copyTpl(
      			this.templatePath('src/js/components/_page.jsx'),
		        this.destinationPath('client/src/js/components/pages/'+this.routers[i]+'.jsx'),
		      		{ 
		      			title: this.routers[i] ,
		      			material: this.material
		      		}
    			);
    		}
    		if(this.material) {
    			this.fs.copy(
    				this.templatePath('src/js/Master.jsx'),
    				this.destinationPath('client/src/js/Master.jsx')
    			);
    			this.fs.copyTpl(
    				this.templatePath('src/js/components/LeftNavBar.jsx'),
    				this.destinationPath('client/src/js/components/LeftNavBar.jsx'),
    				{ 
    					routers: this.routers,
    					title: this.title
    				}
    			);
    			this.fs.copy(
    				this.templatePath('src/js/components/FullWidthSection.jsx'),
    				this.destinationPath('client/src/js/components/FullWidthSection.jsx')
    			);
    		}
    		this.fs.copy(
    				this.templatePath('src/js/utils/WebAPIUtil.js'),
    				this.destinationPath('client/src/js/utils/WebAPIUtil.js')
    		);
    		this.fs.copy(
    				this.templatePath('src/js/stores/AboutStore.js'),
    				this.destinationPath('client/src/js/stores/AboutStore.js')
    		);
    		this.fs.copy(
    				this.templatePath('src/js/stores/SimpleStore.js'),
    				this.destinationPath('client/src/js/stores/SimpleStore.js')
    		);
    		this.fs.copy(
    				this.templatePath('src/js/actions/AboutAction.js'),
    				this.destinationPath('client/src/js/actions/AboutAction.js')
    		);
    		if(this.eslint) {
    			this.fs.copy(
    				this.templatePath('.eslintrc'),
    				this.destinationPath('client/.eslintrc')
    			);
    		}
	      	done();
	    },
  	},

  	install: function () {
  		this.spawnCommand('composer', ['create-project','laravel/laravel','--prefer-dist',process.cwd()+'/server']);
  		this.npmInstall();
  	}
});
