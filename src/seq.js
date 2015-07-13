(function(module, Symbol) {
	"use strict";
	class Seq{
		constructor(iterable) {
			this.iterable = iterable;
		}

		[Symbol.iterator](){
			return this.iterable;
		}
	}


	module.exports = Seq;
})(module, Symbol);
