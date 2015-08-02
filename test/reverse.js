/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq reverse', function() {

	it('should work like native array', function() {
		let array = [1,2,3,4,5,67,78,44];
		let seq = new Seq(array);

		expect(seq.reverse().toArray()).to.be.deep.equal(array.reverse());
	});

	it('should return instance of Seq', function() {
		let array = ['cat', 'dog', 'elephant', 'dinosaur'];
		let seq = new Seq(array).reverse();

		expect(seq.reverse()).to.be.an.instanceof(Seq);
	});

	it('should be able to reverse the reversion', function() {
		let array = [5,61,10125,6129,616,285,21951,59125,5218512,6902,61,51];
		let seq = new Seq(array);

		expect(seq.reverse().toArray()).to.be.deep.equal(array.reverse());
		expect(seq.reverse().reverse().toArray()).to.be.deep.equal(array);
	});

	it('should be able to reverse range', function() {
		expect(Seq.range(1,1000).reverse().toArray()).to.be.deep.equal(Seq.range(1000,1).toArray());
	});

});
