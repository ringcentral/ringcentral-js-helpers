/// <reference path="../externals.d.ts" />

export import chai = require('chai');
export import sinon = require("sinon");
export import sinonChai = require('sinon-chai');
export import mocha = require('mocha');

export import RingCentralHelpers = require('../lib/SDK');

declare var require:(name:string)=>any;

var RingCentral:any = require('ringcentral');

export var sdk = new RingCentral({
    server: 'http://whatever',
    appKey: 'whatever',
    appSecret: 'whatever'
});

export var helpers = new RingCentralHelpers(sdk);

chai.use(sinonChai);

var platform = sdk.getPlatform();

sdk.getContext()
    .useAjaxStub(true)
    .usePubnubStub(true);

platform.forceAuthentication();
platform.pollInterval = 1;
platform.refreshDelayMs = 1;

console.log(helpers);
console.log('--------------------------------------------------');