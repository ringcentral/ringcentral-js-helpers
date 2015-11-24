/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {country} from './Country';

describe('RingCentralHelpers.dictionaries.Country', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(country.createUrl()).to.equal('/dictionary/country');

        });

    });

});
