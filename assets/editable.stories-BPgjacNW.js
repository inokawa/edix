import{e as o,j as e}from"./editable-D0d7ov5n.js";import{r as t}from"./index-RYns6xqu.js";const ue={component:o},c={render:()=>{const n=t.useRef(null),[s,u]=t.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},p={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello World.");return t.useEffect(()=>{if(n.current)return o(n.current,{onChange:u})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:s||e.jsx("br",{})})}},m={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello world."),[r,a]=t.useState(!1),l=t.useRef(null);return t.useEffect(()=>{if(n.current)return l.current=o(n.current,{onChange:u})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!l.current)return;const i=!r;l.current.readonly(i),a(i)},children:r?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:r?"gray":void 0},children:s||e.jsx("br",{})})]})}},f={render:()=>{const n=t.useRef(null),[s,u]=t.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},v={render:()=>{const n=t.useRef(null),[s,u]=t.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u})},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},h={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[r,a]=t.useState("dolor");t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u})},[]);const l=r?new RegExp(`(${r})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"input search word: "}),e.jsx("input",{name:"search",value:r,onChange:i=>a(i.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:s.split(`
`).map((i,d)=>e.jsx("div",{children:i?(l?i.split(l):[i]).map((j,ee)=>e.jsx("span",{style:{background:j===r?"yellow":void 0},children:j},ee)):e.jsx("br",{})},d))})]})}},ne="[TAG:",re=({children:n})=>e.jsx("span",{contentEditable:!1,style:{background:"slategray",color:"white",padding:4,borderRadius:8},children:n}),g={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello [TAG:TAG1] world [TAG:TAG2]");return t.useEffect(()=>{if(n.current)return o(n.current,{onChange:u,nodes:[{is:r=>r.contentEditable==="false",serialize:r=>r.textContent}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,i)=>l.startsWith(ne)?e.jsx(re,{children:l},i):e.jsx("span",{children:l},i)):e.jsx("br",{})},a))})}},Q="[image:",te=({text:n})=>{const s=n.slice(Q.length,n.length-1);return e.jsx("img",{src:s})},b={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");return t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u,nodes:[{is:"img",serialize:r=>`[image:${r.src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,i)=>l.startsWith(Q)?e.jsx(te,{text:l},i):e.jsx("span",{children:l},i)):e.jsx("br",{})},a))})}},Z="[video:",se=({text:n})=>{const s=n.slice(Z.length,n.length-1);return e.jsx("video",{width:400,controls:!0,children:e.jsx("source",{src:s})})},x={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");return t.useEffect(()=>{if(n.current)return o(n.current,{multiline:!0,onChange:u,nodes:[{is:"video",serialize:r=>`[video:${r.childNodes[0].src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:s.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,i)=>l.startsWith(Z)?e.jsx(se,{text:l},i):e.jsx("span",{children:l},i)):e.jsx("br",{})},a))})}},ae=({id:n})=>e.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":n,width:"560",height:"315",src:"https://www.youtube.com/embed/"+n,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),y={render:()=>{const n=t.useRef(null),[s,u]=t.useState("Hello [IqKz0SfHaqI] Youtube"),r=t.useRef(null);return t.useEffect(()=>{if(n.current)return r.current=o(n.current,{multiline:!0,onChange:u,nodes:[{is:a=>!!a.dataset.youtubeNode,serialize:a=>"["+a.dataset.youtubeId+"]"}]})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{var a;(a=r.current)==null||a.insert(" [IqKz0SfHaqI]")},children:"insert"})}),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:s.split(`
`).map((a,l)=>e.jsx("div",{children:a?a.split(/(\[.+?\])/).map((i,d)=>i.startsWith("[")?e.jsx(ae,{id:i.slice(1,i.length-1)},d):e.jsx("span",{children:i},d)):e.jsx("br",{})},l))})]})}};var k,E,w;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(w=(E=c.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var R,S,C;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {value ? value : <br />}
      </div>;
  }
}`,...(C=(S=p.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var V,T,H;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`Hello world.\`);
    const [readonly, setReadonly] = useState(false);
    const handle = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return handle.current = editable(ref.current, {
        onChange: setValue
      });
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          if (!handle.current) return;
          const value = !readonly;
          handle.current.readonly(value);
          setReadonly(value);
        }}>
            {readonly ? "editable" : "readonly"}
          </button>
        </div>
        <div ref={ref} style={{
        background: "white",
        color: readonly ? "gray" : undefined
      }}>
          {value ? value : <br />}
        </div>
      </div>;
  }
}`,...(H=(T=m.parameters)==null?void 0:T.docs)==null?void 0:H.source}}};var I,q,M;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      direction: "rtl",
      background: "white"
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(M=(q=f.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var D,L,A;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    return <div ref={ref} style={{
      writingMode: "vertical-rl",
      background: "white",
      height: 400
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(A=(L=v.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var G,z,W;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue
      });
    }, []);
    const reg = searchText ? new RegExp(\`(\${searchText})\`) : null;
    return <div>
        <div>
          <label htmlFor="search">input search word: </label>
          <input name="search" value={searchText} onChange={e => setSearchText(e.target.value)} />
        </div>
        <div ref={ref} style={{
        background: "white"
      }}>
          {value.split("\\n").map((r, i) => <div key={i}>
              {r ? (reg ? r.split(reg) : [r]).map((t, j) => <span key={j} style={{
            background: t === searchText ? "yellow" : undefined
          }}>
                    {t}
                  </span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(W=(z=h.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var _,F,N;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [TAG:TAG1] world [TAG:TAG2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        onChange: setValue,
        nodes: [{
          is: e => e.contentEditable === "false",
          serialize: e => e.textContent!
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(TAG_PREFIX) ? <TagComponent key={j}>{t}</TagComponent> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(N=(F=g.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var P,X,$;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: "img",
          serialize: e => \`[image:\${(e as HTMLImageElement).src}]\`
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(IMAGE_PREFIX) ? <Img key={j} text={t} /> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...($=(X=b.parameters)==null?void 0:X.docs)==null?void 0:$.source}}};var K,Y,O;x.parameters={...x.parameters,docs:{...(K=x.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: "video",
          serialize: e => \`[video:\${(e.childNodes[0] as HTMLSourceElement).src}]\`
        }]
      });
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {value.split("\\n").map((r, i) => <div key={i}>
            {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith(VIDEO_PREFIX) ? <VideoNode key={j} text={t} /> : <span key={j}>{t}</span>) : <br />}
          </div>)}
      </div>;
  }
}`,...(O=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:O.source}}};var U,B,J;y.parameters={...y.parameters,docs:{...(U=y.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [IqKz0SfHaqI] Youtube");
    const editorRef = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editorRef.current = editable(ref.current, {
        multiline: true,
        onChange: setValue,
        nodes: [{
          is: e => !!e.dataset.youtubeNode,
          serialize: e => "[" + e.dataset.youtubeId + "]"
        }]
      });
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          editorRef.current?.insert(" [IqKz0SfHaqI]");
        }}>
            insert
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 8
      }}>
          {value.split("\\n").map((r, i) => <div key={i}>
              {r ? r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith("[") ? <Youtube key={j} id={t.slice(1, t.length - 1)} /> : <span key={j}>{t}</span>) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...(J=(B=y.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};const oe=["Multiline","Singleline","Readonly","Rtl","Vertical","Highlight","Tag","Image","Video","Iframe"];export{h as Highlight,y as Iframe,b as Image,c as Multiline,m as Readonly,f as Rtl,p as Singleline,g as Tag,v as Vertical,x as Video,oe as __namedExportsOrder,ue as default};
