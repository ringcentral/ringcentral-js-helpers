/// <reference path="../../externals.d.ts" />

import validator = require('../core/Validator');
import list = require('../core/List');
import helper = require('../core/Helper');
import extension = require('./Extension');

export class Presence extends helper.Helper {

    private extension:extension.Extension;

    constructor(sdk, validator:validator.Validator, list:list.List, extension:extension.Extension) {

        super(sdk, validator, list);

        this.extension = extension;

    }

    createUrl(options?:IPresenceOptions, id?:string) {

        options = options || {};

        return '/account/~/extension/' + (id || '~') + '/presence' + (options.detailed ? '?detailedTelephonyState=true' : '');

    }

    getId(presence:IPresence) {
        return presence && (this.extension.getId(presence.extension) || presence.extensionId);
    }

    isAvailable(presence:IPresence) {
        return presence && presence.presenceStatus == 'Available';
    }

    getSubscription(options?:IPresenceOptions, id?:string) { //TODO Type

        return this.sdk.getSubscription().setEvents([this.createUrl(options, id)]);

    }

    updateSubscription(subscription, //TODO Type
                       presences:IPresence[],
                       options?:IPresenceOptions) {

        var events = presences.map(this.getId, this).map((id) => {
            return this.createUrl(options, id);
        }, this);

        subscription.addEvents(events);

        return subscription;

    }

    attachToExtensions(extensions:extension.IExtension[], presences:IPresence[], merge?:boolean) {

        var index = this.index(presences);

        extensions.forEach((ex:extension.IExtension) => {

            var presence = index[this.extension.getId(ex)];

            if (presence) {
                if ('presence' in ex && merge) {
                    this.utils.extend(ex.presence, presence);
                } else {
                    ex.presence = presence;
                }
            }

        }, this);

        return this;

    }

    isCallInProgress(presenceCall:IPresenceCall) {
        return (presenceCall && presenceCall.telephonyStatus != 'NoCall');
    }


}

export interface IPresence extends helper.IHelperObject {
    extension?:extension.IExtension;
    activeCalls?:IPresenceCall[];
    presenceStatus?:string; // Offline, Busy, Available
    telephonyStatus?:string; // NoCall, CallConnected, Ringing, OnHold
    userStatus?:string; // Offline, Busy, Available
    dndStatus?:string; // TakeAllCalls, DoNotAcceptAnyCalls, DoNotAcceptDepartmentCalls, TakeDepartmentCallsOnly
    allowSeeMyPresence?:boolean;
    ringOnMonitoredCall?:boolean;
    pickUpCallsOnHold?:boolean;
    extensionId?:string;
    sequence?:number;
}

export interface IPresenceCall {
    direction?:string;
    from?:string;
    to?:string;
    sessionId?:string;
    id?:string;
    telephonyStatus?:string;
}

export interface IPresenceOptions {
    detailed?:boolean;
}
