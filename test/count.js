/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq count', function() {

	it('should work with mixed data', function() {
		let seq = new Seq([1,2,3,false,undefined,true,'cat','',[]]);

		expect(seq.count()).to.be.equal(9);
	});
	
	it('should work return correct length for random number of elements', function() {
		let elements = 1 + Math.round(Math.random()*10000);
		let seq = Seq.range(1, elements);

		expect(seq.count()).to.be.equal(elements);
		expect(seq.toArray().length).to.be.equal(elements);
	});

	it('should work with filtering function', function() {
		let array = ['cat', 'dog', 'elephant', 'dinosaur'];
		let seq = new Seq(array);

		expect(seq.count(function(element){ return element.length > 3; })).to.be.equal(2);
	});

});
