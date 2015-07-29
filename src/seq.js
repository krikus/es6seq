(function(module, require, sym_iterator) {
	"use strict";

	var utils = require('./utils');

	class Seq{
		constructor(iterable) {
			this[sym_iterator] = function*() {
				yield *(iterable[sym_iterator] ? iterable : iterable());
			};
		}

		reduce(callback, aggregate) {
			for(var i of this) {
				aggregate = callback(aggregate, i);
			}
			return aggregate;
		}

		sum() {
			//TODO: use fat arrow
			return this.reduce(function(sum, x){ return sum + x; }, 0);
		}

		toArray() {
			//TODO: use Array.from(this) when available;
			return this.reduce(function(array, value) {
				array.push(value);
				return array;
			}, [] );
		}

		filter(callback) {
			var generator = function*() {
				for(var x of this) {
					if(callback(x)) {
						yield x;
					}
				}
			};

			return new Seq(generator.bind(this));
		}

		find(value) {
			var callback = utils.makeComparator(value);

			for(var x of this) {
				if(callback(x)) {
					return x;
				}
			}
		}

		has(value) {
			var callback = utils.makeComparator(value);

			for(var x of this) {
				if(callback(x)) {
					return true;
				}
			}

			return false;
		}

		map(callback) {
			callback = utils.makeMapPicker(callback);

			var generator = function*() {
				for(var i of this) {
					yield callback(i);
				}
			};

			return new Seq(generator.bind(this));
		}
		
		compact() {
			return this.filter(function(value) {
				return value;
			});
		}
		
		chunk(size) {
			//TODO: change size to size=1 and remove code below
			size = size || 1;
			
			var generator = function*() {
				var chunk = [];
				for(var i of this) {
					chunk.push(i);
					if(chunk.length >= size)
					{
						yield chunk;
						chunk = [];
					}
				}
				if(chunk.length) {
					yield chunk;
				}
			};
			
			return new Seq(generator.bind(this));
		}
		
		concat(iterable) {
			iterable = (iterable instanceof Seq) ? iterable : new Seq(iterable);
			var generator = function*() {
				yield *this;
				yield *iterable;
			}
			
			return new Seq(generator.bind(this));
		}
	}
	
	//TODO: make it static member of Seq
	Seq.range = function(from, to, step_by) {
		const comparator = from > to ? function(a, b) { return a >= b; } : function(a, b) { return a <= b; };
		step_by = step_by || 1;

		if( from > to && step_by > 0 ) {
			step_by *= -1;
		}

		if( from < to && step_by < 0 )
		{
			step_by *= -1;
		}

		return new Seq(function*() {
			let step = 0;
			while( comparator(from + step, to) ) {
				yield from + step;
				step += step_by;
			}
		});
	};

	require('./aliases')(Seq);

	module.exports = Seq;

})(module, require, (Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"));
