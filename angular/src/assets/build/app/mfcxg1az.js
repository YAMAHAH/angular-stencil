/*! Built with http://stenciljs.com */
const{h,Context}=window.App;class AsyncContent{ionViewWillLoad(){return this.fetchNewContent()}fetchNewContent(){return fetch(this.documentLocation).then(t=>t.text()).then(t=>{this.content=t})}render(){return h("div",{innerHTML:this.content})}static get is(){return"stencil-async-content"}static get properties(){return{content:{state:!0},doc:{watchCallbacks:["fetchNewContent"]},documentLocation:{type:String}}}}var isarray=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},pathToRegexp_1=pathToRegexp,parse_1=parse,compile_1=compile,tokensToFunction_1=tokensToFunction,tokensToRegExp_1=tokensToRegExp,PATH_REGEXP=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function parse(t,e){for(var n,o=[],r=0,i=0,a="",s=e&&e.delimiter||"/";null!=(n=PATH_REGEXP.exec(t));){var c=n[0],h=n[1],u=n.index;if(a+=t.slice(i,u),i=u+c.length,h)a+=h[1];else{var l=t[i],p=n[2],g=n[3],d=n[4],f=n[5],m=n[6],y=n[7];a&&(o.push(a),a="");var v=null!=p&&null!=l&&l!==p,R="+"===m||"*"===m,w="?"===m||"*"===m,x=n[2]||s,b=d||f;o.push({name:g||r++,prefix:p||"",delimiter:x,optional:w,repeat:R,partial:v,asterisk:!!y,pattern:b?escapeGroup(b):y?".*":"[^"+escapeString(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&o.push(a),o}function compile(t,e){return tokensToFunction(parse(t,e))}function encodeURIComponentPretty(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function encodeAsterisk(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function tokensToFunction(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,o){for(var r="",i=n||{},a=(o||{}).pretty?encodeURIComponentPretty:encodeURIComponent,s=0;s<t.length;s++){var c=t[s];if("string"!=typeof c){var h,u=i[c.name];if(null==u){if(c.optional){c.partial&&(r+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(isarray(u)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(u)+"`");if(0===u.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var l=0;l<u.length;l++){if(h=a(u[l]),!e[s].test(h))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(h)+"`");r+=(0===l?c.prefix:c.delimiter)+h}}else{if(h=c.asterisk?encodeAsterisk(u):a(u),!e[s].test(h))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+h+'"');r+=c.prefix+h}}else r+=c}return r}}function escapeString(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function escapeGroup(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function attachKeys(t,e){return t.keys=e,t}function flags(t){return t.sensitive?"":"i"}function regexpToRegexp(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var o=0;o<n.length;o++)e.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return attachKeys(t,e)}function arrayToRegexp(t,e,n){for(var o=[],r=0;r<t.length;r++)o.push(pathToRegexp(t[r],e,n).source);return attachKeys(new RegExp("(?:"+o.join("|")+")",flags(n)),e)}function stringToRegexp(t,e,n){return tokensToRegExp(parse(t,n),e,n)}function tokensToRegExp(t,e,n){isarray(e)||(n=e||n,e=[]);for(var o=(n=n||{}).strict,r=!1!==n.end,i="",a=0;a<t.length;a++){var s=t[a];if("string"==typeof s)i+=escapeString(s);else{var c=escapeString(s.prefix),h="(?:"+s.pattern+")";e.push(s),s.repeat&&(h+="(?:"+c+h+")*"),i+=h=s.optional?s.partial?c+"("+h+")?":"(?:"+c+"("+h+"))?":c+"("+h+")"}}var u=escapeString(n.delimiter||"/"),l=i.slice(-u.length)===u;return o||(i=(l?i.slice(0,-u.length):i)+"(?:"+u+"(?=$))?"),i+=r?"$":o&&l?"":"(?="+u+"|$)",attachKeys(new RegExp("^"+i,flags(n)),e)}function pathToRegexp(t,e,n){return isarray(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?regexpToRegexp(t,e):isarray(t)?arrayToRegexp(t,e,n):stringToRegexp(t,e,n)}pathToRegexp_1.parse=parse_1,pathToRegexp_1.compile=compile_1,pathToRegexp_1.tokensToFunction=tokensToFunction_1,pathToRegexp_1.tokensToRegExp=tokensToRegExp_1;const patternCache={},cacheLimit=1e4;let cacheCount=0;function compilePath(t,e){const n=`${e.end}${e.strict}`,o=patternCache[n]||(patternCache[n]={}),r=JSON.stringify(t);if(o[r])return o[r];const i=[],a={re:pathToRegexp_1(t,i,e),keys:i};return cacheCount<cacheLimit&&(o[r]=a,cacheCount+=1),a}function matchPath(t,e={}){"string"==typeof e&&(e={path:e});const{path:n="/",exact:o=!1,strict:r=!1}=e,{re:i,keys:a}=compilePath(n,{end:o,strict:r}),s=i.exec(t);if(!s)return null;const[c,...h]=s,u=t===c;return o&&!u?null:{path:n,url:"/"===n&&""===c?"/":c,isExact:u,params:a.reduce((t,e,n)=>(t[e.name]=h[n],t),{})}}class Route{constructor(){this.unsubscribe=(()=>{}),this.componentProps={},this.exact=!1,this.group=null,this.routeRender=null,this.match=null}computeMatch(t){t||(t=this.activeRouter.get("location").pathname);const e=matchPath(t,{path:this.url,exact:this.exact,strict:!0});if(e){if(this.group&&this.activeRouter.didGroupAlreadyMatch(this.group))return null;this.group&&this.activeRouter.setGroupMatched(this.group)}return e}componentWillLoad(){this.group&&this.activeRouter.addToGroup(this,this.group),this.unsubscribe=this.activeRouter.subscribe(()=>{this.match=this.computeMatch()}),this.match=this.computeMatch()}componentDidUnload(){this.activeRouter.removeFromGroups(this),this.unsubscribe()}render(){if(!this.activeRouter||!this.match)return null;const t=Object.assign({},this.componentProps,{history:this.activeRouter.get("history"),match:this.match});if(this.routeRender)return this.routeRender(Object.assign({},t,{component:this.component}));if(this.component){const e=this.component;return h(e,Object.assign({},t))}}static get is(){return"stencil-route"}static get properties(){return{activeRouter:{context:"activeRouter"},component:{type:String},componentProps:{type:"Any"},exact:{type:Boolean},group:{type:String},location:{context:"location"},match:{state:!0},routeRender:{type:"Any"},url:{type:"Any"}}}}class RouteLink{constructor(){this.unsubscribe=(()=>{}),this.exact=!1,this.custom=!1,this.activeClass="link-active",this.match=null}computeMatch(t){t||(t=this.activeRouter.get("location").pathname);return matchPath(t,{path:this.urlMatch||this.url,exact:this.exact,strict:!0})}componentWillLoad(){this.unsubscribe=this.activeRouter.subscribe(()=>{this.match=this.computeMatch()}),this.match=this.computeMatch()}componentDidUnload(){this.unsubscribe()}handleClick(t){if(t.preventDefault(),!this.activeRouter)return void console.warn('<stencil-route-link> wasn\'t passed an instance of the router as the "router" prop!');return this.activeRouter.get("history").push(this.getUrl(this.url),{})}getUrl(t){const e=this.activeRouter.get("root")||"/";return"/"==t.charAt(0)&&"/"==e.charAt(e.length-1)?e.slice(0,e.length-1)+t:e+t}render(){const t={[this.activeClass]:null!==this.match};return this.custom?h("span",{class:t,onClick:this.handleClick.bind(this)},h("slot",null)):h("a",{class:t,href:this.url,onClick:this.handleClick.bind(this)},h("slot",null))}static get is(){return"stencil-route-link"}static get properties(){return{activeClass:{type:String},activeRouter:{context:"activeRouter"},custom:{type:Boolean},exact:{type:Boolean},location:{context:"location"},match:{state:!0},url:{type:String},urlMatch:{type:"Any"}}}}class RouteTitle{componentWillLoad(){const t=this.activeRouter&&this.activeRouter.get("titleSuffix")||"";document.title=`${this.title}${t}`}render(){return null}static get is(){return"stencil-route-title"}static get properties(){return{activeRouter:{context:"activeRouter"},title:{type:String}}}}function hasBasename(t,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(t)}function stripBasename(t,e){return hasBasename(t,e)?t.substr(e.length):t}function stripTrailingSlash(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function addLeadingSlash(t){return"/"===t.charAt(0)?t:"/"+t}function parsePath(t){let e=t||"/",n="",o="";const r=e.indexOf("#");-1!==r&&(o=e.substr(r),e=e.substr(0,r));const i=e.indexOf("?");return-1!==i&&(n=e.substr(i),e=e.substr(0,i)),{pathname:e,search:"?"===n?"":n,hash:"#"===o?"":o}}function createPath(t){const{pathname:e,search:n,hash:o}=t;let r=e||"/";return n&&"?"!==n&&(r+="?"===n.charAt(0)?n:`?${n}`),o&&"#"!==o&&(r+="#"===o.charAt(0)?o:`#${o}`),r}function parseQueryString(t){return t?(/^[?#]/.test(t)?t.slice(1):t).split("&").reduce((t,e)=>{let[n,o]=e.split("=");return t[n]=o?decodeURIComponent(o.replace(/\+/g," ")):"",t},{}):{}}function isAbsolute(t){return"/"===t.charAt(0)}function spliceOne(t,e){for(let n=e,o=n+1,r=t.length;o<r;n+=1,o+=1)t[n]=t[o];t.pop()}function resolvePathname(t,e=""){const n=t&&t.split("/")||[];let o=e&&e.split("/")||[];const r=t&&isAbsolute(t),i=e&&isAbsolute(e),a=r||i;if(t&&isAbsolute(t)?o=n:n.length&&(o.pop(),o=o.concat(n)),!o.length)return"/";let s;if(o.length){const t=o[o.length-1];s="."===t||".."===t||""===t}else s=!1;let c=0;for(let t=o.length;t>=0;t--){const e=o[t];"."===e?spliceOne(o,t):".."===e?(spliceOne(o,t),c++):c&&(spliceOne(o,t),c--)}if(!a)for(;c--;c)o.unshift("..");!a||""===o[0]||o[0]&&isAbsolute(o[0])||o.unshift("");let h=o.join("/");return s&&"/"!==h.substr(-1)&&(h+="/"),h}function createLocation(t,e,n,o){let r;"string"==typeof t?(r=parsePath(t)).state=e:(void 0===(r=Object.assign({},t)).pathname&&(r.pathname=""),r.search?"?"!==r.search.charAt(0)&&(r.search="?"+r.search):r.search="",r.hash?"#"!==r.hash.charAt(0)&&(r.hash="#"+r.hash):r.hash="",void 0!==e&&void 0===r.state&&(r.state=e));try{r.pathname=decodeURI(r.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+r.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return n&&(r.key=n),o?r.pathname?"/"!==r.pathname.charAt(0)&&(r.pathname=resolvePathname(r.pathname,o.pathname)):r.pathname=o.pathname:r.pathname||(r.pathname="/"),r.query=parseQueryString(r.search),r}function invariant(t,...e){t||console.error(...e)}function warning(t,...e){t||console.warn(...e)}const createTransitionManager=()=>{let t=null;let e=[];return{setPrompt:e=>(warning(null==t,"A history supports only one prompt at a time"),t=e,()=>{t===e&&(t=null)}),confirmTransitionTo:(e,n,o,r)=>{if(null!=t){const i="function"==typeof t?t(e,n):t;"string"==typeof i?"function"==typeof o?o(i,r):(warning(!1,"A history needs a getUserConfirmation function in order to use a prompt message"),r(!0)):r(!1!==i)}else r(!0)},appendListener:t=>{let n=!0;const o=(...e)=>{n&&t(...e)};return e.push(o),()=>{n=!1,e=e.filter(t=>t!==o)}},notifyListeners:(...t)=>{e.forEach(e=>e(...t))}}},canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement),addEventListener=(t,e,n)=>t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n),removeEventListener=(t,e,n)=>t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent("on"+e,n),getConfirmation=(t,e)=>e(window.confirm(t)),supportsHistory=()=>{const t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"pushState"in window.history)},supportsPopStateOnHashChange=()=>-1===window.navigator.userAgent.indexOf("Trident"),isExtraneousPopstateEvent=t=>void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS"),PopStateEvent="popstate",HashChangeEvent="hashchange",getHistoryState=()=>{try{return window.history.state||{}}catch(t){return{}}},createBrowserHistory=(t={})=>{invariant(canUseDOM,"Browser history needs a DOM");const e=window.history,n=supportsHistory(),o=!supportsPopStateOnHashChange(),{forceRefresh:r=!1,getUserConfirmation:i=getConfirmation,keyLength:a=6}=t,s=t.basename?stripTrailingSlash(addLeadingSlash(t.basename)):"",c=t=>{t=t||{};const{key:e,state:n}=t,{pathname:o,search:r,hash:i}=window.location;let a=o+r+i;return warning(!s||hasBasename(a,s),'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "'+a+'" to begin with "'+s+'".'),s&&(a=stripBasename(a,s)),createLocation(a,n,e)},h=()=>Math.random().toString(36).substr(2,a),u=createTransitionManager(),l=t=>{Object.assign(T,t),T.length=e.length,u.notifyListeners(T.location,T.action)},p=t=>{isExtraneousPopstateEvent(t)||f(c(t.state))},g=()=>{f(c(getHistoryState()))};let d=!1;const f=t=>{if(d)d=!1,l();else{const e="POP";u.confirmTransitionTo(t,e,i,n=>{n?l({action:e,location:t}):m(t)})}},m=t=>{const e=T.location;let n=v.indexOf(e.key);-1===n&&(n=0);let o=v.indexOf(t.key);-1===o&&(o=0);const r=n-o;r&&(d=!0,w(r))},y=c(getHistoryState());let v=[y.key];const R=t=>s+createPath(t),w=t=>{e.go(t)};let x=0;const b=t=>{1===(x+=t)?(addEventListener(window,"popstate",p),o&&addEventListener(window,"hashchange",g)):0===x&&(removeEventListener(window,"popstate",p),o&&removeEventListener(window,"hashchange",g))};let E=!1;const T={length:e.length,action:"POP",location:y,createHref:R,push:(t,o)=>{warning(!("object"==typeof t&&void 0!==t.state&&void 0!==o),"You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");const a=createLocation(t,o,h(),T.location);u.confirmTransitionTo(a,"PUSH",i,t=>{if(!t)return;const o=R(a),{key:i,state:s}=a;if(n)if(e.pushState({key:i,state:s},null,o),r)window.location.href=o;else{const t=v.indexOf(T.location.key),e=v.slice(0,-1===t?0:t+1);e.push(a.key),v=e,l({action:"PUSH",location:a})}else warning(void 0===s,"Browser history cannot push state in browsers that do not support HTML5 history"),window.location.href=o})},replace:(t,o)=>{warning(!("object"==typeof t&&void 0!==t.state&&void 0!==o),"You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");const a=createLocation(t,o,h(),T.location);u.confirmTransitionTo(a,"REPLACE",i,t=>{if(!t)return;const o=R(a),{key:i,state:s}=a;if(n)if(e.replaceState({key:i,state:s},null,o),r)window.location.replace(o);else{const t=v.indexOf(T.location.key);-1!==t&&(v[t]=a.key),l({action:"REPLACE",location:a})}else warning(void 0===s,"Browser history cannot replace state in browsers that do not support HTML5 history"),window.location.replace(o)})},go:w,goBack:()=>w(-1),goForward:()=>w(1),block:(t="")=>{const e=u.setPrompt(t);return E||(b(1),E=!0),()=>(E&&(E=!1,b(-1)),e())},listen:t=>{const e=u.appendListener(t);return b(1),()=>{b(-1),e()}}};return T};class Router{constructor(){this.root="/",this.titleSuffix="",this.unsubscribe=(()=>{}),this.match=null}titleSuffixChanged(t){this.activeRouter.set({titleSuffix:t})}computeMatch(t){return{path:this.root,url:this.root,isExact:t===this.root,params:{}}}componentWillLoad(){const t=createBrowserHistory();t.listen(t=>{this.activeRouter.set({location:this.getLocation(t)})}),this.activeRouter.set({location:this.getLocation(t.location),titleSuffix:this.titleSuffix,root:this.root,history:t}),this.unsubscribe=this.activeRouter.subscribe(()=>{this.match=this.computeMatch()}),this.match=this.computeMatch()}getLocation(t){const e=0==t.pathname.indexOf(this.root)?"/"+t.pathname.slice(this.root.length):t.pathname;return Object.assign({},t,{pathname:e})}componentDidUnload(){this.unsubscribe()}render(){return h("slot",null)}static get is(){return"stencil-router"}static get properties(){return{activeRouter:{context:"activeRouter"},match:{state:!0},root:{type:String},titleSuffix:{type:String,watchCallbacks:["titleSuffixChanged"]}}}}class Redirect{componentWillLoad(){const t=this.activeRouter.get("history");if(t)return t.replace(this.getUrl(this.url),{})}getUrl(t){const e=this.activeRouter.get("root")||"/";return"/"==t.charAt(0)&&"/"==e.charAt(e.length-1)?e.slice(0,e.length-1)+t:e+t}static get is(){return"stencil-router-redirect"}static get properties(){return{activeRouter:{context:"activeRouter"},url:{type:String}}}}export{AsyncContent as StencilAsyncContent,Route as StencilRoute,RouteLink as StencilRouteLink,RouteTitle as StencilRouteTitle,Router as StencilRouter,Redirect as StencilRouterRedirect};