/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq sum', function() {
	it('should be able to calc sum of numbers', function() {
		var list = Seq.range(0, 100);
		var expected_sum = 101 * (0 + 100)/2;

		expect(list.sum()).to.be.equal(expected_sum);
	});

	it('should take callback as parameter', function() {
		var list = new Seq(['one', 'two', 'three']);
		var callback = function(str){ return str.length; };

		expect(list.sum(callback)).to.be.equal(11);
	});
});
