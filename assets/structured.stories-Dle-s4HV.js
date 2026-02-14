import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-Uf1Uxe8E.js";import{g as L,b as q,i as W,r as V,c as g,p as j,e as D,a as z}from"./singleline-_a_tUitG.js";import{T as w}from"./commands-Dg8ylC4P.js";import"./preload-helper-PPVm8Dsz.js";const E=()=>(e,r,t)=>{const n=document.createElement("div");n.appendChild(L(q(t),t).cloneContents()),e.setData("text/html",n.innerHTML)},C=(e,r=[])=>(t,n)=>{const i=t.getData("text/html");if(i){let s=new DOMParser().parseFromString(i,"text/html").body,o=!1;for(const l of[...s.childNodes])W(l)?l.data==="StartFragment"?(o=!0,s=new DocumentFragment):l.data==="EndFragment"&&(o=!1):o&&s.appendChild(l);return V(s,n,e,l=>{for(const c of r){const p=c(l);if(p)return p}})}return null};let M;function A(e){return{lang:e?.lang??M?.lang,message:e?.message,abortEarly:e?.abortEarly??M?.abortEarly,abortPipeEarly:e?.abortPipeEarly??M?.abortPipeEarly}}let G;function Y(e){return G?.get(e)}let B;function K(e){return B?.get(e)}let $;function J(e,r){return $?.get(e)?.get(r)}function F(e){const r=typeof e;return r==="string"?`"${e}"`:r==="number"||r==="bigint"||r==="boolean"?`${e}`:r==="object"||r==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":r}function h(e,r,t,n,i){const s=i&&"input"in i?i.input:t.value,o=i?.expected??e.expects??null,l=i?.received??F(s),c={kind:e.kind,type:e.type,input:s,expected:o,received:l,message:`Invalid ${r}: ${o?`Expected ${o} but r`:"R"}eceived ${l}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:n.lang,abortEarly:n.abortEarly,abortPipeEarly:n.abortPipeEarly},p=e.kind==="schema",m=i?.message??e.message??J(e.reference,c.lang)??(p?K(c.lang):null)??n.message??Y(c.lang);m!==void 0&&(c.message=typeof m=="function"?m(c):m),p&&(t.typed=!1),t.issues?t.issues.push(c):t.issues=[c]}function b(e){return{version:1,vendor:"valibot",validate(r){return e["~run"]({value:r},A())}}}function Q(e,r){const t=[...new Set(e)];return t.length>1?`(${t.join(` ${r} `)})`:t[0]??"never"}function U(e,r,t){return typeof e.fallback=="function"?e.fallback(r,t):e.fallback}function N(e,r,t){return typeof e.default=="function"?e.default(r,t):e.default}function d(e,r){return{kind:"schema",type:"array",reference:d,expects:"Array",async:!1,item:e,message:r,get"~standard"(){return b(this)},"~run"(t,n){const i=t.value;if(Array.isArray(i)){t.typed=!0,t.value=[];for(let s=0;s<i.length;s++){const o=i[s],l=this.item["~run"]({value:o},n);if(l.issues){const c={type:"array",origin:"value",input:i,key:s,value:o};for(const p of l.issues)p.path?p.path.unshift(c):p.path=[c],t.issues?.push(p);if(t.issues||(t.issues=l.issues),n.abortEarly){t.typed=!1;break}}l.typed||(t.typed=!1),t.value.push(l.value)}}else h(this,"type",t,n);return t}}}function v(e){return{kind:"schema",type:"boolean",reference:v,expects:"boolean",async:!1,message:e,get"~standard"(){return b(this)},"~run"(r,t){return typeof r.value=="boolean"?r.typed=!0:h(this,"type",r,t),r}}}function x(e,r){return{kind:"schema",type:"literal",reference:x,expects:F(e),async:!1,literal:e,message:r,get"~standard"(){return b(this)},"~run"(t,n){return t.value===this.literal?t.typed=!0:h(this,"type",t,n),t}}}function k(e,r){return{kind:"schema",type:"optional",reference:k,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:r,get"~standard"(){return b(this)},"~run"(t,n){return t.value===void 0&&(this.default!==void 0&&(t.value=N(this,t,n)),t.value===void 0)?(t.typed=!0,t):this.wrapped["~run"](t,n)}}}function f(e,r){return{kind:"schema",type:"strict_object",reference:f,expects:"Object",async:!1,entries:e,message:r,get"~standard"(){return b(this)},"~run"(t,n){const i=t.value;if(i&&typeof i=="object"){t.typed=!0,t.value={};for(const s in this.entries){const o=this.entries[s];if(s in i||(o.type==="exact_optional"||o.type==="optional"||o.type==="nullish")&&o.default!==void 0){const l=s in i?i[s]:N(o),c=o["~run"]({value:l},n);if(c.issues){const p={type:"object",origin:"value",input:i,key:s,value:l};for(const m of c.issues)m.path?m.path.unshift(p):m.path=[p],t.issues?.push(m);if(t.issues||(t.issues=c.issues),n.abortEarly){t.typed=!1;break}}c.typed||(t.typed=!1),t.value[s]=c.value}else if(o.fallback!==void 0)t.value[s]=U(o);else if(o.type!=="exact_optional"&&o.type!=="optional"&&o.type!=="nullish"&&(h(this,"key",t,n,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:i,key:s,value:i[s]}]}),n.abortEarly))break}if(!t.issues||!n.abortEarly){for(const s in i)if(!(s in this.entries)){h(this,"key",t,n,{input:s,expected:"never",path:[{type:"object",origin:"key",input:i,key:s,value:i[s]}]});break}}}else h(this,"type",t,n);return t}}}function y(e){return{kind:"schema",type:"string",reference:y,expects:"string",async:!1,message:e,get"~standard"(){return b(this)},"~run"(r,t){return typeof r.value=="string"?r.typed=!0:h(this,"type",r,t),r}}}function _(e){let r;if(e)for(const t of e)r?r.push(...t.issues):r=t.issues;return r}function S(e,r){return{kind:"schema",type:"union",reference:S,expects:Q(e.map(t=>t.expects),"|"),async:!1,options:e,message:r,get"~standard"(){return b(this)},"~run"(t,n){let i,s,o;for(const l of this.options){const c=l["~run"]({value:t.value},n);if(c.typed)if(c.issues)s?s.push(c):s=[c];else{i=c;break}else o?o.push(c):o=[c]}if(i)return i;if(s){if(s.length===1)return s[0];h(this,"type",t,n,{issues:_(s)}),t.typed=!0}else{if(o?.length===1)return o[0];h(this,"type",t,n,{issues:_(o)})}return t}}}const pe={component:g},X=d(d(f({text:y()}))),I={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return u.useEffect(()=>{if(e.current)return g({doc:r,schema:X,copy:[E(),j()],paste:[C(n=>({text:n})),D()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((n,i)=>a.jsx("div",{children:n.map((s,o)=>a.jsx("span",{children:s.text||a.jsx("br",{})},o))},i))})}},Z=e=>{const r=e.bold?"strong":"span",t={};return e.italic&&(t.fontStyle="italic"),e.underline&&(t.textDecoration="underline"),e.strike&&(t.textDecoration=t.textDecoration?`${t.textDecoration} line-through`:"line-through"),a.jsx(r,{style:t,children:e.text||a.jsx("br",{})})},ee=d(d(f({text:y(),bold:k(v()),italic:k(v()),underline:k(v()),strike:k(v())}))),H={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{text:"Hello",bold:!0},{text:" "},{text:"World",italic:!0},{text:"."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]),n=u.useMemo(()=>g({doc:r,schema:ee,onChange:t}),[]);return u.useEffect(()=>{if(e.current)return n.input(e.current)},[]),a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("button",{onClick:()=>{n.apply(w,"bold")},children:"bold"}),a.jsx("button",{onClick:()=>{n.apply(w,"italic")},children:"italic"}),a.jsx("button",{onClick:()=>{n.apply(w,"underline")},children:"underline"}),a.jsx("button",{onClick:()=>{n.apply(w,"strike")},children:"strike"})]}),a.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((i,s)=>a.jsx("div",{children:i.map((o,l)=>a.jsx(Z,{text:o.text,bold:o.bold,italic:o.italic,underline:o.underline,strike:o.strike},l))},s))})]})}},te=d(d(S([f({type:x("text"),text:y()}),f({type:x("tag"),label:y(),value:y()})]))),P={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return u.useEffect(()=>{if(e.current)return g({doc:r,schema:te,plugins:[z()],copy:[E(),j(n=>"text"in n?n.text:n.label)],paste:[C(n=>({type:"text",text:n}),[n=>{if(n.contentEditable==="false")return{type:"tag",label:n.textContent,value:n.dataset.tagValue}}]),D()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r[0].map((n,i)=>n.type==="tag"?a.jsx("span",{contentEditable:!1,"data-tag-value":n.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:n.label},i):a.jsx("span",{children:n.text||a.jsx("br",{})},i))})}},ne=d(d(S([f({type:x("text"),text:y()}),f({type:x("image"),src:y()})]))),T={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return u.useEffect(()=>{if(e.current)return g({doc:r,schema:ne,copy:[E(),j()],paste:[C(n=>({type:"text",text:n}),[n=>{if(n.tagName==="IMG")return{type:"image",src:n.src}}]),D()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,i)=>a.jsx("div",{children:n.map((s,o)=>s.type==="image"?a.jsx("img",{src:s.src,style:{maxWidth:200}},o):a.jsx("span",{children:s.text||a.jsx("br",{})},o))},i))})}},re=d(d(S([f({type:x("text"),text:y()}),f({type:x("video"),src:y()})]))),R={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return u.useEffect(()=>{if(e.current)return g({doc:r,schema:re,copy:[E(),j()],paste:[C(n=>({type:"text",text:n}),[n=>{if(n.tagName==="VIDEO")return{type:"video",src:n.childNodes[0].src}}]),D()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,i)=>a.jsx("div",{children:n.map((s,o)=>s.type==="video"?a.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:a.jsx("source",{src:s.src})},o):a.jsx("span",{children:s.text||a.jsx("br",{})},o))},i))})}},se=d(d(S([f({type:x("text"),text:y()}),f({type:x("youtube"),id:y()})]))),oe=({id:e})=>a.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),O={render:()=>{const e=u.useRef(null),[r,t]=u.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return u.useEffect(()=>{if(e.current)return g({doc:r,schema:se,copy:[E(),j()],paste:[C(n=>({type:"text",text:n}),[n=>{if(n.dataset.youtubeNode)return{type:"youtube",id:n.dataset.youtubeId}}]),D()],onChange:t}).input(e.current)},[]),a.jsx("div",{children:a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,i)=>a.jsx("div",{children:n.map((s,o)=>s.type==="youtube"?a.jsx(oe,{id:s.id},o):a.jsx("span",{children:s.text||a.jsx("br",{})},o))},i))})})}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof basicSchema>;
    const [doc, setDoc] = useState<Doc>([[{
      text: "Hello world."
    }], [{
      text: "こんにちは。"
    }], [{
      text: "👍❤️🧑‍🧑‍🧒"
    }]]);
    useEffect(() => {
      if (!ref.current) return;
      return createEditor({
        doc: doc,
        schema: basicSchema,
        copy: [htmlCopy(), plainCopy()],
        paste: [htmlPaste<Doc>(text => ({
          text
        })), plainPaste()],
        onChange: setDoc
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {doc.map((r, i) => <div key={i}>
            {r.map((n, j) => <span key={j}>{n.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...I.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof richSchema>;
    const [doc, setDoc] = useState<Doc>([[{
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
      doc: doc,
      schema: richSchema,
      onChange: setDoc
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
          {doc.map((r, i) => <div key={i}>
              {r.map((n, j) => <Text key={j} text={n.text} bold={n.bold} italic={n.italic} underline={n.underline} strike={n.strike} />)}
            </div>)}
        </div>
      </div>;
  }
}`,...H.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof tagSchema>;
    const [doc, setDoc] = useState<Doc>([[{
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
        doc: doc,
        schema: tagSchema,
        plugins: [singlelinePlugin()],
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
        onChange: setDoc
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {doc[0].map((t, j) => t.type === "tag" ? <span key={j} contentEditable={false} data-tag-value={t.value} style={{
        background: "slategray",
        color: "white",
        fontSize: 12,
        padding: 4,
        borderRadius: 8
      }}>
              {t.label}
            </span> : <span key={j}>{t.text || <br />}</span>)}
      </div>;
  }
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof imageSchema>;
    const [doc, setDoc] = useState<Doc>([[{
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
        doc: doc,
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
        onChange: setDoc
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {doc.map((r, i) => <div key={i}>
            {r.map((t, j) => t.type === "image" ? <img key={j} src={t.src} style={{
          maxWidth: 200
        }} /> : <span key={j}>{t.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...T.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof videoSchema>;
    const [doc, setDoc] = useState<Doc>([[{
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
        doc: doc,
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
        onChange: setDoc
      }).input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      padding: 8
    }}>
        {doc.map((r, i) => <div key={i}>
            {r.map((t, j) => t.type === "video" ?
        // safari needs contentEditable="false"
        <video key={j} width={400} controls contentEditable="false" suppressContentEditableWarning>
                  <source src={t.src} />
                </video> : <span key={j}>{t.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...R.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof youtubeSchema>;
    const [doc, setDoc] = useState<Doc>([[{
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
        doc: doc,
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
        onChange: setDoc
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
          {doc.map((r, i) => <div key={i}>
              {r.map((t, j) => t.type === "youtube" ? <Youtube key={j} id={t.id} /> : <span key={j}>{t.text || <br />}</span>)}
            </div>)}
        </div>
      </div>;
  }
}`,...O.parameters?.docs?.source}}};const de=["Basic","RichText","Tag","Image","Video","Iframe"];export{I as Basic,O as Iframe,T as Image,H as RichText,P as Tag,R as Video,de as __namedExportsOrder,pe as default};
