/// <reference path="../externals.d.ts" />

declare var require:(name:string)=>any;

var RingCentral = require('ringcentral');

import validator = require('./core/Validator');
import list = require('./core/List');

import accountHelper = require('./helpers/Account');
import blockedNumberHelper = require('./helpers/BlockedNumber');
import callHelper = require('./helpers/Call');
import contactHelper = require('./helpers/Contact');
import contactGroupHelper = require('./helpers/ContactGroup');
import conferencingHelper = require('./helpers/Conferencing');
import countryHelper = require('./helpers/Country');
import deviceHelper = require('./helpers/Device');
import deviceModelHelper = require('./helpers/DeviceModel');
import extensionHelper = require('./helpers/Extension');
import forwardingNumberHelper = require('./helpers/ForwardingNumber');
import languageHelper = require('./helpers/Language');
import locationHelper = require('./helpers/Location');
import messageHelper = require('./helpers/Message');
import phoneNumberHelper = require('./helpers/PhoneNumber');
import presenceHelper = require('./helpers/Presence');
import ringoutHelper = require('./helpers/Ringout');
import serviceHelper = require('./helpers/Service');
import shippingMethodHelper = require('./helpers/ShippingMethod');
import stateHelper = require('./helpers/State');
import timezoneHelper = require('./helpers/Timezone');

class RingCentralHelpers {

    public static version = '0.1.0';

    protected sdk:any;

    protected validator:validator.Validator;
    protected list:list.List;

    protected account;
    protected blockedNumber;
    protected call;
    protected conferencing;
    protected contact;
    protected contactGroup;
    protected country;
    protected device;
    protected deviceModel;
    protected extension;
    protected forwardingNumber;
    protected language;
    protected location;
    protected message;
    protected phoneNumber;
    protected presence;
    protected ringout;
    protected service;
    protected shippingMethod;
    protected state;
    protected timezone;

    constructor(sdk) {

        this.sdk = sdk;

        this.validator = new validator.Validator(sdk);
        this.list = new list.List(sdk);

        this.account = new accountHelper.Account(sdk, this.validator, this.list);
        this.blockedNumber = new blockedNumberHelper.BlockedNumber(sdk, this.validator, this.list);
        this.conferencing = new conferencingHelper.Conferencing(sdk, this.validator, this.list);
        this.contact = new contactHelper.Contact(sdk, this.validator, this.list);
        this.contactGroup = new contactGroupHelper.ContactGroup(sdk, this.validator, this.list);
        this.country = new countryHelper.Country(sdk, this.validator, this.list);
        this.extension = new extensionHelper.Extension(sdk, this.validator, this.list);
        this.deviceModel = new deviceModelHelper.DeviceModel(sdk, this.validator, this.list);
        this.device = new deviceHelper.Device(sdk, this.validator, this.list, this.extension, this.deviceModel);
        this.presence = new presenceHelper.Presence(sdk, this.validator, this.list, this.extension);
        this.call = new callHelper.Call(sdk, this.validator, this.list, this.presence, this.contact);
        this.forwardingNumber = new forwardingNumberHelper.ForwardingNumber(sdk, this.validator, this.list);
        this.language = new languageHelper.Language(sdk, this.validator, this.list);
        this.state = new stateHelper.State(sdk, this.validator, this.list, this.country);
        this.location = new locationHelper.Location(sdk, this.validator, this.list, this.state);
        this.message = new messageHelper.Message(sdk, this.validator, this.list, this.contact);
        this.phoneNumber = new phoneNumberHelper.PhoneNumber(sdk, this.validator, this.list);
        this.ringout = new ringoutHelper.Ringout(sdk, this.validator, this.list);
        this.service = new serviceHelper.Service(sdk, this.validator, this.list);
        this.shippingMethod = new shippingMethodHelper.ShippingMethod(sdk, this.validator, this.list);
        this.timezone = new timezoneHelper.Timezone(sdk, this.validator, this.list);

    }

    getCountry() { return this.country; }

    getDeviceModel() { return this.deviceModel; }

    getLanguage() { return this.language; }

    getLocation() { return this.location; }

    getShippingMethod() { return this.shippingMethod; }

    getState() { return this.state; }

    getTimezone() { return this.timezone; }

    getAccount() { return this.account; }

    getBlockedNumber() { return this.blockedNumber; }

    getCall() { return this.call; }

    getConferencing() { return this.conferencing; }

    getContact() { return this.contact; }

    getContactGroup() { return this.contactGroup; }

    getDevice() { return this.device; }

    getExtension() { return this.extension; }

    getForwardingNumber() { return this.forwardingNumber; }

    getMessage() { return this.message; }

    getPhoneNumber() { return this.phoneNumber; }

    getPresence() { return this.presence; }

    getRingout() { return this.ringout; }

    getService() { return this.service; }

}

export = RingCentralHelpers;