var os = require('os');
var projectName = "Admin Panel";
var botUsername = "Deploy Bot";
var webhookUri = "https://hooks.slack.com/services/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";
var Slack = require('slack-node');
var slack = new Slack();

slack.setWebhook(webhookUri);

function notify(text) {
  slack.webhook({
    username: botUsername,
    text: text
  }, function(err, response) {
    if (err) {
      console.error(err);
    }
  });
}

/* START: DataDog Integration */
var dataDogApiKey = "fadae1ed3d5e0f53636142195386e177";
var dataDogAppKey = "444e4d4d13ef46face23113f581dc311409f814d";

var dogapi = require("dogapi");
dogapi.initialize({api_key: dataDogApiKey, app_key: dataDogAppKey});

function createDataDogEvent(title, text, environment) {
  var properties = {
    host: process.env.USER,
    tags: [projectName, environment]
  };

  dogapi.event.create(title, text, properties);
}
/* END: DataDog Integration */

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  var conf = {
    "default": {
      workspace: process.env.SHIPIT_WORKSPACE || os.tmpdir() + 'inc/workspace',
      deployTo: '/var/www/vhosts/inception-app',
      repositoryUrl: 'git@github.com:Placester/Inc-App.git',
      branch: process.env.SHIPIT_BRANCH || 'develop',
      ignores: ['.git', 'static', 'node_modules', '.vagrant', '.sass-cache'],
      keepReleases: 5,
      shallowClone: true
    },
    "local": {
      servers: 'vagrant@inception.app' // ~/.vagrant.d/insecure_private_key
    },
    "internal": {
      servers: 'php-deploy@smb-web1.va.pl-internal.net'
    },
    "staging": {
      servers: 'php-deploy@rep-wpstaging1.va.placester.net'
    },
    "plstaging": {
      servers: 'php-deploy@smb-web1.va.pl-staging.net'
    },
    "production": {
      branch: 'master',
      servers: ['php-deploy@smb-web1.va.placester.net', 'php-deploy@smb-web2.va.placester.net', 'php-deploy@smb-web3.va.placester.net']
    }
  };

  for (var i = 2; i <= 15; i++) {
    conf['staging' + i] = {
      servers: 'php-deploy@rep-wpstaging1.va.placester.net',
      deployTo: '/var/www/vhosts/inception-app' + i
    };
  }

  shipit.initConfig(conf);

  shipit.blTask('build', function(){
    shipit.log('Building Admin Panel assets');

    return shipit.local('npm install --production && NODE_ENV=' + shipit.environment + ' npm run build', {cwd: shipit.config.workspace})
      .then(function(){
        shipit.log('Successfully built assets');
      })
      .catch(function(err){
        shipit.log('Failed to build assets');
        throw err;
      });
  });

  shipit.on('fetched', function(){
    shipit.start('build');
  });

  //
  // Slack Notifications
  //

  var branch = shipit.config.branch;
  var deployDetails = projectName + "*, branch name *" + branch + "* to *" + shipit.environment + "*";

  shipit.on("deploy", function() {
    shipit.log("deploy started!");
    notify(":pushpin: Starting deployment: *" + deployDetails);
  });

  shipit.on("deployed", function() {
    shipit.log("deploy ended!");
    notify(":pushpin: Ending deployment: *" + deployDetails);
    createDataDogEvent(projectName + ' deploy', deployDetails, shipit.environment);
  });

  shipit.on("rollback", function() {
    shipit.log("rolling back changes!");
    notify(":zap: Starting rollback: *" + deployDetails);
  });

  shipit.on('rollbacked', function() {
		notify(":zap: Ending rollback: *" + deployDetails);
		createDataDogEvent(projectName + ' rollback', deployDetails, shipit.environment);
	});

  shipit.on("err", function(err) {
    shipit.log("An error occurred!", err);
    notify(":boom: *" + err.err + "*");
  });
};
