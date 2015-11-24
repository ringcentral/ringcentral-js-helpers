/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {conferencing} from './Conferencing';

describe('RingCentralHelpers.Conferencing', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(conferencing.createUrl()).to.equal('/account/~/extension/~/conferencing');

        });

    });

});
