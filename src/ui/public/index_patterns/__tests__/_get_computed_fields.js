import expect from 'expect.js';
import ngMock from 'ng_mock';
import FixturesStubbedLogstashIndexPatternProvider from 'fixtures/stubbed_logstash_index_pattern';
describe('get computed fields', function () {

  let indexPattern;

  let getComputedFields;

  let fn;
  beforeEach(ngMock.module('kibana'));
  beforeEach(ngMock.inject(function (Private) {
    indexPattern = Private(FixturesStubbedLogstashIndexPatternProvider);
    getComputedFields = require('ui/index_patterns/_get_computed_fields');
    indexPattern.getComputedFields = getComputedFields.bind(indexPattern);
    fn = indexPattern.getComputedFields;

  }));

  it('should be a function', function () {
    expect(fn).to.be.a(Function);
  });

  it('should request all stored fields', function () {
    expect(fn().storedFields).to.contain('*');
  });

  it('should request date fields as docvalue_fields', function () {
    expect(fn().docvalueFields).to.contain('@timestamp');
    expect(fn().docvalueFields).to.not.contain('bytes');
  });

  it('should not request scripted date fields as docvalue_fields', function () {
    expect(fn().docvalueFields).to.not.contain('script date');
  });

});
