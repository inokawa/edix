import{i as K,N as w,e as m,j as t}from"./editable-BiRxwCT1.js";import{r as d}from"./index-Bk3ZmH4I.js";const A=()=>"",j=({is:e,data:s,plain:l=A})=>({is:e,data:s,plain:l}),f=({multiline:e,void:s={}})=>{const l=Object.entries(s),r=new WeakMap,i=new WeakMap,a=n=>n.reduce((u,o)=>{if(o.type===w){let c=r.get(o);c||r.set(o,c={type:"text",text:o.text}),u.push(c)}else u.push(i.get(o.data));return u},[]);return{single:!e,js:e?n=>n.map(a):n=>a(n[0]),void:n=>{for(const[u,o]of l)if(o.is(n)){const c=o.data(n);return i.set(c,{type:u,data:{...c}}),c}},copy:(n,u,o)=>{const c=u.reduce((S,F,Y)=>(Y!==0&&(S+=`
`),S+F.reduce((k,y)=>{if(y.type===w)return k+y.text;const _=i.get(y.data);return k+s[_.type].plain(y.data)},"")),"");n.setData("text/plain",c);const p=document.createElement("div");p.appendChild(o),n.setData("text/html",p.innerHTML)},paste:n=>{const u=n.getData("text/html");if(u){let o=new DOMParser().parseFromString(u,"text/html").body,c=!1;for(const p of[...o.childNodes])K(p)?p.data==="StartFragment"?(c=!0,o=new DocumentFragment):p.data==="EndFragment"&&(c=!1):c&&o.appendChild(p);return o}return n.getData("text/plain")}}},$={component:m},B=f({multiline:!0}),g={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return d.useEffect(()=>{if(e.current)return m(e.current,{schema:B,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},G=f({void:{tag:j({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),h={render:()=>{const e=d.useRef(null),[s,l]=d.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return d.useEffect(()=>{if(e.current)return m(e.current,{schema:G,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.length?s.map((r,i)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},i):t.jsx("span",{children:r.text},i)):t.jsx("br",{})})}},P=f({multiline:!0,void:{image:j({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),x={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return d.useEffect(()=>{if(e.current)return m(e.current,{schema:P,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="image"?t.jsx("img",{src:a.data.src},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},X=f({multiline:!0,void:{video:j({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),v={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return d.useEffect(()=>{if(e.current)return m(e.current,{schema:X,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:a.data.src})},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},J=f({multiline:!0,void:{youtube:j({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),Q=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),b={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return d.useEffect(()=>{if(e.current)return m(e.current,{schema:J,onChange:l}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="youtube"?t.jsx(Q,{id:a.data.id},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})})}};var E,C,D;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(D=(C=g.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var H,V,I;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(I=(V=h.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var R,M,N;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(N=(M=x.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var O,T,z;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(z=(T=v.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var W,q,L;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(L=(q=b.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};const ee=["Multiline","Tag","Image","Video","Iframe"];export{b as Iframe,x as Image,g as Multiline,h as Tag,v as Video,ee as __namedExportsOrder,$ as default};
