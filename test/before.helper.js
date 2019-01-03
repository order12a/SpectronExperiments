const setup = require('./setup');

// Just for testing hooks before each suite
before(function () {
  console.log('\nglobal before hook\n');
  setup.removeStoredPreferences();
});

after(function () {
  console.log('global after hook\n');
});
