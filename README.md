Mongoose Archive
==================

An archiving and plugin for Mongoosejs.

Provides mongoose methods and statics for archiving and unarchiving documents.
By default, 'archived' are invisible to all mongoose queries, this ensures that the plugin can be applied to any mongoose application without affecting functionality.

### Install

TODO: publish to npm.


Add to package.json
```
"dependencies": {
    "mongoose-archive": "rolandnsharp/mongoose-archive"
}
```
Install `npm install`.

### Adding the plugin to the target Mongoose schema.

```
var mongoose = require('mongoose');
schema = mongoose.Schema;
var archive = require('mongoose-archive');
schema.plugin(archive);
```
## Statics and Methods


### archive(conditions, callback)
Archives documents for `conditions`.
This sets an `{ archived: true }` field on the document/s that hides it/them from all mongoose queries unless specifically queried with `{archived: true}` conditions, or `{ archived: null }` which will return both archived and non-archived documents but not 'removed' documents.

### unarchive(conditions, callback)
Unarchives 'archived' documents which match `conditions`.

Example Statics:

```
Model.archive(conditons, function (err, doc) {
       // Archives all documents for `conditions`.
});
```

```
Model.unarchive(conditons, function (err, doc) {
       // Archives all documents for `conditions`.
});
```

Example Methods:

```
Model.find(conditons, function (err, doc) {
       doc.archive(callback);
});
```

```
Model.find(conditons, function (err, doc) {
    doc.unarchive(callback);
});
```

- - -

## Queries

#### find(), findOne(), findOneAndUpdate(), update(), count()
Mongoose queries work as expected. In that all `archived` documents are invisible.

Examples

```
Model.find(function (err, doc) {
      // Returns an array of all non-archived documents.
});
```

```
Model.find({ archived: true }, function (err, doc) {
      // Returns an array of all archived documents.
});
```

### Test
By default, tests will connect to a test mongodb at `mongodb://localhost/test` by default. Add the `MONGOOSE_TEST_URI` environment variable to override this.
Run `npm test`
