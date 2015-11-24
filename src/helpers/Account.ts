/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class Account extends helper.Helper {

    createUrl() {
        return '/account/~';
    }

}

export var account = new Account();