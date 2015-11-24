/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as list from '../core/List';
import * as utils from '../core/Utils';
import * as validator from '../core/Validator';
import * as state from './State';

export class Location extends helper.Helper {

    createUrl() {
        return '/dictionary/location';
    }

    filter(options?:ILocationFilterOptions) {

        var uniqueNPAs = [];

        options = utils.extend({
            stateId: '',
            onlyUniqueNPA: false
        }, options);

        return list.filter([
            {
                condition: options.stateId,
                filterFn: (item:ILocation, opts) => {
                    return (state.state.getId(item.state) == opts.condition);
                }
            },
            {
                condition: options.onlyUniqueNPA,
                filterFn: (item:ILocation, opts) => {
                    if (uniqueNPAs.indexOf(item.npa) == -1) {
                        uniqueNPAs.push(item.npa);
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        ]);

    }

    comparator(options?:list.IListComparatorOptions) {

        options = utils.extend({
            sortBy: 'npa'
        }, options);

        if (options.sortBy == 'nxx') {

            options.extractFn = (item:ILocation) => {
                return (parseInt(item.npa) * 1000000) + parseInt(item.nxx);
            };

            options.compareFn = list.numberComparator;

        }

        return list.comparator(options);

    }

}

export var location = new Location();

export interface ILocation extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    npa?:string;
    nxx?:string;
    state?:state.IState;
}

export interface ILocationFilterOptions {
    stateId?:string;
    onlyUniqueNPA?:boolean;
}
