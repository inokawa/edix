import{j as n}from"./jsx-runtime-u17CrQMm.js";import{r as s}from"./iframe-DQsAK5gg.js";import{a as E,b as j,i as k,r as w,c,p,e as d}from"./editor-DmEyfMkh.js";import"./preload-helper-PPVm8Dsz.js";const y=()=>(t,r,o)=>{const e=document.createElement("div");e.appendChild(E(j(o),o).cloneContents()),t.setData("text/html",e.innerHTML)},m=(t,r=[])=>(o,e)=>{const i=o.getData("text/html");if(i){let a=new DOMParser().parseFromString(i,"text/html").body,l=!1;for(const u of[...a.childNodes])k(u)?u.data==="StartFragment"?(l=!0,a=new DocumentFragment):u.data==="EndFragment"&&(l=!1):l&&a.appendChild(u);return w(a,e,t,u=>{for(const C of r){const b=C(u);if(b)return b}})}return null},R={component:c},x={render:()=>{const t=s.useRef(null),[r,o]=s.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return s.useEffect(()=>{if(t.current)return c({doc:r,copy:[y(),p()],paste:[m(e=>({type:"text",text:e})),d()],onChange:o}).input(t.current)},[]),n.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((e,i)=>n.jsx("div",{children:e.length?e.map((a,l)=>n.jsx("span",{children:a.text},l)):n.jsx("br",{})},i))})}},f={render:()=>{const t=s.useRef(null),[r,o]=s.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return s.useEffect(()=>{if(t.current)return c({doc:r,singleline:!0,copy:[y(),p(e=>"text"in e?e.text:e.label)],paste:[m(e=>({type:"text",text:e}),[e=>{if(e.contentEditable==="false")return{type:"tag",label:e.textContent,value:e.dataset.tagValue}}]),d()],onChange:o}).input(t.current)},[]),n.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r[0].length?r[0].map((e,i)=>e.type==="tag"?n.jsx("span",{contentEditable:!1,"data-tag-value":e.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:e.label},i):n.jsx("span",{children:e.text},i)):n.jsx("br",{})})}},g={render:()=>{const t=s.useRef(null),[r,o]=s.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return s.useEffect(()=>{if(t.current)return c({doc:r,copy:[y(),p()],paste:[m(e=>({type:"text",text:e}),[e=>{if(e.tagName==="IMG")return{type:"image",src:e.src}}]),d()],onChange:o}).input(t.current)},[]),n.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((e,i)=>n.jsx("div",{children:e.length?e.map((a,l)=>a.type==="image"?n.jsx("img",{src:a.src,style:{maxWidth:200}},l):n.jsx("span",{children:a.text},l)):n.jsx("br",{})},i))})}},h={render:()=>{const t=s.useRef(null),[r,o]=s.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return s.useEffect(()=>{if(t.current)return c({doc:r,copy:[y(),p()],paste:[m(e=>({type:"text",text:e}),[e=>{if(e.tagName==="VIDEO")return{type:"video",src:e.childNodes[0].src}}]),d()],onChange:o}).input(t.current)},[]),n.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((e,i)=>n.jsx("div",{children:e.length?e.map((a,l)=>a.type==="video"?n.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:n.jsx("source",{src:a.src})},l):n.jsx("span",{children:a.text},l)):n.jsx("br",{})},i))})}},D=({id:t})=>n.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":t,width:"560",height:"315",src:"https://www.youtube.com/embed/"+t,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),v={render:()=>{const t=s.useRef(null),[r,o]=s.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return s.useEffect(()=>{if(t.current)return c({doc:r,copy:[y(),p()],paste:[m(e=>({type:"text",text:e}),[e=>{if(e.dataset.youtubeNode)return{type:"youtube",id:e.dataset.youtubeId}}]),d()],onChange:o}).input(t.current)},[]),n.jsx("div",{children:n.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((e,i)=>n.jsx("div",{children:e.length?e.map((a,l)=>a.type==="youtube"?n.jsx(D,{id:a.id},l):n.jsx("span",{children:a.text},l)):n.jsx("br",{})},i))})})}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = {
      text: string;
    }[][];
    const [value, setValue] = useState<Doc>([[{
      text: "Hello world."
    }], [{
      text: "こんにちは。"
    }], [{
      text: "👍❤️🧑‍🧑‍🧒"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
          type: "text",
          text
        })), plainPaste()],
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
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = [({
      type: "text";
      text: string;
    } | {
      type: "tag";
      label: string;
      value: string;
    })[]];
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "tag",
      label: "Apple",
      value: "1"
    }, {
      type: "text",
      text: " world "
    }, {
      type: "tag",
      label: "Orange",
      value: "2"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        singleline: true,
        copy: [htmlCopy(), plainCopy<Doc>(node => "text" in node ? node.text : node.label)],
        paste: [htmlPaste<Doc>(text => ({
          type: "text",
          text
        }), [e => {
          if (e.contentEditable === "false") {
            return {
              type: "tag",
              label: e.textContent!,
              value: e.dataset.tagValue!
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
        {value[0].length ? value[0].map((t, j) => t.type === "tag" ? <span key={j} contentEditable={false} data-tag-value={t.value} style={{
        background: "slategray",
        color: "white",
        fontSize: 12,
        padding: 4,
        borderRadius: 8
      }}>
                {t.label}
              </span> : <span key={j}>{t.text}</span>) : <br />}
      </div>;
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = ({
      type: "text";
      text: string;
    } | {
      type: "image";
      src: string;
    })[][];
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "image",
      src: "https://loremflickr.com/320/240/cats?lock=1"
    }, {
      type: "text",
      text: " world "
    }, {
      type: "image",
      src: "https://loremflickr.com/320/240/cats?lock=2"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
          type: "text",
          text
        }), [e => {
          if (e.tagName === "IMG") {
            return {
              type: "image",
              src: (e as HTMLImageElement).src
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
            {r.length ? r.map((t, j) => t.type === "image" ? <img key={j} src={t.src} style={{
          maxWidth: 200
        }} /> : <span key={j}>{t.text}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = ({
      type: "text";
      text: string;
    } | {
      type: "video";
      src: string;
    })[][];
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "video",
      src: "https://download.samplelib.com/mp4/sample-5s.mp4"
    }, {
      type: "text",
      text: " world "
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
          type: "text",
          text
        }), [e => {
          if (e.tagName === "VIDEO") {
            return {
              type: "video",
              src: (e.childNodes[0] as HTMLSourceElement).src
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
                    <source src={t.src} />
                  </video> : <span key={j}>{t.text}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = ({
      type: "text";
      text: string;
    } | {
      type: "youtube";
      id: string;
    })[][];
    const [value, setValue] = useState<Doc>([[{
      type: "text",
      text: "Hello "
    }, {
      type: "youtube",
      id: "IqKz0SfHaqI"
    }, {
      type: "text",
      text: " Youtube"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: value,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
          type: "text",
          text
        }), [e => {
          if (!!e.dataset.youtubeNode) {
            return {
              type: "youtube",
              id: e.dataset.youtubeId!
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
              {r.length ? r.map((t, j) => t.type === "youtube" ? <Youtube key={j} id={t.id} /> : <span key={j}>{t.text}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...v.parameters?.docs?.source}}};const M=["Multiline","Tag","Image","Video","Iframe"];export{v as Iframe,g as Image,x as Multiline,f as Tag,h as Video,M as __namedExportsOrder,R as default};
