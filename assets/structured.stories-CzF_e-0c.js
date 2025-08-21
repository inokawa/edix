import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./iframe-MxBnUbFQ.js";import{i as k,a as w,s as C,d as D,b as E,c as V,f as H,e as g}from"./editable-CIEkyuwe.js";import"./preload-helper-D9Z9MdNV.js";const I=()=>"",j=({is:e,data:a,plain:c=I})=>({is:e,data:a,plain:c}),y=({multiline:e,void:a={}})=>{const c=Object.entries(a),n=new WeakMap,d=new WeakMap,r=i=>i.reduce((p,l)=>{if(H(l)){let s=n.get(l);s||n.set(l,s={type:"text",text:l.text}),p.push(s)}else p.push(d.get(l.data));return p},[]),u=i=>{for(const[p,l]of c)if(l.is(i)){const s=l.data(i);return d.set(s,{type:p,data:{...s}}),s}};return{single:!e,js:e?i=>i.map(r):i=>r(i[0]),void:u,copy:(i,p,l)=>{i.setData("text/plain",D(p,m=>{const f=d.get(m.data);return a[f.type].plain(m.data)}));const s=document.createElement("div");s.appendChild(E(V(l),l).cloneContents()),i.setData("text/html",s.innerHTML)},paste:(i,p)=>{const l=i.getData("text/html");if(l){let s=new DOMParser().parseFromString(l,"text/html").body,m=!1;for(const f of[...s.childNodes])k(f)?f.data==="StartFragment"?(m=!0,s=new DocumentFragment):f.data==="EndFragment"&&(m=!1):m&&s.appendChild(f);return w(s,p,u)}return C(i.getData("text/plain"))}}},Y={component:g},R=y({multiline:!0}),h={render:()=>{const e=o.useRef(null),[a,c]=o.useState([[{type:"text",text:"Hello world."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return o.useEffect(()=>{if(e.current)return g(e.current,{schema:R,onChange:c}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:a.map((n,d)=>t.jsx("div",{children:n.length?n.map((r,u)=>t.jsx("span",{children:r.text},u)):t.jsx("br",{})},d))})}},M=y({void:{tag:j({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),x={render:()=>{const e=o.useRef(null),[a,c]=o.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return o.useEffect(()=>{if(e.current)return g(e.current,{schema:M,onChange:c}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:a.length?a.map((n,d)=>n.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":n.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:n.data.label},d):t.jsx("span",{children:n.text},d)):t.jsx("br",{})})}},T=y({multiline:!0,void:{image:j({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),v={render:()=>{const e=o.useRef(null),[a,c]=o.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return o.useEffect(()=>{if(e.current)return g(e.current,{schema:T,onChange:c}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:a.map((n,d)=>t.jsx("div",{children:n.length?n.map((r,u)=>r.type==="image"?t.jsx("img",{src:r.data.src},u):t.jsx("span",{children:r.text},u)):t.jsx("br",{})},d))})}},N=y({multiline:!0,void:{video:j({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),b={render:()=>{const e=o.useRef(null),[a,c]=o.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return o.useEffect(()=>{if(e.current)return g(e.current,{schema:N,onChange:c}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:a.map((n,d)=>t.jsx("div",{children:n.length?n.map((r,u)=>r.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:r.data.src})},u):t.jsx("span",{children:r.text},u)):t.jsx("br",{})},d))})}},O=y({multiline:!0,void:{youtube:j({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),z=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),S={render:()=>{const e=o.useRef(null),[a,c]=o.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return o.useEffect(()=>{if(e.current)return g(e.current,{schema:O,onChange:c}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:a.map((n,d)=>t.jsx("div",{children:n.length?n.map((r,u)=>r.type==="youtube"?t.jsx(z,{id:r.data.id},u):t.jsx("span",{children:r.text},u)):t.jsx("br",{})},d))})})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = InferDoc<typeof basicSchema>;
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello world."
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
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};const K=["Multiline","Tag","Image","Video","Iframe"];export{S as Iframe,v as Image,h as Multiline,x as Tag,b as Video,K as __namedExportsOrder,Y as default};
