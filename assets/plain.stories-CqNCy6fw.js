import{e as u,j as e,I as Q,D as X}from"./editable-DBrppSM8.js";import{r as t}from"./index-Bk3ZmH4I.js";import{p as c}from"./plain-FT3TazNV.js";const ne={component:u},m={render:()=>{const n=t.useRef(null),[s,o]=t.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c({multiline:!0}),onChange:o}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((a,i)=>e.jsx("div",{children:a||e.jsx("br",{})},i))})}},f={render:()=>{const n=t.useRef(null),[s,o]=t.useState("Hello World.");return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c(),onChange:o}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s||e.jsx("br",{})})}},p={render:()=>{const n=t.useRef(null),[s,o]=t.useState("Hello world."),[a,i]=t.useState(!1),d=t.useRef(null);return t.useEffect(()=>{if(!n.current)return;const r=u(n.current,{schema:c(),onChange:o});return d.current=r,r.dispose},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!d.current)return;const r=!a;d.current.readonly(r),i(r)},children:a?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:a?"gray":void 0},children:s||e.jsx("br",{})})]})}},h={render:()=>{const n=t.useRef(null),[s,o]=t.useState("");return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c(),onChange:o}).dispose},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:s}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},v={render:()=>{const n=t.useRef(null),[s,o]=t.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[a,i]=t.useState("dolor");t.useEffect(()=>{if(n.current)return u(n.current,{schema:c({multiline:!0}),onChange:o}).dispose},[]);const d=a?new RegExp(`(${a})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:a,onChange:r=>i(r.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:s.split(`
`).map((r,l)=>e.jsx("div",{children:r?(d?r.split(d):[r]).map((k,S)=>k===a?e.jsx("mark",{children:k},S):e.jsx("span",{children:k},S)):e.jsx("br",{})},l))})]})}},g={render:()=>{const n=t.useRef(null),[s,o]=t.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`),a=t.useRef(null);t.useEffect(()=>{if(n.current)return(a.current=u(n.current,{schema:c({multiline:!0}),onChange:o})).dispose},[]);const[i,d]=t.useState("text");return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:4},children:[e.jsxs("div",{children:[e.jsx("input",{value:i,onChange:r=>{d(r.target.value)}}),e.jsx("button",{onClick:()=>{var r;(r=a.current)==null||r.command(Q,i)},children:"insert"})]}),e.jsx("div",{children:e.jsx("button",{onClick:()=>{var r;(r=a.current)==null||r.command(X)},children:"delete selection"})}),e.jsxs("div",{children:[e.jsx("button",{onClick:()=>{var r,l;(r=document.getSelection())==null||r.modify("move","forward","character"),(l=n.current)==null||l.focus()},children:"move forward"}),e.jsx("button",{onClick:()=>{var r,l;(r=document.getSelection())==null||r.modify("move","backward","character"),(l=n.current)==null||l.focus()},children:"move backward"}),e.jsx("button",{onClick:()=>{var r,l;(r=document.getSelection())==null||r.modify("extend","forward","character"),(l=n.current)==null||l.focus()},children:"move focus forward"}),e.jsx("button",{onClick:()=>{var r,l;(r=document.getSelection())==null||r.modify("extend","backward","character"),(l=n.current)==null||l.focus()},children:"move focus backward"})]})]}),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((r,l)=>e.jsx("div",{children:r||e.jsx("br",{})},l))})]})}},b={render:()=>{const n=t.useRef(null),[s,o]=t.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c({multiline:!0}),isBlock:a=>!!a.dataset.line,onChange:o}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((a,i)=>e.jsx("span",{"data-line":!0,style:{display:"block"},children:a||e.jsx("br",{})},i))})}},x={render:()=>{const n=t.useRef(null),[s,o]=t.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c({multiline:!0}),onChange:o}).dispose},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:s.split(`
`).map((a,i)=>e.jsx("div",{children:a||e.jsx("br",{})},i))})}},y={render:()=>{const n=t.useRef(null),[s,o]=t.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return t.useEffect(()=>{if(n.current)return u(n.current,{schema:c({multiline:!0}),onChange:o}).dispose},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:s.split(`
`).map((a,i)=>e.jsx("div",{children:a||e.jsx("br",{})},i))})}};var j,C,w;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(w=(C=m.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var E,R,V;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(V=(R=f.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var H,T,D;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(D=(T=p.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var M,L,q;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(q=(L=h.parameters)==null?void 0:L.docs)==null?void 0:q.source}}};var W,B,F;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(F=(B=v.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var I,_,A;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
          <div>
            <button onClick={() => {
            handle.current?.command(Delete);
          }}>
              delete selection
            </button>
          </div>
          <div>
            <button onClick={() => {
            document.getSelection()?.modify("move", "forward", "character");
            ref.current?.focus();
          }}>
              move forward
            </button>
            <button onClick={() => {
            document.getSelection()?.modify("move", "backward", "character");
            ref.current?.focus();
          }}>
              move backward
            </button>
            <button onClick={() => {
            document.getSelection()?.modify("extend", "forward", "character");
            ref.current?.focus();
          }}>
              move focus forward
            </button>
            <button onClick={() => {
            document.getSelection()?.modify("extend", "backward", "character");
            ref.current?.focus();
          }}>
              move focus backward
            </button>
          </div>
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
}`,...(A=(_=g.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var P,U,$;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...($=(U=b.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var O,z,G;x.parameters={...x.parameters,docs:{...(O=x.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(G=(z=x.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var J,K,N;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(N=(K=y.parameters)==null?void 0:K.docs)==null?void 0:N.source}}};const re=["Multiline","Singleline","Readonly","Placeholder","Highlight","Command","SpanAsBlock","Rtl","Vertical"];export{g as Command,v as Highlight,m as Multiline,h as Placeholder,p as Readonly,x as Rtl,f as Singleline,b as SpanAsBlock,y as Vertical,re as __namedExportsOrder,ne as default};
