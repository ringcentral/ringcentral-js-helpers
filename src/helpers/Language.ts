/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';

export class Language extends helper.Helper {

    createUrl(options?:any, id?:string) {

        return '/dictionary/language';

    }

}

export var language = new Language();

export interface ILanguage extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    localeCode?:string;
}
