/// <reference path="../externals.d.ts" />

import * as utils from './Utils';

export function validate(validators:IValidator[]):IValidatorResult {

    var result = <IValidatorResult>{
        errors: {},
        isValid: true
    };

    result.errors = <any>validators.reduce((errors, validator) => {

        var res = validator.validator();

        if (res.length > 0) {
            result.isValid = false;
            errors[validator.field] = errors[validator.field] || [];
            errors[validator.field] = errors[validator.field].concat(res);
        }

        return errors;

    }, {});

    return result;

}

/**
 * It is not recommended to have any kinds of complex validators at front end
 * @deprecated
 */
export function email(value:string, multiple?:boolean) {
    return ():Error[] => {
        if (!value) return [];
        return utils.isEmail(value, multiple) ? [] : [new Error('Value has to be a valid email')];
    };
}

/**
 * It is not recommended to have any kinds of complex validators at front end
 * TODO International phone numbers
 * @deprecated
 */
export function phone(value:string) {
    return ():Error[] => {
        if (!value) return [];
        return utils.isPhoneNumber(value) ? [] : [new Error('Value has to be a valid US phone number')];
    };
}

export function required(value:any) {
    return ():Error[] => {
        return !value ? [new Error('Field is required')] : [];
    };
}

export function length(value:string, max?:number, min?:number) {
    return ():Error[] => {

        var errors = [];

        if (!value) return errors;

        value = value.toString();

        if (min && value.length < min) errors.push(new Error('Minimum length of ' + min + ' characters is required'));
        if (max && value.length > max) errors.push(new Error('Maximum length of ' + max + ' characters is required'));

        return errors;

    };
}

export interface IValidator {
    field:string;
    validator:(...args)=>Error[];
}

export interface IValidatorErrors {
    [id:string]: Error[];
}

export interface IValidatorResult {
    isValid:boolean;
    errors:IValidatorErrors;
}