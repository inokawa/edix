import{i as q,a as L,I as F,d as Y,N as _,e as m,j as t}from"./editable-CqkkpqZH.js";import{r as o}from"./index-Bk3ZmH4I.js";const K=()=>"",S=({is:e,data:s,plain:i=K})=>({is:e,data:s,plain:i}),y=({multiline:e,void:s={}})=>{const i=Object.entries(s),r=new WeakMap,d=new WeakMap,a=n=>n.reduce((u,c)=>{if(c.type===_){let l=r.get(c);l||r.set(c,l={type:"text",text:c.text}),u.push(l)}else u.push(d.get(c.data));return u},[]);return{single:!e,js:e?n=>n.map(a):n=>a(n[0]),void:n=>{for(const[u,c]of i)if(c.is(n)){const l=c.data(n);return d.set(l,{type:u,data:{...l}}),l}},copy:(n,u,c)=>{n.setData("text/plain",Y(u,p=>{const f=d.get(p.data);return s[f.type].plain(p.data)}));const l=document.createElement("div");l.appendChild(c()),n.setData("text/html",l.innerHTML)},paste:(n,u,c)=>{const l=n.getData("text/html");if(l){let p=new DOMParser().parseFromString(l,"text/html").body,f=!1;for(const g of[...p.childNodes])q(g)?g.data==="StartFragment"?(f=!0,p=new DocumentFragment):g.data==="EndFragment"&&(f=!1):f&&p.appendChild(g);u(L,c(p))}u(F,n.getData("text/plain"))}}},Z={component:m},A=y({multiline:!0}),h={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return o.useEffect(()=>{if(e.current)return m(e.current,{schema:A,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},B=y({void:{tag:S({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),x={render:()=>{const e=o.useRef(null),[s,i]=o.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return o.useEffect(()=>{if(e.current)return m(e.current,{schema:B,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.length?s.map((r,d)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},d):t.jsx("span",{children:r.text},d)):t.jsx("br",{})})}},G=y({multiline:!0,void:{image:S({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),v={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return o.useEffect(()=>{if(e.current)return m(e.current,{schema:G,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="image"?t.jsx("img",{src:a.data.src},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},P=y({multiline:!0,void:{video:S({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),b={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return o.useEffect(()=>{if(e.current)return m(e.current,{schema:P,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:a.data.src})},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},X=y({multiline:!0,void:{youtube:S({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),J=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),j={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return o.useEffect(()=>{if(e.current)return m(e.current,{schema:X,onChange:i}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="youtube"?t.jsx(J,{id:a.data.id},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})})}};var k,w,E;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(E=(w=h.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var C,D,I;x.parameters={...x.parameters,docs:{...(C=x.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(I=(D=x.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var H,V,R;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(R=(V=v.parameters)==null?void 0:V.docs)==null?void 0:R.source}}};var M,T,N;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(N=(T=b.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var O,z,W;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(W=(z=j.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};const $=["Multiline","Tag","Image","Video","Iframe"];export{j as Iframe,v as Image,h as Multiline,x as Tag,b as Video,$ as __namedExportsOrder,Z as default};
