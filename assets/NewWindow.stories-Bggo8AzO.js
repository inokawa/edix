import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./iframe-CNd-ZHfW.js";import{r as w}from"./index-B2Me3yYf.js";import{e as p}from"./editable-CCMxu8sI.js";import{p as m}from"./plain-D-4OW2an.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DkMbdRUm.js";const C={component:p},f=()=>{const n=r.useRef(null),[o,s]=r.useState("This is new window!");return r.useEffect(()=>{if(n.current)return p(n.current,{schema:m({multiline:!0}),onChange:s}).dispose},[]),t.jsx("div",{ref:n,style:{background:"white"},children:o.split(`
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
}`,...(l=(u=d.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const N=["Default"];export{d as Default,N as __namedExportsOrder,C as default};
