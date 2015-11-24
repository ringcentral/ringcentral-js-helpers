/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {timezone} from './Timezone';

describe('RingCentralHelpers.dictionaries.Timezone', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(timezone.createUrl()).to.equal('/dictionary/timezone');

        });

    });

});
