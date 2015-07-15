/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq filtering', function() {
	it('should return Seq from filter function', function() {
		var list = new Seq([1,2,3,4,5,6,7,8,9,10]);

		var filtered = list.filter(function(x) {
			return x <= 2;
		});

		expect(filtered).to.be.an.instanceof(Seq);
		expect(filtered.toArray()).to.be.deep.equal([1,2]);
	});

	it('should be able to filter negative values', function() {
		var list = new Seq([-1,2,-3,4,-5,6,-7,8,-9,10]);

		var filtered = list.filter(function(x) {
			return x >= 0;
		});

		expect(filtered.toArray()).to.be.deep.equal([2,4,6,8,10]);
	});

	it('should be able to filter odd numbers', function() {
		var list = new Seq([1,2,3,4,5,6,7,8,9,10]);

		var filtered = list.filter(function(x) {
			return x % 2 === 0;
		});

		expect(filtered.toArray()).to.be.deep.equal([2,4,6,8,10]);
	});

	it('should be able to chain filters', function() {
		var list = new Seq([-5,-4,-3,-2,-1,0,1,2,3,4,5]);

		var filtered = list
			.filter(function(x) {
				return x >= 0;
			})
			.filter(function(x) {
				return x % 2 === 0;
			});

		expect(filtered.toArray()).to.be.deep.equal([0,2,4]);
	});
});
