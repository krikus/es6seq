/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq uniq', function() {
	
	it('should work with numbers', function() {
		let seq = new Seq([1,2,3,3,4,6,1,2,3,6,9,10,4,10,5,12,95]);

		expect(seq.uniq().toArray()).to.be.deep.equal([1,2,3,4,6,9,10,5,12,95]);
	});

	it('should work with strings', function() {
		let seq = new Seq(['dog', 'cat', 'turtle', 'cat', 'mouse']);

		expect(seq.uniq().toArray()).to.be.deep.equal(['dog', 'cat', 'turtle', 'mouse']);
	});

	it('should work with concated seq', function() {
		let array = [1,2,3,4];
		let seq = new Seq(array);

		seq = seq.concat(new Seq([4,3,2,1])).concat([1,2,3,4,5]);

		expect(seq.uniq().toArray()).to.be.deep.equal([1,2,3,4,5]);

		
	});
});
