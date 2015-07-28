/// <reference path="../../externals.d.ts" />

import validator = require('../core/Validator');
import helper = require('../core/Helper');
import list = require('../core/List');
import country = require('./Country');

export class State extends helper.Helper {

    private country:country.Country;

    constructor(sdk, validator:validator.Validator, list:list.List, country:country.Country) {

        super(sdk, validator, list);

        this.country = country;

    }

    createUrl() {
        return '/dictionary/state';
    }

    filter(options?:IStateOptions) {

        options = this.utils.extend({
            countryId: ''
        }, options);

        return this.list.filter([
            {
                condition: options.countryId,
                filterFn: (item:IState, opts) => {
                    return (this.country.getId(item.country) == opts.condition);
                }
            }
        ]);

    }

}

export interface IState extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    country?:country.ICountry;
}

export interface IStateOptions {
    countryId?:string;
}