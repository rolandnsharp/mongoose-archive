var Test = require('./model');
var should = require('should');

describe("Find: ", function() {

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

	it("hehehehe", function(done) {

		Test.find({
			archived: true
		}, function(err, tests) {
			console.log(err, tests);
			// should.not.exist(err);
			// tests.should.be.instanceof(Array).and.have.lengthOf(3);
			// tests.forEach(function(test) {
				// should.not.exist(test.archived);
			// });
			done();
		});
	});
});
