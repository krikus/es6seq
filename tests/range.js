/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq constructor', function(){
	it('take array as param', function(){
		var list = new Seq([1,2,3]);
		var sum = 0;
		for(var i of list)
		{
			sum+=i;
		}
		expect(sum).to.be.equal(6);
	});
});
