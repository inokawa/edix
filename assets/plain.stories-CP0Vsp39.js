import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r}from"./iframe-DtaWnhEU.js";import{I as j,D as C}from"./commands-B5mBJQOH.js";import{c as u}from"./editor-CDmih3Kc.js";import{p as l}from"./plain-DMmhstEn.js";import"./preload-helper-PPVm8Dsz.js";const D={component:u},d={render:()=>{const n=r.useRef(null),[t,o]=r.useState("");return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t.split(`
`).map((a,s)=>e.jsx("div",{children:a||e.jsx("br",{})},s))})}},m={render:()=>{const n=r.useRef(null),[t,o]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t.split(`
`).map((a,s)=>e.jsx("div",{children:a||e.jsx("br",{})},s))})}},p={render:()=>{const n=r.useRef(null),[t,o]=r.useState("Hello world.");return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l(),onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t||e.jsx("br",{})})}},f={render:()=>{const n=r.useRef(null),[t,o]=r.useState("Hello world."),a=r.useMemo(()=>u({doc:t,schema:l(),onChange:o}),[]),[s,c]=r.useState(!1);return r.useEffect(()=>{if(n.current)return a.input(n.current)},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{const i=!s;a.readonly(i),c(i)},children:s?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:s?"gray":void 0},children:t||e.jsx("br",{})})]})}},v={render:()=>{const n=r.useRef(null),[t,o]=r.useState("");return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l(),onChange:o}).input(n.current)},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:t}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},h={render:()=>{const n=r.useRef(null),[t,o]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[a,s]=r.useState("dolor");r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),onChange:o}).input(n.current)},[]);const c=a?new RegExp(`(${a})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:a,onChange:i=>s(i.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:t.split(`
`).map((i,k)=>e.jsx("div",{children:i?(c?i.split(c):[i]).map((S,w)=>S===a?e.jsx("mark",{children:S},w):e.jsx("span",{children:S},w)):e.jsx("br",{})},k))})]})}},g={render:()=>{const n=r.useRef(null),[t,o]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`),a=r.useMemo(()=>u({doc:t,schema:l({multiline:!0}),onChange:o}),[]);r.useEffect(()=>{if(n.current)return a.input(n.current)},[]);const[s,c]=r.useState("text");return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:4},children:[e.jsxs("div",{children:[e.jsx("input",{value:s,onChange:i=>{c(i.target.value)}}),e.jsx("button",{onClick:()=>{a.command(j,s)},children:"insert"})]}),e.jsx("div",{children:e.jsx("button",{onClick:()=>{a.command(C)},children:"delete selection"})}),e.jsxs("div",{children:[e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","forward","character"),n.current?.focus()},children:"move forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","backward","character"),n.current?.focus()},children:"move backward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","forward","character"),n.current?.focus()},children:"move focus forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","backward","character"),n.current?.focus()},children:"move focus backward"})]})]}),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t.split(`
`).map((i,k)=>e.jsx("div",{children:i||e.jsx("br",{})},k))})]})}},x={render:()=>{const n=r.useRef(null),[t,o]=r.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),isBlock:a=>!!a.dataset.line,onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:t.split(`
`).map((a,s)=>e.jsx("span",{"data-line":!0,style:{display:"block"},children:a||e.jsx("br",{})},s))})}},b={render:()=>{const n=r.useRef(null),[t,o]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:t.split(`
`).map((a,s)=>e.jsx("div",{children:a||e.jsx("br",{})},s))})}},y={render:()=>{const n=r.useRef(null),[t,o]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return u({doc:t,schema:l({multiline:!0}),onChange:o}).input(n.current)},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:t.split(`
`).map((a,s)=>e.jsx("div",{children:a||e.jsx("br",{})},s))})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).input(ref.current);
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
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema(),
        onChange: setValue
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value ? value : <br />}
      </div>;
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`Hello world.\`);
    const editor = useMemo(() => createEditor({
      doc: value,
      schema: plainSchema(),
      onChange: setValue
    }), []);
    const [readonly, setReadonly] = useState(false);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          const value = !readonly;
          editor.readonly(value);
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
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema(),
        onChange: setValue
      }).input(ref.current);
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
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).input(ref.current);
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
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    const editor = useMemo(() => createEditor({
      doc: value,
      schema: plainSchema({
        multiline: true
      }),
      onChange: setValue
    }), []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
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
            editor.command(InsertText, text);
          }}>
              insert
            </button>
          </div>
          <div>
            <button onClick={() => {
            editor.command(Delete);
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
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        isBlock: node => !!node.dataset.line,
        onChange: setValue
      }).input(ref.current);
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
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      direction: "rtl",
      background: "white"
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: plainSchema({
          multiline: true
        }),
        onChange: setValue
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      writingMode: "vertical-rl",
      background: "white",
      height: 400
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...y.parameters?.docs?.source}}};const L=["Empty","Multiline","Singleline","Readonly","Placeholder","Highlight","Command","SpanAsBlock","Rtl","Vertical"];export{g as Command,d as Empty,h as Highlight,m as Multiline,v as Placeholder,f as Readonly,b as Rtl,p as Singleline,x as SpanAsBlock,y as Vertical,L as __namedExportsOrder,D as default};
