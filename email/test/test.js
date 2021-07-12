var assert = require('assert');
var db = require("../database/database")

describe('Database', function() {
  describe('createDB', function() {
    it('Only Created Once', async function() {
      setImmediate(db.create_db);
    });
  });
});
