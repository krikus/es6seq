/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq constructor', function() {
	var test_array, sum_of_array = Number.MAX_SAFE_INTEGER;

	beforeEach(function() {
		test_array = [1,2,3,4,5,6,7,8,9,10];
		sum_of_array = 0;

		for(var i of test_array) {
			sum_of_array += i;
		}
	});

	it('should take array as param', function() {
		var list = new Seq(test_array);
		var sum = 0;
		for(var i of list) {
			sum += i;
		}

		expect(sum).to.be.equal(sum_of_array);
	});

	it('should take generator as param', function(){
		var generator = function*() {
			for(var i of test_array) {
				yield i;
			}
		};
		var list = new Seq(generator);
		
		var sum = 0;
		for(var i of generator()){
			sum += i;
		}

		expect(list.sum()).to.be.equal(sum);
	});
});
