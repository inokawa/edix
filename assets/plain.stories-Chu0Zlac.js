import{e as i,j as e}from"./editable-C-hQE_wO.js";import{r}from"./index-RYns6xqu.js";const A={component:i},c={render:()=>{const n=r.useRef(null),[a,l]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return i(n.current,{multiline:!0,onChange:l})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((t,s)=>e.jsx("div",{children:t||e.jsx("br",{})},s))})}},d={render:()=>{const n=r.useRef(null),[a,l]=r.useState("Hello World.");return r.useEffect(()=>{if(n.current)return i(n.current,{onChange:l})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a||e.jsx("br",{})})}},f={render:()=>{const n=r.useRef(null),[a,l]=r.useState("Hello world."),[t,s]=r.useState(!1),o=r.useRef(null);return r.useEffect(()=>{if(n.current)return o.current=i(n.current,{onChange:l})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!o.current)return;const u=!t;o.current.readonly(u),s(u)},children:t?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:t?"gray":void 0},children:a||e.jsx("br",{})})]})}},p={render:()=>{const n=r.useRef(null),[a,l]=r.useState("");return r.useEffect(()=>{if(n.current)return i(n.current,{onChange:l})},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},"aria-placeholder":"Enter some text...",children:a}),e.jsx("style",{children:`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`})]})}},m={render:()=>{const n=r.useRef(null),[a,l]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return i(n.current,{multiline:!0,onChange:l})},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:a.split(`
`).map((t,s)=>e.jsx("div",{children:t||e.jsx("br",{})},s))})}},v={render:()=>{const n=r.useRef(null),[a,l]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return i(n.current,{multiline:!0,onChange:l})},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:a.split(`
`).map((t,s)=>e.jsx("div",{children:t||e.jsx("br",{})},s))})}},h={render:()=>{const n=r.useRef(null),[a,l]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[t,s]=r.useState("dolor");r.useEffect(()=>{if(n.current)return i(n.current,{multiline:!0,onChange:l})},[]);const o=t?new RegExp(`(${t})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"search word"}),e.jsx("input",{name:"search",value:t,onChange:u=>s(u.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:a.split(`
`).map((u,U)=>e.jsx("div",{children:u?(o?u.split(o):[u]).map((g,$)=>e.jsx("span",{style:{background:g===t?"yellow":void 0},children:g},$)):e.jsx("br",{})},U))})]})}};var b,x,y;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(y=(x=c.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var j,E,S;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value ? value : <br />}
      </div>;
  }
}`,...(S=(E=d.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var k,w,R;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`Hello world.\`);
    const [readonly, setReadonly] = useState(false);
    const handle = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return handle.current = editable(ref.current, {
        onChange: setValue
      });
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
}`,...(R=(w=f.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var C,V,H;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue
      });
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
}`,...(H=(V=p.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var T,M,q;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      direction: "rtl",
      background: "white"
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(q=(M=m.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var D,L,W;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      writingMode: "vertical-rl",
      background: "white",
      height: 400
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(W=(L=v.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var F,_,P;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
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
              {r ? (reg ? r.split(reg) : [r]).map((t, j) => <span key={j} style={{
            background: t === searchText ? "yellow" : undefined
          }}>
                    {t}
                  </span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(P=(_=h.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};const B=["Multiline","Singleline","Readonly","Placeholder","Rtl","Vertical","Highlight"];export{h as Highlight,c as Multiline,p as Placeholder,f as Readonly,m as Rtl,d as Singleline,v as Vertical,B as __namedExportsOrder,A as default};
