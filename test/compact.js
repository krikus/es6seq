/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq filtering', function() {
	it('should return Seq from compact function', function() {
		var list = new Seq([0,1,false,2,3,4,null,5,undefined,6,7,8,9,10]);

		var filtered = list.compact();

		expect(filtered).to.be.an.instanceof(Seq);
	});

	it('should filter out falsey primitives', function() {
		var list = new Seq([0,1,false,2,3,4,null,5,undefined,6,7,8,9,10]);

		var filtered = list.compact();

		expect(filtered.toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10]);
	});

	it('should be able to filter all falsey values', function() {
		var list = new Seq([false, null, 0, "", undefined, NaN]);

		var filtered = list.compact();

		expect(filtered.toArray()).to.be.deep.equal([]);
	});
});
