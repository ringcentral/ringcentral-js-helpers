/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {phoneNumber} from './PhoneNumber';

describe('RingCentralHelpers.ForwardingNumber', function() {

    'use strict';

    var phoneNumbers = [
        {usageType: 'MainCompanyNumber', paymentType: 'TollFree', type: 'VoiceFax', phoneNumber: '1', features: []},
        {usageType: 'AdditionalCompanyNumber', paymentType: 'TollFree', type: 'Voice', phoneNumber: '1', features: []},
        {usageType: 'AdditionalCompanyNumber', paymentType: 'Local', type: 'VoiceFax', phoneNumber: '1', features: []},
        {usageType: 'CompanyNumber', paymentType: 'Local', type: 'VoiceFax', phoneNumber: '1', features: []},
        {
            usageType: 'DirectNumber',
            paymentType: 'Local',
            type: 'VoiceFax',
            phoneNumber: '1',
            features: ['SmsSender', 'CallerId']
        },
        {usageType: 'CompanyNumber', paymentType: 'Local', type: 'VoiceFax', phoneNumber: '1', features: []},
        {usageType: 'CompanyFaxNumber', paymentType: 'Local', type: 'Fax', phoneNumber: '1', features: []},
        {usageType: 'ForwardedNumber', paymentType: 'Local', type: 'VoiceFax', phoneNumber: '1', features: []}
    ];

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(phoneNumber.createUrl()).to.equal('/account/~/phone-number');
            expect(phoneNumber.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/phone-number');
            expect(phoneNumber.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/phone-number/bar');
            expect(phoneNumber.createUrl({}, 'bar')).to.equal('/account/~/phone-number/bar');
            expect(phoneNumber.createUrl({lookup: true})).to.equal('/number-pool/lookup');

        });

    });

    describe('comparator', function() {

        it('sorts by usageType, paymentType, type by default', function() {

            var phoneNumbers = [
                {usageType: '2', paymentType: '1', type: '1'},
                {usageType: '1', paymentType: '2', type: '2'},
                {usageType: '1', paymentType: '2', type: '1'},
                {usageType: '1', paymentType: '1', type: '1'}
            ];

            var sorted = [].concat(phoneNumbers).sort(phoneNumber.comparator());

            expect(sorted[0]).to.equal(phoneNumbers[3]);
            expect(sorted[1]).to.equal(phoneNumbers[2]);
            expect(sorted[2]).to.equal(phoneNumbers[1]);
            expect(sorted[3]).to.equal(phoneNumbers[0]);

        });

    });

    describe('filter', function() {

        it('provides functionality to filter by feature', function() {

            var filtered = phoneNumbers.filter(phoneNumber.filter({features: ['SmsSender']}));

            expect(filtered.length).to.equal(1);
            expect(filtered[0]).to.equal(phoneNumbers[4]);

        });

    });

});
