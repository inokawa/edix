import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-Dt85U81A.js";import{I as w,D as j}from"./commands-DbJpe6Pr.js";import{c}from"./plain-DY67hfZS.js";import"./preload-helper-PPVm8Dsz.js";import"./singleline-Dp1OMIwt.js";const D={component:c},u={render:()=>{const n=t.useRef(null),[r,s]=t.useState("");return t.useEffect(()=>{if(n.current)return c({text:r,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.split(`
`).map((o,i)=>e.jsx("div",{children:o||e.jsx("br",{})},i))})}},l={render:()=>{const n=t.useRef(null),[r,s]=t.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return c({text:r,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.split(`
`).map((o,i)=>e.jsx("div",{children:o||e.jsx("br",{})},i))})}},f={render:()=>{const n=t.useRef(null),[r,s]=t.useState("Hello world.");return t.useEffect(()=>{if(n.current)return c({text:r,singleline:!0,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r||e.jsx("br",{})})}},p={render:()=>{const n=t.useRef(null),[r,s]=t.useState("Hello world."),o=t.useMemo(()=>c({text:r,singleline:!0,onChange:s}),[]),[i,d]=t.useState(!1);return t.useEffect(()=>{if(n.current)return o.input(n.current)},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{const a=!i;o.readonly=a,d(a)},children:i?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:i?"gray":void 0},children:r||e.jsx("br",{})})]})}},x={render:()=>{const n=t.useRef(null),[r,s]=t.useState("");return t.useEffect(()=>{if(n.current)return c({text:r,singleline:!0,onChange:s}).input(n.current)},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:r}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},m={render:()=>{const n=t.useRef(null),[r,s]=t.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[o,i]=t.useState("dolor");t.useEffect(()=>{if(n.current)return c({text:r,onChange:s}).input(n.current)},[]);const d=o?new RegExp(`(${o})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:o,onChange:a=>i(a.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:r.split(`
`).map((a,y)=>e.jsx("div",{children:a?(d?a.split(d):[a]).map((k,T)=>k===o?e.jsx("mark",{children:k},T):e.jsx("span",{children:k},T)):e.jsx("br",{})},y))})]})}},g={render:()=>{const n=t.useRef(null),[r,s]=t.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`),o=t.useMemo(()=>c({text:r,onChange:s}),[]);t.useEffect(()=>{if(n.current)return o.input(n.current)},[]);const[i,d]=t.useState("text");return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:4},children:[e.jsxs("div",{children:[e.jsx("input",{value:i,onChange:a=>{d(a.target.value)}}),e.jsx("button",{onClick:()=>{o.apply(w,i)},children:"insert"})]}),e.jsx("div",{children:e.jsx("button",{onClick:()=>{o.apply(j)},children:"delete selection"})}),e.jsxs("div",{children:[e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","forward","character"),n.current?.focus()},children:"move forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("move","backward","character"),n.current?.focus()},children:"move backward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","forward","character"),n.current?.focus()},children:"move focus forward"}),e.jsx("button",{onClick:()=>{document.getSelection()?.modify("extend","backward","character"),n.current?.focus()},children:"move focus backward"})]})]}),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.split(`
`).map((a,y)=>e.jsx("div",{children:a||e.jsx("br",{})},y))})]})}},h={render:()=>{const n=t.useRef(null),[r,s]=t.useState(`Hello world.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return c({text:r,isBlock:o=>!!o.dataset.line,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.split(`
`).map((o,i)=>e.jsx("span",{"data-line":!0,style:{display:"block"},children:o||e.jsx("br",{})},i))})}},v={render:()=>{const n=t.useRef(null),[r,s]=t.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return t.useEffect(()=>{if(n.current)return c({text:r,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:r.split(`
`).map((o,i)=>e.jsx("div",{children:o||e.jsx("br",{})},i))})}},b={render:()=>{const n=t.useRef(null),[r,s]=t.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return t.useEffect(()=>{if(n.current)return c({text:r,onChange:s}).input(n.current)},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:r.split(`
`).map((o,i)=>e.jsx("div",{children:o||e.jsx("br",{})},i))})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {text.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {text.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...l.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("Hello world.");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        singleline: true,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {text ? text : <br />}
      </div>;
  }
}`,...f.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState(\`Hello world.\`);
    const editor = useMemo(() => createPlainEditor({
      text: text,
      singleline: true,
      onChange: setText
    }), []);
    const [readonly, setReadonly] = useState(false);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          const text = !readonly;
          editor.readonly = text;
          setReadonly(text);
        }}>
            {readonly ? "editable" : "readonly"}
          </button>
        </div>
        <div ref={ref} style={{
        background: "white",
        color: readonly ? "gray" : undefined
      }}>
          {text ? text : <br />}
        </div>
      </div>;
  }
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        singleline: true,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }} aria-placeholder="Enter some text...">
          {text}
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
}`,...x.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        onChange: setText
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
          {text.split("\\n").map((r, i) => <div key={i}>
              {r ? (reg ? r.split(reg) : [r]).map((t, j) => t === searchText ? <mark key={j}>{t}</mark> : <span key={j}>{t}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    const editor = useMemo(() => createPlainEditor({
      text: text,
      onChange: setText
    }), []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    const [insertText, setInsertText] = useState("text");
    return <div>
        <div style={{
        padding: 4
      }}>
          <div>
            <input value={insertText} onChange={e => {
            setInsertText(e.target.value);
          }} />
            <button onClick={() => {
            editor.apply(InsertText, insertText);
          }}>
              insert
            </button>
          </div>
          <div>
            <button onClick={() => {
            editor.apply(Delete);
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
          {text.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
        </div>
      </div>;
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("Hello world.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        isBlock: node => !!node.dataset.line,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {text.split("\\n").map((r, i) => <span key={i} data-line style={{
        display: "block"
      }}>
            {r ? r : <br />}
          </span>)}
      </div>;
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      direction: "rtl",
      background: "white"
    }}>
        {text.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [text, setText] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text: text,
        onChange: setText
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      writingMode: "vertical-rl",
      background: "white",
      height: 400
    }}>
        {text.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...b.parameters?.docs?.source}}};const P=["Empty","Multiline","Singleline","Readonly","Placeholder","Highlight","Command","SpanAsBlock","Rtl","Vertical"];export{g as Command,u as Empty,m as Highlight,l as Multiline,x as Placeholder,p as Readonly,v as Rtl,f as Singleline,h as SpanAsBlock,b as Vertical,P as __namedExportsOrder,D as default};
