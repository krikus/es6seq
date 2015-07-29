/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq concat', function() {
	it('should work on empty Seq', function() {
		var numbers_seq = new Seq([1,2,3,10]);
		var empty_seq = new Seq([]);	
		
		var result = numbers_seq.concat(empty_seq);
		var reverse = empty_seq.concat(numbers_seq);
		
		expect(result.toArray()).to.be.deep.equal([1,2,3,10]);
		expect(reverse.toArray()).to.be.deep.equal([1,2,3,10]);
	});
	
	it('should work with other Seq', function() {
		var first = Seq.range(1,5);
		var second = Seq.range(6,10);
		
		expect(first.concat(second).toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10]);
	});
	
	it('should work with array', function() {
		var first = Seq.range(1,5);
		var second = [6,7,8,9,10];
		
		expect(first.concat(second).toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10]);
	});
	
	it('should work with custom generator', function() {
		var generator = function*() {
			yield 1;
			yield 2;
			yield 3;
		};
		var list = Seq.range(4,6);
		
		expect(list.concat(generator).toArray()).to.be.deep.equal([4,5,6,1,2,3]);
	});
	
	it('should work in chain', function() {
		var generator = function*() {
			yield 1;
			yield 2;
			yield 3;
		};
		var first = Seq.range(-5,0);
		var list = new Seq([4,5]);
		var array = [6,7,8,9,10];
		
		var result = first
			.concat(generator)
			.concat(list)
			.concat(array);
		
		expect(result.toArray()).to.be.deep.equal([-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]);
	});
});
