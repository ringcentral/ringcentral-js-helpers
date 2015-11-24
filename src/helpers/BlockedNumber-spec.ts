/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {blockedNumber} from './BlockedNumber';

describe('RingCentralHelpers.BlockedNumber', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(blockedNumber.createUrl()).to.equal('/account/~/extension/~/blocked-number');
            expect(blockedNumber.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/blocked-number');
            expect(blockedNumber.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/blocked-number/bar');

        });

    });

});
