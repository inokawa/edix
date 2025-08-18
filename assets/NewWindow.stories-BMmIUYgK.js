import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./iframe-BHfNkVHB.js";import{r as l}from"./index-BXHYxIb9.js";import{e as c}from"./editable-Bw8WWABE.js";import{p as u}from"./plain-DRmLrJzH.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BHYprb_X.js";const O={component:c},p=()=>{const e=s.useRef(null),[o,r]=s.useState("This is new window!");return s.useEffect(()=>{if(e.current)return c(e.current,{schema:u({multiline:!0}),onChange:r}).dispose},[]),t.jsx("div",{ref:e,style:{background:"white"},children:o.split(`
`).map((i,n)=>t.jsx("div",{children:i||t.jsx("br",{})},n))})},w=({children:e,onUnload:o})=>{const[r,i]=s.useState(null);return s.useLayoutEffect(()=>{const n=window.open("","","width=600,height=400,left=200,top=200");if(!n)return;const a=n.document.createElement("div");return n.document.body.appendChild(a),n.addEventListener("unload",o,{once:!0}),i(a),()=>{n?.close()}},[]),r?l.createPortal(e,r):null},d={name:"NewWindow",render:()=>{const[e,o]=s.useState(!1);return t.jsxs("div",{children:[t.jsxs("button",{onClick:()=>{o(r=>!r)},children:[e?"close":"open"," window"]}),e&&t.jsx(w,{onUnload:()=>{o(!1)},children:t.jsx(p,{})})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const E=["Default"];export{d as Default,E as __namedExportsOrder,O as default};
