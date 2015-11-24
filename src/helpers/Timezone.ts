/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class Timezone extends helper.Helper {

    createUrl() {
        return '/dictionary/timezone';
    }

}

export var timezone = new Timezone();

export interface ITimezone extends helper.IHelperObject {
    name?:string;
    description?:string;
}