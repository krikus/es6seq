/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq first', function() {
	it('should work with simple number', function() {
		let seq = new Seq([7,1,2,4,6]);

		expect(seq.first()).to.be.equal(7);
	});

	it('should work with simple string', function() {
		let seq = new Seq(['cat', 'dog']);

		expect(seq.first()).to.be.equal('cat');
	});


	it('should work with empty Seq', function() {
		let seq = new Seq([]);

		expect(seq.first()).to.be.an.undefined;
	});

	it('should have alias "head"', function() {
		let seq = new Seq([10,9]);

		expect(seq.head()).to.be.equal(seq.first());
		expect(seq.head).to.be.deep.equal(seq.first);
		expect(seq.head).to.be.a.function;
	});
});
