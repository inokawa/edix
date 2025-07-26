import{i as W,s as q,d as L,a as F,e as f,j as t}from"./editable-BlpPuhUA.js";import{r as d}from"./iframe-_SCzYcC1.js";const Y=()=>"",j=({is:e,data:s,plain:l=Y})=>({is:e,data:s,plain:l}),y=({multiline:e,void:s={}})=>{const l=Object.entries(s),r=new WeakMap,i=new WeakMap,a=n=>n.reduce((u,c)=>{if(F(c)){let o=r.get(c);o||r.set(c,o={type:"text",text:c.text}),u.push(o)}else u.push(i.get(c.data));return u},[]);return{single:!e,js:e?n=>n.map(a):n=>a(n[0]),void:n=>{for(const[u,c]of l)if(c.is(n)){const o=c.data(n);return i.set(o,{type:u,data:{...o}}),o}},copy:(n,u,c)=>{n.setData("text/plain",L(u,p=>{const m=i.get(p.data);return s[m.type].plain(p.data)}));const o=document.createElement("div");o.appendChild(c()),n.setData("text/html",o.innerHTML)},paste:(n,u)=>{const c=n.getData("text/html");if(c){let o=new DOMParser().parseFromString(c,"text/html").body,p=!1;for(const m of[...o.childNodes])W(m)?m.data==="StartFragment"?(p=!0,o=new DocumentFragment):m.data==="EndFragment"&&(p=!1):p&&o.appendChild(m);return u(o)}return q(n.getData("text/plain"))}}},U={component:f},K=y({multiline:!0}),g={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:K,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},_=y({void:{tag:j({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),h={render:()=>{const e=d.useRef(null),[s,l]=d.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:_,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.length?s.map((r,i)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},i):t.jsx("span",{children:r.text},i)):t.jsx("br",{})})}},A=y({multiline:!0,void:{image:j({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),x={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:A,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="image"?t.jsx("img",{src:a.data.src},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},B=y({multiline:!0,void:{video:j({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),v={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:B,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:a.data.src})},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},G=y({multiline:!0,void:{youtube:j({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),P=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),b={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:G,onChange:l}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="youtube"?t.jsx(P,{id:a.data.id},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})})}};var S,k,w;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(w=(k=g.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var C,D,E;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(E=(D=h.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var H,V,I;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(I=(V=x.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var R,M,T;v.parameters={...v.parameters,docs:{...(R=v.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(T=(M=v.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var N,O,z;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(z=(O=b.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};const X=["Multiline","Tag","Image","Video","Iframe"];export{b as Iframe,x as Image,g as Multiline,h as Tag,v as Video,X as __namedExportsOrder,U as default};
