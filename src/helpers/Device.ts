/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as list from '../core/List';
import * as utils from '../core/Utils';
import * as validator from '../core/Validator';
import * as extension from './Extension';
import * as deviceModel from './DeviceModel';
import * as shippingMethod from './ShippingMethod';
import * as phoneNumber from './PhoneNumber';

export class Device extends helper.Helper {

    createUrl(options?:IDeviceOptions, id?:string) {

        options = options || {};

        if (options.order) return '/account/~/order';

        return '/account/~' +
               (options.extensionId ? '/extension/' + options.extensionId : '') +
               '/device' +
               (id ? '/' + id : '');

    }

    /**
     * @param {IDevice} item
     */
    validate(item:IDevice) {

        return validator.validate([
            {
                field: 'emergencyServiceAddress-street',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.street)
            },
            {
                field: 'emergencyServiceAddress-city',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.city)
            },
            {
                field: 'emergencyServiceAddress-state',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.state)
            },
            {
                field: 'emergencyServiceAddress-country',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.country)
            },
            {
                field: 'emergencyServiceAddress-zip',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.zip)
            },
            {
                field: 'emergencyServiceAddress-customerName',
                validator: validator.required(item && item.emergencyServiceAddress && item.emergencyServiceAddress.customerName)
            },
            {field: 'extension', validator: validator.required(extension.extension.getId(item && item.extension))},
            {field: 'model', validator: validator.required(deviceModel.deviceModel.getId(item && item.model))}
        ]);

    }

}

export var device = new Device();

export interface IContactGroup extends helper.IHelperObject {
    notes?:string;
    groupName?:string;
    contactsCount?:number;
}

export interface IDevice extends helper.IHelperObject {
    type?:string;
    name?:string;
    serial?:string;
    model?:deviceModel.IDeviceModel;
    extension?:extension.IExtensionShort; //TODO IExtension?
    emergencyServiceAddress?:IDeviceAddress;
    shipping?:IDeviceShipping;
    phoneLines?:IDevicePhoneLine[];
}

export interface IDeviceOrder {
    devices?:IDevice[];
}

export interface IDeviceAddress {
    street?:string;
    street2?:string;
    city?:string;
    state?:string;
    country?:string;
    zip?:string;
    customerName?:string;
}

export interface IDeviceShipping {
    address?:IDeviceAddress;
    method?:shippingMethod.IShippingMethod;
    status?:string;
}

export interface IDevicePhoneLine {
    lineType?:string;
    phoneInfo?:phoneNumber.IPhoneNumber;
}

export interface IDeviceOptions {
    extensionId?:string;
    order?:boolean;
}