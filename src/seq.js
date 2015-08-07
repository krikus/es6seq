(function(module, require, sym_iterator) {
	"use strict";

	var utils = require('./utils');

	class Seq{
		constructor(iterable) {
			this[sym_iterator] = function*() {
				yield *(iterable[sym_iterator] ? iterable : iterable());
			};
		}

		get empty() {
			return new Seq([]);
		}

		reduce(callback, aggregate) {
			if(typeof aggregate === 'undefined'){ 
				aggregate = 0;
			}

			for(var i of this) {
				aggregate = callback(aggregate, i);
			}
			return aggregate;
		}

		sum(callback) {
			if(typeof callback !== 'function') {
				callback = function(x){ return x };
			}
			//TODO: use fat arrow
			return this.reduce(function(sum, x){ return sum + callback( x ); }, 0);
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

		all(value) {
			var callback = utils.makeComparator(value);

			for(var x of this) {
				if(!callback(x)) {
					return false;
				}
			}

			return true;
		}

		first() {
			for(var x of this) {
				return x;
			}
		}

		last() {
			let to_return;
			for(var x of this) {
				to_return = x;
			}

			return to_return;
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

		tail() {
			return this.drop(1);
		}

		initial() {
			return this.reverse()
				.drop(1)
				.reverse();
		}

		isEmpty() {
			let temp_generator = this[sym_iterator]();

			return temp_generator.next().done;
		}

		drop(numberOrFunction) {
			let temp_generator = this[sym_iterator]();
			let value = temp_generator.next();

			if(typeof numberOrFunction === 'function') {
				while(!value.done && numberOrFunction(value.value)) {
					value = temp_generator.next();
				}
			} else {
				while(!value.done && numberOrFunction-- > 0) {
					value = temp_generator.next();
				}
			}

			let generator = function*() {
				while(!value.done) {
					yield value.value;
					value = temp_generator.next();
				}
			};

			return new Seq(generator.bind(this));
		}

		//TODO: add buffer optimization
		dropRight(numberOrFunction) {
			return this.reverse()
				.drop(numberOrFunction)
				.reverse();
		}
		
		take(numberOrFunction) {
			let takeChecker;

			if(typeof numberOrFunction === 'function') {
				takeChecker = numberOrFunction;
			} else {
				takeChecker = function() {
					return numberOrFunction-- > 0;	
				};
			}

			let generator = function*() {
				for(var i of this) {
					if(!takeChecker(i)) {
						return;
					}
					yield i;
				}
			};

			return new Seq(generator.bind(this));
		}
		
		takeRight(numberOrFunction) {
			return this.reverse()
				.take(numberOrFunction)
				.reverse();
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
		
		//TODO: change to ...iterables
		concat() {
			let iterables = [].slice.call(arguments, 0);
			let makeSeq = function(iterable) {
				return (iterable instanceof Seq) ? iterable : new Seq(iterable);
			};

			var generator = function*() {
				yield *this;
				for(var iterable of iterables) {
					yield *makeSeq(iterable);
				}
			};
			
			return new Seq(generator.bind(this));
		}
		
		flatten(deep) {
			deep = !deep && deep !==0 ? -1 : deep;
			var next_level = deep > 0 ? deep - 1: -1;
			
			var generator = function*() {
				for(var i of this) {
					if(i[sym_iterator]) {
						if(deep === 0) {
							yield i;
						}else {
							if(i instanceof Seq) {
								yield *(i.flatten(next_level));
							}else {
								yield *(new Seq(i).flatten(next_level));
							}
						}
					}else {
						yield i;
					}
				}
			};
			
			return new Seq(generator.bind(this));
		}
		
		slice(from, to) {
			return new Seq(this.toArray().slice(from, to));
		}

		uniq() {
			var generator = function*()
			{
				let set = new Set();
				for(var i of this) {
					if(set.has(i)) continue;
					set.add(i);
					yield i;
				}
			};

			return new Seq(generator.bind(this));
		}

		count(filtering) {
			let seq = typeof filtering === 'function' ? this.filter(filtering) : this;

			return seq.reduce(function(sum){ return sum+1; }, 0);
		}

		reverse() {
			let data = this.reduce(function(sum, element) {
				sum.unshift(element);
				return sum;
			}, []);

			return new Seq(data);
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
			while(comparator(from + step, to)) {
				yield from + step;
				step += step_by;
			}
		});
	};

	require('./aliases')(Seq);

	module.exports = Seq;

})(module, require, (Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"));
