/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {forwardingNumber} from './ForwardingNumber';

describe('RingCentralHelpers.ForwardingNumber', function() {

    'use strict';

    var forwardingNumbers = [
        {label: '3', phoneNumber: '1', features: ['CallForwarding', 'CallFlip']},
        {label: '2', phoneNumber: '2', features: ['CallFlip']},
        {label: '1', phoneNumber: '2', features: ['CallForwarding']},
        {label: '4', phoneNumber: '2', features: []}
    ];

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(forwardingNumber.createUrl()).to.equal('/account/~/extension/~/forwarding-number');
            expect(forwardingNumber.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/forwarding-number');
            expect(forwardingNumber.createUrl({}, 'foo')).to.equal('/account/~/extension/~/forwarding-number/foo');
            expect(forwardingNumber.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/forwarding-number/bar');

        });

    });

    describe('getId', function() {

        it('returns either ID or phoneNumber', function() {

            expect(forwardingNumber.getId({id: 'foo', phoneNumber: 'bar'})).to.equal('foo');
            expect(forwardingNumber.getId({phoneNumber: 'bar'})).to.equal('bar');
            expect(forwardingNumber.getId({})).to.equal(undefined);

        });

    });

    describe('comparator', function() {

        it('sorts by label by default', function() {

            var sorted = [].concat(forwardingNumbers).sort(forwardingNumber.comparator());

            expect(sorted[0]).to.equal(forwardingNumbers[2]);
            expect(sorted[1]).to.equal(forwardingNumbers[1]);
            expect(sorted[2]).to.equal(forwardingNumbers[0]);

        });

    });

    describe('filter', function() {

        it('provides functionality to filter by feature', function() {

            var filtered = forwardingNumbers.filter(forwardingNumber.filter({features: ['CallForwarding', 'CallFlip']}));
            expect(filtered.length).to.equal(3);
            expect(filtered[0]).to.equal(forwardingNumbers[0]);
            expect(filtered[1]).to.equal(forwardingNumbers[1]);
            expect(filtered[2]).to.equal(forwardingNumbers[2]);

        });

        it('provides functionality to filter by array of features', function() {

            var filtered = forwardingNumbers.filter(forwardingNumber.filter({features: ['CallForwarding']}));
            expect(filtered[0]).to.equal(forwardingNumbers[0]);
            expect(filtered[1]).to.equal(forwardingNumbers[2]);

        });

    });

});
