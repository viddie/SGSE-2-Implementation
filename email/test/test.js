var assert = require('assert');
var mail = require("../email/email")

describe('Email', function() {
  describe('sendmail', function() {
    it('Response has same Adress', async function() {
      await mail.sendmail("Test@test.com","Mocha Test","Mocha Test");
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      await delay(1000)
      assert.strictEqual(mail.getResponse().accepted[0], "Test@test.com");
    });
  });
});
