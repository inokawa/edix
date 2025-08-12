import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as d}from"./iframe-DE-t0qWp.js";import{i as S,s as k,d as w,a as C,e as f}from"./editable-Bw8WWABE.js";import"./preload-helper-D9Z9MdNV.js";const D=()=>"",j=({is:e,data:s,plain:l=D})=>({is:e,data:s,plain:l}),y=({multiline:e,void:s={}})=>{const l=Object.entries(s),r=new WeakMap,i=new WeakMap,a=n=>n.reduce((u,c)=>{if(C(c)){let o=r.get(c);o||r.set(c,o={type:"text",text:c.text}),u.push(o)}else u.push(i.get(c.data));return u},[]);return{single:!e,js:e?n=>n.map(a):n=>a(n[0]),void:n=>{for(const[u,c]of l)if(c.is(n)){const o=c.data(n);return i.set(o,{type:u,data:{...o}}),o}},copy:(n,u,c)=>{n.setData("text/plain",w(u,p=>{const m=i.get(p.data);return s[m.type].plain(p.data)}));const o=document.createElement("div");o.appendChild(c()),n.setData("text/html",o.innerHTML)},paste:(n,u)=>{const c=n.getData("text/html");if(c){let o=new DOMParser().parseFromString(c,"text/html").body,p=!1;for(const m of[...o.childNodes])S(m)?m.data==="StartFragment"?(p=!0,o=new DocumentFragment):m.data==="EndFragment"&&(p=!1):p&&o.appendChild(m);return u(o)}return k(n.getData("text/plain"))}}},W={component:f},E=y({multiline:!0}),g={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello World."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:E,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},H=y({void:{tag:j({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),h={render:()=>{const e=d.useRef(null),[s,l]=d.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:H,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.length?s.map((r,i)=>r.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":r.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.data.label},i):t.jsx("span",{children:r.text},i)):t.jsx("br",{})})}},V=y({multiline:!0,void:{image:j({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),x={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:V,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="image"?t.jsx("img",{src:a.data.src},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},I=y({multiline:!0,void:{video:j({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),v={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:I,onChange:l}).dispose},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:a.data.src})},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})}},R=y({multiline:!0,void:{youtube:j({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),M=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),b={render:()=>{const e=d.useRef(null),[s,l]=d.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return d.useEffect(()=>{if(e.current)return f(e.current,{schema:R,onChange:l}).dispose},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:s.map((r,i)=>t.jsx("div",{children:r.length?r.map((a,n)=>a.type==="youtube"?t.jsx(M,{id:a.data.id},n):t.jsx("span",{children:a.text},n)):t.jsx("br",{})},i))})})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const q=["Multiline","Tag","Image","Video","Iframe"];export{b as Iframe,x as Image,g as Multiline,h as Tag,v as Video,q as __namedExportsOrder,W as default};
