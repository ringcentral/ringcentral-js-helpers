/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class Conferencing extends helper.Helper {

    createUrl() {
        return '/account/~/extension/~/conferencing';
    }

}

export var conferencing = new Conferencing();