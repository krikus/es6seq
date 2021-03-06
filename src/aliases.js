(function(module) {
	"use strict";

	module.exports = function(Seq) {

		var aliases = {
			any: 'has',
			every: 'all',
			head: 'first',
			rest: 'tail'
		};

		Object.keys(aliases).forEach(function(key) {
			Seq.prototype[key] = Seq.prototype[aliases[key]];
		});

	};
})(module);
