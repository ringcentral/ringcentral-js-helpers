/// <reference path="../externals.d.ts" />

import {expect, getSDK} from '../test/mocha';
import {message} from './Message';

describe('RingCentralHelpers.Message', function() {

    'use strict';

    describe('attachContacts', function() {

        it('attaches contacts to all callerInfo structures found in each call', function() {

            var contacts = <any>[
                    {id: 'foo', homePhone: 'foo'},
                    {id: 'bar', homePhone: 'bar'},
                    {id: 'baz', homePhone: 'baz'}
                ],
                messages = <any>[
                    {
                        direction: 'Outbound',
                        from: {phoneNumber: 'foo'},
                        to: [
                            {phoneNumber: 'bar'},
                            {phoneNumber: 'baz'}
                        ]
                    },
                    {
                        direction: 'Inbound',
                        from: {phoneNumber: 'baz'},
                        to: [
                            {phoneNumber: 'notfound'}
                        ]
                    }
                ];

            message.attachContacts(contacts, messages);

            expect(messages[0].from.contact).to.equal(contacts[0]);
            expect(messages[0].to[0].contact).to.equal(contacts[1]);
            expect(messages[0].to[1].contact).to.equal(contacts[2]);
            expect(messages[1].from.contact).to.equal(contacts[2]);
            expect(messages[1].to[0].contact).to.be.an('undefined');

        });

    });


    describe('getCallerInfo', function() {

        var messages = [
            {
                direction: 'Outbound',
                from: {
                    phoneNumber: 'foo'
                },
                to: [
                    {phoneNumber: 'bar'},
                    {phoneNumber: 'baz'}
                ]
            },
            {
                direction: 'Inbound',
                from: {phoneNumber: 'baz'},
                to: [
                    {phoneNumber: 'qux'}
                ]
            }
        ];

        it('returns callerInfo of from or to properties depending on direction', function() {

            expect(message.getCallerInfos(messages[0]).length).to.equal(2);
            expect(message.getCallerInfos(messages[0])[0].phoneNumber).to.equal('bar');
            expect(message.getCallerInfos(messages[0])[1].phoneNumber).to.equal('baz');

            expect(message.getCallerInfos(messages[1]).length).to.equal(1);
            expect(message.getCallerInfos(messages[1])[0].phoneNumber).to.equal('baz');

        });

        it('returms all callerInfos in an order depending on direction', function() {

            expect(message.getAllCallerInfos(messages[0]).length).to.equal(3);
            expect(message.getAllCallerInfos(messages[0])[0].phoneNumber).to.equal('bar');
            expect(message.getAllCallerInfos(messages[0])[1].phoneNumber).to.equal('baz');
            expect(message.getAllCallerInfos(messages[0])[2].phoneNumber).to.equal('foo');

            expect(message.getAllCallerInfos(messages[1]).length).to.equal(2);
            expect(message.getAllCallerInfos(messages[1])[0].phoneNumber).to.equal('baz');
            expect(message.getAllCallerInfos(messages[1])[1].phoneNumber).to.equal('qux');

        });

    });

    describe('shorten', function() {

        it('creates a short message out of full message structure', function() {

            var msg = {
                    direction: 'Outbound',
                    subject: 'qux',
                    from: {
                        phoneNumber: 'foo'
                    },
                    to: [
                        {phoneNumber: 'bar'},
                        {phoneNumber: 'baz'}
                    ]
                },
                short = <any>message.shorten(msg);

            expect(short.direction).to.be.an('undefined');
            expect(short.subject).to.be.an('undefined');
            expect(short.text).to.equal(msg.subject);
            expect(short.from).to.equal(msg.from);
            expect(short.to).to.equal(msg.to);

        });

    });

    describe('createUrl', function() {

        it('produces various urls depending on options', function() {

            expect(message.createUrl()).to.equal('/account/~/extension/~/message-store');
            expect(message.createUrl({}, 1)).to.equal('/account/~/extension/~/message-store/1');
            expect(message.createUrl({extensionId: 'foo'}, '1')).to.equal('/account/~/extension/foo/message-store/1');
            expect(message.createUrl({
                extensionId: 'foo',
                sync: true
            }, '1')).to.equal('/account/~/extension/foo/message-sync');
            expect(message.createUrl({extensionId: 'foo', sms: true}, '1')).to.equal('/account/~/extension/foo/sms');
            expect(message.createUrl({
                extensionId: 'foo',
                pager: true
            }, '1')).to.equal('/account/~/extension/foo/company-pager');

        });

    });

    describe('loadRequest, saveRequest, deleteRequest', function() {

        it('produces various urls depending on options', function() {

            expect(message.loadRequest().url).to.equal('/account/~/extension/~/message-store');
            expect(message.saveRequest({}).url).to.equal('/account/~/extension/~/message-store');

        });

    });

    describe('getAttachmentContentType', function() {

        var msg = {
                attachments: [
                    {
                        uri: '/account/~/extension/~/message-store/1/attachment/---1---',
                        contentType: 'foo'
                    },
                    {
                        uri: '/account/~/extension/~/message-store/1/attachment/---2---',
                        contentType: 'bar'
                    }
                ]
            };

        it('gives a content type, empty string if not found', function() {

            expect(message.getAttachmentContentType(msg, 0)).to.equal('foo');
            expect(message.getAttachmentContentType(msg, 1)).to.equal('bar');
            expect(message.getAttachmentContentType(msg, 2)).to.equal('');

        });

    });

    describe('filter', function() {

        var messages = [
            {
                direction: 'Outbound',
                availability: 'Purged',
                readStatus: 'Read',
                conversationId: '1'
            },
            {
                direction: 'Inbound',
                availability: 'Deleted',
                readStatus: 'Read',
                conversationId: '1'
            },
            {
                direction: 'Outbound',
                availability: 'Alive',
                readStatus: 'Unread',
                conversationId: '2'
            },
            {
                direction: 'Outbound',
                availability: 'Alive',
                readStatus: 'Read',
                conversationId: '2',
                subject: 'foo bar baz'
            }
        ];

        it('rules out dead objects by default', function() {

            var filtered = messages.filter(message.filter());

            expect(filtered.length).to.equal(2);
            expect(filtered[0]).to.equal(messages[2]);
            expect(filtered[1]).to.equal(messages[3]);

        });

        it('rules out objects by criteria', function() {

            var filtered;

            filtered = messages.filter(message.filter({alive: false}));

            expect(filtered.length).to.equal(4);

            filtered = messages.filter(message.filter({alive: false, direction: 'Inbound'}));

            expect(filtered.length).to.equal(1);
            expect(filtered[0]).to.equal(messages[1]);

            filtered = messages.filter(message.filter({alive: false, readStatus: 'Read'}));

            expect(filtered.length).to.equal(3);
            expect(filtered[0]).to.equal(messages[0]);
            expect(filtered[1]).to.equal(messages[1]);
            expect(filtered[2]).to.equal(messages[3]);

            filtered = messages.filter(message.filter({alive: false, conversationId: '2'}));

            expect(filtered.length).to.equal(2);
            expect(filtered[0]).to.equal(messages[2]);
            expect(filtered[1]).to.equal(messages[3]);

            filtered = messages.filter(message.filter({search: 'bar'}));

            expect(filtered.length).to.equal(1);
            expect(filtered[0]).to.equal(messages[3]);

        });

    });

    describe('comparator', function() {

        it('sorts by creationTime', function() {

            var messages = [
                {creationTime: '2014-08-26T09:46:06.781Z'},
                {creationTime: '2014-08-26T08:46:06.781Z'},
                {creationTime: '2014-08-26T07:46:06.781Z'}
            ];

            var sorted = [].concat(messages).sort(message.comparator());

            expect(sorted[0]).to.equal(messages[2]);
            expect(sorted[1]).to.equal(messages[1]);
            expect(sorted[2]).to.equal(messages[0]);

        });

    });

    describe('getSubscription', function() {

        it('returns pre-configured Subscription object', function() {

            var notificaction = message.addEventToSubscription(getSDK().createSubscription(), {extensionId: 'foo'});

            expect(notificaction.eventFilters().length).to.equal(1);
            expect(notificaction.eventFilters()[0]).to.equal('/account/~/extension/foo/message-store');

        });

    });

    describe('validate', function() {

        it('performs basic SmsMessage validation', function() {

            var res = message.validateSMS({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['to'][0]).to.be.instanceOf(Error);
            expect(res.errors['from'][0]).to.be.instanceOf(Error);
            expect(res.errors['subject'][0]).to.be.instanceOf(Error);

        });

        it('performs basic PagerMessage validation', function() {

            var res = message.validatePager({});

            expect(res.isValid).to.equal(false);
            expect(res.errors['to'][0]).to.be.instanceOf(Error);
            expect(res.errors['from'][0]).to.be.instanceOf(Error);
            expect(res.errors['subject'][0]).to.be.instanceOf(Error);

        });

        it('passes SmsMessage validation if values are correct', function() {

            var res = message.validateSMS({to: [{phoneNumber: 'foo'}], from: {phoneNumber: 'foo'}, subject: 'foo'});

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

        it('passes PagerMessage validation if values are correct', function() {

            var res = message.validatePager(<any>{
                to: {extensionNumber: 'foo'},
                from: {extensionNumber: 'foo'},
                subject: 'foo'
            });

            expect(res.isValid).to.equal(true);
            expect(res.errors).to.deep.equal({});

        });

    });

});
