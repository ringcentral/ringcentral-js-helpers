/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {account} from './Account';

describe('RingCentralHelpers.Account', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(account.createUrl()).to.equal('/account/~');

        });

    });

});
