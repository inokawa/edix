import{e as v,j as e}from"./editable-DGjHQI-m.js";import{r as t}from"./index-RYns6xqu.js";const S={component:v},x={width:"300px",height:"200px",background:"white"},f=({text:a,segmenter:i})=>{const r=i.segment(a),n=[];for(const{segment:u,index:s,isWordLike:c}of r)n.push(e.jsx("span",{style:{background:c?"palegreen":void 0,outline:"solid 1px green"},children:u},s));return e.jsx("div",{children:a?n:e.jsx("br",{})})},l={render:()=>{const[a,i]=t.useState(`すもももももももものうち。

吾輩 （ わがはい ） は猫である。名前はまだ無い。`),r=t.useRef(null);t.useEffect(()=>{if(r.current)return v(r.current,{multiline:!0,onChange:i})},[]);const[n,u]=t.useState("ja"),[s,c]=t.useState("word"),d=t.useMemo(()=>Intl!=null&&Intl.Segmenter?new Intl.Segmenter(n,{granularity:s}):null,[n,s]);return d?e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsxs("select",{value:n,onChange:o=>u(o.target.value),children:[e.jsx("option",{value:"ja",children:"ja"}),e.jsx("option",{value:"en",children:"en"})]}),e.jsxs("select",{value:s,onChange:o=>c(o.target.value),children:[e.jsx("option",{value:"grapheme",children:"grapheme"}),e.jsx("option",{value:"word",children:"word"}),e.jsx("option",{value:"sentence",children:"sentence"})]})]}),e.jsx("div",{ref:r,style:x,children:a.split(`
`).map((o,h)=>e.jsx(f,{text:o,segmenter:d},h))})]}):e.jsx("div",{children:"Intl.Segmenter is not supported in this browser."})}};var p,g,m;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    type Granularity = "grapheme" | "word" | "sentence";
    const [text, setText] = useState("すもももももももものうち。\\n\\n吾輩 （ わがはい ） は猫である。名前はまだ無い。");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setText
      });
    }, []);
    const [locale, setLocale] = useState("ja");
    const [granularity, setGranularity] = useState<Granularity>("word");
    const segmenter = useMemo(() => {
      if (!Intl?.Segmenter) {
        return null;
      }
      return new Intl.Segmenter(locale, {
        granularity
      });
    }, [locale, granularity]);
    if (!segmenter) {
      return <div>{"Intl.Segmenter is not supported in this browser."}</div>;
    }
    return <div>
        <div>
          <select value={locale} onChange={e => setLocale(e.target.value)}>
            <option value={"ja"}>ja</option>
            <option value={"en"}>en</option>
          </select>
          <select value={granularity} onChange={e => setGranularity(e.target.value as Granularity)}>
            <option value={"grapheme"}>grapheme</option>
            <option value={"word"}>word</option>
            <option value={"sentence"}>sentence</option>
          </select>
        </div>
        <div ref={ref} style={style}>
          {text.split("\\n").map((t, i) => <Row key={i} text={t} segmenter={segmenter} />)}
        </div>
      </div>;
  }
}`,...(m=(g=l.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const w=["Segmenter"];export{l as Segmenter,w as __namedExportsOrder,S as default};
