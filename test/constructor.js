/* jshint mocha: true, node: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony-arrows-functions']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq constructor', function() {
	var test_array, sum_of_array = Number.MAX_SAFE_INTEGER;

	beforeEach(function() {
		test_array = [];
		sum_of_array = 0;

		for(var i = 0; i < 50; i++)
		{
			let rand = i * 1000 + ~~(Math.round() * 200);
			test_array.push(rand);
			sum_of_array += rand;
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

	it('should take generator as param', function() {
		var generator = function*() {
			for(var i of test_array) {
				yield i;
			}
		};
		var list = new Seq(generator);
		
		expect(list.sum()).to.be.equal(sum_of_array);
	});

	it('should take set as param', function() {
		var set = new Set(test_array);
		var list = new Seq(set);

		expect(list.sum()).to.be.equal(sum_of_array);
	});
});
