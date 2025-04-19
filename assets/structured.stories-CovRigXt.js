import{i as K,a as A,I as B,N as E,e as y,j as t}from"./editable-DS7PF5aL.js";import{r as o}from"./index-Bk3ZmH4I.js";const G=()=>"",k=({is:e,data:s,plain:i=G})=>({is:e,data:s,plain:i}),g=({multiline:e,void:s={}})=>{const i=Object.entries(s),r=new WeakMap,d=new WeakMap,a=n=>n.reduce((u,l)=>{if(l.type===E){let c=r.get(l);c||r.set(l,c={type:"text",text:l.text}),u.push(c)}else u.push(d.get(l.data));return u},[]);return{single:!e,js:e?n=>n.map(a):n=>a(n[0]),void:n=>{for(const[u,l]of i)if(l.is(n)){const c=l.data(n);return d.set(c,{type:u,data:{...c}}),c}},copy:(n,u,l)=>{const c=u.reduce((m,f,Y)=>(Y!==0&&(m+=`
`),m+f.reduce((w,x)=>{if(x.type===E)return w+x.text;const _=d.get(x.data);return w+s[_.type].plain(x.data)},"")),"");n.setData("text/plain",c);const p=document.createElement("div");p.appendChild(l),n.setData("text/html",p.innerHTML)},paste:(n,u,l)=>{const c=n.getData("text/html");if(c){let p=new DOMParser().parseFromString(c,"text/html").body,m=!1;for(const f of[...p.childNodes])K(f)?f.data==="StartFragment"?(m=!0,p=new DocumentFragment):f.data==="EndFragment"&&(m=!1):m&&p.appendChild(f);u(A,l(p))}u(B,n.getData("text/plain"))}}},te={component:y},P=g({multiline:!0}),h={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return o.useEffect(()=>{if(e.current)return y(e.current,{schema:P,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},X=g({void:{tag:k({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),v={render:()=>{const e=o.useRef(null),[s,i]=o.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return o.useEffect(()=>{if(e.current)return y(e.current,{schema:X,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.length?s.map((r,d)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},d):t.jsx("span",{children:r.text},d)):t.jsx("br",{})})}},J=g({multiline:!0,void:{image:k({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),b={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return o.useEffect(()=>{if(e.current)return y(e.current,{schema:J,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="image"?t.jsx("img",{src:a.data.src},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},Q=g({multiline:!0,void:{video:k({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),j={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return o.useEffect(()=>{if(e.current)return y(e.current,{schema:Q,onChange:i}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:a.data.src})},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})}},U=g({multiline:!0,void:{youtube:k({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),Z=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),S={render:()=>{const e=o.useRef(null),[s,i]=o.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return o.useEffect(()=>{if(e.current)return y(e.current,{schema:U,onChange:i}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,d)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="youtube"?t.jsx(Z,{id:a.data.id},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},d))})})}};var C,D,I;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(I=(D=h.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var H,V,R;v.parameters={...v.parameters,docs:{...(H=v.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(R=(V=v.parameters)==null?void 0:V.docs)==null?void 0:R.source}}};var M,N,T;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(T=(N=b.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var O,z,W;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(W=(z=j.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var q,L,F;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(F=(L=S.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};const ne=["Multiline","Tag","Image","Video","Iframe"];export{S as Iframe,b as Image,h as Multiline,v as Tag,j as Video,ne as __namedExportsOrder,te as default};
