/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq initial', function() {
	it('should work with normal array', function() {
		let seq = new Seq([7,1,2,-1,-5,3,4,6]);

		expect(seq.isEmpty()).to.be.equal.false;
	});

	it('should work with empty Seq', function() {
		let seq = new Seq([]);

		expect(seq.isEmpty()).to.be.equal.true;
	});

	it('should work with filtered Seq', function() {
		let seq = Seq.range(0,100).filter(function() {
			return false;
		});

		expect(seq.isEmpty()).to.be.equal.true;
	});
});
