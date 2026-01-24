import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-CrHWd2uf.js";import{r as u}from"./index-DVX38QD6.js";import{c}from"./editor-Du9qlP4h.js";import{p as l}from"./plain-CtForcSl.js";import"./preload-helper-PPVm8Dsz.js";import"./index-fn6MheTA.js";const E={component:c},p=()=>{const e=s.useRef(null),[n,r]=s.useState("This is new window!");return s.useEffect(()=>{if(e.current)return c({doc:n,schema:l({multiline:!0}),onChange:r}).input(e.current)},[]),o.jsx("div",{ref:e,style:{background:"white"},children:n.split(`
`).map((i,t)=>o.jsx("div",{children:i||o.jsx("br",{})},t))})},w=({children:e,onUnload:n})=>{const[r,i]=s.useState(null);return s.useLayoutEffect(()=>{const t=window.open("","","width=600,height=400,left=200,top=200");if(!t)return;const a=t.document.createElement("div");return t.document.body.appendChild(a),t.addEventListener("unload",n,{once:!0}),i(a),()=>{t?.close()}},[]),r?u.createPortal(e,r):null},d={name:"NewWindow",render:()=>{const[e,n]=s.useState(!1);return o.jsxs("div",{children:[o.jsxs("button",{onClick:()=>{n(r=>!r)},children:[e?"close":"open"," window"]}),e&&o.jsx(w,{onUnload:()=>{n(!1)},children:o.jsx(p,{})})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "NewWindow",
  render: () => {
    const [isWindowOpened, setIsWindowOpened] = useState(false);
    return <div>
        <button onClick={() => {
        setIsWindowOpened(prev => !prev);
      }}>
          {isWindowOpened ? "close" : "open"} window
        </button>
        {isWindowOpened && <NewWindow onUnload={() => {
        setIsWindowOpened(false);
      }}>
            <Content />
          </NewWindow>}
      </div>;
  }
}`,...d.parameters?.docs?.source}}};const O=["Default"];export{d as Default,O as __namedExportsOrder,E as default};
