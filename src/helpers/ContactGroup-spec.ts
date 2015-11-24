/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {contactGroup} from './ContactGroup';

describe('RingCentralHelpers.ContactGroup', function() {

    'use strict';

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(contactGroup.createUrl()).to.equal('/account/~/extension/~/address-book/group');
            expect(contactGroup.createUrl({}, 'foo')).to.equal('/account/~/extension/~/address-book/group/foo');

        });

    });

    describe('validate', function() {

        it('performs basic validation', function() {

            var res = contactGroup.validate({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['groupName'][0]).to.be.instanceOf(Error);
            expect(res.errors['groupName'].length).to.equal(1);

        });

        it('passes validation if values are correct', function() {

            var res = contactGroup.validate({groupName: 'foo'});

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

    });

});
