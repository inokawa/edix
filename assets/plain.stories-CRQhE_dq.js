import{e as u,j as e,I as Q,D as X}from"./editable-Bs_Ez4U6.js";import{r}from"./index-RYns6xqu.js";import{p as o}from"./plain-COvg-UyN.js";const ne={component:u},c={render:()=>{const n=r.useRef(null),[s,l]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:l}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}},p={render:()=>{const n=r.useRef(null),[s,l]=r.useState("Hello World.");return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o(),onChange:l}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s||e.jsx("br",{})})}},m={render:()=>{const n=r.useRef(null),[s,l]=r.useState("Hello world."),[t,i]=r.useState(!1),d=r.useRef(null);return r.useEffect(()=>{if(!n.current)return;const a=u(n.current,{schema:o(),onChange:l});return d.current=a,a.dispose},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!d.current)return;const a=!t;d.current.readonly(a),i(a)},children:t?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:t?"gray":void 0},children:s||e.jsx("br",{})})]})}},f={render:()=>{const n=r.useRef(null),[s,l]=r.useState("");return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o(),onChange:l}).dispose},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:s}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},h={render:()=>{const n=r.useRef(null),[s,l]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[t,i]=r.useState("dolor");r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:l}).dispose},[]);const d=t?new RegExp(`(${t})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:t,onChange:a=>i(a.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:s.split(`
`).map((a,y)=>e.jsx("div",{children:a?(d?a.split(d):[a]).map((k,S)=>k===t?e.jsx("mark",{children:k},S):e.jsx("span",{children:k},S)):e.jsx("br",{})},y))})]})}},v={render:()=>{const n=r.useRef(null),[s,l]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`),t=r.useRef(null);r.useEffect(()=>{if(n.current)return(t.current=u(n.current,{schema:o({multiline:!0}),onChange:l})).dispose},[]);const[i,d]=r.useState("text");return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:4},children:[e.jsxs("div",{children:[e.jsx("input",{value:i,onChange:a=>{d(a.target.value)}}),e.jsx("button",{onClick:()=>{var a;(a=t.current)==null||a.command(Q,i)},children:"insert"})]}),e.jsx("button",{onClick:()=>{var a;(a=t.current)==null||a.command(X)},children:"delete selection"})]}),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((a,y)=>e.jsx("div",{children:a||e.jsx("br",{})},y))})]})}},g={render:()=>{const n=r.useRef(null),[s,l]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),isBlock:t=>!!t.dataset.line,onChange:l}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((t,i)=>e.jsx("span",{"data-line":!0,style:{display:"block"},children:t||e.jsx("br",{})},i))})}},x={render:()=>{const n=r.useRef(null),[s,l]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:l}).dispose},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:s.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}},b={render:()=>{const n=r.useRef(null),[s,l]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return u(n.current,{schema:o({multiline:!0}),onChange:l}).dispose},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:s.split(`
`).map((t,i)=>e.jsx("div",{children:t||e.jsx("br",{})},i))})}};var j,C,E;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(E=(C=c.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var R,V,w;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(w=(V=p.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var H,T,D;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(D=(T=m.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var M,L,q;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(q=(L=f.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var W,B,F;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(F=(B=h.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var I,_,A;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    const handle = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return (handle.current = editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      })).dispose;
    }, []);
    const [text, setText] = useState("text");
    return <div>
        <div style={{
        padding: 4
      }}>
          <div>
            <input value={text} onChange={e => {
            setText(e.target.value);
          }} />
            <button onClick={() => {
            handle.current?.command(InsertText, text);
          }}>
              insert
            </button>
          </div>
          <button onClick={() => {
          handle.current?.command(Delete);
        }}>
            delete selection
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }}>
          {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
        </div>
      </div>;
  }
}`,...(A=(_=v.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var P,U,$;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: plainSchema({
          multiline: true
        }),
        isBlock: node => !!node.dataset.line,
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <span key={i} data-line style={{
        display: "block"
      }}>
            {r ? r : <br />}
          </span>)}
      </div>;
  }
}`,...($=(U=g.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var O,z,G;x.parameters={...x.parameters,docs:{...(O=x.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(G=(z=x.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,N;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(N=(K=b.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};const re=["Multiline","Singleline","Readonly","Placeholder","Highlight","Command","SpanAsBlock","Rtl","Vertical"];export{v as Command,h as Highlight,c as Multiline,f as Placeholder,m as Readonly,x as Rtl,p as Singleline,g as SpanAsBlock,b as Vertical,re as __namedExportsOrder,ne as default};
