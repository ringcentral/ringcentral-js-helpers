/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import * as validator from './Validator';

describe('RingCentralHelpers.Validator', function() {

    describe('length', function() {

        function lengthValidator(description, max, min, valueToTest, expectedValidationResult) {

            it(description, function() {

                var result = validator.validate([{field: 'foo', validator: validator.length(valueToTest, max, min)}]);
                expect(result.isValid).to.equal(expectedValidationResult);

            });

        }

        describe('positive tests', function() {

            lengthValidator('should validate a length that is equal to the max length', 9, 2, '123456789', true);
            lengthValidator('should validate a length that is equal to the min length', 9, 2, '12', true);
            lengthValidator('should validate a length that is between the max and min length', 9, 2, '12345', true);
            lengthValidator('should treat a falsey max as meaning there is no max length', null, 2, '123456789abcdef', true);
            lengthValidator('should treat a falsey min as meaning there is no min length', 9, null, '', true);

        });

        describe('negative tests', function() {

            lengthValidator('should not validate a length that is above the max length', 5, 4, '123456', false);
            lengthValidator('should not validate a length that is below the min length', 5, 4, '123', false);

        });

    });

});
