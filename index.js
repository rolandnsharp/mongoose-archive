module.exports = function(schema) {

	schema.add({
		archived: Boolean,
		archivedAt: Date
	});

	// all mongoose queries are built using these five base queries
	// therefore adding the `archived !== true` condition here, adds it to all queries
	var queries = ['find', 'findOne', 'findOneAndUpdate', 'update', 'count'];
	queries.forEach(function(query) {

		schema.pre(query, function(next) {

			// add pre query conditional so that archived documents are invisible
			this.where({
				archived: {
					'$ne': true
				}
			});
			next();
		});
	});

	schema.statics.archive = function(first, second) {

		var callback;
		var conditions;

		if (typeof first === 'function') {
			callback = first;
			conditions = {};
		} else {
			callback = second;
			conditions = first;
		}

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		var update = {
			archived: true,
			archivedAt: new Date()
		};

		this.update(conditions, update, function(err, raw) {

			if (err) {
				return callback(err);
			}
			// `raw` is raw mongo output
			callback(null, raw);

		});
	};

	schema.methods.archive = function(first, second) {
		var callback = typeof first === 'function' ? first : second;

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		this.archived = true;
		this.archivedAt = new Date();

		this.save(callback);
	};

	schema.statics.unarchive = function(first, second) {
		var callback;
		var conditions;

		if (typeof first === 'function') {
			callback = first;
			conditions = {};
		} else {
			callback = second;
			conditions = first;
		}

		if (typeof callback !== 'function') {
			throw ('Wrong arguments!');
		}

		var update = {
			$unset: {
				archived: 1,
				archivedAt: 1
			}
		};
		// TODO update with mongoose
		this.collection.update(conditions, update, function(err, raw) {
			if (err) {
				return callback(err);
			}
			if (raw === 0) {
				return callback('Wrong arguments!');
			}
			// `raw` is raw mongo output
			callback(null, raw);

		});
	};

	schema.methods.unarchive = function(callback) {
		// unset
		this.archived = undefined;
		this.archivedAt = undefined;
		this.save(callback);
	};
};
