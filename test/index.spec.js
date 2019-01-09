const Application = require('spectron').Application;
const electron = require('electron');
const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const setup = require('./setup');
const AboutPage = require('./pages/AboutPage');
const AppHolder = require('./util/AppHolder');
const MainMenu = require('./pages/modules/MainMenu');
require('./before.helper'); // Helper with implemented before and after hooks
require('mocha-allure-reporter');
global.should = chai.should();
chai.use(chaiAsPromised);

const timeout = process.env.CI ? 30000 : 20000;

describe('demo app', function () {
  setup.setupTimeout(this);

  let app;
  let aboutPage;
  let mainMenu;

  // Whenever we will call this function, it will be displayed in the report
  const screenshot = async function (title) {
    const res = await app.browserWindow.capturePage();
    // Webdriver.io produces values as base64-encoded string. Allure expects either plain text
    // string or Buffer. So, we are decoding our value, using constructor of built-in Buffer object
    try {
      allure.createAttachment(title, res);
      // allure.createAttachment(title, Buffer.from(res, 'base64'));
    } catch (e) {
      // Just to skip allure error while single test run
    }
  };

  const allureHandler = {
    get: function (target, props) {
      // below 3 lines are working example but additional testing is required
      // for example we have weird situation with passing arguments into method
      return allure.createStep(props, async (...args) => {
        return target[props](...args);
      });
    }
  };

  const startApp = () => {
    app = new Application({
      path: electron,
      args: [
        path.join(__dirname, '..')
      ],
      waitTimeout: timeout,
      chromeDriverArgs: ['start-maximized']
    });

    return app.start().then((ret) => {
      setup.setupApp(ret);
    });
  };

  const restartApp = () => {
    return app.restart().then((ret) => {
      setup.setupApp(ret);
    });
  };

  before('Set Up our environment', async function () {
    // Uncomment below line if we dont want play with separate file for before hooks anymore
    // setup.removeStoredPreferences();
    await startApp();
    AppHolder.createAppHolder(app);
    console.log('Inner before hook\n');
  });

  before('Init page objects', async function () {
    aboutPage = new Proxy(new AboutPage(), allureHandler);
    mainMenu = new Proxy(new MainMenu(), allureHandler);
  });

  after(async function () {
    if (app && app.isRunning()) {
      await app.stop();
    }
    console.log('Inner after hook');
  });

  // This code will be executed after every test. We can provde extra info to the report,
  // for example a screenshot of test page.
  // In order not to waste time of taking screenshots of valid pages, it makes sense to
  // check test status first and take screenshots only for non-passed tests.
  afterEach('take screenshot on failure', async function () {
    if (this.currentTest.state !== 'passed') {
      await screenshot(this.currentTest.title + ' - ' + this.test.title);

      // Working code for adding images into mochawesome reporter
      // Now mochawesome is removed as dependency needs to added to play with it
      // const res = await app.browserWindow.capturePage();
      // if (!fs.existsSync('mochawesome-report/err_shots')) {
      //   fs.mkdirSync('mochawesome-report/err_shots');
      // }
      // let fileName = this.currentTest.title.replace(/\s/g, '');
      // let imagePath = path.normalize('./mochawesome-report/err_shots/' + fileName + '.png');
      // let imagePathInDoc = path.normalize('./err_shots/' + fileName + '.png');
      //
      // let buf = Buffer.from(res, 'base64');
      // fs.writeFileSync(imagePath, buf, { flag: 'w' });
      // addContext(this, imagePathInDoc);
    }
  });

  it('checks hardcoded path for userData is correct', function () {
    return app.client.execute(() => {
      return require('electron').remote.app.getPath('userData');
    }).then((result) => {
      return result.value;
    }).should.eventually.equal(setup.getUserDataPath());
  });

  it('opens a window displaying the about page', async function () {
    await app.browserWindow.maximize();
    await app.client.getWindowCount().should.eventually.equal(1);
    await app.browserWindow.isMinimized().should.eventually.be.false;
    await app.browserWindow.isDevToolsOpened().should.eventually.be.false;
    await app.browserWindow.isVisible().should.eventually.be.true;
    await app.browserWindow.isFocused().should.eventually.be.true; // Fails when debug operations are performed
    await app.browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0);
    await app.browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0);
    await app.browserWindow.getTitle().should.eventually.equal('Electron API Demos');
    await aboutPage.checkAboutModalIsVisible();
    // Test return something from method wrapped into allure step
    // console.log(await aboutPage.getAboutModalText());
    await aboutPage.checkNavIsNotVisible();
    await aboutPage.dismissAboutPage();
    await app.client.pause(1000); // Left for observation purposes
    await aboutPage.checkAboutModalIsNotVisible('Test Message', 'Second Message');
    await aboutPage.checkNavIsNotVisible(); // Intentionally broken step

    // Original code
    // return app.client.getWindowCount().should.eventually.equal(1)
    //   .browserWindow.isMinimized().should.eventually.be.false
    //   .browserWindow.isDevToolsOpened().should.eventually.be.false
    //   .browserWindow.isVisible().should.eventually.be.true
    //   .browserWindow.isFocused().should.eventually.be.true
    //   .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
    //   .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
    //   .browserWindow.getTitle().should.eventually.equal('Electron API Demos')
    //   .waitForVisible('#about-modal').should.eventually.be.true
    //   .isVisible('.js-nav').should.eventually.be.false
    //   .click('button[id="get-started"]').pause(500)
    //   .isVisible('#about-modal').should.eventually.be.false
    //   .isVisible('.js-nav').should.eventually.be.true;
  });

  // Dummy failed test
  it('Just failed test and nothing more', async () => {
    await false.should.be.true;
  });

  it('does not contain any accessibility warnings or errors', async function () {
    await app.client.dismissAboutPage();
    await app.client.auditSectionAccessibility('windows');
    await app.client.auditSectionAccessibility('crash-hang');
    await app.client.auditSectionAccessibility('menus');
    await app.client.auditSectionAccessibility('shortcuts');
    await app.client.auditSectionAccessibility('ex-links-file-manager');
    await app.client.auditSectionAccessibility('notifications');
    await app.client.auditSectionAccessibility('dialogs');
    await app.client.auditSectionAccessibility('tray');
    await app.client.auditSectionAccessibility('ipc');
    await app.client.auditSectionAccessibility('app-sys-information');
    await app.client.auditSectionAccessibility('clipboard');
    await app.client.auditSectionAccessibility('protocol');
    await app.client.auditSectionAccessibility('desktop-capturer');

    // return app.client.dismissAboutPage()
    //   .auditSectionAccessibility('windows')
    //   .auditSectionAccessibility('crash-hang')
    //   .auditSectionAccessibility('menus')
    //   .auditSectionAccessibility('shortcuts')
    //   .auditSectionAccessibility('ex-links-file-manager')
    //   .auditSectionAccessibility('notifications')
    //   .auditSectionAccessibility('dialogs')
    //   .auditSectionAccessibility('tray')
    //   .auditSectionAccessibility('ipc')
    //   .auditSectionAccessibility('app-sys-information')
    //   .auditSectionAccessibility('clipboard')
    //   .auditSectionAccessibility('protocol')
    //   .auditSectionAccessibility('desktop-capturer');
  });

  describe('when clicking on a section from the nav bar', function () {
    it('it shows the selected section in the main area', function () {
      return app.client.dismissAboutPage()
        .selectSection('windows')
        .isExisting('button.is-selected[data-section="windows"]').should.eventually.be.true
        .isVisible('#menus-section').should.eventually.be.false
        .selectSection('menus')
        .isVisible('#windows-section').should.eventually.be.false
        .isExisting('button.is-selected[data-section="windows"]').should.eventually.be.false
        .isExisting('button.is-selected[data-section="menus"]').should.eventually.be.true;
    });
  });

  describe('when a demo title is clicked', function () {
    it('it expands the demo content', function () {
      let onlyFirstVisible = Array(30).fill(false);
      onlyFirstVisible[0] = true;

      return app.client.dismissAboutPage()
        .collapseDemos()
        .selectSection('windows')
        .click('.js-container-target')
        .waitForVisible('.demo-box')
        .isVisible('.demo-box').should.eventually.deep.equal(onlyFirstVisible);
    });
  });

  describe('when the app is restarted after use', function () {
    it('it launches at last visited section & demo', async function () {
      let onlyFirstVisible = Array(30).fill(false);
      onlyFirstVisible[0] = true;

      await app.client.waitForVisible('#windows-section');
      await restartApp;
      await app.client.waitForVisible('#windows-section');
      await app.client.isVisible('#windows-section').should.eventually.be.true;
      await app.client.isVisible('.demo-box').should.eventually.deep.equal(onlyFirstVisible);

      // Original code (for some reason broken on windows)
      // return app.client.waitForVisible('#windows-section')
      //   .then(restartApp)
      //   .then(function () {
      //     return app.client.waitForVisible('#windows-section')
      //       .isVisible('#windows-section').should.eventually.be.true
      //       .isVisible('.demo-box').should.eventually.deep.equal(onlyFirstVisible);
      //   });
    });
  });

  // Just a dummy test to observe work with page-objects and modules
  it('Select system dialog section', async () => {
    await aboutPage.dismissAboutPage();
    await mainMenu.selectSection('dialogs');
    await mainMenu.getSelectedSectionText().should.eventually.equal('Use system dialogs');
  });
});
