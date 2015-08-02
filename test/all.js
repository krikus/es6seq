/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq all', function() {
	var list = new Seq([ 2, 4, 6, 8, 10, 12, 14, 16 ]);

	it('should work with numbers', function() {
		var result = list.all(function(x) { return x % 2 === 0;});

		expect(result).to.be.equal.true;
	});

	it('should return false when one element is not meeting criteria', function() {
		var result = list.all(function(x) { return x < 16; });

		expect(result).to.be.equal.false;
	});

});
