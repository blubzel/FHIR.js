var fs = require('fs');
var Fhir = require('../../fhir');
var assert = require('assert');

describe('STU3: Validation', function() {
    describe('ValidateXMLResource()', function() {
        it('should validate bundle-transaction successfully', function() {
            var bundleXml = fs.readFileSync('./test/data/stu3/bundle-transaction.xml').toString('utf8');
            var fhir = new Fhir(Fhir.DSTU2);
            var result = fhir.ValidateXMLResource(bundleXml);

            assert(result);
            assert.equal(result.valid, true);
        });

        it('should return validation errors for bundle-transaction_bad', function() {
            var bundleXml = fs.readFileSync('./test/data/stu3/bundle-transaction_bad.xml').toString('utf8');
            var fhir = new Fhir(Fhir.DSTU2);
            var result = fhir.ValidateXMLResource(bundleXml);

            assert(result);
            assert.equal(result.valid, false);
            assert(result.errors);
            assert.equal(result.errors.length, 1);
            assert.equal(result.errors[0], "Element '{http://hl7.org/fhir}resources': This element is not expected. Expected is one of ( {http://hl7.org/fhir}resource, {http://hl7.org/fhir}search, {http://hl7.org/fhir}request, {http://hl7.org/fhir}response ).\n");
        });
    });

    describe('ValidateJSONResource()', function() {
        it('should validate bundle-transaction.json successfully', function() {
            var bundleJson = fs.readFileSync('./test/data/stu3/bundle-transaction.json').toString('utf8');
            var bundle = JSON.parse(bundleJson);
            var fhir = new Fhir(Fhir.DSTU2);
            var result = fhir.ValidateJSResource(bundle);

            assert(result);
            assert.equal(result.valid, true);

            assert(result.errors);
            assert.equal(result.errors.length, 0);
        });
    });

    describe('ValidateJSResource()', function() {
        it('should validate bundle-transaction.json successfully', function() {
            var bundleJson = fs.readFileSync('./test/data/stu3/bundle-transaction.json').toString('utf8');
            var fhir = new Fhir(Fhir.DSTU2);
            var result = fhir.ValidateJSONResource(bundleJson);

            assert(result);
            assert.equal(result.valid, true);

            assert(result.errors);
            assert.equal(result.errors.length, 0);
        });
    });
});