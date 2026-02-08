import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-C-V-Kl-l.js";import{g as N,a as L,i as q,r as W,c as x,p as j,b as E}from"./editor-CJ9tJRbg.js";import{T as w}from"./commands-DR_7cFdL.js";import"./preload-helper-PPVm8Dsz.js";const C=()=>(e,r,t)=>{const n=document.createElement("div");n.appendChild(N(L(t),t).cloneContents()),e.setData("text/html",n.innerHTML)},S=(e,r=[])=>(t,n)=>{const a=t.getData("text/html");if(a){let s=new DOMParser().parseFromString(a,"text/html").body,i=!1;for(const u of[...s.childNodes])q(u)?u.data==="StartFragment"?(i=!0,s=new DocumentFragment):u.data==="EndFragment"&&(i=!1):i&&s.appendChild(u);return W(s,n,e,u=>{for(const l of r){const p=l(u);if(p)return p}})}return null};let O;function z(e){return{lang:e?.lang??O?.lang,message:e?.message,abortEarly:e?.abortEarly??O?.abortEarly,abortPipeEarly:e?.abortPipeEarly??O?.abortPipeEarly}}let A;function G(e){return A?.get(e)}let Y;function B(e){return Y?.get(e)}let K;function $(e,r){return K?.get(e)?.get(r)}function _(e){const r=typeof e;return r==="string"?`"${e}"`:r==="number"||r==="bigint"||r==="boolean"?`${e}`:r==="object"||r==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":r}function h(e,r,t,n,a){const s=a&&"input"in a?a.input:t.value,i=a?.expected??e.expects??null,u=a?.received??_(s),l={kind:e.kind,type:e.type,input:s,expected:i,received:u,message:`Invalid ${r}: ${i?`Expected ${i} but r`:"R"}eceived ${u}`,requirement:e.requirement,path:a?.path,issues:a?.issues,lang:n.lang,abortEarly:n.abortEarly,abortPipeEarly:n.abortPipeEarly},p=e.kind==="schema",m=a?.message??e.message??$(e.reference,l.lang)??(p?B(l.lang):null)??n.message??G(l.lang);m!==void 0&&(l.message=typeof m=="function"?m(l):m),p&&(t.typed=!1),t.issues?t.issues.push(l):t.issues=[l]}function v(e){return{version:1,vendor:"valibot",validate(r){return e["~run"]({value:r},z())}}}function J(e,r){const t=[...new Set(e)];return t.length>1?`(${t.join(` ${r} `)})`:t[0]??"never"}function Q(e,r,t){return typeof e.fallback=="function"?e.fallback(r,t):e.fallback}function F(e,r,t){return typeof e.default=="function"?e.default(r,t):e.default}function d(e,r){return{kind:"schema",type:"array",reference:d,expects:"Array",async:!1,item:e,message:r,get"~standard"(){return v(this)},"~run"(t,n){const a=t.value;if(Array.isArray(a)){t.typed=!0,t.value=[];for(let s=0;s<a.length;s++){const i=a[s],u=this.item["~run"]({value:i},n);if(u.issues){const l={type:"array",origin:"value",input:a,key:s,value:i};for(const p of u.issues)p.path?p.path.unshift(l):p.path=[l],t.issues?.push(p);if(t.issues||(t.issues=u.issues),n.abortEarly){t.typed=!1;break}}u.typed||(t.typed=!1),t.value.push(u.value)}}else h(this,"type",t,n);return t}}}function b(e){return{kind:"schema",type:"boolean",reference:b,expects:"boolean",async:!1,message:e,get"~standard"(){return v(this)},"~run"(r,t){return typeof r.value=="boolean"?r.typed=!0:h(this,"type",r,t),r}}}function g(e,r){return{kind:"schema",type:"literal",reference:g,expects:_(e),async:!1,literal:e,message:r,get"~standard"(){return v(this)},"~run"(t,n){return t.value===this.literal?t.typed=!0:h(this,"type",t,n),t}}}function k(e,r){return{kind:"schema",type:"optional",reference:k,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:r,get"~standard"(){return v(this)},"~run"(t,n){return t.value===void 0&&(this.default!==void 0&&(t.value=F(this,t,n)),t.value===void 0)?(t.typed=!0,t):this.wrapped["~run"](t,n)}}}function f(e,r){return{kind:"schema",type:"strict_object",reference:f,expects:"Object",async:!1,entries:e,message:r,get"~standard"(){return v(this)},"~run"(t,n){const a=t.value;if(a&&typeof a=="object"){t.typed=!0,t.value={};for(const s in this.entries){const i=this.entries[s];if(s in a||(i.type==="exact_optional"||i.type==="optional"||i.type==="nullish")&&i.default!==void 0){const u=s in a?a[s]:F(i),l=i["~run"]({value:u},n);if(l.issues){const p={type:"object",origin:"value",input:a,key:s,value:u};for(const m of l.issues)m.path?m.path.unshift(p):m.path=[p],t.issues?.push(m);if(t.issues||(t.issues=l.issues),n.abortEarly){t.typed=!1;break}}l.typed||(t.typed=!1),t.value[s]=l.value}else if(i.fallback!==void 0)t.value[s]=Q(i);else if(i.type!=="exact_optional"&&i.type!=="optional"&&i.type!=="nullish"&&(h(this,"key",t,n,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:a,key:s,value:a[s]}]}),n.abortEarly))break}if(!t.issues||!n.abortEarly){for(const s in a)if(!(s in this.entries)){h(this,"key",t,n,{input:s,expected:"never",path:[{type:"object",origin:"key",input:a,key:s,value:a[s]}]});break}}}else h(this,"type",t,n);return t}}}function y(e){return{kind:"schema",type:"string",reference:y,expects:"string",async:!1,message:e,get"~standard"(){return v(this)},"~run"(r,t){return typeof r.value=="string"?r.typed=!0:h(this,"type",r,t),r}}}function M(e){let r;if(e)for(const t of e)r?r.push(...t.issues):r=t.issues;return r}function D(e,r){return{kind:"schema",type:"union",reference:D,expects:J(e.map(t=>t.expects),"|"),async:!1,options:e,message:r,get"~standard"(){return v(this)},"~run"(t,n){let a,s,i;for(const u of this.options){const l=u["~run"]({value:t.value},n);if(l.typed)if(l.issues)s?s.push(l):s=[l];else{a=l;break}else i?i.push(l):i=[l]}if(a)return a;if(s){if(s.length===1)return s[0];h(this,"type",t,n,{issues:M(s)}),t.typed=!0}else{if(i?.length===1)return i[0];h(this,"type",t,n,{issues:M(i)})}return t}}}const ce={component:x},U=d(d(f({text:y()}))),I={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return c.useEffect(()=>{if(e.current)return x({doc:r,schema:U,copy:[C(),j()],paste:[S(n=>({text:n})),E()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},X=e=>{const r=e.bold?"strong":"span",t={};return e.italic&&(t.fontStyle="italic"),e.underline&&(t.textDecoration="underline"),e.strike&&(t.textDecoration=t.textDecoration?`${t.textDecoration} line-through`:"line-through"),o.jsx(r,{style:t,children:e.text})},Z=d(d(f({text:y(),bold:k(b()),italic:k(b()),underline:k(b()),strike:k(b())}))),H={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{text:"Hello",bold:!0},{text:" "},{text:"World",italic:!0},{text:"."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]),n=c.useMemo(()=>x({doc:r,schema:Z,onChange:t}),[]);return c.useEffect(()=>{if(e.current)return n.input(e.current)},[]),o.jsxs("div",{children:[o.jsxs("div",{children:[o.jsx("button",{onClick:()=>{n.apply(w,"bold")},children:"bold"}),o.jsx("button",{onClick:()=>{n.apply(w,"italic")},children:"italic"}),o.jsx("button",{onClick:()=>{n.apply(w,"underline")},children:"underline"}),o.jsx("button",{onClick:()=>{n.apply(w,"strike")},children:"strike"})]}),o.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((a,s)=>o.jsx("div",{children:a.length?a.map((i,u)=>o.jsx(X,{text:i.text,bold:i.bold,italic:i.italic,underline:i.underline,strike:i.strike},u)):o.jsx("br",{})},s))})]})}},ee=d(d(D([f({type:g("text"),text:y()}),f({type:g("tag"),label:y(),value:y()})]))),V={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return c.useEffect(()=>{if(e.current)return x({doc:r,schema:ee,singleline:!0,copy:[C(),j(n=>"text"in n?n.text:n.label)],paste:[S(n=>({type:"text",text:n}),[n=>{if(n.contentEditable==="false")return{type:"tag",label:n.textContent,value:n.dataset.tagValue}}]),E()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r[0].length?r[0].map((n,a)=>n.type==="tag"?o.jsx("span",{contentEditable:!1,"data-tag-value":n.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:n.label},a):o.jsx("span",{children:n.text},a)):o.jsx("br",{})})}},te=d(d(D([f({type:g("text"),text:y()}),f({type:g("image"),src:y()})]))),T={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return c.useEffect(()=>{if(e.current)return x({doc:r,schema:te,copy:[C(),j()],paste:[S(n=>({type:"text",text:n}),[n=>{if(n.tagName==="IMG")return{type:"image",src:n.src}}]),E()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="image"?o.jsx("img",{src:s.src,style:{maxWidth:200}},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},ne=d(d(D([f({type:g("text"),text:y()}),f({type:g("video"),src:y()})]))),P={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return c.useEffect(()=>{if(e.current)return x({doc:r,schema:ne,copy:[C(),j()],paste:[S(n=>({type:"text",text:n}),[n=>{if(n.tagName==="VIDEO")return{type:"video",src:n.childNodes[0].src}}]),E()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="video"?o.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:o.jsx("source",{src:s.src})},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},re=d(d(D([f({type:g("text"),text:y()}),f({type:g("youtube"),id:y()})]))),se=({id:e})=>o.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),R={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return c.useEffect(()=>{if(e.current)return x({doc:r,schema:re,copy:[C(),j()],paste:[S(n=>({type:"text",text:n}),[n=>{if(n.dataset.youtubeNode)return{type:"youtube",id:n.dataset.youtubeId}}]),E()],onChange:t}).input(e.current)},[]),o.jsx("div",{children:o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="youtube"?o.jsx(se,{id:s.id},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})})}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof basicSchema>;
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
        schema: basicSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
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
}`,...I.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof richSchema>;
    const [value, setValue] = useState<Doc>([[{
      text: "Hello",
      bold: true
    }, {
      text: " "
    }, {
      text: "World",
      italic: true
    }, {
      text: "."
    }], [{
      text: "こんにちは。"
    }], [{
      text: "👍❤️🧑‍🧑‍🧒"
    }]]);
    const editor = useMemo(() => createEditor({
      doc: value,
      schema: richSchema,
      onChange: setValue
    }), []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div>
          <button onClick={() => {
          editor.apply(ToggleFormat, "bold");
        }}>
            bold
          </button>
          <button onClick={() => {
          editor.apply(ToggleFormat, "italic");
        }}>
            italic
          </button>
          <button onClick={() => {
          editor.apply(ToggleFormat, "underline");
        }}>
            underline
          </button>
          <button onClick={() => {
          editor.apply(ToggleFormat, "strike");
        }}>
            strike
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }}>
          {value.map((r, i) => <div key={i}>
              {r.length ? r.map((n, j) => <Text key={j} text={n.text} bold={n.bold} italic={n.italic} underline={n.underline} strike={n.strike} />) : <br />}
            </div>)}
        </div>
      </div>;
  }
}`,...H.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof tagSchema>;
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
        schema: tagSchema,
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
}`,...V.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof imageSchema>;
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
        schema: imageSchema,
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
}`,...T.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof videoSchema>;
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
        schema: videoSchema,
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
}`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof youtubeSchema>;
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
        schema: youtubeSchema,
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
}`,...R.parameters?.docs?.source}}};const pe=["Basic","RichText","Tag","Image","Video","Iframe"];export{I as Basic,R as Iframe,T as Image,H as RichText,V as Tag,P as Video,pe as __namedExportsOrder,ce as default};
