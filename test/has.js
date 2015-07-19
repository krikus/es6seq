/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq has', function() {
	var list;
	beforeEach(function() {
		list = new Seq.range(0, 1000)
			.filter(function(x) {
				var sqrt = ~~(Math.sqrt(x));
				return sqrt * sqrt === x;
			});
	});

	it('should work with simple number', function() {
		expect(list.has(5)).to.be.false;
		expect(list.has(3)).to.be.false;
		expect(list.has(500)).to.be.false;
		expect(list.has(3*7)).to.be.false;
		expect(list.has(9*11)).to.be.false;
		for(var i = 0; i < Math.sqrt(1000); i++) {
			expect(list.has(i*i)).to.be.true;
		}

	});

	it('should work with simple string', function() {
		var animals = new Seq(['cat', 'fox', 'turtle', 'dog', 'cow']);

		expect(animals.has('beer')).to.be.false;
		expect(animals.has('car')).to.be.false;
		expect(animals.has('cat')).to.be.true;
		expect(animals.has('dog')).to.be.true;
	});


	it('should work with callback', function() {
		var callback = function(x) {
			return x === 25;
		};

		expect(list.has(callback)).to.be.true;
	});

	it('should have alias "any"', function() {
		var has_any = list.any(25) && !list.any(8) && !list.any(5) && list.any(100);

		expect(has_any).to.be.true;
	});

	it('should work with flat objects', function() {
		var list = new Seq([{user: 'admin', password: 'robot'}, {user: 'user', password: '123'}]);

		expect(list.has({user: 'admin'})).to.be.true;
		expect(list.has({user: 'user', password: 'robot'})).to.be.false;
		expect(list.has({password: 123})).to.be.false;
		expect(list.has({password: '123', user: 'user'})).to.be.true;
		expect(list.has({password: 'robot'})).to.be.true;
		expect(list.has({})).to.be.true;
		expect(list.has({deep: {user: 'admin'}})).to.be.false;
	});

	it('should work with whole arrays', function() {
		var list = new Seq([[1,2],[3,4],[5,6],[1,3,3,7]]);

		expect(list.has([1,2])).to.be.true;
		expect(list.has([2,1])).to.be.false;
		expect(list.has([3,4,5])).to.be.false;
		expect(list.has([5,6])).to.be.true;
		expect(list.has([1,3,7])).to.be.false;
		expect(list.has([1,3,3,7])).to.be.true;
	});

});
