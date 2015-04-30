var Test = require('./lib/model');
var should = require('should');

describe("find(); ", function() {

	it("Should not return `archived` documents", function(done) {

		Test.find(function(err, tests) {
			should.not.exist(err);
			tests.should.be.instanceof(Array).and.have.lengthOf(3);
			tests.forEach(function(test) {
				should.not.exist(test.archived);
			});
			done();
		});
	});
});
