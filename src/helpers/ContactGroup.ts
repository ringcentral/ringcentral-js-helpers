/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as validator from '../core/Validator';

export class ContactGroup extends helper.Helper {

    createUrl(options?:any, id?:string) {
        return '/account/~/extension/~/address-book/group' + (id ? '/' + id : '');
    }

    validate(item:IContactGroup) {

        return validator.validate([
            {field: 'groupName', validator: validator.required(item && item.groupName)}
        ]);

    }

}

export interface IContactGroup extends helper.IHelperObject {
    notes?:string;
    groupName?:string;
    contactsCount?:number;
}

export var contactGroup = new ContactGroup();