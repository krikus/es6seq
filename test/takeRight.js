/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq takeRight', function() {
	it('should work with callback', function() {
		let seq = new Seq([7,1,2,-1,-5,3,4,6]);
		let callback = function(x) {
				return x >= 0;
		};

		expect(seq.takeRight(callback).toArray()).to.be.deep.equal([3,4,6]);
	});

	it('should be able to take numberic parameter', function() {
		let seq = new Seq(['cat', 'dog', 'mouse']);

		expect(seq.takeRight(2).toArray()).to.be.deep.equal(['dog', 'mouse']);
	});


	it('should work with empty Seq', function() {
		let seq = new Seq([]);

		expect(seq.takeRight(5).toArray()).to.be.deep.equal([]);
	});

	it('should be able to take more elements than there are in seq', function() {
		let array = [7,1,2,-1,-5,3,4,6];
		let seq = new Seq(array);

		let positive_callback = function(){ return true; };
		let how_many = 100000;

		expect(seq.takeRight(how_many).toArray()).to.be.deep.equal(array);
		expect(seq.takeRight(positive_callback).toArray()).to.be.deep.equal(array);
	});
});
