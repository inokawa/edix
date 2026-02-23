import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-BTbhdHgC.js";import{g as W,b as Y,i as z,e as G,c as x,p as v,f as k,a as K}from"./singleline-BYWcg6yr.js";import{T as w}from"./commands-DS9eRegF.js";import"./preload-helper-PPVm8Dsz.js";const M=()=>(t,r,e)=>{const n=document.createElement("div");n.appendChild(W(Y(e),e).cloneContents()),t.setData("text/html",n.innerHTML)},F="application/x-edix-editor",j=({key:t=F}={})=>(r,e)=>{r.setData(t,JSON.stringify(e))},U=t=>r=>{for(const e of r.items)if(e.kind==="file"){const n=t[e.type];if(n){const o=e.getAsFile();if(o)return[[n(o)]]}}return null},L=(t,r=[])=>(e,n)=>{const o=e.getData("text/html");if(o){let s=new DOMParser().parseFromString(o,"text/html").body,i=!1;for(const l of[...s.childNodes])z(l)?l.data==="StartFragment"?(i=!0,s=new DocumentFragment):l.data==="EndFragment"&&(i=!1):i&&s.appendChild(l);return G(s,n,t,l=>{for(const c of r){const p=c(l);if(p)return p}})}return null},D=({key:t=F}={})=>r=>{try{return JSON.parse(r.getData(t))}catch{return null}};let N;function V(t){return{lang:t?.lang??N?.lang,message:t?.message,abortEarly:t?.abortEarly??N?.abortEarly,abortPipeEarly:t?.abortPipeEarly??N?.abortPipeEarly}}let B;function J(t){return B?.get(t)}let $;function Q(t){return $?.get(t)}let X;function Z(t,r){return X?.get(t)?.get(r)}function q(t){const r=typeof t;return r==="string"?`"${t}"`:r==="number"||r==="bigint"||r==="boolean"?`${t}`:r==="object"||r==="function"?(t&&Object.getPrototypeOf(t)?.constructor?.name)??"null":r}function h(t,r,e,n,o){const s=o&&"input"in o?o.input:e.value,i=o?.expected??t.expects??null,l=o?.received??q(s),c={kind:t.kind,type:t.type,input:s,expected:i,received:l,message:`Invalid ${r}: ${i?`Expected ${i} but r`:"R"}eceived ${l}`,requirement:t.requirement,path:o?.path,issues:o?.issues,lang:n.lang,abortEarly:n.abortEarly,abortPipeEarly:n.abortPipeEarly},p=t.kind==="schema",m=o?.message??t.message??Z(t.reference,c.lang)??(p?Q(c.lang):null)??n.message??J(c.lang);m!==void 0&&(c.message=typeof m=="function"?m(c):m),p&&(e.typed=!1),e.issues?e.issues.push(c):e.issues=[c]}function b(t){return{version:1,vendor:"valibot",validate(r){return t["~run"]({value:r},V())}}}function ee(t,r){const e=[...new Set(t)];return e.length>1?`(${e.join(` ${r} `)})`:e[0]??"never"}function te(t,r,e){return typeof t.fallback=="function"?t.fallback(r,e):t.fallback}function A(t,r,e){return typeof t.default=="function"?t.default(r,e):t.default}function d(t,r){return{kind:"schema",type:"array",reference:d,expects:"Array",async:!1,item:t,message:r,get"~standard"(){return b(this)},"~run"(e,n){const o=e.value;if(Array.isArray(o)){e.typed=!0,e.value=[];for(let s=0;s<o.length;s++){const i=o[s],l=this.item["~run"]({value:i},n);if(l.issues){const c={type:"array",origin:"value",input:o,key:s,value:i};for(const p of l.issues)p.path?p.path.unshift(c):p.path=[c],e.issues?.push(p);if(e.issues||(e.issues=l.issues),n.abortEarly){e.typed=!1;break}}l.typed||(e.typed=!1),e.value.push(l.value)}}else h(this,"type",e,n);return e}}}function C(t){return{kind:"schema",type:"boolean",reference:C,expects:"boolean",async:!1,message:t,get"~standard"(){return b(this)},"~run"(r,e){return typeof r.value=="boolean"?r.typed=!0:h(this,"type",r,e),r}}}function g(t,r){return{kind:"schema",type:"literal",reference:g,expects:q(t),async:!1,literal:t,message:r,get"~standard"(){return b(this)},"~run"(e,n){return e.value===this.literal?e.typed=!0:h(this,"type",e,n),e}}}function E(t,r){return{kind:"schema",type:"optional",reference:E,expects:`(${t.expects} | undefined)`,async:!1,wrapped:t,default:r,get"~standard"(){return b(this)},"~run"(e,n){return e.value===void 0&&(this.default!==void 0&&(e.value=A(this,e,n)),e.value===void 0)?(e.typed=!0,e):this.wrapped["~run"](e,n)}}}function f(t,r){return{kind:"schema",type:"strict_object",reference:f,expects:"Object",async:!1,entries:t,message:r,get"~standard"(){return b(this)},"~run"(e,n){const o=e.value;if(o&&typeof o=="object"){e.typed=!0,e.value={};for(const s in this.entries){const i=this.entries[s];if(s in o||(i.type==="exact_optional"||i.type==="optional"||i.type==="nullish")&&i.default!==void 0){const l=s in o?o[s]:A(i),c=i["~run"]({value:l},n);if(c.issues){const p={type:"object",origin:"value",input:o,key:s,value:l};for(const m of c.issues)m.path?m.path.unshift(p):m.path=[p],e.issues?.push(m);if(e.issues||(e.issues=c.issues),n.abortEarly){e.typed=!1;break}}c.typed||(e.typed=!1),e.value[s]=c.value}else if(i.fallback!==void 0)e.value[s]=te(i);else if(i.type!=="exact_optional"&&i.type!=="optional"&&i.type!=="nullish"&&(h(this,"key",e,n,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]}),n.abortEarly))break}if(!e.issues||!n.abortEarly){for(const s in o)if(!(s in this.entries)){h(this,"key",e,n,{input:s,expected:"never",path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]});break}}}else h(this,"type",e,n);return e}}}function y(t){return{kind:"schema",type:"string",reference:y,expects:"string",async:!1,message:t,get"~standard"(){return b(this)},"~run"(r,e){return typeof r.value=="string"?r.typed=!0:h(this,"type",r,e),r}}}function _(t){let r;if(t)for(const e of t)r?r.push(...e.issues):r=e.issues;return r}function S(t,r){return{kind:"schema",type:"union",reference:S,expects:ee(t.map(e=>e.expects),"|"),async:!1,options:t,message:r,get"~standard"(){return b(this)},"~run"(e,n){let o,s,i;for(const l of this.options){const c=l["~run"]({value:e.value},n);if(c.typed)if(c.issues)s?s.push(c):s=[c];else{o=c;break}else i?i.push(c):i=[c]}if(o)return o;if(s){if(s.length===1)return s[0];h(this,"type",e,n,{issues:_(s)}),e.typed=!0}else{if(i?.length===1)return i[0];h(this,"type",e,n,{issues:_(i)})}return e}}}const he={component:x},ne=d(d(f({text:y()}))),P={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return u.useEffect(()=>{if(t.current)return x({doc:r,schema:ne,copy:[j(),M(),k()],paste:[D(),L(n=>({text:n})),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((n,o)=>a.jsx("div",{children:n.map((s,i)=>a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},re=f({text:y(),bold:E(C()),italic:E(C()),underline:E(C()),strike:E(C())}),se=d(d(re)),oe=({node:t})=>{const r=t.bold?"strong":"span",e={};return t.italic&&(e.fontStyle="italic"),t.underline&&(e.textDecoration="underline"),t.strike&&(e.textDecoration=e.textDecoration?`${e.textDecoration} line-through`:"line-through"),a.jsx(r,{style:e,children:t.text||a.jsx("br",{})})},I={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{text:"Hello",bold:!0},{text:" "},{text:"World",italic:!0},{text:"."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]),n=u.useMemo(()=>x({doc:r,schema:se,copy:[j(),k()],paste:[D(),v()],onChange:e}),[]);return u.useEffect(()=>{if(t.current)return n.input(t.current)},[]),a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("button",{onClick:()=>{n.apply(w,"bold")},children:"bold"}),a.jsx("button",{onClick:()=>{n.apply(w,"italic")},children:"italic"}),a.jsx("button",{onClick:()=>{n.apply(w,"underline")},children:"underline"}),a.jsx("button",{onClick:()=>{n.apply(w,"strike")},children:"strike"})]}),a.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((o,s)=>a.jsx("div",{children:o.map((i,l)=>a.jsx(oe,{node:i},l))},s))})]})}},ie=d(d(S([f({type:g("text"),text:y()}),f({type:g("tag"),label:y(),value:y()})]))),R={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return u.useEffect(()=>{if(t.current)return x({doc:r,schema:ie,plugins:[K()],copy:[j(),k(n=>"text"in n?n.text:n.label)],paste:[D(),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r[0].map((n,o)=>n.type==="tag"?a.jsx("span",{contentEditable:!1,"data-tag-value":n.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:n.label},o):a.jsx("span",{children:n.text||a.jsx("br",{})},o))})}},ae=d(d(S([f({type:g("text"),text:y()}),f({type:g("image"),src:y()})]))),T={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return u.useEffect(()=>{if(t.current)return x({doc:r,schema:ae,copy:[j(),M(),k()],paste:[D(),U({"image/png":n=>({type:"image",src:URL.createObjectURL(n)})}),L(n=>({type:"text",text:n}),[n=>{if(n.tagName==="IMG")return{type:"image",src:n.src}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((n,o)=>a.jsx("div",{children:n.map((s,i)=>s.type==="image"?a.jsx("img",{src:s.src,style:{maxWidth:200}},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},ce=d(d(S([f({type:g("text"),text:y()}),f({type:g("video"),src:y()})]))),H={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return u.useEffect(()=>{if(t.current)return x({doc:r,schema:ce,copy:[j(),M(),k()],paste:[D(),L(n=>({type:"text",text:n}),[n=>{if(n.tagName==="VIDEO")return{type:"video",src:n.childNodes[0].src}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((n,o)=>a.jsx("div",{children:n.map((s,i)=>s.type==="video"?a.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:a.jsx("source",{src:s.src})},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},le=d(d(S([f({type:g("text"),text:y()}),f({type:g("youtube"),id:y()})]))),ue=({id:t})=>a.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":t,width:"560",height:"315",src:"https://www.youtube.com/embed/"+t,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),O={render:()=>{const t=u.useRef(null),[r,e]=u.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return u.useEffect(()=>{if(t.current)return x({doc:r,schema:le,copy:[j(),M(),k()],paste:[D(),L(n=>({type:"text",text:n}),[n=>{if(n.dataset.youtubeNode)return{type:"youtube",id:n.dataset.youtubeId}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{children:a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:r.map((n,o)=>a.jsx("div",{children:n.map((s,i)=>s.type==="youtube"?a.jsx(ue,{id:s.id},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})})}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [internalPaste(), htmlPaste<Doc>(text => ({
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
}`,...P.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
      copy: [internalCopy(), plainCopy()],
      paste: [internalPaste(), plainPaste()],
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
              {r.map((n, j) => <Text key={j} node={n} />)}
            </div>)}
        </div>
      </div>;
  }
}`,...I.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
        copy: [internalCopy(), plainCopy<Doc>(node => "text" in node ? node.text : node.label)],
        paste: [internalPaste(), plainPaste()],
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
}`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [internalPaste(), filePaste({
          "image/png": file => ({
            type: "image",
            src: URL.createObjectURL(file)
          })
        }), htmlPaste<Doc>(text => ({
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
}`,...T.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [internalPaste(), htmlPaste<Doc>(text => ({
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
}`,...H.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
        copy: [internalCopy(), htmlCopy(), plainCopy()],
        paste: [internalPaste(), htmlPaste<Doc>(text => ({
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
}`,...O.parameters?.docs?.source}}};const ge=["Basic","RichText","Tag","Image","Video","Iframe"];export{P as Basic,O as Iframe,T as Image,I as RichText,R as Tag,H as Video,ge as __namedExportsOrder,he as default};
