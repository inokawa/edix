(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const _ of o)if(_.type==="childList")for(const l of _.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const _={};return o.integrity&&(_.integrity=o.integrity),o.referrerPolicy&&(_.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?_.credentials="include":o.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function r(o){if(o.ep)return;o.ep=!0;const _=n(o);fetch(o.href,_)}})();var re,y,Je,R,Ae,Qe,ae,Xe,de,ce,ue,K={},Ye=[],ut=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,pe=Array.isArray;function F(e,t){for(var n in t)e[n]=t[n];return e}function he(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function ft(e,t,n){var r,o,_,l={};for(_ in t)_=="key"?r=t[_]:_=="ref"?o=t[_]:l[_]=t[_];if(arguments.length>2&&(l.children=arguments.length>3?re.call(arguments,2):n),typeof e=="function"&&e.defaultProps!=null)for(_ in e.defaultProps)l[_]===void 0&&(l[_]=e.defaultProps[_]);return J(e,l,r,o,null)}function J(e,t,n,r,o){var _={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o??++Je,__i:-1,__u:0};return o==null&&y.vnode!=null&&y.vnode(_),_}function z(e){return e.children}function Q(e,t){this.props=e,this.context=t}function q(e,t){if(t==null)return e.__?q(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type=="function"?q(e):null}function et(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=e.__c.base=n.__e;break}return et(e)}}function Oe(e){(!e.__d&&(e.__d=!0)&&R.push(e)&&!ee.__r++||Ae!==y.debounceRendering)&&((Ae=y.debounceRendering)||Qe)(ee)}function ee(){var e,t,n,r,o,_,l,s;for(R.sort(ae);e=R.shift();)e.__d&&(t=R.length,r=void 0,_=(o=(n=e).__v).__e,l=[],s=[],n.__P&&((r=F({},o)).__v=o.__v+1,y.vnode&&y.vnode(r),ve(n.__P,r,o,n.__n,n.__P.namespaceURI,32&o.__u?[_]:null,l,_??q(o),!!(32&o.__u),s),r.__v=o.__v,r.__.__k[r.__i]=r,rt(l,r,s),r.__e!=_&&et(r)),R.length>t&&R.sort(ae));ee.__r=0}function tt(e,t,n,r,o,_,l,s,c,a,u){var i,d,f,g,L,b,h=r&&r.__k||Ye,v=t.length;for(c=dt(n,t,h,c),i=0;i<v;i++)(f=n.__k[i])!=null&&(d=f.__i===-1?K:h[f.__i]||K,f.__i=i,b=ve(e,f,d,o,_,l,s,c,a,u),g=f.__e,f.ref&&d.ref!=f.ref&&(d.ref&&me(d.ref,null,f),u.push(f.ref,f.__c||g,f)),L==null&&g!=null&&(L=g),4&f.__u||d.__k===f.__k?c=nt(f,c,e):typeof f.type=="function"&&b!==void 0?c=b:g&&(c=g.nextSibling),f.__u&=-7);return n.__e=L,c}function dt(e,t,n,r){var o,_,l,s,c,a=t.length,u=n.length,i=u,d=0;for(e.__k=[],o=0;o<a;o++)(_=t[o])!=null&&typeof _!="boolean"&&typeof _!="function"?(s=o+d,(_=e.__k[o]=typeof _=="string"||typeof _=="number"||typeof _=="bigint"||_.constructor==String?J(null,_,null,null,null):pe(_)?J(z,{children:_},null,null,null):_.constructor===void 0&&_.__b>0?J(_.type,_.props,_.key,_.ref?_.ref:null,_.__v):_).__=e,_.__b=e.__b+1,l=null,(c=_.__i=pt(_,n,s,i))!==-1&&(i--,(l=n[c])&&(l.__u|=2)),l==null||l.__v===null?(c==-1&&d--,typeof _.type!="function"&&(_.__u|=4)):c!==s&&(c==s-1?d--:c==s+1?d++:(c>s?d--:d++,_.__u|=4))):_=e.__k[o]=null;if(i)for(o=0;o<u;o++)(l=n[o])!=null&&!(2&l.__u)&&(l.__e==r&&(r=q(l)),_t(l,l));return r}function nt(e,t,n){var r,o;if(typeof e.type=="function"){for(r=e.__k,o=0;r&&o<r.length;o++)r[o]&&(r[o].__=e,t=nt(r[o],t,n));return t}e.__e!=t&&(t&&e.type&&!n.contains(t)&&(t=q(e)),n.insertBefore(e.__e,t||null),t=e.__e);do t=t&&t.nextSibling;while(t!=null&&t.nodeType===8);return t}function pt(e,t,n,r){var o=e.key,_=e.type,l=n-1,s=n+1,c=t[n];if(c===null||c&&o==c.key&&_===c.type&&!(2&c.__u))return n;if((typeof _!="function"||_===z||o)&&r>(c!=null&&!(2&c.__u)?1:0))for(;l>=0||s<t.length;){if(l>=0){if((c=t[l])&&!(2&c.__u)&&o==c.key&&_===c.type)return l;l--}if(s<t.length){if((c=t[s])&&!(2&c.__u)&&o==c.key&&_===c.type)return s;s++}}return-1}function Me(e,t,n){t[0]==="-"?e.setProperty(t,n??""):e[t]=n==null?"":typeof n!="number"||ut.test(t)?n:n+"px"}function Z(e,t,n,r,o){var _;e:if(t==="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Me(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||Me(e.style,t,n[t])}else if(t[0]==="o"&&t[1]==="n")_=t!==(t=t.replace(Xe,"$1")),t=t.toLowerCase()in e||t==="onFocusOut"||t==="onFocusIn"?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+_]=n,n?r?n.u=r.u:(n.u=de,e.addEventListener(t,_?ue:ce,_)):e.removeEventListener(t,_?ue:ce,_);else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{e[t]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&t[4]!=="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n))}}function Ue(e){return function(t){if(this.l){var n=this.l[t.type+e];if(t.t==null)t.t=de++;else if(t.t<n.u)return;return n(y.event?y.event(t):t)}}}function ve(e,t,n,r,o,_,l,s,c,a){var u,i,d,f,g,L,b,h,v,M,x,D,U,$,A,P,B,H=t.type;if(t.constructor!==void 0)return null;128&n.__u&&(c=!!(32&n.__u),_=[s=t.__e=n.__e]),(u=y.__b)&&u(t);e:if(typeof H=="function")try{if(h=t.props,v="prototype"in H&&H.prototype.render,M=(u=H.contextType)&&r[u.__c],x=u?M?M.props.value:u.__:r,n.__c?b=(i=t.__c=n.__c).__=i.__E:(v?t.__c=i=new H(h,x):(t.__c=i=new Q(h,x),i.constructor=H,i.render=vt),M&&M.sub(i),i.props=h,i.state||(i.state={}),i.context=x,i.__n=r,d=i.__d=!0,i.__h=[],i._sb=[]),v&&i.__s==null&&(i.__s=i.state),v&&H.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=F({},i.__s)),F(i.__s,H.getDerivedStateFromProps(h,i.__s))),f=i.props,g=i.state,i.__v=t,d)v&&H.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),v&&i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(v&&H.getDerivedStateFromProps==null&&h!==f&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(h,x),!i.__e&&(i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(h,i.__s,x)===!1||t.__v===n.__v)){for(t.__v!==n.__v&&(i.props=h,i.state=i.__s,i.__d=!1),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(T){T&&(T.__=t)}),D=0;D<i._sb.length;D++)i.__h.push(i._sb[D]);i._sb=[],i.__h.length&&l.push(i);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(h,i.__s,x),v&&i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(f,g,L)})}if(i.context=x,i.props=h,i.__P=e,i.__e=!1,U=y.__r,$=0,v){for(i.state=i.__s,i.__d=!1,U&&U(t),u=i.render(i.props,i.state,i.context),A=0;A<i._sb.length;A++)i.__h.push(i._sb[A]);i._sb=[]}else do i.__d=!1,U&&U(t),u=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++$<25);i.state=i.__s,i.getChildContext!=null&&(r=F(F({},r),i.getChildContext())),v&&!d&&i.getSnapshotBeforeUpdate!=null&&(L=i.getSnapshotBeforeUpdate(f,g)),s=tt(e,pe(P=u!=null&&u.type===z&&u.key==null?u.props.children:u)?P:[P],t,n,r,o,_,l,s,c,a),i.base=t.__e,t.__u&=-161,i.__h.length&&l.push(i),b&&(i.__E=i.__=null)}catch(T){if(t.__v=null,c||_!=null)if(T.then){for(t.__u|=c?160:128;s&&s.nodeType===8&&s.nextSibling;)s=s.nextSibling;_[_.indexOf(s)]=null,t.__e=s}else for(B=_.length;B--;)he(_[B]);else t.__e=n.__e,t.__k=n.__k;y.__e(T,t,n)}else _==null&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):s=t.__e=ht(n.__e,t,n,r,o,_,l,c,a);return(u=y.diffed)&&u(t),128&t.__u?void 0:s}function rt(e,t,n){for(var r=0;r<n.length;r++)me(n[r],n[++r],n[++r]);y.__c&&y.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(_){_.call(o)})}catch(_){y.__e(_,o.__v)}})}function ht(e,t,n,r,o,_,l,s,c){var a,u,i,d,f,g,L,b=n.props,h=t.props,v=t.type;if(v==="svg"?o="http://www.w3.org/2000/svg":v==="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),_!=null){for(a=0;a<_.length;a++)if((f=_[a])&&"setAttribute"in f==!!v&&(v?f.localName===v:f.nodeType===3)){e=f,_[a]=null;break}}if(e==null){if(v===null)return document.createTextNode(h);e=document.createElementNS(o,v,h.is&&h),s&&(y.__m&&y.__m(t,_),s=!1),_=null}if(v===null)b===h||s&&e.data===h||(e.data=h);else{if(_=_&&re.call(e.childNodes),b=n.props||K,!s&&_!=null)for(b={},a=0;a<e.attributes.length;a++)b[(f=e.attributes[a]).name]=f.value;for(a in b)if(f=b[a],a!="children"){if(a=="dangerouslySetInnerHTML")i=f;else if(!(a in h)){if(a=="value"&&"defaultValue"in h||a=="checked"&&"defaultChecked"in h)continue;Z(e,a,null,f,o)}}for(a in h)f=h[a],a=="children"?d=f:a=="dangerouslySetInnerHTML"?u=f:a=="value"?g=f:a=="checked"?L=f:s&&typeof f!="function"||b[a]===f||Z(e,a,f,b[a],o);if(u)s||i&&(u.__html===i.__html||u.__html===e.innerHTML)||(e.innerHTML=u.__html),t.__k=[];else if(i&&(e.innerHTML=""),tt(e,pe(d)?d:[d],t,n,r,v==="foreignObject"?"http://www.w3.org/1999/xhtml":o,_,l,_?_[0]:n.__k&&q(n,0),s,c),_!=null)for(a=_.length;a--;)he(_[a]);s||(a="value",v==="progress"&&g==null?e.removeAttribute("value"):g!==void 0&&(g!==e[a]||v==="progress"&&!g||v==="option"&&g!==b[a])&&Z(e,a,g,b[a],o),a="checked",L!==void 0&&L!==e[a]&&Z(e,a,L,b[a],o))}return e}function me(e,t,n){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(o){y.__e(o,n)}}function _t(e,t,n){var r,o;if(y.unmount&&y.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||me(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(_){y.__e(_,t)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&_t(r[o],t,n||typeof e.type!="function");n||he(e.__e),e.__c=e.__=e.__e=void 0}function vt(e,t,n){return this.constructor(e,n)}function mt(e,t,n){var r,o,_,l;t===document&&(t=document.documentElement),y.__&&y.__(e,t),o=(r=typeof n=="function")?null:t.__k,_=[],l=[],ve(t,e=(!r&&n||t).__k=ft(z,null,[e]),o||K,K,t.namespaceURI,!r&&n?[n]:o?null:t.firstChild?re.call(t.childNodes):null,_,!r&&n?n:o?o.__e:t.firstChild,r,l),rt(_,e,l)}re=Ye.slice,y={__e:function(e,t,n,r){for(var o,_,l;t=t.__;)if((o=t.__c)&&!o.__)try{if((_=o.constructor)&&_.getDerivedStateFromError!=null&&(o.setState(_.getDerivedStateFromError(e)),l=o.__d),o.componentDidCatch!=null&&(o.componentDidCatch(e,r||{}),l=o.__d),l)return o.__E=o}catch(s){e=s}throw e}},Je=0,Q.prototype.setState=function(e,t){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=F({},this.state),typeof e=="function"&&(e=e(F({},n),this.props)),e&&F(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),Oe(this))},Q.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Oe(this))},Q.prototype.render=z,R=[],Qe=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ae=function(e,t){return e.__v.__b-t.__v.__b},ee.__r=0,Xe=/(PointerCapture)$|Capture$/i,de=0,ce=Ue(!1),ue=Ue(!0);var yt=0;function X(e,t,n,r,o,_){t||(t={});var l,s,c=t;"ref"in t&&(l=t.ref,delete t.ref);var a={type:e,props:c,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--yt,__i:-1,__u:0,__source:o,__self:_};if(typeof e=="function"&&(l=e.defaultProps))for(s in l)c[s]===void 0&&(c[s]=l[s]);return y.vnode&&y.vnode(a),a}var j,k,ie,Fe,te=0,ot=[],w=y,Re=w.__b,We=w.__r,Be=w.diffed,Ie=w.__c,qe=w.unmount,Ve=w.__;function ye(e,t){w.__h&&w.__h(k,e,te||t),te=0;var n=k.__H||(k.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function gt(e){return te=1,bt(lt,e)}function bt(e,t,n){var r=ye(j++,2);if(r.t=e,!r.__c&&(r.__=[lt(void 0,t),function(s){var c=r.__N?r.__N[0]:r.__[0],a=r.t(c,s);c!==a&&(r.__N=[a,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.u)){var o=function(s,c,a){if(!r.__c.__H)return!0;var u=r.__c.__H.__.filter(function(d){return!!d.__c});if(u.every(function(d){return!d.__N}))return!_||_.call(this,s,c,a);var i=r.__c.props!==s;return u.forEach(function(d){if(d.__N){var f=d.__[0];d.__=d.__N,d.__N=void 0,f!==d.__[0]&&(i=!0)}}),_&&_.call(this,s,c,a)||i};k.u=!0;var _=k.shouldComponentUpdate,l=k.componentWillUpdate;k.componentWillUpdate=function(s,c,a){if(this.__e){var u=_;_=void 0,o(s,c,a),_=u}l&&l.call(this,s,c,a)},k.shouldComponentUpdate=o}return r.__N||r.__}function kt(e,t){var n=ye(j++,3);!w.__s&&it(n.__H,t)&&(n.__=e,n.i=t,k.__H.__h.push(n))}function Et(e){return te=5,wt(function(){return{current:e}},[])}function wt(e,t){var n=ye(j++,7);return it(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function Lt(){for(var e;e=ot.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Y),e.__H.__h.forEach(fe),e.__H.__h=[]}catch(t){e.__H.__h=[],w.__e(t,e.__v)}}w.__b=function(e){k=null,Re&&Re(e)},w.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Ve&&Ve(e,t)},w.__r=function(e){We&&We(e),j=0;var t=(k=e.__c).__H;t&&(ie===k?(t.__h=[],k.__h=[],t.__.forEach(function(n){n.__N&&(n.__=n.__N),n.i=n.__N=void 0})):(t.__h.forEach(Y),t.__h.forEach(fe),t.__h=[],j=0)),ie=k},w.diffed=function(e){Be&&Be(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(ot.push(t)!==1&&Fe===w.requestAnimationFrame||((Fe=w.requestAnimationFrame)||$t)(Lt)),t.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.i=void 0})),ie=k=null},w.__c=function(e,t){t.some(function(n){try{n.__h.forEach(Y),n.__h=n.__h.filter(function(r){return!r.__||fe(r)})}catch(r){t.some(function(o){o.__h&&(o.__h=[])}),t=[],w.__e(r,n.__v)}}),Ie&&Ie(e,t)},w.unmount=function(e){qe&&qe(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(r){try{Y(r)}catch(o){t=o}}),n.__H=void 0,t&&w.__e(t,n.__v))};var Ke=typeof requestAnimationFrame=="function";function $t(e){var t,n=function(){clearTimeout(r),Ke&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);Ke&&(t=requestAnimationFrame(n))}function Y(e){var t=k,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),k=t}function fe(e){var t=k;e.__c=e.__(),k=t}function it(e,t){return!e||e.length!==t.length||t.some(function(n,r){return n!==e[r]})}function lt(e,t){return typeof t=="function"?t(e):t}const{min:je}=Math,Nt=typeof queueMicrotask=="function"?queueMicrotask:e=>{Promise.resolve().then(e)},ze="TEMPLATE",st=e=>{if(e.tagName!=="BR")return!1;let t=!1,n=!1,r=e;for(;r=r.previousSibling;){if(V(r)){t=!0;break}if(W(r)&&r.tagName!==ze)return!1}let o=e;for(;o=o.nextSibling;){if(V(o)){n=!0;break}if(W(o)&&o.tagName!==ze)return!1}return t&&n},at=e=>e.ownerDocument,V=e=>e.nodeType===3,W=e=>e.nodeType===1,Ct=new Set(["DIV","H1","H2","H3","H4","H5","H6","P","PRE","LI","DT","DD"]),ne=e=>at(e).getSelection(),ct=(e,t)=>{if(!e.rangeCount)return;const n=e.getRangeAt(0);return t.contains(n.commonAncestorContainer)?n:void 0},ge=(e,t)=>{if(t){const n=e.currentNode;let r;for(;(r=e.nextNode())&&n.contains(r););return r}return e.nextNode()},le=(e,t,n,r,o)=>{const{start:_,end:l,backward:s}=n,c=Ze(e,t,_,r,o);if(!c)return!1;const a=Ze(e,t,l,r,o);if(!a)return!1;const u=e.createRange();{const[d,f]=c;W(d)?f<1?u.setStartBefore(d):u.setStartAfter(d):u.setStart(d,je(f,d.data.length))}{const[d,f]=a;W(d)?f<1?u.setEndBefore(d):u.setEndAfter(d):u.setEnd(d,je(f,d.data.length))}const i=ne(t);return i.removeAllRanges(),i.addRange(u),s&&(i.collapseToEnd(),i.extend(u.startContainer,u.startOffset)),!0},Ze=(e,t,[n,r],o,_)=>{let l,s=0,c=!1;const a=_||t.childElementCount===0?t:t.children[n],u=e.createTreeWalker(a,5);for(;l=ge(u,c);)if(c=!1,V(l)){const i=l.data.length;if(s+i>=r)return[l,r-s];s+=i}else if(W(l)){if(l.tagName==="BR"){if(s+1>=r)return[l,0];s++}else if(o(l)){if(c=!0,s+1>=r)return[l,r-s];s++}}},xt=e=>{const t=(n=e.anchorNode,r=e.focusNode,n.compareDocumentPosition(r));var n,r;return t===0?e.anchorOffset>e.focusOffset:!!(2&t)},se=(e,t,n,r,o,_)=>{let l,s=n;if(_||t.childElementCount===0)s=t,l=0;else{for(;s.parentNode!==t;)s=s.parentNode;l=Array.prototype.indexOf.call(t.children,s)}let c,a=0,u=!1;const i=!V(n);i&&(n=n.childNodes[r]);const d=e.createTreeWalker(s,5);for(;c=ge(d,u);){if(u=!1,c===n){a+=i?0:r;break}V(c)?a+=c.data.length:W(c)&&(st(c)?(l++,a=0):o(c)&&(u=!0,a++))}return[l,a]},Ge=(e,t,n,r)=>{const o=ne(t),_=ct(o,t);if(!_)return{start:[0,0],end:[0,0],backward:!1};let l,s;if(t===_.startContainer){if(!(_.startOffset===0&&_.endOffset!==0&&t.children.length<=_.endOffset))return{start:[0,0],end:[0,0],backward:!1};l=[0,0],s=se(e,t,t.lastElementChild,t.lastElementChild.textContent.length,n,r)}else l=se(e,t,_.startContainer,_.startOffset,n,r),s=se(e,t,_.endContainer,_.endOffset,n,r);return{start:l,end:s,backward:xt(o)}},G=(e,t,n)=>{const r=[],o=e.createTreeWalker(t,5),_=()=>{r.push(s),s=""};let l,s="",c=!0,a=!1;for(;l=ge(o,a);)if(a=!1,V(l))s+=l.data;else if(W(l))if(Ct.has(l.tagName)&&l.parentNode===t)c||_(),c=!1;else if(st(l))_();else{const u=n(l);u!=null&&(a=!0,s+=u)}return _(),r},Ht=(e,{multiline:t,readonly:n,nodes:r,onChange:o})=>{const{contentEditable:_,role:l,ariaMultiLine:s,ariaReadOnly:c}=e,a=e.style.whiteSpace;e.contentEditable="true",e.role="textbox",e.style.whiteSpace="pre-wrap",t&&(e.ariaMultiLine="true");let u,i=!1,d=!1,f=!1,g=null,L=!1,b=!1,h=!1;const v=!t,M=p=>{if(r)return r.find(m=>typeof m.is=="function"?m.is(p):p.nodeName===m.is.toUpperCase())},x=p=>{const m=M(p);if(m)return m.serialize?m.serialize(p):p.textContent},D=p=>!!M(p),U=()=>{e.ariaReadOnly=n?"true":null};U();const $=at(e),A=(p=>{let m=0;const E=[p],S=()=>E[m];return{get:S,undo:()=>m>0?(m--,S()):void 0,redo:()=>m<E.length-1?(m++,S()):void 0,push:(I,O)=>{O||m++,E[m]=I,E.splice(m+1),m>500&&(m--,E.shift())}}})([G($,e,x),{start:[0,0],end:[0,0],backward:!1}]),P=((p,m)=>{let E=!1;const S=[],I=C=>{E&&S.push(...C)},O=new MutationObserver(C=>{I(C),E||m()}),N=()=>{I(O.takeRecords())};return O.observe(p,{characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0}),{t(C){!E&&C&&N(),E=C},o:()=>(N(),S.splice(0)),i(){S.splice(0),O.disconnect()}}})(e,()=>{b&&u&&(le($,e,u,D,v),g!=null&&(cancelAnimationFrame(g),g=null))}),B=p=>{o(p.join(t?`
`:""))},H=()=>{P.t(!0)},T=()=>{f||(f=!0,Nt(()=>{f=!1;const p=P.o();if(P.t(!1),p.length){const m=Ge($,e,D,v),E=G($,e,x);(O=>{let N;for(;N=O.pop();){N.oldValue!==null&&(N.target.textContent=N.oldValue);for(let C=N.removedNodes.length-1;C>=0;C--)N.target.insertBefore(N.removedNodes[C],N.nextSibling);for(let C=N.addedNodes.length-1;C>=0;C--)N.addedNodes[C].parentNode&&N.target.removeChild(N.addedNodes[C])}})(p),P.o();const S=u||{start:[0,0],end:[0,0],backward:!1};d=le($,e,S,D,v);const I=G($,e,x);n||(A.push([I,S],!0),A.push([E,m]),u=m,B(E)),u&&(O=>{g=requestAnimationFrame(()=>{le($,e,O,D,v)})})(u)}}))},_e=p=>{const m=!ne(e).isCollapsed;H(),m&&$.execCommand("delete",!1),$.execCommand("insertText",!1,p),T()},be=p=>{const m=(E=>{const S=ct(ne(E),E);if(S)return S.cloneContents()})(e);m&&p.setData("text/plain",G($,m,x).join(`
`))},ke=p=>{L||!p.metaKey&&!p.ctrlKey||p.altKey||p.code!=="KeyZ"||(p.preventDefault(),(m=>{if(n)return;const E=m?A.redo():A.undo();E&&(P.t(!1),u=E[1],B(E[0]))})(p.shiftKey))},Ee=()=>{L||h||T()},we=p=>{switch(p.inputType){case"historyUndo":case"historyRedo":return void p.preventDefault();case"insertLineBreak":case"insertParagraph":if(v)return void p.preventDefault()}H()},Le=()=>{L=!0},$e=()=>{L=!1,T()},Ne=()=>{d?d=!1:L||h||(u=Ge($,e,D,v))},Ce=p=>{p.preventDefault(),be(p.clipboardData)},xe=p=>{p.preventDefault(),be(p.clipboardData),_e("")},He=p=>{p.preventDefault(),_e(p.clipboardData.getData("text/plain"))},Se=()=>{b=!0},De=()=>{b=!1},Pe=()=>{h=!0},Te=()=>{h&&(h=!1,T())};$.addEventListener("selectionchange",Ne),e.addEventListener("keydown",ke),e.addEventListener("input",Ee),e.addEventListener("beforeinput",we),e.addEventListener("compositionstart",Le),e.addEventListener("compositionend",$e),e.addEventListener("copy",Ce),e.addEventListener("cut",xe),e.addEventListener("paste",He),e.addEventListener("focus",Se),e.addEventListener("blur",De),e.addEventListener("dragstart",Pe),e.addEventListener("dragend",Te);const oe=()=>{i||(i=!0,e.contentEditable=_,e.role=l,e.ariaMultiLine=s,e.ariaReadOnly=c,e.style.whiteSpace=a,P.i(),$.removeEventListener("selectionchange",Ne),e.removeEventListener("keydown",ke),e.removeEventListener("input",Ee),e.removeEventListener("beforeinput",we),e.removeEventListener("compositionstart",Le),e.removeEventListener("compositionend",$e),e.removeEventListener("copy",Ce),e.removeEventListener("cut",xe),e.removeEventListener("paste",He),e.removeEventListener("focus",Se),e.removeEventListener("blur",De),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragend",Te))};return oe.insert=_e,oe.readonly=p=>{n=p,U()},oe};function St(){const e=Et(null),[t,n]=gt(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return kt(()=>{if(e.current)return Ht(e.current,{onChange:n})},[]),X("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t.split(`
`).map((r,o)=>X("div",{children:r||X("br",{})},o))})}mt(X(St,{}),document.getElementById("app"));