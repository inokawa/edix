import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-BZkdGpCE.js";import{c as p}from"./plain-DGhnQdBQ.js";import"./preload-helper-PPVm8Dsz.js";import"./editor-Wp6T9U_x.js";const S={component:p},m={width:"300px",height:"200px",background:"white"},v=({text:r,segmenter:l})=>{const s=l.segment(r),n=[];for(const{segment:u,index:o,isWordLike:c}of s)n.push(e.jsx("span",{style:{background:c?"palegreen":void 0,outline:"solid 1px green"},children:u},o));return e.jsx("div",{children:r?n:e.jsx("br",{})})},i={render:()=>{const[r,l]=t.useState(`すもももももももものうち。

吾輩 （ わがはい ） は猫である。名前はまだ無い。`),s=t.useRef(null);t.useEffect(()=>{if(s.current)return p({text:r,onChange:l}).input(s.current)},[]);const[n,u]=t.useState("ja"),[o,c]=t.useState("word"),d=t.useMemo(()=>Intl?.Segmenter?new Intl.Segmenter(n,{granularity:o}):null,[n,o]);return d?e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsxs("select",{value:n,onChange:a=>u(a.target.value),children:[e.jsx("option",{value:"ja",children:"ja"}),e.jsx("option",{value:"en",children:"en"})]}),e.jsxs("select",{value:o,onChange:a=>c(a.target.value),children:[e.jsx("option",{value:"grapheme",children:"grapheme"}),e.jsx("option",{value:"word",children:"word"}),e.jsx("option",{value:"sentence",children:"sentence"})]})]}),e.jsx("div",{ref:s,style:m,children:r.split(`
`).map((a,g)=>e.jsx(v,{text:a,segmenter:d},g))})]}):e.jsx("div",{children:"Intl.Segmenter is not supported in this browser."})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    type Granularity = "grapheme" | "word" | "sentence";
    const [text, setText] = useState("すもももももももものうち。\\n\\n吾輩 （ わがはい ） は猫である。名前はまだ無い。");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return createPlainEditor({
        text,
        onChange: setText
      }).input(ref.current);
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
}`,...i.parameters?.docs?.source}}};const w=["Segmenter"];export{i as Segmenter,w as __namedExportsOrder,S as default};
