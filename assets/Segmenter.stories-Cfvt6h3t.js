import{e as m,j as e}from"./editable-CKfRgu2s.js";import{r as s}from"./index-RYns6xqu.js";const w={component:m},x={width:"300px",height:"200px",background:"white"},f=({text:o,segmenter:l})=>{const n=l.segment(o),t=[];for(const{segment:u,index:a,isWordLike:c}of n)t.push(e.jsx("span",{style:{background:c?"palegreen":void 0,outline:"solid 1px green"},children:u},a));return e.jsx("div",{children:o?t:e.jsx("br",{})})},i={render:()=>{const[o,l]=s.useState(`すもももももももものうち。

吾輩 （ わがはい ） は猫である。名前はまだ無い。`),n=s.useRef(null);s.useEffect(()=>{if(n.current)return m(n.current,{multiline:!0,onChange:l})},[]);const[t,u]=s.useState("ja"),[a,c]=s.useState("word");if(!!!(Intl!=null&&Intl.Segmenter))return e.jsx("div",{children:"Intl.Segmenter is not supported in this browser."});const h=new Intl.Segmenter(t,{granularity:a});return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("input",{value:t,onChange:r=>u(r.target.value)}),e.jsxs("select",{value:a,onChange:r=>c(r.target.value),children:[e.jsx("option",{value:"grapheme",children:"grapheme"}),e.jsx("option",{value:"word",children:"word"}),e.jsx("option",{value:"sentence",children:"sentence"})]})]}),e.jsx("div",{ref:n,style:x,children:o.split(`
`).map((r,v)=>e.jsx(f,{text:r,segmenter:h},v))})]})}};var d,g,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
    const hasSegmenter = !!Intl?.Segmenter;
    if (!hasSegmenter) {
      return <div>{"Intl.Segmenter is not supported in this browser."}</div>;
    }
    const segmenter = new Intl.Segmenter(locale, {
      granularity
    });
    return <div>
        <div>
          <input value={locale} onChange={e => setLocale(e.target.value)} />
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
}`,...(p=(g=i.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const b=["Segmenter"];export{i as Segmenter,b as __namedExportsOrder,w as default};
