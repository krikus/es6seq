(function(module) {
	"use strict";

	module.exports = {
		makeComparator: function(something) {
			if(typeof something === 'function') {
				return something;
			} else if(something && typeof something === 'object') {
				let object_keys = Object.keys(something);
				return function(x) {
					if( !x || typeof x !== 'object') {
						return false;
					}

					for(var key of object_keys)
					{
						if(!x.hasOwnProperty(key) || x[key] !== something[key])
						{
							return false;
						}
					}

					return true;
				};
			} else {
				return function(x) {
					return x === something;
				};
			}
		},
		makeMapPicker: function(something) {
			if(typeof something === 'function') {
				return something;
			} else {
				return function(pickMe) {
					return pickMe && pickMe[something];
				};
			}
		}
	};

})(module);
