import{r as Le}from"./index-RYns6xqu.js";var ue={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _e=Le,xe=Symbol.for("react.element"),Ne=Symbol.for("react.fragment"),Te=Object.prototype.hasOwnProperty,Ce=_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,De={key:!0,ref:!0,__self:!0,__source:!0};function fe(e,t,n){var r,c={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Te.call(t,r)&&!De.hasOwnProperty(r)&&(c[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)c[r]===void 0&&(c[r]=t[r]);return{$$typeof:xe,type:e,key:a,ref:o,props:c,_owner:Ce.current}}R.Fragment=Ne;R.jsx=fe;R.jsxs=fe;ue.exports=R;var je=ue.exports;const Se=500,be=e=>{let t=0;const n=[e],r=()=>n[t],c=(f,l)=>{l||t++,n[t]=f,n.splice(t+1),t>Se&&(t--,n.shift())},a=()=>t>0,o=()=>t<n.length-1;return{get:r,undo:()=>{if(a())return t--,r()},redo:()=>{if(o())return t++,r()},push:c}},{min:ie}=Math,Oe=typeof queueMicrotask=="function"?queueMicrotask:e=>{Promise.resolve().then(e)},we=1,Re=3,ke=2,B=1,H=4,de="BR",ae="TEMPLATE",pe=e=>{if(e.tagName!==de)return!1;let t=!1,n=!1,r=e;for(;r=r.previousSibling;)if(_(r)){t=!0;break}else if(g(r)&&r.tagName!==ae)return!1;let c=e;for(;c=c.nextSibling;)if(_(c)){n=!0;break}else if(g(c)&&c.tagName!==ae)return!1;return t&&n},Ee=e=>e.ownerDocument,_=e=>e.nodeType===Re,g=e=>e.nodeType===we,me=new Set(["DIV","H1","H2","H3","H4","H5","H6","P","PRE","LI","DT","DD"]),k=e=>Ee(e).getSelection(),he=(e,t)=>{if(!e.rangeCount)return;const n=e.getRangeAt(0);if(t.contains(n.commonAncestorContainer))return n},Me=(e,t)=>e.compareDocumentPosition(t),j=(e,t)=>{if(t){const n=e.currentNode;let r;for(;(r=e.nextNode())&&n.contains(r););return r}return e.nextNode()},I=(e,t,n,r,c)=>{const{start:a,end:o,backward:i}=n,p=ce(e,t,a,r,c);if(!p)return!1;const f=ce(e,t,o,r,c);if(!f)return!1;const l=e.createRange();{const[u,v]=p;g(u)?v<1?l.setStartBefore(u):l.setStartAfter(u):l.setStart(u,ie(v,u.data.length))}{const[u,v]=f;g(u)?v<1?l.setEndBefore(u):l.setEndAfter(u):l.setEnd(u,ie(v,u.data.length))}const E=k(t);return E.removeAllRanges(),E.addRange(l),i&&(E.collapseToEnd(),E.extend(l.startContainer,l.startOffset)),!0},ce=(e,t,[n,r],c,a)=>{let o=0,i,p=!1;const f=a||t.childElementCount===0?t:t.children[n],l=e.createTreeWalker(f,H|B);for(;i=j(l,p);)if(p=!1,_(i)){const E=i.data.length;if(o+E>=r)return[i,r-o];o+=E}else if(g(i)){if(i.tagName===de){if(o+1>=r)return[i,0];o++}else if(c(i)){if(p=!0,o+1>=r)return[i,r-o];o++}}},Ae=e=>{const t=Me(e.anchorNode,e.focusNode);return t===0?e.anchorOffset>e.focusOffset:(t&ke)!==0},P=(e,t,n,r,c,a)=>{let o=n,i;if(a||t.childElementCount===0)o=t,i=0;else{for(;o.parentNode!==t;)o=o.parentNode;i=Array.prototype.indexOf.call(t.children,o)}let p=0,f,l=!1;const E=!_(n);E&&(n=n.childNodes[r]);const u=e.createTreeWalker(o,H|B);for(;f=j(u,l);){if(l=!1,f===n){p+=E?0:r;break}_(f)?p+=f.data.length:g(f)&&(pe(f)?(i++,p=0):c(f)&&(l=!0,p++))}return[i,p]},w=()=>({start:[0,0],end:[0,0],backward:!1}),le=(e,t,n,r)=>{const c=k(t),a=he(c,t);if(!a)return w();let o,i;if(t===a.startContainer)if(a.startOffset===0&&a.endOffset!==0&&t.children.length<=a.endOffset)o=[0,0],i=P(e,t,t.lastElementChild,t.lastElementChild.textContent.length,n,r);else return w();else o=P(e,t,a.startContainer,a.startOffset,n,r),i=P(e,t,a.endContainer,a.endOffset,n,r);return{start:o,end:i,backward:Ae(c)}},O=(e,t,n)=>{const r=[],c=e.createTreeWalker(t,H|B),a=()=>{r.push(i),i=""};let o,i="",p=!0,f=!1;for(;o=j(c,f);)if(f=!1,_(o))i+=o.data;else if(g(o))if(me.has(o.tagName)&&o.parentNode===t)p||a(),p=!1;else if(pe(o))a();else{const l=n(o);l!=null&&(f=!0,i+=l)}return a(),r},Ie=e=>{const t=he(k(e),e);if(t)return t.cloneContents()},Pe=(e,t)=>{let n=!1;const r=[],c=i=>{n&&r.push(...i)},a=new MutationObserver(i=>{c(i),n||t()}),o=()=>{c(a.takeRecords())};return a.observe(e,{characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0}),{_accept(i){!n&&i&&o(),n=i},_flush:()=>(o(),r.splice(0)),_dispose(){r.splice(0),a.disconnect()}}},Be=e=>{let t;for(;t=e.pop();){t.oldValue!==null&&(t.target.textContent=t.oldValue);for(let n=t.removedNodes.length-1;n>=0;n--)t.target.insertBefore(t.removedNodes[n],t.nextSibling);for(let n=t.addedNodes.length-1;n>=0;n--)t.addedNodes[n].parentNode&&t.target.removeChild(t.addedNodes[n])}},Fe=(e,{multiline:t,readonly:n,nodes:r,onChange:c})=>{const{contentEditable:a,role:o,ariaMultiLine:i,ariaReadOnly:p}=e,f=e.style.whiteSpace;e.contentEditable="true",e.role="textbox",e.style.whiteSpace="pre-wrap",t&&(e.ariaMultiLine="true");let l=!1,E=!1,u,v=!1,C=null,x=!1,m=!1,N=!1;const y=!t,F=s=>{if(r)return r.find(d=>typeof d.is=="function"?d.is(s):s.nodeName===d.is.toUpperCase())},D=s=>{const d=F(s);if(d)return d.serialize?d.serialize(s):s.textContent},T=s=>!!F(s),U=()=>{e.ariaReadOnly=n?"true":null};U();const h=Ee(e),S=be([O(h,e,D),w()]),L=Pe(e,()=>{m&&u&&(I(h,e,u,T,y),C!=null&&(cancelAnimationFrame(C),C=null))}),ve=s=>{C=requestAnimationFrame(()=>{I(h,e,s,T,y)})},W=s=>{c(s.join(t?`
`:""))},q=()=>{L._accept(!0)},b=()=>{v||(v=!0,Oe(()=>{v=!1;const s=L._flush();if(L._accept(!1),s.length){const d=le(h,e,T,y),se=O(h,e,D);Be(s),L._flush();const oe=u||w();E=I(h,e,oe,T,y);const ye=O(h,e,D);n||(S.push([ye,oe],!0),S.push([se,d]),u=d,W(se)),u&&ve(u)}}))},M=s=>{const d=!k(e).isCollapsed;q(),d&&h.execCommand("delete",!1),h.execCommand("insertText",!1,s),b()},G=s=>{const d=Ie(e);d&&s.setData("text/plain",O(h,d,D).join(`
`))},ge=s=>{if(n)return;const d=s?S.redo():S.undo();d&&(L._accept(!1),u=d[1],W(d[0]))},K=s=>{x||(s.metaKey||s.ctrlKey)&&!s.altKey&&s.code==="KeyZ"&&(s.preventDefault(),ge(s.shiftKey))},z=()=>{x||N||b()},V=s=>{switch(s.inputType){case"historyUndo":{s.preventDefault();return}case"historyRedo":{s.preventDefault();return}case"insertLineBreak":case"insertParagraph":if(y){s.preventDefault();return}}q()},X=()=>{x=!0},Q=()=>{x=!1,b()},Y=()=>{if(E){E=!1;return}x||N||(u=le(h,e,T,y))},$=s=>{s.preventDefault(),G(s.clipboardData)},J=s=>{s.preventDefault(),G(s.clipboardData),M("")},Z=s=>{s.preventDefault(),M(s.clipboardData.getData("text/plain"))},ee=()=>{m=!0},te=()=>{m=!1},ne=()=>{N=!0},re=()=>{N&&(N=!1,b())};h.addEventListener("selectionchange",Y),e.addEventListener("keydown",K),e.addEventListener("input",z),e.addEventListener("beforeinput",V),e.addEventListener("compositionstart",X),e.addEventListener("compositionend",Q),e.addEventListener("copy",$),e.addEventListener("cut",J),e.addEventListener("paste",Z),e.addEventListener("focus",ee),e.addEventListener("blur",te),e.addEventListener("dragstart",ne),e.addEventListener("dragend",re);const A=()=>{l||(l=!0,e.contentEditable=a,e.role=o,e.ariaMultiLine=i,e.ariaReadOnly=p,e.style.whiteSpace=f,L._dispose(),h.removeEventListener("selectionchange",Y),e.removeEventListener("keydown",K),e.removeEventListener("input",z),e.removeEventListener("beforeinput",V),e.removeEventListener("compositionstart",X),e.removeEventListener("compositionend",Q),e.removeEventListener("copy",$),e.removeEventListener("cut",J),e.removeEventListener("paste",Z),e.removeEventListener("focus",ee),e.removeEventListener("blur",te),e.removeEventListener("dragstart",ne),e.removeEventListener("dragend",re))};return A.insert=M,A.readonly=s=>{n=s,U()},A};export{Fe as e,je as j};