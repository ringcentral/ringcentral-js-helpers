/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {extension} from './Extension';

describe('RingCentralHelpers.Extension', function() {

    'use strict';

    var extensions = [
        {name: 'One One One', extensionNumber: 111, type: 'foo'},
        {name: 'Twenty One', extensionNumber: 21, type: 'bar'}
    ];

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(extension.createUrl()).to.equal('/account/~/extension');
            expect(extension.createUrl({}, 'foo')).to.equal('/account/~/extension/foo');
            expect(extension.createUrl({departmentId: 'foo'})).to.equal('/account/~/department/foo/members');
            expect(extension.createUrl({departmentId: 'foo'}, 'bar')).to.equal('/account/~/department/foo/members/bar');

        });

    });

    describe('comparator', function() {

        it('allows to sort extensions by extensionNumber', function() {

            var exts = [].concat(extensions).sort(extension.comparator());

            expect(exts[0]).to.equal(extensions[1]);
            expect(exts[1]).to.equal(extensions[0]);

        });

    });

    describe('filter', function() {

        it('allows to filter extensions by name and extensionNumber', function() {

            expect(extensions.filter(extension.filter({search: 'One'})).length).to.equal(2);
            expect(extensions.filter(extension.filter({search: '21'})).length).to.equal(1);

        });

        it('allows to filter extensions by type', function() {

            expect(extensions.filter(extension.filter({type: 'foo'})).length).to.equal(1);

        });

    });

    describe('convenience methods', function() {

        it('provides type detection', function() {

            expect(extension.isUser()).to.equal(undefined);
            expect(extension.isDepartment()).to.equal(undefined);
            expect(extension.isAnnouncement()).to.equal(undefined);
            expect(extension.isVoicemail()).to.equal(undefined);

            expect(extension.isUser({type: 'foo'})).to.equal(false);
            expect(extension.isDepartment({type: 'foo'})).to.equal(false);
            expect(extension.isAnnouncement({type: 'foo'})).to.equal(false);
            expect(extension.isVoicemail({type: 'foo'})).to.equal(false);

            expect(extension.isUser({type: 'User'})).to.equal(true);
            expect(extension.isDepartment({type: 'Department'})).to.equal(true);
            expect(extension.isAnnouncement({type: 'Announcement'})).to.equal(true);
            expect(extension.isVoicemail({type: 'Voicemail'})).to.equal(true);

        });

    });

});
