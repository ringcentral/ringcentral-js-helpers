/// <reference path="../externals.d.ts" />

export import chai = require('chai');
export import sinon = require("sinon");
export import sinonChai = require('sinon-chai');
export import mocha = require('mocha');

export var expect = chai.expect;
export var spy = sinon.spy;

chai.use(sinonChai);

declare var require:(name:string)=>any;

var SDK:any = require('ringcentral');

var client = new SDK.mocks.Client();
var pubnub = new SDK.pubnub.PubnubMockFactory();

// Alter default settings
SDK.platform.Platform._refreshDelayMs = 1;
SDK.core.Queue._pollInterval = 1;
SDK.core.Queue._releaseTimeout = 50;
SDK.subscription.Subscription._pollInterval = 1;

export function getSDK() {

    var sdk = new SDK({
        server: 'http://whatever',
        appKey: 'whatever',
        appSecret: 'whatever',
        client: client,
        pubnubFactory: pubnub
    });

    sdk.platform().auth().forceAuthentication();

    return sdk;

}