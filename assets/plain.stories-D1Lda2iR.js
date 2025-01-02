import{e as s,j as e}from"./editable-D0d7ov5n.js";import{r}from"./index-RYns6xqu.js";const $={component:s},d={render:()=>{const n=r.useRef(null),[a,u]=r.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return r.useEffect(()=>{if(n.current)return s(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}},c={render:()=>{const n=r.useRef(null),[a,u]=r.useState("Hello World.");return r.useEffect(()=>{if(n.current)return s(n.current,{onChange:u})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a||e.jsx("br",{})})}},f={render:()=>{const n=r.useRef(null),[a,u]=r.useState("Hello world."),[t,l]=r.useState(!1),o=r.useRef(null);return r.useEffect(()=>{if(n.current)return o.current=s(n.current,{onChange:u})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!o.current)return;const i=!t;o.current.readonly(i),l(i)},children:t?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:t?"gray":void 0},children:a||e.jsx("br",{})})]})}},m={render:()=>{const n=r.useRef(null),[a,u]=r.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return r.useEffect(()=>{if(n.current)return s(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}},p={render:()=>{const n=r.useRef(null),[a,u]=r.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return r.useEffect(()=>{if(n.current)return s(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:a.split(`
`).map((t,l)=>e.jsx("div",{children:t||e.jsx("br",{})},l))})}},v={render:()=>{const n=r.useRef(null),[a,u]=r.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[t,l]=r.useState("dolor");r.useEffect(()=>{if(n.current)return s(n.current,{multiline:!0,onChange:u})},[]);const o=t?new RegExp(`(${t})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"input search word: "}),e.jsx("input",{name:"search",value:t,onChange:i=>l(i.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:a.split(`
`).map((i,W)=>e.jsx("div",{children:i?(o?i.split(o):[i]).map((h,_)=>e.jsx("span",{style:{background:h===t?"yellow":void 0},children:h},_)):e.jsx("br",{})},W))})]})}};var g,b,x;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(x=(b=d.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var y,j,S;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(S=(j=c.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var E,k,w;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(w=(k=f.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var R,C,V;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(V=(C=m.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var H,T,q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(q=(T=p.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var M,D,L;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
          <label htmlFor="search">input search word: </label>
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
}`,...(L=(D=v.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};const O=["Multiline","Singleline","Readonly","Rtl","Vertical","Highlight"];export{v as Highlight,d as Multiline,f as Readonly,m as Rtl,c as Singleline,p as Vertical,O as __namedExportsOrder,$ as default};
