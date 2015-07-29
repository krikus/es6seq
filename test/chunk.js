/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq chunk', function() {
	var list = new Seq([0,1,2,3,4,5,6,7,8,9,10]);
	
	it('should work on empty Seq', function() {
		var seq = new Seq([]);	
		
		var fired = false;
		
		for(var i of seq.chunk()) {
			fired = true;
		}
		
		expect(fired).to.be.equal(false);
	});
	
	it('should return last chunk with the remaining elements', function() {
		var chunked = list.chunk(3);
		var last_chunk;
		for(var i of chunked) {
			last_chunk = i;
		}
		expect(last_chunk).to.be.deep.equal([9,10]);
	});
	
	it('should return correct chunks in good order', function() {
		var chunked = list.chunk(5);
		
		expect(chunked.toArray()).to.be.deep.equal([[0,1,2,3,4],[5,6,7,8,9],[10]]);
	});
	
	it('should be chainable', function() {
		var chunked = list.chunk(3);
		
		expect(chunked.chunk(2).toArray()).to.be.deep.equal([[[0,1,2],[3,4,5]],[[6,7,8],[9,10]]]);
	});
});
