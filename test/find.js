/* jshint mocha: true, node: true, expr: true */
"use strict";
require('harmonize')(['harmony-classes', 'harmony_arrows_functions', 'harmony-proxies']);
var Seq = require('../src/seq');
var chai = require('chai');
var expect = chai.expect;

describe('Seq find', function() {
	var list;
	beforeEach(function() {
		list = new Seq.range(0, 1000);
	});

	it('should work with simple number', function() {
		expect(list.find(5)).to.be.equal(5);
		expect(list.find(10)).to.be.equal(10);
		expect(list.find(50)).to.be.equal(50);
		expect(list.find(-10)).to.be.an.undefined;
	});

	it('should work with simple string', function() {
		var animals = new Seq(['cat', 'fox', 'turtle', 'dog', 'cow']);

		expect(animals.find('beer')).to.an.undefined;
		expect(animals.find('cat')).to.equal('cat');
		expect(animals.find('car')).to.be.an.undefined;
		expect(animals.find('fox')).to.equal('fox');
	});


	it('should work with filtered seq', function() {
		var callback = function(x) {
			x = x + '';
			return x.split('').reverse().join('') === x;
		};

		list = list.filter(callback);

		expect(list.find(555)).to.be.ok;
		expect(list.find(434)).to.be.ok;
		expect(list.find(121)).to.be.ok;
		expect(list.find(909)).to.be.ok;
		expect(list.find(11)).to.be.ok;
		expect(list.find(5)).to.be.ok;
		expect(list.find(12)).to.not.be.ok;
		expect(list.find(556)).to.not.be.ok;
		expect(list.find(512)).to.not.be.ok;
		expect(list.find(15)).to.not.be.ok;
		expect(list.find(1000)).to.not.be.ok;
		expect(list.find(910)).to.not.be.ok;
	});

	it('should work with callback', function() {
		expect(list.find(function(x){ return x === 951 })).to.be.equal(951);
		expect(list.find(function(x){ return x < 0 })).to.not.be.ok;
		expect(list.find(function(x){ return x % 100 === 99 && x > 200 })).to.be.equal(299);
	});


	it('should work with flat objects', function() {
		var list = new Seq([{user: 'admin', password: 'robot'}, {user: 'user', password: '123'}]);

		expect(list.find({user: 'admin'})).to.have.property('password')
			.that.is.a('string')
			.that.equals('robot');

		expect(list.find({user: 'admin', password: '123'})).to.not.exist;

		expect(list.find({user: 'user', password: '123'})).to.contain.all.keys('user', 'password');

	});

	it('should work with whole arrays', function() {
		var list = new Seq([[1,2],[3,4],[5,6],[1,3,3,7]]);

		expect(list.find([1,2])).to.be.deep.equal([1,2]);
		expect(list.find([2,1])).to.not.be.ok;
		expect(list.find([3,4,5])).to.not.be.ok;
		expect(list.find([5,6])).to.be.ok;
		expect(list.find([1,3,7])).to.not.be.ok;
		expect(list.find([1,3,3,7])).to.be.deep.equal([1,3,3,7]);
	});

	it('should work with finding object mixed in numbers', function() {
		var list = new Seq([1,2,3,{user: 'admin'}]);

		expect(list.find({user: 'admin'})).to.be.ok;
		expect(list.find({user: 'robot'})).to.be.not.ok;
	});

});
