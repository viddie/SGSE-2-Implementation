var assert = require('assert');

// nonsensical test case just to avoid error "Run npm test"
// test cases tbd...
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});