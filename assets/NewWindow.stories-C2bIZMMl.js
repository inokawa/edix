import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-DQsAK5gg.js";import{r as u}from"./index-C_gmRnr7.js";import{c}from"./plain-zPYHsILu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dj2datFZ.js";import"./editor-DmEyfMkh.js";const j={component:c},l=()=>{const e=s.useRef(null),[n,r]=s.useState("This is new window!");return s.useEffect(()=>{if(e.current)return c({text:n,onChange:r}).input(e.current)},[]),o.jsx("div",{ref:e,style:{background:"white"},children:n.split(`
`).map((i,t)=>o.jsx("div",{children:i||o.jsx("br",{})},t))})},p=({children:e,onUnload:n})=>{const[r,i]=s.useState(null);return s.useLayoutEffect(()=>{const t=window.open("","","width=600,height=400,left=200,top=200");if(!t)return;const a=t.document.createElement("div");return t.document.body.appendChild(a),t.addEventListener("unload",n,{once:!0}),i(a),()=>{t?.close()}},[]),r?u.createPortal(e,r):null},d={name:"NewWindow",render:()=>{const[e,n]=s.useState(!1);return o.jsxs("div",{children:[o.jsxs("button",{onClick:()=>{n(r=>!r)},children:[e?"close":"open"," window"]}),e&&o.jsx(p,{onUnload:()=>{n(!1)},children:o.jsx(l,{})})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const E=["Default"];export{d as Default,E as __namedExportsOrder,j as default};
