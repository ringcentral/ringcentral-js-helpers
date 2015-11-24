/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class Country extends helper.Helper {

    createUrl(options?:any, id?:string) {
        return '/dictionary/country';
    }

}

export var country = new Country();

export interface ICountry extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    callingCode?:string;
}