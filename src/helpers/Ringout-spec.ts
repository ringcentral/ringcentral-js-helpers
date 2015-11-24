/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {ringout} from './Ringout';

describe('RingCentralHelpers.Ringout', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(ringout.createUrl()).to.equal('/account/~/extension/~/ringout');
            expect(ringout.createUrl({}, 'foo')).to.equal('/account/~/extension/~/ringout/foo');
            expect(ringout.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/ringout');
            expect(ringout.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/ringout/bar');

        });

    });

    describe('status helpers', function() {

        it('unsaved ringout is not inProgress/error/success', function() {

            expect(ringout.isSuccess({status: {callStatus: 'InProgress'}})).to.equal(false);
            expect(ringout.isError({status: {callStatus: 'Error'}})).to.equal(false);
            expect(ringout.isInProgress({status: {callStatus: 'Success'}})).to.equal(false);

        });

        it('provides interfaces to determine statuses', function() {

            expect(ringout.isSuccess({id: 'foo', uri: 'bar', status: {callStatus: 'InProgress'}})).to.equal(false);
            expect(ringout.isError({id: 'foo', uri: 'bar', status: {callStatus: 'InProgress'}})).to.equal(false);
            expect(ringout.isInProgress({id: 'foo', uri: 'bar', status: {callStatus: 'InProgress'}})).to.equal(true);

            expect(ringout.isSuccess({id: 'foo', uri: 'bar', status: {callStatus: 'Success'}})).to.equal(true);
            expect(ringout.isError({id: 'foo', uri: 'bar', status: {callStatus: 'Success'}})).to.equal(false);
            expect(ringout.isInProgress({id: 'foo', uri: 'bar', status: {callStatus: 'Success'}})).to.equal(false);

            expect(ringout.isSuccess({id: 'foo', uri: 'bar', status: {callStatus: 'Error'}})).to.equal(false);
            expect(ringout.isError({id: 'foo', uri: 'bar', status: {callStatus: 'Error'}})).to.equal(true);
            expect(ringout.isInProgress({id: 'foo', uri: 'bar', status: {callStatus: 'Error'}})).to.equal(false);

        });

    });

    describe('validate', function() {

        it('performs basic validation', function() {

            var res = ringout.validate({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['to'][0]).to.be.instanceOf(Error);
            expect(res.errors['to'].length).to.equal(1);
            expect(res.errors['from'][0]).to.be.instanceOf(Error);
            expect(res.errors['from'].length).to.equal(1);

        });

        it('passes validation if values are correct', function() {

            var res = ringout.validate({to: {phoneNumber: 'foo'}, from: {phoneNumber: 'foo'}});

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

    });

});
