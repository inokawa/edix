import{r as Ge}from"./index-RYns6xqu.js";var Re={exports:{}},M={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ue=Ge,We=Symbol.for("react.element"),Fe=Symbol.for("react.fragment"),Ve=Object.prototype.hasOwnProperty,je=Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ke={key:!0,ref:!0,__self:!0,__source:!0};function Ne(e,t,s){var n,o={},r=null,i=null;s!==void 0&&(r=""+s),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)Ve.call(t,n)&&!Ke.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:We,type:e,key:r,ref:i,props:o,_owner:je.current}}M.Fragment=Fe;M.jsx=Ne;M.jsxs=Ne;Re.exports=M;var ot=Re.exports;const qe=500,ze=e=>{let t=0;const s=[e],n=()=>s[t],o=u=>{s[t]=u},r=u=>{s[++t]=u,s.splice(t+1),t>qe&&(t--,s.shift())},i=()=>t>0,a=()=>t<s.length-1;return{get:n,set:o,undo:()=>{if(i())return t--,n()},redo:()=>{if(a())return t++,n()},push:r}},K=(e,t)=>e[0]===t[0]&&e[1]===t[1],Ce=([e,t],[s,n])=>e===s?t>n:e>s,{min:Se}=Math,Te=typeof queueMicrotask=="function"?queueMicrotask:e=>{Promise.resolve().then(e)},Xe=1,$e=3,Ye=2,q=1,z=4,Oe="BR",Le="TEMPLATE",ke=(e,t)=>{if(e.tagName!==Oe)return!1;if(t)return!0;let s=!1,n=!1,o=e;for(;o=o.previousSibling;)if(N(o)){s=!0;break}else if(L(o)&&o.tagName!==Le)return!1;let r=e;for(;r=r.nextSibling;)if(N(r)){n=!0;break}else if(L(r)&&r.tagName!==Le)return!1;return s&&n},Ae=e=>e.ownerDocument,N=e=>e.nodeType===$e,L=e=>e.nodeType===Xe,Je=new Set(["DIV","H1","H2","H3","H4","H5","H6","P","PRE","LI","DT","DD","TR"]),Qe=new Set(["EMBED","IMG","PICTURE","AUDIO","VIDEO","MAP","SVG","CANVAS","IFRAME"]),xe=e=>!!e&&Je.has(e.tagName),X=e=>e.contentEditable==="false"||Qe.has(e.tagName),$=e=>Ae(e).getSelection(),Me=(e,t)=>{if(!e.rangeCount)return;const s=e.getRangeAt(0);if(t.contains(s.commonAncestorContainer))return s},ye=(e,t,s)=>{const n=$(e);n.removeAllRanges(),n.addRange(t),s&&(n.collapseToEnd(),n.extend(t.startContainer,t.startOffset))},Y=(e,t)=>{if(t){const s=e.currentNode;let n;for(;(n=e.nextNode())&&s.contains(n););return n}return e.nextNode()},W=(e,t,[s,n],o)=>{const r=Ce(s,n),i=r?n:s,a=r?s:n,c=K(i,a);if(i[0]===0&&i[1]===0&&c&&!t.hasChildNodes()){const p=e.createRange();return p.setStart(t,0),p.setEnd(t,0),ye(t,p),!0}const f=De(e,t,i,o);if(!f)return!1;const u=c?f:De(e,t,a,o);if(!u)return!1;const d=e.createRange();{const[p,v]=f;L(p)?v<1?d.setStartBefore(p):d.setStartAfter(p):d.setStart(p,Se(v,p.data.length))}{const[p,v]=u;L(p)?v<1?d.setEndBefore(p):d.setEndAfter(p):d.setEnd(p,Se(v,p.data.length))}return ye(t,d,r),!0},De=(e,t,[s,n],o)=>{let r=0,i,a=!1;const c=o||t.childElementCount===0?t:t.children[s],f=e.createTreeWalker(c,z|q);for(;i=Y(f,a);)if(a=!1,N(i)){const u=i.data.length;if(r+u>=n)return[i,n-r];r+=u}else if(L(i)){if(i.tagName===Oe){if(r+1>=n)return[i,0];r++}else if(X(i)){if(a=!0,r+1>=n)return[i,n-r];r++}}},Ze=e=>{const t=e.anchorNode.compareDocumentPosition(e.focusNode);return t===0?e.anchorOffset>e.focusOffset:(t&Ye)!==0},F=(e,t,s,n,o)=>{let r=0,i,a=!1,c=s,f;if(o||t.childElementCount===0)c=t,f=0;else{for(;c.parentNode!==t;)c=c.parentNode;f=Array.prototype.indexOf.call(t.children,c)}const u=L(s);u&&(s=s.childNodes[n]);const d=e.createTreeWalker(c,z|q);for(;i=Y(d,a);){if(a=!1,i===s){r+=u?0:n;break}N(i)?r+=i.data.length:L(i)&&(ke(i)?(f++,r=0):X(i)&&(a=!0,r++))}return[f,r]},j=()=>[[0,0],[0,0]],_e=(e,t,s)=>{const n=$(t),o=Me(n,t);if(!o)return j();const r=Ze(n),{startOffset:i,startContainer:a,endOffset:c,endContainer:f}=o;let u,d;if(t===a&&!s)if(i===0&&c!==0&&t.children.length<=c)u=[0,0],d=F(e,t,t.lastElementChild,t.lastElementChild.textContent.length,s);else return j();else u=F(e,t,a,i,s),d=n.isCollapsed?u:F(e,t,f,c,s);return[r?d:u,r?u:d]},R=(e,t,s)=>{let n,o=null,r="",i=!1;const a=[],c=e.createTreeWalker(t,z|q),f=d=>{o||(o=[]),r&&(o.push(r),r=""),d&&o.push(d)},u=()=>{f(),o&&a.push(o),o=null};for(;n=Y(c,i);)i=!1,N(n)?r+=n.data:L(n)&&(xe(n)&&xe(n.previousElementSibling)||ke(n,s)?u():X(n)&&(i=!0,f(n)));return u(),a},et=e=>{const t=Me($(e),e);if(t)return t.cloneContents()},tt=(e,t)=>{let s=!1;const n=[],o=a=>{s&&n.push(...a)},r=new MutationObserver(a=>{o(a),s||t()}),i=()=>{o(r.takeRecords())};return r.observe(e,{characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0}),{_accept(a){!s&&a&&i(),s=a},_flush:()=>(i(),n.splice(0)),_dispose(){n.splice(0),r.disconnect()}}},A=e=>typeof e=="string",J=e=>A(e)?e.length:1,me=e=>e.reduce((t,s)=>t+J(s),0),k=e=>{for(let t=0;t<e.length-1;){const s=e[t],n=e[t+1];A(s)&&n!=null&&A(n)?(e[t]=s+n,e.splice(t+1,1)):t++}return e},V=(e,[t,s])=>{const n=e[t];for(let o=0;o<n.length;o++){const r=n[o],i=J(r);if(i>s){const a=n.slice(0,o),c=n.slice(o+1);return A(r)?(a.push(r.slice(0,s)),c.unshift(r.slice(s))):s===0?c.unshift(r):a.push(r),[a,c]}s-=i}return[n,[]]},be=(e,t,s,n,o)=>{const r=o.length,[i,a]=n;if(r===1)return e[i]=k([...t,...o[0],...s]),[i,a+me(o[0])];{const c=[],f=o[r-1];e[i]=k([...t,...o[0]]);for(let u=1;u<r-1;u++)c.push([...o[u]]);return e.splice(i+1,0,...c),e.splice(i+r-1,0,k([...f,...s])),[i+r-1,me(f)]}},Pe=(e,[t,s],n)=>{const o=e.map(i=>[...i]);let r;if(K(t,s))r=be(o,...V(o,t),t,n);else{const i=Ce(t,s),a=i?s:t,c=i?t:s,f=a[0],u=c[0];r=be(o,V(o,a)[0],V(o,c)[1],a,n),f!==u&&o.splice(f+n.length,u-f)}return[o,[r,r]]},Ie=(e,t,s)=>Pe(e,t,s.split(`
`).map(n=>[n])),nt=(e,t)=>K(t[0],t[1])?[e,t]:Ie(e,t,""),st=(e,[[t,s],[n,o]])=>{const r=[];let i=0,a=0;for(let c=0;c<e.length;c++)for(const f of e[c]){r.push(f);const u=J(f);c<t&&(i+=u),c<n&&(a+=u)}return[[k(r)],[[0,i+s],[0,a+o]]]},we=e=>e.reduce((t,s,n)=>(n!==0&&(t+=`
`),t+s.reduce((o,r)=>o+(typeof r=="string"?r:r.textContent),"")),""),it=(e,{multiline:t,readonly:s,serializer:n={data:we},onChange:o})=>{const{contentEditable:r,role:i,ariaMultiLine:a,ariaReadOnly:c}=e,f=e.style.whiteSpace,u=()=>{e.contentEditable=s?"false":"true",e.ariaReadOnly=s?"true":null};u(),e.role="textbox",e.style.whiteSpace="pre-wrap",t&&(e.ariaMultiLine="true");let d=!1,p=!1,v=j(),P=!1,I=!1,C=null,m=!1,O=!1,b=!1;const B=[],x=!t,{data:Q,plain:Be=we}=n,g=Ae(e),w=ze([Q(R(g,e)),v]),y=tt(e,()=>{O&&(W(g,e,v,x),C!=null&&(clearTimeout(C),C=null))}),Z=()=>{const l=v;C=setTimeout(()=>{W(g,e,l,x)})},ee=(l,h,S)=>{if(!s){x&&([l,h]=st(l,h));const E=Q(l);w.set([w.get()[0],S]),w.push([E,h]),v=h,o(E)}Z()},te=()=>{v=_e(g,e,x)},H=()=>{P||(P=!0,Te(()=>{P=!1;const l=y._flush();if(y._accept(!1),l.length){const h=_e(g,e,x),S=R(g,e);let E;for(;E=l.pop();)if(E.type==="characterData")E.target.nodeValue=E.oldValue;else if(E.type==="childList"){const{target:_,removedNodes:ge,addedNodes:U,nextSibling:He}=E;for(let T=ge.length-1;T>=0;T--)_.insertBefore(ge[T],He);for(let T=U.length-1;T>=0;T--)U[T].parentNode&&_.removeChild(U[T])}y._flush();const D=v;p=W(g,e,D,x),ee(S,h,D)}}))},G=(l,...h)=>{B.unshift([l,h]),I||(I=!0,Te(()=>{if(I=!1,B.length){const S=v;let E=v,D=R(g,e),_;for(;_=B.pop();)[D,E]=_[0](D,E,..._[1]);ee(D,E,S)}}))},ne=l=>{if(!m&&(l.metaKey||l.ctrlKey)&&!l.altKey&&l.code==="KeyZ"&&(l.preventDefault(),!s)){const h=l.shiftKey?w.redo():w.undo();h&&(y._accept(!1),v=h[1],o(h[0]),Z())}},se=()=>{m||b||H()},re=l=>{switch(l.inputType){case"historyUndo":{l.preventDefault();return}case"historyRedo":{l.preventDefault();return}case"insertLineBreak":case"insertParagraph":if(x){l.preventDefault();return}}y._accept(!0)},oe=()=>{m=!0},ie=()=>{m=!1,H()},ae=()=>{if(p){p=!1;return}O&&!m&&!b&&te()},ce=l=>{const h=et(e);if(!h)return;const S=Be(R(g,h)),E=g.createElement("div");E.appendChild(h),l.setData("text/html",E.innerHTML),l.setData("text/plain",S)},le=l=>{l.preventDefault(),ce(l.clipboardData)},ue=l=>{l.preventDefault(),s||(ce(l.clipboardData),G(nt))},fe=l=>{l.preventDefault();const h=l.clipboardData,S=h.getData("text/html");if(S)try{G(Pe,R(g,new DOMParser().parseFromString(S,"text/html").body,!0));return}catch{}G(Ie,h.getData("text/plain"))},de=()=>{O=!0,te()},pe=()=>{O=!1},he=()=>{b=!0},Ee=()=>{b&&(b=!1,H())};g.addEventListener("selectionchange",ae),e.addEventListener("keydown",ne),e.addEventListener("input",se),e.addEventListener("beforeinput",re),e.addEventListener("compositionstart",oe),e.addEventListener("compositionend",ie),e.addEventListener("copy",le),e.addEventListener("cut",ue),e.addEventListener("paste",fe),e.addEventListener("focus",de),e.addEventListener("blur",pe),e.addEventListener("dragstart",he),e.addEventListener("dragend",Ee);const ve=()=>{d||(d=!0,e.contentEditable=r,e.role=i,e.ariaMultiLine=a,e.ariaReadOnly=c,e.style.whiteSpace=f,y._dispose(),g.removeEventListener("selectionchange",ae),e.removeEventListener("keydown",ne),e.removeEventListener("input",se),e.removeEventListener("beforeinput",re),e.removeEventListener("compositionstart",oe),e.removeEventListener("compositionend",ie),e.removeEventListener("copy",le),e.removeEventListener("cut",ue),e.removeEventListener("paste",fe),e.removeEventListener("focus",de),e.removeEventListener("blur",pe),e.removeEventListener("dragstart",he),e.removeEventListener("dragend",Ee))};return ve.readonly=l=>{s=l,u()},ve};export{it as e,ot as j};