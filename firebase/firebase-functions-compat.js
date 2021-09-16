!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,function(D,P){"use strict";try{!function(){function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=e(D),r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};var i,o="FirebaseError",s=(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(a,i=Error),a);function a(e,t,n){t=i.call(this,t)||this;return t.code=e,t.customData=n,t.name=o,Object.setPrototypeOf(t,a.prototype),Error.captureStackTrace&&Error.captureStackTrace(t,u.prototype.create),t}var u=(n.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r,i=t[0]||{},o=this.service+"/"+e,e=this.errors[e],e=e?(r=i,e.replace(c,function(e,t){var n=r[t];return null!=n?String(n):"<"+t+"?>"})):"Error",e=this.serviceName+": "+e+" ("+o+").";return new s(o,e,i)},n);function n(e,t,n){this.service=e,this.serviceName=t,this.errors=n}var c=/\{\$([^}]+)}/g;function l(e){return e&&e._delegate?e._delegate:e}var p=(h.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},h.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},h.prototype.setServiceProps=function(e){return this.serviceProps=e,this},h.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},h);function h(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}const f="type.googleapis.com/google.protobuf.Int64Value",d="type.googleapis.com/google.protobuf.UInt64Value";function g(e,t){const n={};for(const r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}function m(e){if(null==e)return e;if(e["@type"])switch(e["@type"]){case f:case d:var t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(e=>m(e)):"function"==typeof e||"object"==typeof e?g(e,e=>m(e)):e}const y="functions",v={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class w extends s{constructor(e,t,n){super(`${y}/${e}`,t||""),this.details=n}}function b(e,t){let n=function(e){if(200<=e&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(e),r=n,i=void 0;try{var o=t&&t.error;if(o){const e=o.status;if("string"==typeof e){if(!v[e])return new w("internal","internal");n=v[e],r=e}var s=o.message;"string"==typeof s&&(r=s),i=o.details,void 0!==i&&(i=m(i))}}catch(e){}return"ok"===n?null:new w(n,r,i)}class E{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(e=>this.auth=e,()=>{}),this.messaging||t.get().then(e=>this.messaging=e,()=>{}),this.appCheck||n.get().then(e=>this.appCheck=e,()=>{})}async getAuthToken(){if(this.auth)try{var e=await this.auth.getToken();return null==e?void 0:e.accessToken}catch(e){return}}async getMessagingToken(){if(this.messaging&&"Notification"in self&&"granted"===Notification.permission)try{return await this.messaging.getToken()}catch(e){return}}async getAppCheckToken(){if(this.appCheck){var e=await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(){return{authToken:await this.getAuthToken(),messagingToken:await this.getMessagingToken(),appCheckToken:await this.getAppCheckToken()}}}const I="us-central1";class T{constructor(e,t,n,r,i=I,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new E(t,n,r),this.cancelAllRequests=new Promise(e=>{this.deleteService=()=>Promise.resolve(e())});try{var s=new URL(i);this.customDomain=s.origin,this.region=I}catch(e){this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){var t=this.app.options.projectId;return null===this.emulatorOrigin?null!==this.customDomain?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`:`${this.emulatorOrigin}/${t}/${this.region}/${e}`}}function k(t,n,r){return e=>async function(e,t,n,r){const i=e._url(t),o={data:n=function t(e){if(null==e)return null;if("number"==typeof(e=e instanceof Number?e.valueOf():e)&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(e=>t(e));if("function"==typeof e||"object"==typeof e)return g(e,e=>t(e));throw new Error("Data cannot be encoded in JSON: "+e)}(n)},s={},a=await e.contextProvider.getContext();a.authToken&&(s.Authorization="Bearer "+a.authToken);a.messagingToken&&(s["Firebase-Instance-ID-Token"]=a.messagingToken);null!==a.appCheckToken&&(s["X-Firebase-AppCheck"]=a.appCheckToken);r=r.timeout||7e4,r=await Promise.race([async function(e,t,n,r){n["Content-Type"]="application/json";let i;try{i=await r(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch(e){return{status:0,json:null}}let o=null;try{o=await i.json()}catch(e){}return{status:i.status,json:o}}(i,o,s,e.fetchImpl),function(n){return new Promise((e,t)=>{setTimeout(()=>{t(new w("deadline-exceeded","deadline-exceeded"))},n)})}(r),e.cancelAllRequests]);if(!r)throw new w("cancelled","Firebase Functions instance was deleted.");e=b(r.status,r.json);if(e)throw e;if(!r.json)throw new w("internal","Response is not valid JSON object.");let u=r.json.data;void 0===u&&(u=r.json.result);if(void 0===u)throw new w("internal","Response is missing data field.");r=m(u);return{data:r}}(t,n,e,r||{})}var N;function A(e,t,n){l(e).emulatorOrigin=`http://${t}:${n}`}N=fetch.bind(self),P._registerComponent(new p(y,(e,{instanceIdentifier:t})=>{var n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("messaging-internal"),e=e.getProvider("app-check-internal");return new T(n,r,i,e,t,N)},"PUBLIC").setMultipleInstances(!0)),P.registerVersion("@firebase/functions","0.7.1");var O;class _{constructor(e,t){this.app=e,this._delegate=t,this._region=this._delegate.region,this._customDomain=this._delegate.customDomain}httpsCallable(e,t){return k(l(this._delegate),e,t)}useFunctionsEmulator(e){e=e.match("[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?");if(null==e)throw new s("functions","No origin provided to useFunctionsEmulator()");if(null==e[2])throw new s("functions","Port missing in origin provided to useFunctionsEmulator()");return A(this._delegate,e[1],Number(e[2]))}useEmulator(e,t){return A(this._delegate,e,t)}}const C=(e,{instanceIdentifier:t})=>{var n=e.getProvider("app-compat").getImmediate(),t=e.getProvider("functions").getImmediate({identifier:null!=t?t:"us-central1"});return new _(n,t)};O={Functions:_},t.default.INTERNAL.registerComponent(new p("functions-compat",C,"PUBLIC").setServiceProps(O).setMultipleInstances(!0)),t.default.registerVersion("@firebase/functions-compat","0.1.2")}.apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-functions-compat.js - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-functions-compat.js.map