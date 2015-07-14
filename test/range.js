/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq range', function() {
	it('should make positive range from 0 to 100', function() {
		var list = Seq.range(0, 100);

		expect(list.sum()).to.be.equal(5050);
	});

	it('should make negative range from 100 to 0', function() {
		var list = Seq.range(100, 0);

		expect(list.sum()).to.be.equal(5050);
	});


	it('should make proper array', function() {
		var list = Seq.range(1, 7);

		expect(list.toArray()).to.be.deep.equal([1,2,3,4,5,6,7]);
	});

	it('should make proper array backwards', function() {
		var list = Seq.range(100, 90);

		expect(list.toArray()).to.be.deep.equal([100,99,98,97,96,95,94,93,92,91,90]);
	});

	it('should make range with step 3', function() {
		var list = Seq.range(5, 25, 3);

		expect(list.toArray()).to.be.deep.equal([5,8,11,14,17,20,23]);
	});

	it('should make negative range with step 7', function() {
		var list = Seq.range(77, 1, 7);

		expect(list.toArray()).to.be.deep.equal([77,70,63,56,49,42,35,28,21,14,7]);
	});

	it('should handle negative numbers', function() {
		var list = Seq.range(1, -5, -2);

		expect(list.toArray()).to.be.deep.equal([1,-1,-3,-5]);
	});

	it('should fix negative step leading to minus infinity', function() {
		var list = Seq.range(0, 100, -11);

		expect(list.toArray()).to.be.deep.equal([0,11,22,33,44,55,66,77,88,99]);
	});

	it('should fix step leading to infinity', function() {
		var list = Seq.range(111, 0, -17);

		expect(list.toArray()).to.be.deep.equal([111,94,77,60,43,26,9]);
	});
});
