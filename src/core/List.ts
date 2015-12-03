/// <reference path="../externals.d.ts" />

import * as utils from './Utils';

/**
 * TODO Use utils getProperty
 * @param {string} property
 * @returns {function(object)}
 */
export function propertyExtractor(property) {
    return (item, options) => {
        return property ? ((item && item[property]) || null) : item;
    };
}

/**
 * Non-string types are converted to string
 * Non-string types are extracted as an empty string if they could be converted to false
 * If no options.sortBy given the item itself is extracted
 * Compares strings:
 * - if (a is less than b) return -1;
 * - if (a is greater than b) return 1;
 * - else (a must be equal to b) return 0;
 * Exceptions in will be suppressed, if any - a is assumed to be less than b
 */
export function stringComparator(a:string, b:string, options?:IListComparatorOptions):number {

    return utils.parseString(a).localeCompare(utils.parseString(b));

}

/**
 * Non-numeric types are extracted as 0 if they could be converted to false
 * Objects that could not be converted to number are extracted as 0
 * If no options.sortBy given the item itself is extracted
 * See parseFloat for more info
 * Compares numbers:
 * - if (a is less than b) return -1;
 * - if (a is greater than b) return 1;
 * - else (a must be equal to b) return 0;
 * Function does not check types
 * Exceptions in will be suppressed, if any - a is assumed to be less than b
 */
export function numberComparator(a:any, b:any, options?:IListComparatorOptions):number {

    return (utils.parseNumber(a) - utils.parseNumber(b));

}

/**
 * Function extracts (using _extractFn_ option) values of a property (_sortBy_ option) and compares them using
 * compare function (_compareFn_ option, by default Helper.stringComparator)
 * Merged options are provided to _extractFn_ and _compareFn_
 * TODO Check memory leaks for all that options links
 */
export function comparator(options?:IListComparatorOptions):(item1:any, item2:any) => number {

    options = utils.extend({
        extractFn: propertyExtractor((options && options.sortBy) || null).bind(this),
        compareFn: stringComparator.bind(this)
    }, options);

    return (item1:any, item2:any):number => {

        return options.compareFn(options.extractFn(item1, options), options.extractFn(item2, options), options);

    };

}

export function equalsFilter(obj:any, options?:IListFilterOptions):boolean {
    return (options.condition === obj);
}

/**
 * @param {string} obj
 * @param {IListFilterOptions} options
 * @returns {boolean}
 */
export function containsFilter(obj:any, options?:IListFilterOptions):boolean {
    return (obj && obj.toString().indexOf(options.condition) > -1);
}

export function regexpFilter(obj, options?:IListFilterOptions):boolean {
    if (!(options.condition instanceof RegExp)) throw new Error('Condition must be an instance of RegExp');
    return (options.condition.test(obj));
}

/**
 * Function extracts (using `extractFn` option) values of a property (`filterBy` option) and filters them using
 * compare function (`filterFn` option, by default Helper.equalsFilter)
 * Merged options are provided to `extractFn` and `compareFn`
 * Set `filterBy` to null to force `propertyExtractor` to return object itself
 * TODO Check memory leaks for all that options links
 */
export function filter(filterConfigs:IListFilterOptions[]):(item:any) => boolean {

    var self = this;

    filterConfigs = (filterConfigs || []).map((opt) => {

        return utils.extend({
            condition: '',
            extractFn: self.propertyExtractor((opt && opt.filterBy) || null).bind(this),
            filterFn: self.equalsFilter.bind(this)
        }, opt);

    });

    return (item):boolean => {

        return <boolean>filterConfigs.reduce((pass, opt) => {

            if (!pass || !opt.condition) return pass;
            return opt.filterFn(opt.extractFn(item, opt), opt);

        }, true);

    };

}

export interface IListComparatorOptions {
    sortBy?:string;
    extractFn?:(object:any, options?:IListComparatorOptions|any)=>any;
    compareFn?:(a:any, b:any, options?:IListComparatorOptions|any)=>number;
}

export interface IListFilterOptions {
    filterBy?:string;
    condition?:any|string|RegExp;
    extractFn?:(object:any, options?:IListFilterOptions|any)=>any;
    filterFn?:(object:any, options?:IListFilterOptions|any)=>any;
}