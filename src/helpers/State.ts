/// <reference path="../externals.d.ts" />

import * as validator from '../core/Validator';
import * as helper from '../core/Helper';
import * as utils from '../core/Utils';
import * as list from '../core/List';
import * as country from './Country';

export class State extends helper.Helper {

    createUrl() {
        return '/dictionary/state';
    }

    filter(options?:IStateOptions) {

        options = utils.extend({
            countryId: ''
        }, options);

        return list.filter([
            {
                condition: options.countryId,
                filterFn: (item:IState, opts) => {
                    return (country.country.getId(item.country) == opts.condition);
                }
            }
        ]);

    }

}

export var state = new State();

export interface IState extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    country?:country.ICountry;
}

export interface IStateOptions {
    countryId?:string;
}