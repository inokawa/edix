import{e as d,j as t}from"./editable-HM7hDvUh.js";import{r as l}from"./index-RYns6xqu.js";const I={component:d},c={render:()=>{const a=l.useRef(null),[u,i]=l.useState([{type:"text",value:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",value:" world "},{type:"tag",label:"Orange",value:"2"}]);return l.useEffect(()=>{if(a.current)return d(a.current,{serializer:{data:s=>s[0].reduce((r,e)=>(typeof e=="string"?r.push({type:"text",value:e}):e.contentEditable==="false"&&r.push({type:"tag",label:e.textContent,value:e.dataset.tagValue}),r),[])},onChange:i})},[]),t.jsx("div",{ref:a,style:{backgroundColor:"white",padding:8},children:u.length?u.map((s,r)=>s.type==="tag"?t.jsx("span",{contentEditable:!1,"data-tag-value":s.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:s.label},r):t.jsx("span",{children:s.value},r)):t.jsx("br",{})})}},p={render:()=>{const a=l.useRef(null),[u,i]=l.useState([[{type:"text",value:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",value:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return l.useEffect(()=>{if(a.current)return d(a.current,{multiline:!0,serializer:{data:s=>s.map(r=>r.reduce((e,n)=>(typeof n=="string"?e.push({type:"text",value:n}):n.tagName==="IMG"&&e.push({type:"image",src:n.src}),e),[]))},onChange:i})},[]),t.jsx("div",{ref:a,style:{backgroundColor:"white",padding:8},children:u.map((s,r)=>t.jsx("div",{children:s.length?s.map((e,n)=>e.type==="image"?t.jsx("img",{src:e.src},n):t.jsx("span",{children:e.value},n)):t.jsx("br",{})},r))})}},y={render:()=>{const a=l.useRef(null),[u,i]=l.useState([[{type:"text",value:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",value:" world "}]]);return l.useEffect(()=>{if(a.current)return d(a.current,{multiline:!0,serializer:{data:s=>s.map(r=>r.reduce((e,n)=>(typeof n=="string"?e.push({type:"text",value:n}):n.tagName==="VIDEO"&&e.push({type:"video",src:n.childNodes[0].src}),e),[]))},onChange:i})},[]),t.jsx("div",{ref:a,style:{backgroundColor:"white",padding:8},children:u.map((s,r)=>t.jsx("div",{children:s.length?s.map((e,n)=>e.type==="video"?t.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:t.jsx("source",{src:e.src})},n):t.jsx("span",{children:e.value},n)):t.jsx("br",{})},r))})}},C=({id:a})=>t.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":a,width:"560",height:"315",src:"https://www.youtube.com/embed/"+a,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),f={render:()=>{const a=l.useRef(null),u=l.useRef(null),[i,s]=l.useState([[{type:"text",value:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",value:" Youtube"}]]);return l.useEffect(()=>{if(a.current)return u.current=d(a.current,{multiline:!0,serializer:{data:r=>r.map(e=>e.reduce((n,o)=>(typeof o=="string"?n.push({type:"text",value:o}):o.dataset.youtubeNode&&n.push({type:"youtube",id:o.dataset.youtubeId}),n),[]))},onChange:s})},[]),t.jsx("div",{children:t.jsx("div",{ref:a,style:{backgroundColor:"white",padding:8},children:i.map((r,e)=>t.jsx("div",{children:r.length?r.map((n,o)=>n.type==="youtube"?t.jsx(C,{id:n.id},o):t.jsx("span",{children:n.value},o)):t.jsx("br",{})},e))})})}};var m,v,g;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type EditableNode = {
      type: "text";
      value: string;
    } | {
      type: "tag";
      label: string;
      value: string;
    };
    const [value, setValue] = useState<EditableNode[]>([{
      type: "text",
      value: "Hello "
    }, {
      type: "tag",
      label: "Apple",
      value: "1"
    }, {
      type: "text",
      value: " world "
    }, {
      type: "tag",
      label: "Orange",
      value: "2"
    }]);
    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[]>(ref.current, {
        serializer: {
          data: snap => {
            // singleline
            return snap[0].reduce((acc, t) => {
              if (typeof t === "string") {
                acc.push({
                  type: "text",
                  value: t
                });
              } else if ((t as HTMLElement).contentEditable === "false") {
                acc.push({
                  type: "tag",
                  label: t.textContent!,
                  value: (t as HTMLElement).dataset.tagValue!
                });
              }
              return acc;
            }, [] as EditableNode[]);
          }
        },
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.length ? value.map((t, j) => t.type === "tag" ? <span key={j} contentEditable={false} data-tag-value={t.value} style={{
        background: "slategray",
        color: "white",
        fontSize: 12,
        padding: 4,
        borderRadius: 8
      }}>
                {t.label}
              </span> : <span key={j}>{t.value}</span>) : <br />}
      </div>;
  }
}`,...(g=(v=c.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var b,h,x;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type EditableNode = {
      type: "text";
      value: string;
    } | {
      type: "image";
      src: string;
    };
    const [value, setValue] = useState<EditableNode[][]>([[{
      type: "text",
      value: "Hello "
    }, {
      type: "image",
      src: "https://loremflickr.com/320/240/cats?lock=1"
    }, {
      type: "text",
      value: " world "
    }, {
      type: "image",
      src: "https://loremflickr.com/320/240/cats?lock=2"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: snap => {
            return snap.map(r => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({
                    type: "text",
                    value: t
                  });
                } else if (t.tagName === "IMG") {
                  acc.push({
                    type: "image",
                    src: (t as HTMLImageElement).src
                  });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          }
        },
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.map((r, i) => <div key={i}>
            {r.length ? r.map((t, j) => t.type === "image" ? <img key={j} src={t.src} /> : <span key={j}>{t.value}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(x=(h=p.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var E,j,k;y.parameters={...y.parameters,docs:{...(E=y.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type EditableNode = {
      type: "text";
      value: string;
    } | {
      type: "video";
      src: string;
    };
    const [value, setValue] = useState<EditableNode[][]>([[{
      type: "text",
      value: "Hello "
    }, {
      type: "video",
      src: "https://download.samplelib.com/mp4/sample-5s.mp4"
    }, {
      type: "text",
      value: " world "
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: snap => {
            return snap.map(r => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({
                    type: "text",
                    value: t
                  });
                } else if (t.tagName === "VIDEO") {
                  acc.push({
                    type: "video",
                    src: (t.childNodes[0] as HTMLSourceElement).src
                  });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          }
        },
        onChange: setValue
      });
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
                  </video> : <span key={j}>{t.value}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(k=(j=y.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var w,N,H;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const editorRef = useRef<EditableHandle | null>(null);
    type EditableNode = {
      type: "text";
      value: string;
    } | {
      type: "youtube";
      id: string;
    };
    const [value, setValue] = useState<EditableNode[][]>([[{
      type: "text",
      value: "Hello "
    }, {
      type: "youtube",
      id: "IqKz0SfHaqI"
    }, {
      type: "text",
      value: " Youtube"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return editorRef.current = editable<EditableNode[][]>(ref.current, {
        multiline: true,
        serializer: {
          data: snap => {
            return snap.map(r => {
              return r.reduce((acc, t) => {
                if (typeof t === "string") {
                  acc.push({
                    type: "text",
                    value: t
                  });
                } else if (!!(t as HTMLElement).dataset.youtubeNode) {
                  acc.push({
                    type: "youtube",
                    id: (t as HTMLElement).dataset.youtubeId!
                  });
                }
                return acc;
              }, [] as EditableNode[]);
            });
          }
        },
        onChange: setValue
      });
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
              {r.length ? r.map((t, j) => t.type === "youtube" ? <Youtube key={j} id={t.id} /> : <span key={j}>{t.value}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(H=(N=f.parameters)==null?void 0:N.docs)==null?void 0:H.source}}};const R=["Tag","Image","Video","Iframe"];export{f as Iframe,p as Image,c as Tag,y as Video,R as __namedExportsOrder,I as default};
