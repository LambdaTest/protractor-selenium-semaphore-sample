
username= process.env.LT_USERNAME || "<your LT_USERNAME>",
accessKey=  process.env.LT_ACCESS_KEY || "<your LT_ACCESS_KEY>",

exports.config = {
  'specs': ['./specs/single.js'],

  seleniumAddress: 'https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub',

  'capabilities': {
    'build': 'protractor-LambdaTest-Single',
    'browserName': 'chrome',
    'version':'67.0',
    'platform': 'WIN10',
    'video': true,
    'network': false,
    'console': false,
    'visual': false
  },
  onPrepare: () => {

    myReporter = {
        specStarted: function(result) {
          specStr= result.id
          spec_id = parseInt(specStr[specStr.length -1])
          browser.getProcessedConfig().then(function (config) {
            var fullName = config.specs[spec_id];
            //var fileName = fullName.substring(fullName.lastIndexOf('/')+1);
            browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
          });
        }
      };
      jasmine.getEnv().addReporter(myReporter);
  },
  onComplete: () => {
    browser.quit();
  }



};
