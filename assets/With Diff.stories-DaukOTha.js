import{e as W,j as L}from"./editable-CTTD0Q54.js";import{r as z}from"./index-RYns6xqu.js";function x(){}x.prototype={diff:function(e,t){var o,u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=u.callback;typeof u=="function"&&(r=u,u={});var i=this;function a(v){return v=i.postProcess(v,u),r?(setTimeout(function(){r(v)},0),!0):v}e=this.castInput(e,u),t=this.castInput(t,u),e=this.removeEmpty(this.tokenize(e,u)),t=this.removeEmpty(this.tokenize(t,u));var s=t.length,l=e.length,c=1,f=s+l;u.maxEditLength!=null&&(f=Math.min(f,u.maxEditLength));var h=(o=u.timeout)!==null&&o!==void 0?o:1/0,g=Date.now()+h,m=[{oldPos:-1,lastComponent:void 0}],d=this.extractCommon(m[0],t,e,0,u);if(m[0].oldPos+1>=l&&d+1>=s)return a(F(i,m[0].lastComponent,t,e,i.useLongestToken));var C=-1/0,T=1/0;function w(){for(var v=Math.max(C,-c);v<=Math.min(T,c);v+=2){var p=void 0,D=m[v-1],E=m[v+1];D&&(m[v-1]=void 0);var q=!1;if(E){var B=E.oldPos-v;q=E&&0<=B&&B<s}var _=D&&D.oldPos+1<l;if(!q&&!_){m[v]=void 0;continue}if(!_||q&&D.oldPos<E.oldPos?p=i.addToPath(E,!0,!1,0,u):p=i.addToPath(D,!1,!0,1,u),d=i.extractCommon(p,t,e,v,u),p.oldPos+1>=l&&d+1>=s)return a(F(i,p.lastComponent,t,e,i.useLongestToken));m[v]=p,p.oldPos+1>=l&&(T=Math.min(T,v-1)),d+1>=s&&(C=Math.max(C,v+1))}c++}if(r)(function v(){setTimeout(function(){if(c>f||Date.now()>g)return r();w()||v()},0)})();else for(;c<=f&&Date.now()<=g;){var y=w();if(y)return y}},addToPath:function(e,t,o,u,r){var i=e.lastComponent;return i&&!r.oneChangePerToken&&i.added===t&&i.removed===o?{oldPos:e.oldPos+u,lastComponent:{count:i.count+1,added:t,removed:o,previousComponent:i.previousComponent}}:{oldPos:e.oldPos+u,lastComponent:{count:1,added:t,removed:o,previousComponent:i}}},extractCommon:function(e,t,o,u,r){for(var i=t.length,a=o.length,s=e.oldPos,l=s-u,c=0;l+1<i&&s+1<a&&this.equals(o[s+1],t[l+1],r);)l++,s++,c++,r.oneChangePerToken&&(e.lastComponent={count:1,previousComponent:e.lastComponent,added:!1,removed:!1});return c&&!r.oneChangePerToken&&(e.lastComponent={count:c,previousComponent:e.lastComponent,added:!1,removed:!1}),e.oldPos=s,l},equals:function(e,t,o){return o.comparator?o.comparator(e,t):e===t||o.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],o=0;o<e.length;o++)e[o]&&t.push(e[o]);return t},castInput:function(e){return e},tokenize:function(e){return Array.from(e)},join:function(e){return e.join("")},postProcess:function(e){return e}};function F(n,e,t,o,u){for(var r=[],i;e;)r.push(e),i=e.previousComponent,delete e.previousComponent,e=i;r.reverse();for(var a=0,s=r.length,l=0,c=0;a<s;a++){var f=r[a];if(f.removed)f.value=n.join(o.slice(c,c+f.count)),c+=f.count;else{if(!f.added&&u){var h=t.slice(l,l+f.count);h=h.map(function(g,m){var d=o[c+m];return d.length>g.length?d:g}),f.value=n.join(h)}else f.value=n.join(t.slice(l,l+f.count));l+=f.count,f.added||(c+=f.count)}}return r}var ne=new x;function te(n,e,t){return ne.diff(n,e,t)}function Z(n,e){var t;for(t=0;t<n.length&&t<e.length;t++)if(n[t]!=e[t])return n.slice(0,t);return n.slice(0,t)}function G(n,e){var t;if(!n||!e||n[n.length-1]!=e[e.length-1])return"";for(t=0;t<n.length&&t<e.length;t++)if(n[n.length-(t+1)]!=e[e.length-(t+1)])return n.slice(-t);return n.slice(-t)}function N(n,e,t){if(n.slice(0,e.length)!=e)throw Error("string ".concat(JSON.stringify(n)," doesn't start with prefix ").concat(JSON.stringify(e),"; this is a bug"));return t+n.slice(e.length)}function j(n,e,t){if(!e)return n+t;if(n.slice(-e.length)!=e)throw Error("string ".concat(JSON.stringify(n)," doesn't end with suffix ").concat(JSON.stringify(e),"; this is a bug"));return n.slice(0,-e.length)+t}function b(n,e){return N(n,e,"")}function O(n,e){return j(n,e,"")}function H(n,e){return e.slice(0,re(n,e))}function re(n,e){var t=0;n.length>e.length&&(t=n.length-e.length);var o=e.length;n.length<e.length&&(o=n.length);var u=Array(o),r=0;u[0]=0;for(var i=1;i<o;i++){for(e[i]==e[r]?u[i]=u[r]:u[i]=r;r>0&&e[i]!=e[r];)r=u[r];e[i]==e[r]&&r++}r=0;for(var a=t;a<n.length;a++){for(;r>0&&n[a]!=e[r];)r=u[r];n[a]==e[r]&&r++}return r}var A="a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}",oe=new RegExp("[".concat(A,"]+|\\s+|[^").concat(A,"]"),"ug"),M=new x;M.equals=function(n,e,t){return t.ignoreCase&&(n=n.toLowerCase(),e=e.toLowerCase()),n.trim()===e.trim()};M.tokenize=function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t;if(e.intlSegmenter){if(e.intlSegmenter.resolvedOptions().granularity!="word")throw new Error('The segmenter passed must have a granularity of "word"');t=Array.from(e.intlSegmenter.segment(n),function(r){return r.segment})}else t=n.match(oe)||[];var o=[],u=null;return t.forEach(function(r){/\s/.test(r)?u==null?o.push(r):o.push(o.pop()+r):/\s/.test(u)?o[o.length-1]==u?o.push(o.pop()+r):o.push(u+r):o.push(r),u=r}),o};M.join=function(n){return n.map(function(e,t){return t==0?e:e.replace(/^\s+/,"")}).join("")};M.postProcess=function(n,e){if(!n||e.oneChangePerToken)return n;var t=null,o=null,u=null;return n.forEach(function(r){r.added?o=r:r.removed?u=r:((o||u)&&P(t,u,o,r),t=r,o=null,u=null)}),(o||u)&&P(t,u,o,null),n};function P(n,e,t,o){if(e&&t){var u=e.value.match(/^\s*/)[0],r=e.value.match(/\s*$/)[0],i=t.value.match(/^\s*/)[0],a=t.value.match(/\s*$/)[0];if(n){var s=Z(u,i);n.value=j(n.value,i,s),e.value=b(e.value,s),t.value=b(t.value,s)}if(o){var l=G(r,a);o.value=N(o.value,a,l),e.value=O(e.value,l),t.value=O(t.value,l)}}else if(t)n&&(t.value=t.value.replace(/^\s*/,"")),o&&(o.value=o.value.replace(/^\s*/,""));else if(n&&o){var c=o.value.match(/^\s*/)[0],f=e.value.match(/^\s*/)[0],h=e.value.match(/\s*$/)[0],g=Z(c,f);e.value=b(e.value,g);var m=G(b(c,g),h);e.value=O(e.value,m),o.value=N(o.value,c,m),n.value=j(n.value,c,c.slice(0,c.length-m.length))}else if(o){var d=o.value.match(/^\s*/)[0],C=e.value.match(/\s*$/)[0],T=H(C,d);e.value=O(e.value,T)}else if(n){var w=n.value.match(/\s*$/)[0],y=e.value.match(/^\s*/)[0],v=H(w,y);e.value=b(e.value,v)}}var ue=new x;ue.tokenize=function(n){var e=new RegExp("(\\r?\\n)|[".concat(A,"]+|[^\\S\\n\\r]+|[^").concat(A,"]"),"ug");return n.match(e)||[]};var $=new x;$.tokenize=function(n,e){e.stripTrailingCr&&(n=n.replace(/\r\n/g,`
`));var t=[],o=n.split(/(\n|\r\n)/);o[o.length-1]||o.pop();for(var u=0;u<o.length;u++){var r=o[u];u%2&&!e.newlineIsToken?t[t.length-1]+=r:t.push(r)}return t};$.equals=function(n,e,t){return t.ignoreWhitespace?((!t.newlineIsToken||!n.includes(`
`))&&(n=n.trim()),(!t.newlineIsToken||!e.includes(`
`))&&(e=e.trim())):t.ignoreNewlineAtEof&&!t.newlineIsToken&&(n.endsWith(`
`)&&(n=n.slice(0,-1)),e.endsWith(`
`)&&(e=e.slice(0,-1))),x.prototype.equals.call(this,n,e,t)};function ie(n,e,t){return $.diff(n,e,t)}var se=new x;se.tokenize=function(n){return n.split(/(\S.+?[.!?])(?=\s+|$)/)};var ae=new x;ae.tokenize=function(n){return n.split(/([{}:;,]|\s+)/)};function k(n){"@babel/helpers - typeof";return k=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(n)}var I=new x;I.useLongestToken=!0;I.tokenize=$.tokenize;I.castInput=function(n,e){var t=e.undefinedReplacement,o=e.stringifyReplacer,u=o===void 0?function(r,i){return typeof i>"u"?t:i}:o;return typeof n=="string"?n:JSON.stringify(J(n,null,null,u),u,"  ")};I.equals=function(n,e,t){return x.prototype.equals.call(I,n.replace(/,([\r\n])/g,"$1"),e.replace(/,([\r\n])/g,"$1"),t)};function J(n,e,t,o,u){e=e||[],t=t||[],o&&(n=o(u,n));var r;for(r=0;r<e.length;r+=1)if(e[r]===n)return t[r];var i;if(Object.prototype.toString.call(n)==="[object Array]"){for(e.push(n),i=new Array(n.length),t.push(i),r=0;r<n.length;r+=1)i[r]=J(n[r],e,t,o,u);return e.pop(),t.pop(),i}if(n&&n.toJSON&&(n=n.toJSON()),k(n)==="object"&&n!==null){e.push(n),i={},t.push(i);var a=[],s;for(s in n)Object.prototype.hasOwnProperty.call(n,s)&&a.push(s);for(a.sort(),r=0;r<a.length;r+=1)s=a[r],i[s]=J(n[s],e,t,o,s);e.pop(),t.pop()}else i=n;return i}var V=new x;V.tokenize=function(n){return n.slice()};V.join=V.removeEmpty=function(n){return n};const ce={component:W},K="rgba(255, 0, 0, 0.2)",ee="rgba(155, 185, 85, 0.2)",Q=({type:n,children:e})=>L.jsx("span",{style:{background:n==="base"?K:ee},children:e}),U=({result:n,type:e,value:t,onChange:o})=>{const u=z.useRef(null);return z.useEffect(()=>{if(u.current)return W(u.current,{multiline:!0,onChange:o})},[]),L.jsx("div",{ref:u,style:{background:"white",padding:4,flex:1},children:t.split(`
`).map((r,i)=>{const a=n[i];return L.jsx("div",{style:a?{background:e==="base"?K:ee}:void 0,children:r?Array.isArray(a)?a.map((s,l)=>!s.added&&!s.removed?s.value:e==="base"&&s.added||e==="target"&&s.removed?null:L.jsx(Q,{type:e,children:s.value},l)):a?L.jsx(Q,{type:e,children:r}):r:L.jsx("br",{})},i)})})},R={render:()=>{const[n,e]=z.useState(`This line is removed on the right.
just some text
abcd
efgh
Some more text
Some more text
Some more text`),[t,o]=z.useState(`just some text
abcz
zzzzefgh
Some more text.
This line is removed on the left.`),u=z.useMemo(()=>{const r=f=>(f.endsWith(`
`)?f.slice(0,-1):f).split(`
`),i=ie(n,t);let a=0,s=0;const l={},c={};for(let f=0;f<i.length;f++){const{removed:h,added:g,value:m}=i[f],d=r(m);if(!h&&!g&&(a+=d.length,s+=d.length),h){const C=i[f+1];if(C&&C.added){const T=r(C.value),w=Math.max(d.length,T.length);for(let y=0;y<w;y++){const v=d[y],p=T[y];if(v!=null&&p!=null){const D=te(v,p);l[a]=D,c[s]=D}v!=null&&(l[a]||(l[a]=!0),a++),p!=null&&(c[s]||(c[s]=!0),s++)}f++;continue}for(const T of d)l[a]=!0,a++}if(g)for(const C of d)c[s]=!0,s++}return{base:l,target:c}},[n,t]);return L.jsxs("div",{style:{display:"flex",gap:4,width:"100vw"},children:[L.jsx(U,{type:"base",result:u.base,value:n,onChange:e}),L.jsx(U,{type:"target",result:u.target,value:t,onChange:o})]})}};var X,Y,S;R.parameters={...R.parameters,docs:{...(X=R.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    const [baseText, setBaseText] = useState("This line is removed on the right.\\njust some text\\nabcd\\nefgh\\nSome more text\\nSome more text\\nSome more text");
    const [targetText, setTargetText] = useState("just some text\\nabcz\\nzzzzefgh\\nSome more text.\\nThis line is removed on the left.");
    const result = useMemo(() => {
      const getLines = (v: string) => {
        const trimmedValue = v.endsWith("\\n") ? v.slice(0, -1) : v;
        return trimmedValue.split("\\n");
      };
      const diff = diffLines(baseText, targetText);
      let baseCount = 0;
      let targetCount = 0;
      const base: DiffResult = {};
      const target: DiffResult = {};
      for (let diffIndex = 0; diffIndex < diff.length; diffIndex++) {
        const {
          removed,
          added,
          value
        } = diff[diffIndex]!;
        const lines = getLines(value);
        if (!removed && !added) {
          baseCount += lines.length;
          targetCount += lines.length;
        }
        if (removed) {
          const next = diff[diffIndex + 1];
          if (next && next.added) {
            const nextLines = getLines(next.value);
            const maxLength = Math.max(lines.length, nextLines.length);
            for (let i = 0; i < maxLength; i++) {
              const b = lines[i];
              const t = nextLines[i];
              if (b != null && t != null) {
                const charDiff = diffChars(b, t);
                base[baseCount] = charDiff;
                target[targetCount] = charDiff;
              }
              if (b != null) {
                if (!base[baseCount]) {
                  base[baseCount] = true;
                }
                baseCount++;
              }
              if (t != null) {
                if (!target[targetCount]) {
                  target[targetCount] = true;
                }
                targetCount++;
              }
            }
            diffIndex++;
            continue;
          }
          for (const l of lines) {
            base[baseCount] = true;
            baseCount++;
          }
        }
        if (added) {
          for (const l of lines) {
            target[targetCount] = true;
            targetCount++;
          }
        }
      }
      return {
        base,
        target
      };
    }, [baseText, targetText]);
    return <div style={{
      display: "flex",
      gap: 4,
      width: "100vw"
    }}>
        <Editor type="base" result={result.base} value={baseText} onChange={setBaseText} />
        <Editor type="target" result={result.target} value={targetText} onChange={setTargetText} />
      </div>;
  }
}`,...(S=(Y=R.parameters)==null?void 0:Y.docs)==null?void 0:S.source}}};const ve=["WithDiff"];export{R as WithDiff,ve as __namedExportsOrder,ce as default};
