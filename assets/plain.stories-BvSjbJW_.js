import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./iframe-BHfNkVHB.js";import{I as w,D as j}from"./commands-Cg-bsjeH.js";import{e as i}from"./editable-Bw8WWABE.js";import{p as u}from"./plain-DRmLrJzH.js";import"./preload-helper-D9Z9MdNV.js";const D={component:i},d={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}},m={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Hello world.");return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u(),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a||e.jsx("br",{})})}},f={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Hello world."),[t,l]=r.useState(!1),c=r.useRef(null);return r.useEffect(()=>{if(!n.current)return;const o=i(n.current,{schema:u(),onChange:s});return c.current=o,o.dispose},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!c.current)return;const o=!t;c.current.readonly(o),l(o)},children:t?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:t?"gray":void 0},children:a||e.jsx("br",{})})]})}},p={render:()=>{const n=r.useRef(null),[a,s]=r.useState("");return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u(),onChange:s}).dispose},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:a}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},h={render:()=>{const n=r.useRef(null),[a,s]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[t,l]=r.useState("dolor");r.useEffect(()=>{if(n.current)return i(n.current,{schema:u({multiline:!0}),onChange:s}).dispose},[]);const c=t?new RegExp(`(${t})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:t,onChange:o=>l(o.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:a.split(`
`).map((o,y)=>e.jsx("div",{children:o?(c?o.split(c):[o]).map((k,S)=>k===t?e.jsx("mark",{children:k},S):e.jsx("span",{children:k},S)):e.jsx("br",{})},y))})]})}},v={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`),t=r.useRef(null);r.useEffect(()=>{if(n.current)return(t.current=i(n.current,{schema:u({multiline:!0}),onChange:s})).dispose},[]);const[l,c]=r.useState("text");return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:4},children:[e.jsxs("div",{children:[e.jsx("input",{value:l,onChange:o=>{c(o.target.value)}}),e.jsx("button",{onClick:()=>{t.current?.command(w,l)},children:"insert"})]}),e.jsx("div",{children:e.jsx("button",{onClick:()=>{t.current?.command(j)},children:"delete selection"})}),e.jsxs("div",{children:[e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","forward","character"),n.current?.focus()},children:"move forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","backward","character"),n.current?.focus()},children:"move backward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","forward","character"),n.current?.focus()},children:"move focus forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","backward","character"),n.current?.focus()},children:"move focus backward"})]})]}),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((o,y)=>e.jsx("div",{children:o||e.jsx("br",{})},y))})]})}},g={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u({multiline:!0}),isBlock:t=>!!t.dataset.line,onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((t,l)=>e.jsx("span",{"data-line":!0,style:{display:"block"},children:t||e.jsx("br",{})},l))})}},b={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}},x={render:()=>{const n=r.useRef(null),[a,s]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return i(n.current,{schema:u({multiline:!0}),onChange:s}).dispose},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
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
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.");
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
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
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
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
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
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};const M=["Multiline","Singleline","Readonly","Placeholder","Highlight","Command","SpanAsBlock","Rtl","Vertical"];export{v as Command,h as Highlight,d as Multiline,p as Placeholder,f as Readonly,b as Rtl,m as Singleline,g as SpanAsBlock,x as Vertical,M as __namedExportsOrder,D as default};
