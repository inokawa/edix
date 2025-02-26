import{e as l,j as t}from"./editable-Dl4657gw.js";import{r as i}from"./index-RYns6xqu.js";const z=e=>e.textContent,g=({is:e,data:o,plain:d=z})=>({is:e,data:o,plain:d}),h=({multiline:e,void:o})=>{const d=Object.entries(o),r=a=>a.reduce((n,s)=>{if(typeof s=="string")n.push({type:"text",text:s});else for(const[x,u]of d)if(u.is(s)){n.push({type:x,data:u.data(s)});break}return n},[]);return{single:!e,data:e?a=>a.map(r):a=>r(a[0]),plain:a=>a.reduce((n,s,x)=>(x!==0&&(n+=`
`),n+s.reduce((u,c)=>{if(typeof c=="string")return u+c;for(const[,v]of d)if(v.is(c))return u+v.plain(c);return u},"")),"")}},K={component:l},O=h({void:{tag:g({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue})})}}),p={render:()=>{const e=i.useRef(null),[o,d]=i.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return i.useEffect(()=>{if(e.current)return l(e.current,{schema:O,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.length?o.map((r,a)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},a):t.jsx("span",{children:r.text},a)):t.jsx("br",{})})}},T=h({multiline:!0,void:{image:g({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),m={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return i.useEffect(()=>{if(e.current)return l(e.current,{schema:T,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((r,a)=>t.jsx("div",{children:r.length?r.map((n,s)=>n.type==="image"?t.jsx("img",{src:n.data.src},s):t.jsx("span",{children:n.text},s)):t.jsx("br",{})},a))})}},q=h({multiline:!0,void:{video:g({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),f={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return i.useEffect(()=>{if(e.current)return l(e.current,{schema:q,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((r,a)=>t.jsx("div",{children:r.length?r.map((n,s)=>n.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:n.data.src})},s):t.jsx("span",{children:n.text},s)):t.jsx("br",{})},a))})}},M=h({multiline:!0,void:{youtube:g({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),N=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),y={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return i.useEffect(()=>{if(e.current)return l(e.current,{schema:M,onChange:d}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((r,a)=>t.jsx("div",{children:r.length?r.map((n,s)=>n.type==="youtube"?t.jsx(N,{id:n.data.id},s):t.jsx("span",{children:n.text},s)):t.jsx("br",{})},a))})})}};var b,j,k;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof tagSchema>;
    const [value, setValue] = useState<Doc>([{
      type: "text",
      text: "Hello "
    }, {
      type: "tag",
      data: {
        label: "Apple",
        value: "1"
      }
    }, {
      type: "text",
      text: " world "
    }, {
      type: "tag",
      data: {
        label: "Orange",
        value: "2"
      }
    }]);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: tagSchema,
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.length ? value.map((t, j) => t.type === "tag" ? <span key={j} contentEditable={false} data-tag-value={t.data.value} style={{
        background: "slategray",
        color: "white",
        fontSize: 12,
        padding: 4,
        borderRadius: 8
      }}>
                {t.data.label}
              </span> : <span key={j}>{t.text}</span>) : <br />}
      </div>;
  }
}`,...(k=(j=p.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var S,w,E;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof imageSchema>;
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "image",
      data: {
        src: "https://loremflickr.com/320/240/cats?lock=1"
      }
    }, {
      type: "text",
      text: " world "
    }, {
      type: "image",
      data: {
        src: "https://loremflickr.com/320/240/cats?lock=2"
      }
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: imageSchema,
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.map((r, i) => <div key={i}>
            {r.length ? r.map((t, j) => t.type === "image" ? <img key={j} src={t.data.src} /> : <span key={j}>{t.text}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(E=(w=m.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var C,D,I;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof videoSchema>;
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "video",
      data: {
        src: "https://download.samplelib.com/mp4/sample-5s.mp4"
      }
    }, {
      type: "text",
      text: " world "
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: videoSchema,
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.map((r, i) => <div key={i}>
            {r.length ? r.map((t, j) => t.type === "video" ?
        // safari needs contentEditable="false"
        <video key={j} width={400} controls contentEditable="false" suppressContentEditableWarning>
                    <source src={t.data.src} />
                  </video> : <span key={j}>{t.text}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(I=(D=f.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var V,H,R;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof youtubeSchema>;
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "youtube",
      data: {
        id: "IqKz0SfHaqI"
      }
    }, {
      type: "text",
      text: " Youtube"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: youtubeSchema,
        onChange: setValue
      }).dispose;
    }, []);
    return <div>
        {/* <div>
          <button
            onClick={() => {
              // TODO
              editorRef.current?.insert(" [IqKz0SfHaqI]");
            }}
          >
            insert
          </button>
         </div> */}
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 8
      }}>
          {value.map((r, i) => <div key={i}>
              {r.length ? r.map((t, j) => t.type === "youtube" ? <Youtube key={j} id={t.data.id} /> : <span key={j}>{t.text}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(R=(H=y.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};const _=["Tag","Image","Video","Iframe"];export{y as Iframe,m as Image,p as Tag,f as Video,_ as __namedExportsOrder,K as default};
