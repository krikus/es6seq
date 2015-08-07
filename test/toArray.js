/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq toArray', function() {
	it('should return proper array', function() {
		var list = new Seq([1,2,3,4,5,6,7,8,9,10]);

		expect(list.toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10]);
	});

	it('should work with empty Seq', function() {
		var list = new Seq([]);

		expect(list.toArray()).to.be.deep.equal([]);
	});
});
