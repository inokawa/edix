import{j as t}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-DG_GnxFn.js";import{i as E,r as D,s as C,d as V,a as H,b as I,e as w,c as g}from"./editor-Bk9U13JJ.js";import"./preload-helper-PPVm8Dsz.js";const R=()=>"",j=({is:e,data:r,plain:u=R})=>({is:e,data:r,plain:u}),y=({multiline:e,void:r={}})=>{const u=Object.entries(r),a=new WeakMap,c=new WeakMap,o=n=>n.reduce((l,s)=>{if(w(s)){let d=a.get(s);d||a.set(s,d={type:"text",text:s.text}),l.push(d)}else l.push(c.get(s.data));return l},[]),p=n=>{for(const[l,s]of u)if(s.is(n)){const d=s.data(n);return c.set(d,{type:l,data:{...d}}),d}},k=n=>{if(n.type==="text")return{text:n.text};const{type:l,data:s}=n;return c.set(s,{type:l,data:s}),{data:s}};return{single:!e,js:e?n=>n.map(o):n=>o(n[0]),doc:n=>e?n.map(l=>l.map(k)):[n.map(k)],copy:(n,l,s)=>{n.setData("text/plain",V(l,m=>{if(w(m))return m.text;const f=c.get(m.data);return r[f.type].plain(m.data)}));const d=document.createElement("div");d.appendChild(H(I(s),s).cloneContents()),n.setData("text/html",d.innerHTML)},paste:(n,l)=>{const s=n.getData("text/html");if(s){let d=new DOMParser().parseFromString(s,"text/html").body,m=!1;for(const f of[...d.childNodes])E(f)?f.data==="StartFragment"?(m=!0,d=new DocumentFragment):f.data==="EndFragment"&&(m=!1):m&&d.appendChild(f);return D(d,l,p)}return C(n.getData("text/plain"))}}},K={component:g},M=y({multiline:!0}),x={render:()=>{const e=i.useRef(null),[r,u]=i.useState([[{type:"text",text:"Hello world."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return i.useEffect(()=>{if(e.current)return g({doc:r,schema:M,onChange:u}).input(e.current)},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((a,c)=>t.jsx("div",{children:a.length?a.map((o,p)=>t.jsx("span",{children:o.text},p)):t.jsx("br",{})},c))})}},T=y({void:{tag:j({is:e=>e.contentEditable==="false",data:e=>({label:e.textContent,value:e.dataset.tagValue}),plain:e=>e.label})}}),h={render:()=>{const e=i.useRef(null),[r,u]=i.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return i.useEffect(()=>{if(e.current)return g({doc:r,schema:T,onChange:u}).input(e.current)},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.length?r.map((a,c)=>a.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":a.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:a.data.label},c):t.jsx("span",{children:a.text},c)):t.jsx("br",{})})}},N=y({multiline:!0,void:{image:j({is:e=>e.tagName==="IMG",data:e=>({src:e.src})})}}),v={render:()=>{const e=i.useRef(null),[r,u]=i.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return i.useEffect(()=>{if(e.current)return g({doc:r,schema:N,onChange:u}).input(e.current)},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((a,c)=>t.jsx("div",{children:a.length?a.map((o,p)=>o.type==="image"?t.jsx("img",{src:o.data.src},p):t.jsx("span",{children:o.text},p)):t.jsx("br",{})},c))})}},O=y({multiline:!0,void:{video:j({is:e=>e.tagName==="VIDEO",data:e=>({src:e.childNodes[0].src})})}}),b={render:()=>{const e=i.useRef(null),[r,u]=i.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return i.useEffect(()=>{if(e.current)return g({doc:r,schema:O,onChange:u}).input(e.current)},[]),t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((a,c)=>t.jsx("div",{children:a.length?a.map((o,p)=>o.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:o.data.src})},p):t.jsx("span",{children:o.text},p)):t.jsx("br",{})},c))})}},z=y({multiline:!0,void:{youtube:j({is:e=>!!e.dataset.youtubeNode,data:e=>({id:e.dataset.youtubeId})})}}),q=({id:e})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),S={render:()=>{const e=i.useRef(null),[r,u]=i.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return i.useEffect(()=>{if(e.current)return g({doc:r,schema:z,onChange:u}).input(e.current)},[]),t.jsx("div",{children:t.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((a,c)=>t.jsx("div",{children:a.length?a.map((o,p)=>o.type==="youtube"?t.jsx(q,{id:o.data.id},p):t.jsx("span",{children:o.text},p)):t.jsx("br",{})},c))})})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
      return createEditor({
        doc: value,
        schema: basicSchema,
        onChange: setValue
      }).input(ref.current);
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
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
      return createEditor({
        doc: value,
        schema: tagSchema,
        onChange: setValue
      }).input(ref.current);
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
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
      return createEditor({
        doc: value,
        schema: imageSchema,
        onChange: setValue
      }).input(ref.current);
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
      return createEditor({
        doc: value,
        schema: videoSchema,
        onChange: setValue
      }).input(ref.current);
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
      return createEditor({
        doc: value,
        schema: youtubeSchema,
        onChange: setValue
      }).input(ref.current);
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
}`,...S.parameters?.docs?.source}}};const _=["Multiline","Tag","Image","Video","Iframe"];export{S as Iframe,v as Image,x as Multiline,h as Tag,b as Video,_ as __namedExportsOrder,K as default};
