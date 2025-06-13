import{e as u,j as t}from"./editable-DszTB9mn.js";import{r}from"./iframe-rZVFC-PX.js";import{r as l}from"./index-ByEhD6wl.js";import{p as w}from"./plain-B_LbV6Xp.js";import"./index-CTZGuLfW.js";const O={component:u},m=()=>{const n=r.useRef(null),[o,s]=r.useState("This is new window!");return r.useEffect(()=>{if(n.current)return u(n.current,{schema:w({multiline:!0}),onChange:s}).dispose},[]),t.jsx("div",{ref:n,style:{background:"white"},children:o.split(`
`).map((e,p)=>t.jsx("div",{children:e||t.jsx("br",{})},p))})},f=({children:n,onUnload:o})=>{const s=r.useState(()=>document.createElement("div"))[0];return r.useLayoutEffect(()=>{const e=window.open("","","width=600,height=400,left=200,top=200");if(e)return e.addEventListener("unload",o,{once:!0}),e.document.body.appendChild(s),()=>{e==null||e.close()}},[]),l.createPortal(n,s)},i={name:"NewWindow",render:()=>{const[n,o]=r.useState(!1);return t.jsxs("div",{children:[t.jsxs("button",{onClick:()=>{o(s=>!s)},children:[n?"close":"open"," window"]}),n&&t.jsx(f,{onUnload:()=>{o(!1)},children:t.jsx(m,{})})]})}};var d,a,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(c=(a=i.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const E=["Default"];export{i as Default,E as __namedExportsOrder,O as default};
