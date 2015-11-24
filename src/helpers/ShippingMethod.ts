/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class ShippingMethod extends helper.Helper {

    /**
     * TODO Add or describe options http://jira.ringcentral.com/browse/SDK-3 id done
     */
    createUrl() {
        return '/dictionary/shipping-options';
    }

}

export var shippingMethod = new ShippingMethod();

export interface IShippingMethodOptions {
    quantity?:number;
    servicePlanId?:number;
    brandId?:number;
}

export interface IShippingMethodInfo {
    quantity?:string;
    price?:string;
    method?:IShippingMethod;
}

/**
 * @discrepancy Methods does not have URI
 */
export interface IShippingMethod extends helper.IHelperObject {
    id?:string;
    name?:string;
}