import{j as b}from"./jsx-runtime-u17CrQMm.js";import{r as w}from"./iframe-DusASNCG.js";import{c as y}from"./plain-B4mWsd59.js";import"./preload-helper-PPVm8Dsz.js";import"./editor-BpOc9elr.js";class z{diff(e,t,n={}){let o;typeof n=="function"?(o=n,n={}):"callback"in n&&(o=n.callback);const a=this.castInput(e,n),d=this.castInput(t,n),i=this.removeEmpty(this.tokenize(a,n)),s=this.removeEmpty(this.tokenize(d,n));return this.diffWithOptionsObj(i,s,n,o)}diffWithOptionsObj(e,t,n,o){var a;const d=u=>{if(u=this.postProcess(u,n),o){setTimeout(function(){o(u)},0);return}else return u},i=t.length,s=e.length;let l=1,r=i+s;n.maxEditLength!=null&&(r=Math.min(r,n.maxEditLength));const c=(a=n.timeout)!==null&&a!==void 0?a:1/0,x=Date.now()+c,m=[{oldPos:-1,lastComponent:void 0}];let C=this.extractCommon(m[0],t,e,0,n);if(m[0].oldPos+1>=s&&C+1>=i)return d(this.buildValues(m[0].lastComponent,t,e));let g=-1/0,T=1/0;const L=()=>{for(let u=Math.max(g,-l);u<=Math.min(T,l);u+=2){let h;const p=m[u-1],v=m[u+1];p&&(m[u-1]=void 0);let P=!1;if(v){const E=v.oldPos-u;P=v&&0<=E&&E<i}const j=p&&p.oldPos+1<s;if(!P&&!j){m[u]=void 0;continue}if(!j||P&&p.oldPos<v.oldPos?h=this.addToPath(v,!0,!1,0,n):h=this.addToPath(p,!1,!0,1,n),C=this.extractCommon(h,t,e,u,n),h.oldPos+1>=s&&C+1>=i)return d(this.buildValues(h.lastComponent,t,e))||!0;m[u]=h,h.oldPos+1>=s&&(T=Math.min(T,u-1)),C+1>=i&&(g=Math.max(g,u+1))}l++};if(o)(function u(){setTimeout(function(){if(l>r||Date.now()>x)return o(void 0);L()||u()},0)})();else for(;l<=r&&Date.now()<=x;){const u=L();if(u)return u}}addToPath(e,t,n,o,a){const d=e.lastComponent;return d&&!a.oneChangePerToken&&d.added===t&&d.removed===n?{oldPos:e.oldPos+o,lastComponent:{count:d.count+1,added:t,removed:n,previousComponent:d.previousComponent}}:{oldPos:e.oldPos+o,lastComponent:{count:1,added:t,removed:n,previousComponent:d}}}extractCommon(e,t,n,o,a){const d=t.length,i=n.length;let s=e.oldPos,l=s-o,r=0;for(;l+1<d&&s+1<i&&this.equals(n[s+1],t[l+1],a);)l++,s++,r++,a.oneChangePerToken&&(e.lastComponent={count:1,previousComponent:e.lastComponent,added:!1,removed:!1});return r&&!a.oneChangePerToken&&(e.lastComponent={count:r,previousComponent:e.lastComponent,added:!1,removed:!1}),e.oldPos=s,l}equals(e,t,n){return n.comparator?n.comparator(e,t):e===t||!!n.ignoreCase&&e.toLowerCase()===t.toLowerCase()}removeEmpty(e){const t=[];for(let n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t}castInput(e,t){return e}tokenize(e,t){return Array.from(e)}join(e){return e.join("")}postProcess(e,t){return e}get useLongestToken(){return!1}buildValues(e,t,n){const o=[];let a;for(;e;)o.push(e),a=e.previousComponent,delete e.previousComponent,e=a;o.reverse();const d=o.length;let i=0,s=0,l=0;for(;i<d;i++){const r=o[i];if(r.removed)r.value=this.join(n.slice(l,l+r.count)),l+=r.count;else{if(!r.added&&this.useLongestToken){let c=t.slice(s,s+r.count);c=c.map(function(x,m){const C=n[l+m];return C.length>x.length?C:x}),r.value=this.join(c)}else r.value=this.join(t.slice(s,s+r.count));s+=r.count,r.added||(l+=r.count)}}return o}}class W extends z{}const R=new W;function V(f,e,t){return R.diff(f,e,t)}class A extends z{constructor(){super(...arguments),this.tokenize=q}equals(e,t,n){return n.ignoreWhitespace?((!n.newlineIsToken||!e.includes(`
`))&&(e=e.trim()),(!n.newlineIsToken||!t.includes(`
`))&&(t=t.trim())):n.ignoreNewlineAtEof&&!n.newlineIsToken&&(e.endsWith(`
`)&&(e=e.slice(0,-1)),t.endsWith(`
`)&&(t=t.slice(0,-1))),super.equals(e,t,n)}}const k=new A;function _(f,e,t){return k.diff(f,e,t)}function q(f,e){e.stripTrailingCr&&(f=f.replace(/\r\n/g,`
`));const t=[],n=f.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(let o=0;o<n.length;o++){const a=n[o];o%2&&!e.newlineIsToken?t[t.length-1]+=a:t.push(a)}return t}const J={component:y},M="rgba(255, 0, 0, 0.2)",O="rgba(155, 185, 85, 0.2)",I=({type:f,children:e})=>b.jsx("span",{style:{background:f==="base"?M:O},children:e}),S=({result:f,type:e,value:t,onChange:n})=>{const o=w.useRef(null);return w.useEffect(()=>{if(o.current)return y({text:t,onChange:n}).input(o.current)},[]),b.jsx("div",{ref:o,style:{background:"white",padding:4,flex:1},children:t.split(`
`).map((a,d)=>{const i=f[d];return b.jsx("div",{style:i?{background:e==="base"?M:O}:void 0,children:a?Array.isArray(i)?i.map((s,l)=>!s.added&&!s.removed?s.value:e==="base"&&s.added||e==="target"&&s.removed?null:b.jsx(I,{type:e,children:s.value},l)):i?b.jsx(I,{type:e,children:a}):a:b.jsx("br",{})},d)})})},D={render:()=>{const[f,e]=w.useState(`This line is removed on the right.
just some text
abcd
efgh
Some more text
Some more text
Some more text`),[t,n]=w.useState(`just some text
abcz
zzzzefgh
Some more text.
This line is removed on the left.`),o=w.useMemo(()=>{const a=c=>(c.endsWith(`
`)?c.slice(0,-1):c).split(`
`),d=_(f,t);let i=0,s=0;const l={},r={};for(let c=0;c<d.length;c++){const{removed:x,added:m,value:C}=d[c],g=a(C);if(!x&&!m&&(i+=g.length,s+=g.length),x){const T=d[c+1];if(T&&T.added){const L=a(T.value),u=Math.max(g.length,L.length);for(let h=0;h<u;h++){const p=g[h],v=L[h];if(p!=null&&v!=null){const P=V(p,v);l[i]=P,r[s]=P}p!=null&&(l[i]||(l[i]=!0),i++),v!=null&&(r[s]||(r[s]=!0),s++)}c++;continue}for(const L of g)l[i]=!0,i++}if(m)for(const T of g)r[s]=!0,s++}return{base:l,target:r}},[f,t]);return b.jsxs("div",{style:{display:"flex",gap:4,width:"100vw"},children:[b.jsx(S,{type:"base",result:o.base,value:f,onChange:e}),b.jsx(S,{type:"target",result:o.target,value:t,onChange:n})]})}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};const K=["WithDiff"];export{D as WithDiff,K as __namedExportsOrder,J as default};
