import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as t}from"./iframe-CG5R0nsU.js";import{c as p}from"./editor-CPu5Z7A8.js";import{p as g}from"./plain-BDVQ26lt.js";import"./preload-helper-PPVm8Dsz.js";const w={component:p},h={width:"300px",height:"200px",background:"white"},v=({text:r,segmenter:l})=>{const s=l.segment(r),n=[];for(const{segment:u,index:o,isWordLike:c}of s)n.push(e.jsx("span",{style:{background:c?"palegreen":void 0,outline:"solid 1px green"},children:u},o));return e.jsx("div",{children:r?n:e.jsx("br",{})})},i={render:()=>{const[r,l]=t.useState(`すもももももももものうち。

吾輩 （ わがはい ） は猫である。名前はまだ無い。`),s=t.useRef(null);t.useEffect(()=>{if(s.current)return p({doc:r,schema:g({multiline:!0}),onChange:l}).input(s.current)},[]);const[n,u]=t.useState("ja"),[o,c]=t.useState("word"),d=t.useMemo(()=>Intl?.Segmenter?new Intl.Segmenter(n,{granularity:o}):null,[n,o]);return d?e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsxs("select",{value:n,onChange:a=>u(a.target.value),children:[e.jsx("option",{value:"ja",children:"ja"}),e.jsx("option",{value:"en",children:"en"})]}),e.jsxs("select",{value:o,onChange:a=>c(a.target.value),children:[e.jsx("option",{value:"grapheme",children:"grapheme"}),e.jsx("option",{value:"word",children:"word"}),e.jsx("option",{value:"sentence",children:"sentence"})]})]}),e.jsx("div",{ref:s,style:h,children:r.split(`
`).map((a,m)=>e.jsx(v,{text:a,segmenter:d},m))})]}):e.jsx("div",{children:"Intl.Segmenter is not supported in this browser."})}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    type Granularity = "grapheme" | "word" | "sentence";
    const [text, setText] = useState("すもももももももものうち。\\n\\n吾輩 （ わがはい ） は猫である。名前はまだ無い。");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: text,
        schema: plainSchema({
          multiline: true
        }),
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
}`,...i.parameters?.docs?.source}}};const E=["Segmenter"];export{i as Segmenter,E as __namedExportsOrder,w as default};
