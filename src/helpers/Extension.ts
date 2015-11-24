/// <reference path="../externals.d.ts" />

import * as helper from '../core/Helper';
import * as list from '../core/List';
import * as utils from '../core/Utils';
import * as validator from '../core/Validator';
import * as contact from './Contact';
import * as service from './Service';
import * as country from './Country';
import * as timezone from './Timezone';
import * as language from './Language';
import * as presence from './Presence';

export class Extension extends helper.Helper {

    type = {
        department: 'Department',
        user: 'User',
        announcement: 'Announcement',
        voicemail: 'Voicemail'
    };

    createUrl(options?:IExtensionOptions, id?:string) {

        options = options || {};

        return '/account/~' +
               (options.departmentId ? '/department/' + options.departmentId + '/members' : '/extension') +
               (id ? '/' + id : '');

    }

    isUser(extension?:IExtension) {
        return extension && extension.type == this.type.user;
    }

    isDepartment(extension?:IExtension) {
        return extension && extension.type == this.type.department;
    }

    isAnnouncement(extension?:IExtension) {
        return extension && extension.type == this.type.announcement;
    }

    isVoicemail(extension?:IExtension) {
        return extension && extension.type == this.type.voicemail;
    }

    comparator(options?:list.IListComparatorOptions) {

        return list.comparator(utils.extend({
            sortBy: 'extensionNumber',
            compareFn: list.numberComparator
        }, options));

    }

    filter(options?:IExtensionFilterOptions) {

        options = utils.extend({
            search: '',
            type: ''
        }, options);

        return list.filter([
            {filterBy: 'type', condition: options.type},
            {
                condition: options.search.toLocaleLowerCase(),
                filterFn: list.containsFilter,
                extractFn: (item) => {
                    return (item.name && (item.name.toLocaleLowerCase() + ' ')) +
                           (item.extensionNumber && item.extensionNumber.toString().toLocaleLowerCase());
                }
            }
        ]);

    }

}

export var extension = new Extension();

export interface IExtensionOptions {
    departmentId?:string;
}

export interface IExtensionFilterOptions {
    search?:string;
    type?:string;
}

export interface IExtensionRegionalSettings {
    timezone?:timezone.ITimezone;
    language?:language.ILanguage;
    homeCountry?:country.ICountry;
}

/**
 * @see http://platform-dev.dins.ru/artifacts/documentation/latest/webhelp/dev_guide_advanced/ch18s04.html#ShortExtensionInfo
 */
export interface IExtensionShort extends helper.IHelperObject {
    extensionNumber?:string;
}

/**
 * @see http://platform-dev.dins.ru/artifacts/documentation/latest/webhelp/dev_guide_advanced/ch18s04.html#ExtensionInfo
 */
export interface IExtension extends helper.IHelperObject {
    extensionNumber?:string;
    name?:string;
    type?:string;
    status?:string;
    setupWizardState?:string;
    contact?:contact.IContactBrief;
    regionalSettings?:IExtensionRegionalSettings;
    serviceFeatures?:service.IServiceFeature[];
    presence?:presence.IPresence; // added by helper
}