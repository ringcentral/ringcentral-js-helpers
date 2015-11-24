/// <reference path="./externals.d.ts" />
import * as validator from './core/Validator';
import * as list from './core/List';
import * as utils from './core/Utils';

import * as accountHelper from './helpers/Account';
import * as blockedNumberHelper from './helpers/BlockedNumber';
import * as callHelper from './helpers/Call';
import * as contactHelper from './helpers/Contact';
import * as contactGroupHelper from './helpers/ContactGroup';
import * as conferencingHelper from './helpers/Conferencing';
import * as countryHelper from './helpers/Country';
import * as deviceHelper from './helpers/Device';
import * as deviceModelHelper from './helpers/DeviceModel';
import * as extensionHelper from './helpers/Extension';
import * as forwardingNumberHelper from './helpers/ForwardingNumber';
import * as languageHelper from './helpers/Language';
import * as locationHelper from './helpers/Location';
import * as messageHelper from './helpers/Message';
import * as phoneNumberHelper from './helpers/PhoneNumber';
import * as presenceHelper from './helpers/Presence';
import * as ringoutHelper from './helpers/Ringout';
import * as serviceHelper from './helpers/Service';
import * as shippingMethodHelper from './helpers/ShippingMethod';
import * as stateHelper from './helpers/State';
import * as timezoneHelper from './helpers/Timezone';

export var version = '0.1.0';

export function country() { return countryHelper.country; }

export function deviceModel() { return deviceModelHelper.deviceModel; }

export function language() { return languageHelper.language; }

export function location() { return locationHelper.location; }

export function shippingMethod() { return shippingMethodHelper.shippingMethod; }

export function state() { return stateHelper.state; }

export function timezone() { return timezoneHelper.timezone; }

export function account() { return accountHelper.account; }

export function blockedNumber() { return blockedNumberHelper.blockedNumber; }

export function call() { return callHelper.call; }

export function conferencing() { return conferencingHelper.conferencing; }

export function contact() { return contactHelper.contact; }

export function contactGroup() { return contactGroupHelper.contactGroup; }

export function device() { return deviceHelper.device; }

export function extension() { return extensionHelper.extension; }

export function forwardingNumber() { return forwardingNumberHelper.forwardingNumber; }

export function message() { return messageHelper.message; }

export function phoneNumber() { return phoneNumberHelper.phoneNumber; }

export function presence() { return presenceHelper.presence; }

export function ringout() { return ringoutHelper.ringout; }

export function service() { return serviceHelper.service; }