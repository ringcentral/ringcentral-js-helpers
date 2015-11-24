/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as validator from '../core/Validator';
import * as call from './Call';

export class Ringout extends helper.Helper {

    createUrl(options?:{extensionId?:string}, id?:string) {

        options = options || {};

        return '/account/~/extension/' + (options.extensionId || '~') + '/ringout' + (id ? '/' + id : '');

    }

    resetAsNew(object:IRingout) {
        object = super.resetAsNew(object);
        if (object) {
            delete object.status;
        }
        return object;
    }

    isInProgress(ringout:IRingout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'InProgress';
    }

    isSuccess(ringout:IRingout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'Success';
    }

    isError(ringout:IRingout) {
        return !this.isNew(ringout) && !this.isInProgress(ringout) && !this.isSuccess(ringout);
    }

    validate(item:IRingout) {

        return validator.validate([
            {field: 'to', validator: validator.required(item && item.to && item.to.phoneNumber)},
            {field: 'from', validator: validator.required(item && item.from && item.from.phoneNumber)}
        ]);

    }

}

export var ringout = new Ringout();

export interface IRingout extends helper.IHelperObject {
    from?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    to?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    callerId?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    playPrompt?:boolean;
    status?:{
        callStatus?:string;
        callerStatus?:string;
        calleeStatus?:string
    };
}