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

	it('should work with numbers', function() {
		expect(list.map(function(x){ return x * 2; }).sum()).to.be.equal(list.sum()*2);
	});

	it('should be instanceof Seq', function() {
		expect(list.map(function(x){ return x * 2;})).to.be.an.instanceof(Seq);
	});

	it('should be able to pick objects values', function() {
		list = list.map(function(x) {
			return {
				value: x
			};
		});

		function first(){ return true; }

		expect(list.find(first)).to.have.property('value')
			.that.is.a('number')
			.that.is.equal(0);
	});

	it('should be able to pick object values by string', function() {
		var list = new Seq([{user: 'admin', password: 'robot'}, {user: 'user', password: '123'}]).map();

		expect(list.map('user').has('admin')).to.be.true;
		expect(list.map('password').has('robot')).to.not.be.ok;
		expect(list.map('user').has('user')).to.be.true;
		expect(list.map('user').has('123')).to.not.be.ok;
	});

});
