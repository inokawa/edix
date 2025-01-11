import{e as u,j as e}from"./editable-CjbmBvcZ.js";import{r as a}from"./index-RYns6xqu.js";const q={component:u},H="[TAG:",V=({children:n})=>e.jsx("span",{contentEditable:!1,style:{background:"slategray",color:"white",padding:4,borderRadius:8},children:n}),d={render:()=>{const n=a.useRef(null),[o,l]=a.useState("Hello [TAG:TAG1] world [TAG:TAG2]");return a.useEffect(()=>{if(n.current)return u(n.current,{onChange:l,nodes:[{is:t=>t.contentEditable==="false",serialize:t=>t.textContent}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:o.split(`
`).map((t,r)=>e.jsx("div",{children:t?t.split(/(\[.+?\])/).map((s,i)=>s.startsWith(H)?e.jsx(V,{children:s},i):e.jsx("span",{children:s},i)):e.jsx("br",{})},r))})}},R="[image:",S=({text:n})=>{const o=n.slice(R.length,n.length-1);return e.jsx("img",{src:o})},c={render:()=>{const n=a.useRef(null),[o,l]=a.useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");return a.useEffect(()=>{if(n.current)return u(n.current,{multiline:!0,onChange:l,nodes:[{is:"img",serialize:t=>`[image:${t.src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:o.split(`
`).map((t,r)=>e.jsx("div",{children:t?t.split(/(\[.+?\])/).map((s,i)=>s.startsWith(R)?e.jsx(S,{text:s},i):e.jsx("span",{children:s},i)):e.jsx("br",{})},r))})}},T="[video:",A=({text:n})=>{const o=n.slice(T.length,n.length-1);return e.jsx("video",{width:400,controls:!0,contentEditable:"false",children:e.jsx("source",{src:o})})},p={render:()=>{const n=a.useRef(null),[o,l]=a.useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");return a.useEffect(()=>{if(n.current)return u(n.current,{multiline:!0,onChange:l,nodes:[{is:"video",serialize:t=>`[video:${t.childNodes[0].src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:o.split(`
`).map((t,r)=>e.jsx("div",{children:t?t.split(/(\[.+?\])/).map((s,i)=>s.startsWith(T)?e.jsx(A,{text:s},i):e.jsx("span",{children:s},i)):e.jsx("br",{})},r))})}},G=({id:n})=>e.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":n,width:"560",height:"315",src:"https://www.youtube.com/embed/"+n,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),m={render:()=>{const n=a.useRef(null),[o,l]=a.useState("Hello [IqKz0SfHaqI] Youtube"),t=a.useRef(null);return a.useEffect(()=>{if(n.current)return t.current=u(n.current,{multiline:!0,onChange:l,nodes:[{is:r=>!!r.dataset.youtubeNode,serialize:r=>"["+r.dataset.youtubeId+"]"}]})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{var r;(r=t.current)==null||r.insert(" [IqKz0SfHaqI]")},children:"insert"})}),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:o.split(`
`).map((r,s)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((i,f)=>i.startsWith("[")?e.jsx(G,{id:i.slice(1,i.length-1)},f):e.jsx("span",{children:i},f)):e.jsx("br",{})},s))})]})}};var h,g,v;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [TAG:TAG1] world [TAG:TAG2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
        nodes: [{
          is: e => e.contentEditable === "false",
          serialize: e => e.textContent!
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(TAG_PREFIX) ? <TagComponent key={j}>{t}</TagComponent> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(v=(g=d.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var b,j,x;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: "img",
          serialize: e => \`[image:\${(e as HTMLImageElement).src}]\`
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(IMAGE_PREFIX) ? <Img key={j} text={t} /> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(x=(j=c.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};var y,E,k;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: "video",
          serialize: e => \`[video:\${(e.childNodes[0] as HTMLSourceElement).src}]\`
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(VIDEO_PREFIX) ? <VideoNode key={j} text={t} /> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(k=(E=p.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var I,w,C;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [IqKz0SfHaqI] Youtube");
    const editorRef = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editorRef.current = editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: e => !!e.dataset.youtubeNode,
          serialize: e => "[" + e.dataset.youtubeId + "]"
        }]
      });
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          editorRef.current?.insert(" [IqKz0SfHaqI]");
        }}>
            insert
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 8
      }}>
          {value.split("\\n").map((r, i) => <div key={i}>
              {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith("[") ? <Youtube key={j} id={t.slice(1, t.length - 1)} /> : <span key={j}>{t}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(C=(w=m.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};const M=["Tag","Image","Video","Iframe"];export{m as Iframe,c as Image,d as Tag,p as Video,M as __namedExportsOrder,q as default};
