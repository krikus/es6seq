/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq initial', function() {
	it('should work with normal array', function() {
		let seq = new Seq([7,1,2,-1,-5,3,4,6]);

		expect(seq.initial().toArray()).to.be.deep.equal([7,1,2,-1,-5,3,4]);
	});

	it('should work with empty Seq', function() {
		let seq = new Seq([]);

		expect(seq.initial().toArray()).to.be.deep.equal([]);
	});
});
