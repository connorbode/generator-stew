var generators = require('yeoman-generator');
var tpls = {};

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('coffee');
  },

  prompting: {
    packageJson: function () {
      var done = this.async();
      this.prompt([
        {
          type: 'input',
          name: 'packageName',
          message: 'What is the name of the package?'
        },
        {
          type: 'input',
          name: 'version',
          message: 'What is the version of the package?'
        },
        {
          type: 'input',
          name: 'description',
          message: 'What is the description of the package?'
        },
        {
          type: 'input',
          name: 'author',
          message: 'Who is the author?'
        },
        {
          type: 'input',
          name: 'license',
          message: 'What license is governing the project?'
        }
      ], function (answers) {
        tpls.packageJson = answers;
        done();
      })
    },

    database: function () {
      var done = this.async();
      this.prompt({
        type: 'list',
        message: 'Do you want to add a data-source?',
        choices: [
          'yes',
          'no'
        ],
        name: 'database'
      }, function (answers) {
        if (answers.database === 'yes') {
          this.prompt({
            type: 'list',
            message: 'Which data-source would you like to add?',
            choices: [
              'sequelize'
            ],
            name: 'database'
          }, function (answers) {
            done();
          });
        } else {
          done();
        }
      }.bind(this));
    }
  },

  writing: {
    routes: function () {
      console.log("Writing");
      this.fs.copyTpl(
        this.templatePath('app/routes.js'),
        this.destinationPath('app/routes.js'),
        {}
      );
    },

    package: function () {
      console.log("Writing");
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        tpls.packageJson
      );
    }
  }
});