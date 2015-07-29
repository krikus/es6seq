/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq flatten', function() {
	it('should reverse chunks', function() {
		var seq = new Seq([0,1,2,3,4,5,6]);	
		
		var chunked = seq.chunk(4);
		
		expect(chunked.flatten().toArray()).to.be.deep.equal([0,1,2,3,4,5,6]);
	});
		
	it('should work with deep nesting', function() {
		var array = [[1],[[2,3],[[4],[5,6]]],[7,[8,9,10,[11,[12,13,[14,[15]]]]]]];
		
		var seq = new Seq(array);
		
		expect(seq.flatten().toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	});
	
	it('should work with various generators', function() {
		
		var seq = new Seq([[[[[[9,[10,[11,[12]]]]]]]],13]);
		
		var array = [[14,[15]],16];
		
		var list = new Seq([Seq.range(1, 8), seq, array]);
		
		expect(list.flatten().toArray()).to.be.deep.equal([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
	});
	
	it('should be able to set deep to 1', function() {
		var seq = new Seq([1,[2],[3,[4,[5]]],[6],7]);
		
		expect(seq.flatten(1).toArray()).to.be.deep.equal([1,2,3,[4,[5]],6,7]);
	});
	
	it('should be turned off by passing 0', function() {
		var seq = new Seq([1,[2],[3,[4,[5]]],[6],7]);
		
		expect(seq.flatten(0).toArray()).to.be.deep.equal([1,[2],[3,[4,[5]]],[6],7]);
	});
	
	it('should be able to set deep to 2', function() {
		var seq = new Seq([1,[2],[3,[4,[5]]],[6],7]);
		
		expect(seq.flatten(2).toArray()).to.be.deep.equal([1,2,3,4,[5],6,7]);
	});
});
