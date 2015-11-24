/// <reference path="../externals.d.ts" />

import {expect} from '../test/mocha';
import {deviceModel} from './DeviceModel';

describe('RingCentralHelpers.dictionaries.DeviceModel', function() {

    'use strict';

    describe('getId', function() {

        it('provides artificial IDs', function() {

            expect(deviceModel.getId({
                sku: '23',
                model: {
                    name: 'Polycom IP 321 Basic IP phone',
                    deviceClass: 'Desk Phone'
                }
            })).to.equal('23');

        });

    });

});
