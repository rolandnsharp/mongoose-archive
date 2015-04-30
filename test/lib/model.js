var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOOSE_TEST_URI || 'mongodb://localhost/test');

mongoose.connection.on('error', function(err) {
    console.log('Database connection error:', err);
});

mongoose.connection.on('open', function() {
    console.log('Database connection open.');
});

var schema = new Schema({
    name: String
}, {
    collection: 'testCollection'
});

var archive = require('../../');

schema.plugin(archive);

module.exports = mongoose.model('test', schema);
