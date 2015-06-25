var Test = require('./model');
var should = require('should');

describe("Count: ", function() {

	it("Should not count archived documents.", function(done) {

		Test.count(function(err, count) {
			should.not.exist(err);
			count.should.be.exactly(3).and.be.a.Number;

			done();
		});
	});
});
