var Test = require('./lib/model');
var should = require('should');

describe("archive(); Static: ", function() {

	var test1 = new Test(fixtures.test.test1);

	it("Should set archived to true.", function(done) {
		Test.archive({
			_id: test1._id
		}, function(err) {
			should.not.exist(err);

			Test.collection.findOne({
				_id: test1._id
			}, function(err, doc) {

				doc.archived.should.be.true;
				should.exist(doc.archivedAt);
				done();
			});
		});
	});

});

describe("archive(); Method: ", function() {

	var test2 = new Test(fixtures.test.test2);

	it("Should archive a single document.", function(done) {
		Test.findById(test2._id, function(err, test) {
			should.not.exist(err);
			should.not.exist(test.archived);

			test.archive(function(err) {
				should.not.exist(err);

				Test.collection.findOne({
					_id: test2._id
				}, function(err, doc) {

					doc.archived.should.be.true;
					should.exist(doc.archivedAt);
					done();
				});
			});
		});
	});
});
