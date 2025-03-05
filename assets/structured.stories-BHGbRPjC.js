import{i as F,e as c,j as t}from"./editable-B0tZSyNs.js";import{r as o}from"./index-RYns6xqu.js";const Y=e=>e.textContent,v=({is:e,data:d,plain:i=Y})=>({is:e,data:d,plain:i}),p=({multiline:e,void:d})=>{const i=Object.entries(d),s=n=>n.reduce((r,a)=>{if(typeof a=="string")r.push({type:"text",text:a});else for(const[u,l]of i)if(l.is(a)){r.push({type:u,data:l.data(a)});break}return r},[]);return{single:!e,data:e?n=>n.map(s):n=>s(n[0]),copy:(n,r,a)=>{const u=r.reduce((j,L,W)=>(W!==0&&(j+=`
`),j+L.reduce((b,m)=>{if(typeof m=="string")return b+m;for(const[,S]of i)if(S.is(m))return b+S.plain(m);return b},"")),"");n.setData("text/plain",u);const l=document.createElement("div");l.appendChild(a),n.setData("text/html",l.innerHTML)},paste:n=>{const r=n.getData("text/html");if(r){let a=new DOMParser().parseFromString(r,"text/html").body,u=!1;for(const l of[...a.childNodes])F(l)?l.data==="StartFragment"?(u=!0,a=new DocumentFragment):l.data==="EndFragment"&&(u=!1):u&&a.appendChild(l);return a}return n.getData("text/plain")}}},U={component:c},K=p({multiline:!0,void:{}}),f={render:()=>{const e=o.useRef(null),[d,i]=o.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return o.useEffect(()=>{if(e.current)return c(e.current,{schema:K,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:d.map((s,n)=>t.jsx("div",{children:s.length?s.map((r,a)=>t.jsx("span",{children:r.text},a)):t.jsx("br",{})},n))})}},_=p({void:{tag:v({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue})})}}),y={render:()=>{const e=o.useRef(null),[d,i]=o.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return o.useEffect(()=>{if(e.current)return c(e.current,{schema:_,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:d.length?d.map((s,n)=>s.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":s.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:s.data.label},n):t.jsx("span",{children:s.text},n)):t.jsx("br",{})})}},A=p({multiline:!0,void:{image:v({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),g={render:()=>{const e=o.useRef(null),[d,i]=o.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return o.useEffect(()=>{if(e.current)return c(e.current,{schema:A,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:d.map((s,n)=>t.jsx("div",{children:s.length?s.map((r,a)=>r.type==="image"?t.jsx("img",{src:r.data.src},a):t.jsx("span",{children:r.text},a)):t.jsx("br",{})},n))})}},B=p({multiline:!0,void:{video:v({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),h={render:()=>{const e=o.useRef(null),[d,i]=o.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return o.useEffect(()=>{if(e.current)return c(e.current,{schema:B,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:d.map((s,n)=>t.jsx("div",{children:s.length?s.map((r,a)=>r.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:r.data.src})},a):t.jsx("span",{children:r.text},a)):t.jsx("br",{})},n))})}},G=p({multiline:!0,void:{youtube:v({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),P=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),x={render:()=>{const e=o.useRef(null),[d,i]=o.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return o.useEffect(()=>{if(e.current)return c(e.current,{schema:G,onChange:i}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:d.map((s,n)=>t.jsx("div",{children:s.length?s.map((r,a)=>r.type==="youtube"?t.jsx(P,{id:r.data.id},a):t.jsx("span",{children:r.text},a)):t.jsx("br",{})},n))})})}};var k,w,C;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof basicSchema>;
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello World."
    }], [{
      type: "text",
      text: "こんにちは。"
    }], [{
      type: "text",
      text: "👍❤️🧑‍🧑‍🧒"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        schema: basicSchema,
        onChange: setValue
      }).dispose;
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.map((r, i) => <div key={i}>
            {r.length ? r.map((n, j) => <span key={j}>{n.text}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(C=(w=f.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var E,D,H;y.parameters={...y.parameters,docs:{...(E=y.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(H=(D=y.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var V,I,R;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(R=(I=g.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var M,O,z;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(z=(O=h.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var N,T,q;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(q=(T=x.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};const X=["Multiline","Tag","Image","Video","Iframe"];export{x as Iframe,g as Image,f as Multiline,y as Tag,h as Video,X as __namedExportsOrder,U as default};
