/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {contact} from './Contact';

describe('RingCentralHelpers.Contact', function() {

    'use strict';

    describe('match & matchAsPhone', function() {

        it('matches a string against a contact', function() {

            var contactInfo = <any>{
                firstName: 'firstName',
                lastName: 'lastName',
                company: 'lastName',
                nickName: 'lastName',
                middleName: 'lastName',
                email: 'lastName',
                email2: 'lastName',
                email3: 'lastName',
                homePhone: '+homePhone',
                homePhone2: 'lastName',
                businessPhone: 'lastName',
                businessPhone2: 'lastName',
                mobilePhone: 'lastName',
                companyPhone: 'lastName',
                assistantPhone: 'lastName',
                carPhone: 'lastName',
                otherPhone: 'lastName',
                callbackPhone: 'lastName',
                businessFax: 'lastName',
                otherFax: 'lastName',
                businessAddress: {
                    country: 'businessAddress-street',
                    street: 'businessAddress-street',
                    city: 'businessAddress-city',
                    state: 'businessAddress-state',
                    zip: 'businessAddress-zip'
                },
                homeAddress: {
                    country: 'homeAddress-street',
                    street: 'homeAddress-street',
                    city: 'homeAddress-city',
                    state: 'homeAddress-state',
                    zip: 'homeAddress-zip'
                },
                otherAddress: {
                    country: 'otherAddress-street',
                    street: 'otherAddress-street',
                    city: 'otherAddress-city',
                    state: 'otherAddress-state',
                    zip: 'otherAddress-zip'
                }
            };

            expect(contact.match(contactInfo, 'firstName')).to.equal(contactInfo.firstName);
            expect(contact.match(contactInfo, 'lastName')).to.equal(contactInfo.lastName);

            expect(contact.matchAsPhone(contactInfo, 'homePhone')).to.equal(contactInfo.homePhone);
            expect(contact.matchAsPhone(contactInfo, 'businessAddress-street')).to.equal(null);

            // search in address
            expect(contact.match(contactInfo, 'businessAddress-street')).to.equal(contactInfo.businessAddress.street);
            expect(contact.match(contactInfo, 'businessAddress-street', {inAddresses: false})).to.equal(null);

        });

    });

    describe('attachContacts', function() {

        it('provides corresponding contacts to callerInfo objects', function() {

            var contacts = <any>[
                    {homePhone: '+(1)foo'},
                    {homePhone: '+(1)foo'},
                    {homePhone: '+(2)bar'}
                ],
                callerInfos = <any>[
                    {phoneNumber: '2bar'},
                    {phoneNumber: '1foo'},
                    {phoneNumber: 'notfound'}
                ];

            contact.attachToCallerInfos(callerInfos, contacts);

            expect(callerInfos[0].contact).to.equal(contacts[2]);
            expect(callerInfos[0].contactPhone).to.equal(contacts[2].homePhone);

            // first contact must win
            expect(callerInfos[1].contact).to.equal(contacts[0]);
            expect(callerInfos[1].contactPhone).to.equal(contacts[0].homePhone);
            expect(callerInfos[1].contact).to.not.equal(contacts[1]);

            expect(callerInfos[2].contact).to.be.an('undefined');
            expect(callerInfos[2].contact).to.be.an('undefined');
            expect(callerInfos[2].contactPhone).to.be.an('undefined');


        });

    });

    describe('filter', function() {

        var contacts = <any>[
            {lastName: 'unavailable', availability: 'Purged'},
            {firstName: 'foo', availability: 'Alive'},
            {lastName: 'foo', businessFax: 'foo', availability: 'Alive'},
            {homePhone: 'foo', availability: 'Alive'}
        ];

        it('rules out dead objects by default', function() {

            var filtered = contacts.filter(contact.filter());

            expect(filtered.length).to.equal(3);
            expect(filtered[0]).to.equal(contacts[1]);
            expect(filtered[1]).to.equal(contacts[2]);
            expect(filtered[2]).to.equal(contacts[3]);

        });

        it('rules out by search phrase', function() {

            var filtered = contacts.filter(contact.filter({startsWith: 'foo'}));

            expect(filtered.length).to.equal(3);
            expect(filtered[0]).to.equal(contacts[1]);
            expect(filtered[1]).to.equal(contacts[2]);
            expect(filtered[2]).to.equal(contacts[3]);

        });

        it('rules out by items with no phones', function() {

            var filtered = contacts.filter(contact.filter({phonesOnly: true}));

            expect(filtered.length).to.equal(1);
            expect(filtered[0]).to.equal(contacts[3]);

        });

        it('rules out by items with no faxes', function() {

            var filtered = contacts.filter(contact.filter({faxesOnly: true}));

            expect(filtered.length).to.equal(1);
            expect(filtered[0]).to.equal(contacts[2]);

        });

    });

    describe('comparator', function() {

        var contacts = <any>[
            {lastName: 'b'},
            {firstName: 'b'},
            {firstName: 'a'}
        ];

        it('sorts objects by "full name"', function() {

            var sorted = [].concat(contacts).sort(contact.comparator());

            expect(sorted[0]).to.equal(contacts[2]);
            expect(sorted[1]).to.equal(contacts[0]);
            expect(sorted[2]).to.equal(contacts[1]);

        });

    });

    describe('validate', function() {

        it('performs basic validation', function() {

            var res = contact.validate({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['firstName'][0]).to.be.instanceOf(Error);
            expect(res.errors['lastName'][0]).to.be.instanceOf(Error);
            expect(res.errors['email']).to.be.an('undefined');
            expect(res.errors['email2']).to.be.an('undefined');
            expect(res.errors['email3']).to.be.an('undefined');

        });

        it('performs complex validation', function() {

            var res = contact.validate({email: 'foo', email2: 'bar', email3: 'baz'});

            expect(res.isValid).to.equal(false);
            expect(res.errors['firstName'][0]).to.be.instanceOf(Error);
            expect(res.errors['lastName'][0]).to.be.instanceOf(Error);
            expect(res.errors['email'][0]).to.be.instanceOf(Error);
            expect(res.errors['email2'][0]).to.be.instanceOf(Error);
            expect(res.errors['email3'][0]).to.be.instanceOf(Error);

        });

        it('passes validation if values are correct', function() {

            var res = contact.validate({
                email: 'foo@bar.baz',
                email2: 'foo@bar.baz',
                email3: 'foo@bar.baz',
                firstName: 'foo',
                lastName: 'bar'
            });

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

        it('passes validation if values are correct', function() {

            var res = contact.validate({
                firstName: 'foo',
                lastName: 'bar'
            });

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

    });

});
