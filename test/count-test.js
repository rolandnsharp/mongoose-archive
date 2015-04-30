var Test = require('./lib/model');
var should = require('should');

describe("count(); ", function() {

	it("Should not count archived documents.", function(done) {
		
		Test.count(function(err, count) {
			should.not.exist(err);
			count.should.be.exactly(3).and.be.a.Number;

			done();
		});
	});
});
