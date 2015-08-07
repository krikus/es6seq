/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq slice', function() {
	it('should work on empty Seq', function() {
		var seq = new Seq([]);
				
		expect(seq.slice(5,9).toArray()).to.be.deep.equal([]);
	});
	
	it('should be able to omit first value', function() {
		var seq = new Seq([1,2,3,4,5]);
		
		expect(seq.slice(1).toArray()).to.be.deep.equal([2,3,4,5]);
	});
	
	it('should be able to omit last value', function() {
		var seq = new Seq([1,2,3,4,5]);
		
		expect(seq.slice(0,4).toArray()).to.be.deep.equal([1,2,3,4]);
	});
	
	it('should be chainable', function() {
		var seq = new Seq([1,2,3,4,5]);
		
		expect(seq.slice(1).slice(1,2).toArray()).to.be.deep.equal([3]);
	});
	
	it('should be able to take middle value', function() {
		var seq = new Seq([1,2,3,4,5]);
		
		expect(seq.slice(1,4).toArray()).to.be.deep.equal([2, 3, 4]);
	});
	
	it('should work with bad range as array', function() {
		var seq = new Seq([1,2,3,4,5,6,7]);
		
		expect(seq.slice(-5,100).toArray()).to.be.deep.equal([3,4,5,6,7]);
	});

	it('should take negative value of start position', function() {
		var seq = new Seq([1,2,3,4,5,6,7]);

		expect(seq.slice(-5).toArray()).to.be.deep.equal([3,4,5,6,7]);
		expect(seq.slice(-5, 3).toArray()).to.be.deep.equal([3]);
	});

	it('should take both negative parameters', function() {
		var seq = new Seq([1,2,3,4,5,6,7]);

		expect(seq.slice(-5, -3).toArray()).to.be.deep.equal([3, 4]);
	});

	it('should take second parameter negative', function() {
		var seq = new Seq([1,2,3,4,5,6,7]);

		expect(seq.slice(2, -3).toArray()).to.be.deep.equal([3, 4]);
	});



});
