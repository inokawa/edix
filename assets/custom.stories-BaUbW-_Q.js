import{i as O,e as c,j as t}from"./editable-Uf4oqHx5.js";import{r as i}from"./index-RYns6xqu.js";const z=e=>e.textContent,h=({is:e,data:o,plain:d=z})=>({is:e,data:o,plain:d}),x=({multiline:e,void:o})=>{const d=Object.entries(o),s=a=>a.reduce((n,r)=>{if(typeof r=="string")n.push({type:"text",text:r});else for(const[u,l]of d)if(l.is(r)){n.push({type:u,data:l.data(r)});break}return n},[]);return{single:!e,data:e?a=>a.map(s):a=>s(a[0]),plain:a=>a.reduce((n,r,u)=>(u!==0&&(n+=`
`),n+r.reduce((l,p)=>{if(typeof p=="string")return l+p;for(const[,v]of d)if(v.is(p))return l+v.plain(p);return l},"")),""),paste:a=>{const n=a.getData("text/html");if(n){let r=new DOMParser().parseFromString(n,"text/html").body,u=!1;for(const l of[...r.childNodes])O(l)?l.data==="StartFragment"?(u=!0,r=new DocumentFragment):l.data==="EndFragment"&&(u=!1):u&&r.appendChild(l);return r}return a.getData("text/plain")}}},K={component:c},N=x({void:{tag:h({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue})})}}),m={render:()=>{const e=i.useRef(null),[o,d]=i.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return i.useEffect(()=>{if(e.current)return c(e.current,{schema:N,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.length?o.map((s,a)=>s.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":s.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:s.data.label},a):t.jsx("span",{children:s.text},a)):t.jsx("br",{})})}},q=x({multiline:!0,void:{image:h({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),f={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return i.useEffect(()=>{if(e.current)return c(e.current,{schema:q,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((s,a)=>t.jsx("div",{children:s.length?s.map((n,r)=>n.type==="image"?t.jsx("img",{src:n.data.src},r):t.jsx("span",{children:n.text},r)):t.jsx("br",{})},a))})}},M=x({multiline:!0,void:{video:h({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),g={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return i.useEffect(()=>{if(e.current)return c(e.current,{schema:M,onChange:d}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((s,a)=>t.jsx("div",{children:s.length?s.map((n,r)=>n.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:n.data.src})},r):t.jsx("span",{children:n.text},r)):t.jsx("br",{})},a))})}},T=x({multiline:!0,void:{youtube:h({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),F=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),y={render:()=>{const e=i.useRef(null),[o,d]=i.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return i.useEffect(()=>{if(e.current)return c(e.current,{schema:T,onChange:d}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:o.map((s,a)=>t.jsx("div",{children:s.length?s.map((n,r)=>n.type==="youtube"?t.jsx(F,{id:n.data.id},r):t.jsx("span",{children:n.text},r)):t.jsx("br",{})},a))})})}};var b,j,S;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(S=(j=m.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var k,w,E;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(E=(w=f.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var C,D,I;g.parameters={...g.parameters,docs:{...(C=g.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(I=(D=g.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var V,H,R;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(R=(H=y.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};const W=["Tag","Image","Video","Iframe"];export{y as Iframe,f as Image,m as Tag,g as Video,W as __namedExportsOrder,K as default};
