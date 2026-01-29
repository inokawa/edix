import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as l}from"./iframe-D4iIVbVm.js";import{i as S,a as E,b as j,e as D,r as k,c as i,p,f as m}from"./editor-DvRMzhSL.js";import"./preload-helper-PPVm8Dsz.js";const y=({multiline:t})=>{const o=new WeakMap,c=new WeakMap,e=n=>n.reduce((r,d)=>{if(S(d)){let u=o.get(d);u||o.set(d,u={type:"text",text:d.text}),r.push(u)}else{let u=c.get(d.data);u||(u=d),r.push(u)}return r},[]),s=n=>{if(n.type==="text")return{text:n.text};const{type:r,data:d}=n;return c.set(d,{type:r,data:d}),{data:d}};return{single:!t,js:t?n=>n.map(e):n=>e(n[0]),doc:n=>t?n.map(r=>r.map(s)):[n.map(s)]}},f=()=>(t,o,c)=>{const e=document.createElement("div");e.appendChild(E(j(c),c).cloneContents()),t.setData("text/html",e.innerHTML)},h=(t=[])=>(o,c)=>{const e=o.getData("text/html");if(e){let s=new DOMParser().parseFromString(e,"text/html").body,n=!1;for(const r of[...s.childNodes])D(r)?r.data==="StartFragment"?(n=!0,s=new DocumentFragment):r.data==="EndFragment"&&(n=!1):n&&s.appendChild(r);return k(s,c,r=>{for(const d of t){const u=d(r);if(u)return u}})}return null},L={component:i},w=y({multiline:!0}),g={render:()=>{const t=l.useRef(null),[o,c]=l.useState([[{type:"text",text:"Hello world."}],[{type:"text",text:"こんにちは。"}],[{type:"text",text:"👍❤️🧑‍🧑‍🧒"}]]);return l.useEffect(()=>{if(t.current)return i({doc:o,schema:w,copy:[f(),p()],paste:[h(),m()],onChange:c}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:o.map((e,s)=>a.jsx("div",{children:e.length?e.map((n,r)=>a.jsx("span",{children:n.text},r)):a.jsx("br",{})},s))})}},I=y({}),x={render:()=>{const t=l.useRef(null),[o,c]=l.useState([{type:"text",text:"Hello "},{type:"tag",data:{label:"Apple",value:"1"}},{type:"text",text:" world "},{type:"tag",data:{label:"Orange",value:"2"}}]);return l.useEffect(()=>{if(t.current)return i({doc:o,schema:I,copy:[f(),p(e=>"text"in e?e.text:e.data.label)],paste:[h([e=>{if(e.contentEditable==="false")return{type:"tag",data:{label:e.textContent,value:e.dataset.tagValue}}}]),m()],onChange:c}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:o.length?o.map((e,s)=>e.type==="tag"?a.jsx("span",{contentEditable:!1,"data-tag-value":e.data.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:e.data.label},s):a.jsx("span",{children:e.text},s)):a.jsx("br",{})})}},N=y({multiline:!0}),v={render:()=>{const t=l.useRef(null),[o,c]=l.useState([[{type:"text",text:"Hello "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=1"}},{type:"text",text:" world "},{type:"image",data:{src:"https://loremflickr.com/320/240/cats?lock=2"}}]]);return l.useEffect(()=>{if(t.current)return i({doc:o,schema:N,copy:[f(),p()],paste:[h([e=>{if(e.tagName==="IMG")return{type:"image",data:{src:e.src}}}]),m()],onChange:c}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:o.map((e,s)=>a.jsx("div",{children:e.length?e.map((n,r)=>n.type==="image"?a.jsx("img",{src:n.data.src},r):a.jsx("span",{children:n.text},r)):a.jsx("br",{})},s))})}},H=y({multiline:!0}),b={render:()=>{const t=l.useRef(null),[o,c]=l.useState([[{type:"text",text:"Hello "},{type:"video",data:{src:"https://download.samplelib.com/mp4/sample-5s.mp4"}},{type:"text",text:" world "}]]);return l.useEffect(()=>{if(t.current)return i({doc:o,schema:H,copy:[f(),p()],paste:[h([e=>{if(e.tagName==="VIDEO")return{type:"video",data:{src:e.childNodes[0].src}}}]),m()],onChange:c}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:o.map((e,s)=>a.jsx("div",{children:e.length?e.map((n,r)=>n.type==="video"?a.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:a.jsx("source",{src:n.data.src})},r):a.jsx("span",{children:n.text},r)):a.jsx("br",{})},s))})}},V=y({multiline:!0}),M=({id:t})=>a.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":t,width:"560",height:"315",src:"https://www.youtube.com/embed/"+t,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),C={render:()=>{const t=l.useRef(null),[o,c]=l.useState([[{type:"text",text:"Hello "},{type:"youtube",data:{id:"IqKz0SfHaqI"}},{type:"text",text:" Youtube"}]]);return l.useEffect(()=>{if(t.current)return i({doc:o,schema:V,copy:[f(),p()],paste:[h([e=>{if(e.dataset.youtubeNode)return{type:"youtube",data:{id:e.dataset.youtubeId}}}]),m()],onChange:c}).input(t.current)},[]),a.jsx("div",{children:a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:o.map((e,s)=>a.jsx("div",{children:e.length?e.map((n,r)=>n.type==="youtube"?a.jsx(M,{id:n.data.id},r):a.jsx("span",{children:n.text},r)):a.jsx("br",{})},s))})})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste(), plainPaste()],
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
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
    type DocNode = InferNode<typeof tagSchema>;
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: tagSchema,
        copy: [htmlCopy(), plainCopy<DocNode>(node => "text" in node ? node.text : node.data.label)],
        paste: [htmlPaste<DocNode>([e => {
          if (e.contentEditable === "false") {
            return {
              type: "tag",
              data: {
                label: e.textContent!,
                value: e.dataset.tagValue!
              }
            };
          }
        }]), plainPaste()],
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
    type DocNode = InferNode<typeof imageSchema>;
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: imageSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<DocNode>([e => {
          if (e.tagName === "IMG") {
            return {
              type: "image",
              data: {
                src: (e as HTMLImageElement).src
              }
            };
          }
        }]), plainPaste()],
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
    type DocNode = InferNode<typeof videoSchema>;
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: videoSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<DocNode>([e => {
          if (e.tagName === "VIDEO") {
            return {
              type: "video",
              data: {
                src: (e.childNodes[0] as HTMLSourceElement).src
              }
            };
          }
        }]), plainPaste()],
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
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
    type DocNode = InferNode<typeof youtubeSchema>;
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        schema: youtubeSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<DocNode>([e => {
          if (!!e.dataset.youtubeNode) {
            return {
              type: "youtube",
              data: {
                id: e.dataset.youtubeId!
              }
            };
          }
        }]), plainPaste()],
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
}`,...C.parameters?.docs?.source}}};const q=["Multiline","Tag","Image","Video","Iframe"];export{C as Iframe,v as Image,g as Multiline,x as Tag,b as Video,q as __namedExportsOrder,L as default};
