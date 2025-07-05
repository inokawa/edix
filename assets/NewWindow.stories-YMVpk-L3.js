import{e as p,j as t}from"./editable-DKuijTdl.js";import{r}from"./iframe-fCal_VF3.js";import{r as w}from"./index-mEq-UPI4.js";import{p as m}from"./plain-wrRlUwAw.js";import"./index-DkwB7zgM.js";const E={component:p},f=()=>{const n=r.useRef(null),[o,s]=r.useState("This is new window!");return r.useEffect(()=>{if(n.current)return p(n.current,{schema:m({multiline:!0}),onChange:s}).dispose},[]),t.jsx("div",{ref:n,style:{background:"white"},children:o.split(`
`).map((i,e)=>t.jsx("div",{children:i||t.jsx("br",{})},e))})},h=({children:n,onUnload:o})=>{const[s,i]=r.useState(null);return r.useLayoutEffect(()=>{const e=window.open("","","width=600,height=400,left=200,top=200");if(!e)return;const a=e.document.createElement("div");return e.document.body.appendChild(a),e.addEventListener("unload",o,{once:!0}),i(a),()=>{e==null||e.close()}},[]),s?w.createPortal(n,s):null},d={name:"NewWindow",render:()=>{const[n,o]=r.useState(!1);return t.jsxs("div",{children:[t.jsxs("button",{onClick:()=>{o(s=>!s)},children:[n?"close":"open"," window"]}),n&&t.jsx(h,{onUnload:()=>{o(!1)},children:t.jsx(f,{})})]})}};var c,u,l;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(l=(u=d.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const b=["Default"];export{d as Default,b as __namedExportsOrder,E as default};
