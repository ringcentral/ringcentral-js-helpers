/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {device} from './Device';

describe('RingCentralHelpers.Device', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(device.createUrl()).to.equal('/account/~/device');
            expect(device.createUrl({}, 'foo')).to.equal('/account/~/device/foo');
            expect(device.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/device');
            expect(device.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/device/bar');
            expect(device.createUrl({order: true}, 'bar')).to.equal('/account/~/order');

        });

    });

    describe('validate', function() {

        it('performs basic validation', function() {

            var res = device.validate({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['emergencyServiceAddress-street'][0]).to.be.instanceOf(Error);
            expect(res.errors['emergencyServiceAddress-city'][0]).to.be.instanceOf(Error);
            expect(res.errors['emergencyServiceAddress-state'][0]).to.be.instanceOf(Error);
            expect(res.errors['emergencyServiceAddress-country'][0]).to.be.instanceOf(Error);
            expect(res.errors['emergencyServiceAddress-zip'][0]).to.be.instanceOf(Error);
            expect(res.errors['emergencyServiceAddress-customerName'][0]).to.be.instanceOf(Error);
            expect(res.errors['extension'][0]).to.be.instanceOf(Error);
            expect(res.errors['model'][0]).to.be.instanceOf(Error);

        });

        it('passes validation if values are correct', function() {

            var res = device.validate({
                emergencyServiceAddress: {
                    street: 'foo',
                    city: 'foo',
                    state: 'foo',
                    country: 'foo',
                    zip: 'foo',
                    customerName: 'foo'
                },
                extension: {id: 'foo'},
                model: {sku: 'foo'}
            });

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

    });

});
