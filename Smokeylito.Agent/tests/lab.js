module.exports = {
    'Demo test Google' : function (browser) {
      browser
        .url('http://192.168.1.11:32381')
        .waitForElementVisible('body')
        .pause(1000)
        .saveScreenshot('./reports/search-result.png')
        .end();
    }
  };