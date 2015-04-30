var Test = require('./lib/model');
var should = require('should');
var fixtures = require('./lib/fixtures');

describe("unarchive(); Static:", function() {

    it("Should unarchive an archived document.", function(done) {

        Test.unarchive({
            name: 'archived'
        }, function(err, doc) {
            should.not.exist(err);

            Test.findOne({
                name: 'archived'
            }, function(err, test) {
                should.not.exist(err);
                should.not.exist(test.archived);

                done();
            });
        });

    });
});

describe("unarchive(); Method:", function() {

    beforeEach(function(done) {
        Test.remove(done);
    });

    it("Should unarchive an archived document.", function(done) {

        var test = new Test(fixtures.test.archived);

        test.unarchive(function(err) {

            should.not.exist(err);

            Test.findOne({
                name: 'archived'
            }, function(err, doc) {

                should.not.exist(err);
                should.not.exist(doc.archived);
                should.not.exist(doc.archivedAt);
                doc._doc.should.have.keys('_id', '__v', 'name');

                done();
            });
        });
    });
});
