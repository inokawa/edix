import{e as u,j as e}from"./editable-DYUTMSkJ.js";import{r as t}from"./index-RYns6xqu.js";const se={component:u},c={render:()=>{const n=t.useRef(null),[i,o]=t.useState(`Hello World.
こんにちは。
👍❤️🧑‍🧑‍🧒`);return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},p={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Hello world."),[r,a]=t.useState(!1),l=t.useRef(null);return t.useEffect(()=>{if(n.current)return l.current=u(n.current,{onChange:o})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{if(!l.current)return;const s=!r;l.current.readonly(s),a(s)},children:r?"editable":"readonly"})}),e.jsx("div",{ref:n,style:{background:"white",color:r?"gray":void 0},children:i.split(`
`).map((s,d)=>e.jsx("div",{children:s||e.jsx("br",{})},d))})]})}},f={render:()=>{const n=t.useRef(null),[i,o]=t.useState(`אחד !
two !
שְׁלוֹשָׁה !`);return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o})},[]),e.jsx("div",{ref:n,style:{direction:"rtl",background:"white"},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},m={render:()=>{const n=t.useRef(null),[i,o]=t.useState(`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。`);return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o})},[]),e.jsx("div",{ref:n,style:{writingMode:"vertical-rl",background:"white",height:400},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r||e.jsx("br",{})},a))})}},v={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),[r,a]=t.useState("dolor");t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o})},[]);const l=r?new RegExp(`(${r})`):null;return e.jsxs("div",{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"search",children:"input search word: "}),e.jsx("input",{name:"search",value:r,onChange:s=>a(s.target.value)})]}),e.jsx("div",{ref:n,style:{background:"white"},children:i.split(`
`).map((s,d)=>e.jsx("div",{children:s?(l?s.split(l):[s]).map((y,B)=>e.jsx("span",{style:{background:y===r?"yellow":void 0},children:y},B)):e.jsx("br",{})},d))})]})}},J="[TAG:",Q=({children:n})=>e.jsx("span",{contentEditable:!1,style:{background:"slategray",color:"white",padding:4,borderRadius:8},children:n}),h={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Hello [TAG:TAG1] world [TAG:TAG2]");return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o,nodes:[{is:r=>r.contentEditable==="false",serialize:r=>r.textContent}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,s)=>l.startsWith(J)?e.jsx(Q,{children:l},s):e.jsx("span",{children:l},s)):e.jsx("br",{})},a))})}},O="[image:",Z=({text:n})=>{const i=n.slice(O.length,n.length-1);return e.jsx("img",{src:i})},g={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o,nodes:[{is:"img",serialize:r=>`[image:${r.src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,s)=>l.startsWith(O)?e.jsx(Z,{text:l},s):e.jsx("span",{children:l},s)):e.jsx("br",{})},a))})}},U="[video:",ee=({text:n})=>{const i=n.slice(U.length,n.length-1);return e.jsx("video",{width:400,controls:!0,children:e.jsx("source",{src:i})})},b={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");return t.useEffect(()=>{if(n.current)return u(n.current,{onChange:o,nodes:[{is:"video",serialize:r=>`[video:${r.childNodes[0].src}]`}]})},[]),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:i.split(`
`).map((r,a)=>e.jsx("div",{children:r?r.split(/(\[.+?\])/).map((l,s)=>l.startsWith(U)?e.jsx(ee,{text:l},s):e.jsx("span",{children:l},s)):e.jsx("br",{})},a))})}},ne=({id:n})=>e.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":n,width:"560",height:"315",src:"https://www.youtube.com/embed/"+n,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),x={render:()=>{const n=t.useRef(null),[i,o]=t.useState("Hello [IqKz0SfHaqI] Youtube"),r=t.useRef(null);return t.useEffect(()=>{if(n.current)return r.current=u(n.current,{onChange:o,nodes:[{is:a=>!!a.dataset.youtubeNode,serialize:a=>"["+a.dataset.youtubeId+"]"}]})},[]),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("button",{onClick:()=>{var a;(a=r.current)==null||a.insert(" [IqKz0SfHaqI]")},children:"insert"})}),e.jsx("div",{ref:n,style:{backgroundColor:"white",padding:8},children:i.split(`
`).map((a,l)=>e.jsx("div",{children:a.split(/(\[.+?\])/).map((s,d)=>s.startsWith("[")?e.jsx(ne,{id:s.slice(1,s.length-1)},d):e.jsx("span",{children:s},d))},l))})]})}};var j,k,E;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello World.\\nこんにちは。\\n👍❤️🧑‍🧑‍🧒");
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
        {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
      </div>;
  }
}`,...(E=(k=c.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var w,R,C;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
          {value.split("\\n").map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
        </div>
      </div>;
  }
}`,...(C=(R=p.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var S,T,V;f.parameters={...f.parameters,docs:{...(S=f.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`אחד !
two !
שְׁלוֹשָׁה !\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
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
}`,...(V=(T=f.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var H,I,q;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState(\`春は、あけぼの。やうやうしろくなりゆく山ぎは、すこし明かりて、紫だちたる雲の、細くたなびきたる。
夏は、夜。月のころはさらなり。闇もなほ、蛍の多く飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くも、をかし。雨など降るも、をかし。
秋は、夕暮。夕日のさして、山の端いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛びいそぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入りはてて、風の音、虫の音など、はた、言ふべきにあらず。
冬は、つとめて。雪の降りたるは、言ふべきにもあらず。霜のいと白きも。またさらでも、いと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。\`);
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
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
}`,...(q=(I=m.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var M,A,D;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [searchText, setSearchText] = useState("dolor");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
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
}`,...(D=(A=v.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var G,L,z;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(z=(L=h.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var W,_,F;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [image:https://loremflickr.com/320/240/cats?lock=1] world [image:https://loremflickr.com/320/240/cats?lock=2]");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
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
}`,...(F=(_=g.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var N,P,X;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [video:https://download.samplelib.com/mp4/sample-5s.mp4] world");
    useEffect(() => {
      if (!ref.current) return;
      return editable(ref.current, {
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
}`,...(X=(P=b.parameters)==null?void 0:P.docs)==null?void 0:X.source}}};var $,K,Y;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState("Hello [IqKz0SfHaqI] Youtube");
    const editorRef = useRef<EditableHandle | null>(null);
    useEffect(() => {
      if (!ref.current) return;
      return editorRef.current = editable(ref.current, {
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
              {r.split(/(\\[.+?\\])/).map((t, j) => t.startsWith("[") ? <Youtube key={j} id={t.slice(1, t.length - 1)} /> : <span key={j}>{t}</span>)}
            </div>)}
        </div>
      </div>;
  }
}`,...(Y=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};const ae=["Text","Readonly","Rtl","Vertical","Highlight","Tag","Image","Video","Iframe"];export{v as Highlight,x as Iframe,g as Image,p as Readonly,f as Rtl,h as Tag,c as Text,m as Vertical,b as Video,ae as __namedExportsOrder,se as default};
