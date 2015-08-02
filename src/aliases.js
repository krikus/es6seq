(function(module) {
	"use strict";

	module.exports = function(Seq) {

		var aliases = {
			any: 'has',
			head: 'first'
		};

		Object.keys(aliases).forEach(function(key) {
			Seq.prototype[key] = Seq.prototype[aliases[key]];
		});

	};
})(module);
