var Test = require('./model');
var should = require('should');
var fixtures = require('./fixtures');

describe("Archive Static: ", function() {

	it("Should archive document.", function(done) {

		Test.archive({
			name: 'default'
		}, function(err) {
			should.not.exist(err);

			Test.collection.findOne({
				name: 'default'
			}, function(err, doc) {

				doc.archived.should.be.true;
				should.exist(doc.archivedAt);
				done();
			});
		});
	});

});

describe("Archive Method: ", function() {

	it("Should archive document.", function(done) {
		Test.findOne({
			name: 'default'
		}, function(err, doc) {

			should.not.exist(err);
			should.not.exist(doc.archived);

			doc.archive(function(err) {
				should.not.exist(err);

				Test.collection.findOne({
					name: 'default'
				}, function(err, doc) {

					doc.archived.should.be.true;
					should.exist(doc.archivedAt);
					done();
				});
			});
		});
	});
});
