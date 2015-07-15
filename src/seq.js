(function(module, sym_iterator) {
	"use strict";

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
	}

	module.exports = Seq;
})(module, (Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"));
