/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as validator from '../core/Validator';

export class BlockedNumber extends helper.Helper {

    createUrl(options?:IBlockedNumberOptions, id?:string) {

        options = options || {};

        return '/account/~/extension/' +
               (options.extensionId ? options.extensionId : '~') +
               '/blocked-number' +
               (id ? '/' + id : '');

    }

    validate(item:IBlockedNumber) {

        return validator.validate([
            {field: 'phoneNumber', validator: validator.phone(item.phoneNumber)},
            {field: 'phoneNumber', validator: validator.required(item.phoneNumber)},
            {field: 'name', validator: validator.required(item.name)}
        ]);

    }

}

export var blockedNumber = new BlockedNumber();

export interface IBlockedNumber extends helper.IHelperObject {
    name:string;
    phoneNumber:string;
}

export interface IBlockedNumberOptions {
    extensionId?:string;
}
