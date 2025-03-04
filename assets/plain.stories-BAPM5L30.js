import{e as u,j as e}from"./editable-DhsJOrGV.js";import{r}from"./index-RYns6xqu.js";import{p as o}from"./plain-DNmB8OPO.js";const G={component:u},d={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}},m={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Hello World.");return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o(),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a||e.jsx("br",{})})}},p={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Hello world."),[t,i]=r.useState(!1),c=r.useRef(null);return r.useEffect(()=>{if(!n.current)return;const l=u(n.current,{schema:o(),onChange:s});return c.current=l,l.dispose},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!c.current)return;const l=!t;c.current.readonly(l),i(l)},children:t?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:t?"gray":void 0},children:a||e.jsx("br",{})})]})}},f={render:()=>{const n=r.useRef(null),[a,s]=r.useState("");return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o(),onChange:s}).dispose},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:a}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},h={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:a.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}},v={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:a.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}},g={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[t,i]=r.useState("dolor");r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:s}).dispose},[]);const c=t?new RegExp(`(${t})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:t,onChange:l=>i(l.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:a.split(`
`).map((l,O)=>e.jsx("div",{children:l?(c?l.split(c):[l]).map((b,x)=>b===t?e.jsx("mark",{children:b},x):e.jsx("span",{children:b},x)):e.jsx("br",{})},O))})]})}};var y,S,j;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(j=(S=d.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var k,E,R;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema(),
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value ? value : <br />}
      </div>;
  }
}`,...(R=(E=m.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var w,C,V;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`Hello world.\`);
    const [readonly, setReadonly] = useState(false);
    const handle = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      const editor = editable(ref.current, {
        schema: plainSchema(),
        onChange: setValue
      });
      handle.current = editor;
      return editor.dispose;
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          if (!handle.current) return;
          const value = !readonly;
          handle.current.readonly(value);
          setReadonly(value);
        }}>
            {readonly ? "editable" : "readonly"}
          </button>
        </div>
        <div ref={ref} style={{
        background: "white",
        color: readonly ? "gray" : undefined
      }}>
          {value ? value : <br />}
        </div>
      </div>;
  }
}`,...(V=(C=p.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var H,T,M;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema(),
        onChange: setValue
      }).dispose;
    }, []);
    return <>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }} aria-placeholder="Enter some text...">
          {value}
        </div>
        <style>{\`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
\`}</style>
      </>;
  }
}`,...(M=(T=f.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var q,D,L;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      direction: "rtl",
      background: "white"
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(L=(D=h.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var W,F,_;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      writingMode: "vertical-rl",
      background: "white",
      height: 400
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(_=(F=v.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var P,U,$;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).dispose;
    }, []);
    const reg = searchText ? new RegExp(\`(\${searchText})\`) : null;
    return <div>
        <div>
          <label htmlFor="search">search word</label>
          <input name="search" value={searchText} onChange={e => setSearchText(e.target.value)} />
        </div>
        <div ref={ref} style={{
        background: "white"
      }}>
          {value.split("\\n").map((r, i) => <div key={i}>
              {r ? (reg ? r.split(reg) : [r]).map((t, j) => t === searchText ? <mark key={j}>{t}</mark> : <span key={j}>{t}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...($=(U=g.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};const I=["Multiline","Singleline","Readonly","Placeholder","Rtl","Vertical","Highlight"];export{g as Highlight,d as Multiline,f as Placeholder,p as Readonly,h as Rtl,m as Singleline,v as Vertical,I as __namedExportsOrder,G as default};
