import{j as v}from"./jsx-runtime-u17CrQMm.js";import{r as w}from"./iframe-CIcl_1Q4.js";import{c as y}from"./plain-DhyJrdaE.js";import"./preload-helper-PPVm8Dsz.js";import"./singleline-CjEhMgYZ.js";class z{diff(e,n,t={}){let o;typeof t=="function"?(o=t,t={}):"callback"in t&&(o=t.callback);const a=this.castInput(e,t),d=this.castInput(n,t),i=this.removeEmpty(this.tokenize(a,t)),s=this.removeEmpty(this.tokenize(d,t));return this.diffWithOptionsObj(i,s,t,o)}diffWithOptionsObj(e,n,t,o){var a;const d=u=>{if(u=this.postProcess(u,t),o){setTimeout(function(){o(u)},0);return}else return u},i=n.length,s=e.length;let l=1,r=i+s;t.maxEditLength!=null&&(r=Math.min(r,t.maxEditLength));const c=(a=t.timeout)!==null&&a!==void 0?a:1/0,x=Date.now()+c,m=[{oldPos:-1,lastComponent:void 0}];let C=this.extractCommon(m[0],n,e,0,t);if(m[0].oldPos+1>=s&&C+1>=i)return d(this.buildValues(m[0].lastComponent,n,e));let g=-1/0,T=1/0;const L=()=>{for(let u=Math.max(g,-l);u<=Math.min(T,l);u+=2){let h;const p=m[u-1],b=m[u+1];p&&(m[u-1]=void 0);let P=!1;if(b){const E=b.oldPos-u;P=b&&0<=E&&E<i}const j=p&&p.oldPos+1<s;if(!P&&!j){m[u]=void 0;continue}if(!j||P&&p.oldPos<b.oldPos?h=this.addToPath(b,!0,!1,0,t):h=this.addToPath(p,!1,!0,1,t),C=this.extractCommon(h,n,e,u,t),h.oldPos+1>=s&&C+1>=i)return d(this.buildValues(h.lastComponent,n,e))||!0;m[u]=h,h.oldPos+1>=s&&(T=Math.min(T,u-1)),C+1>=i&&(g=Math.max(g,u+1))}l++};if(o)(function u(){setTimeout(function(){if(l>r||Date.now()>x)return o(void 0);L()||u()},0)})();else for(;l<=r&&Date.now()<=x;){const u=L();if(u)return u}}addToPath(e,n,t,o,a){const d=e.lastComponent;return d&&!a.oneChangePerToken&&d.added===n&&d.removed===t?{oldPos:e.oldPos+o,lastComponent:{count:d.count+1,added:n,removed:t,previousComponent:d.previousComponent}}:{oldPos:e.oldPos+o,lastComponent:{count:1,added:n,removed:t,previousComponent:d}}}extractCommon(e,n,t,o,a){const d=n.length,i=t.length;let s=e.oldPos,l=s-o,r=0;for(;l+1<d&&s+1<i&&this.equals(t[s+1],n[l+1],a);)l++,s++,r++,a.oneChangePerToken&&(e.lastComponent={count:1,previousComponent:e.lastComponent,added:!1,removed:!1});return r&&!a.oneChangePerToken&&(e.lastComponent={count:r,previousComponent:e.lastComponent,added:!1,removed:!1}),e.oldPos=s,l}equals(e,n,t){return t.comparator?t.comparator(e,n):e===n||!!t.ignoreCase&&e.toLowerCase()===n.toLowerCase()}removeEmpty(e){const n=[];for(let t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n}castInput(e,n){return e}tokenize(e,n){return Array.from(e)}join(e){return e.join("")}postProcess(e,n){return e}get useLongestToken(){return!1}buildValues(e,n,t){const o=[];let a;for(;e;)o.push(e),a=e.previousComponent,delete e.previousComponent,e=a;o.reverse();const d=o.length;let i=0,s=0,l=0;for(;i<d;i++){const r=o[i];if(r.removed)r.value=this.join(t.slice(l,l+r.count)),l+=r.count;else{if(!r.added&&this.useLongestToken){let c=n.slice(s,s+r.count);c=c.map(function(x,m){const C=t[l+m];return C.length>x.length?C:x}),r.value=this.join(c)}else r.value=this.join(n.slice(s,s+r.count));s+=r.count,r.added||(l+=r.count)}}return o}}class W extends z{}const R=new W;function V(f,e,n){return R.diff(f,e,n)}class A extends z{constructor(){super(...arguments),this.tokenize=q}equals(e,n,t){return t.ignoreWhitespace?((!t.newlineIsToken||!e.includes(`
`))&&(e=e.trim()),(!t.newlineIsToken||!n.includes(`
`))&&(n=n.trim())):t.ignoreNewlineAtEof&&!t.newlineIsToken&&(e.endsWith(`
`)&&(e=e.slice(0,-1)),n.endsWith(`
`)&&(n=n.slice(0,-1))),super.equals(e,n,t)}}const k=new A;function _(f,e,n){return k.diff(f,e,n)}function q(f,e){e.stripTrailingCr&&(f=f.replace(/\r\n/g,`
`));const n=[],t=f.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(let o=0;o<t.length;o++){const a=t[o];o%2&&!e.newlineIsToken?n[n.length-1]+=a:n.push(a)}return n}const J={component:y},M="rgba(255, 0, 0, 0.2)",O="rgba(155, 185, 85, 0.2)",I=({type:f,children:e})=>v.jsx("span",{style:{background:f==="base"?M:O},children:e}),S=({result:f,type:e,text:n,onChange:t})=>{const o=w.useRef(null);return w.useEffect(()=>{if(o.current)return y({text:n,onChange:t}).input(o.current)},[]),v.jsx("div",{ref:o,style:{background:"white",padding:4,flex:1},children:n.split(`
`).map((a,d)=>{const i=f[d];return v.jsx("div",{style:i?{background:e==="base"?M:O}:void 0,children:a?Array.isArray(i)?i.map((s,l)=>!s.added&&!s.removed?s.value:e==="base"&&s.added||e==="target"&&s.removed?null:v.jsx(I,{type:e,children:s.value},l)):i?v.jsx(I,{type:e,children:a}):a:v.jsx("br",{})},d)})})},D={render:()=>{const[f,e]=w.useState(`This line is removed on the right.
just some text
abcd
efgh
Some more text
Some more text
Some more text`),[n,t]=w.useState(`just some text
abcz
zzzzefgh
Some more text.
This line is removed on the left.`),o=w.useMemo(()=>{const a=c=>(c.endsWith(`
`)?c.slice(0,-1):c).split(`
`),d=_(f,n);let i=0,s=0;const l={},r={};for(let c=0;c<d.length;c++){const{removed:x,added:m,value:C}=d[c],g=a(C);if(!x&&!m&&(i+=g.length,s+=g.length),x){const T=d[c+1];if(T&&T.added){const L=a(T.value),u=Math.max(g.length,L.length);for(let h=0;h<u;h++){const p=g[h],b=L[h];if(p!=null&&b!=null){const P=V(p,b);l[i]=P,r[s]=P}p!=null&&(l[i]||(l[i]=!0),i++),b!=null&&(r[s]||(r[s]=!0),s++)}c++;continue}for(const L of g)l[i]=!0,i++}if(m)for(const T of g)r[s]=!0,s++}return{base:l,target:r}},[f,n]);return v.jsxs("div",{style:{display:"flex",gap:4,width:"100vw"},children:[v.jsx(S,{type:"base",result:o.base,text:f,onChange:e}),v.jsx(S,{type:"target",result:o.target,text:n,onChange:t})]})}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
        <Editor type="base" result={result.base} text={baseText} onChange={setBaseText} />
        <Editor type="target" result={result.target} text={targetText} onChange={setTargetText} />
      </div>;
  }
}`,...D.parameters?.docs?.source}}};const K=["WithDiff"];export{D as WithDiff,K as __namedExportsOrder,J as default};
