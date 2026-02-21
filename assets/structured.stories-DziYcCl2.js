import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-Clg5Vi94.js";import{g as A,b as Y,i as z,e as G,c as x,p as v,f as k,a as K}from"./singleline-BL2n8w99.js";import{T as w}from"./commands-DrXvZPY6.js";import"./preload-helper-PPVm8Dsz.js";const M=()=>(e,n,t)=>{const r=document.createElement("div");r.appendChild(A(Y(t),t).cloneContents()),e.setData("text/html",r.innerHTML)},L="application/x-edix-editor",j=({key:e=L}={})=>(n,t)=>{n.setData(e,JSON.stringify(t))},N=(e,n=[])=>(t,r)=>{const o=t.getData("text/html");if(o){let s=new DOMParser().parseFromString(o,"text/html").body,i=!1;for(const l of[...s.childNodes])z(l)?l.data==="StartFragment"?(i=!0,s=new DocumentFragment):l.data==="EndFragment"&&(i=!1):i&&s.appendChild(l);return G(s,r,e,l=>{for(const c of n){const p=c(l);if(p)return p}})}return null},D=({key:e=L}={})=>n=>{try{return JSON.parse(n.getData(e))}catch{return null}};let _;function V(e){return{lang:e?.lang??_?.lang,message:e?.message,abortEarly:e?.abortEarly??_?.abortEarly,abortPipeEarly:e?.abortPipeEarly??_?.abortPipeEarly}}let B;function J(e){return B?.get(e)}let $;function Q(e){return $?.get(e)}let U;function X(e,n){return U?.get(e)?.get(n)}function q(e){const n=typeof e;return n==="string"?`"${e}"`:n==="number"||n==="bigint"||n==="boolean"?`${e}`:n==="object"||n==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":n}function h(e,n,t,r,o){const s=o&&"input"in o?o.input:t.value,i=o?.expected??e.expects??null,l=o?.received??q(s),c={kind:e.kind,type:e.type,input:s,expected:i,received:l,message:`Invalid ${n}: ${i?`Expected ${i} but r`:"R"}eceived ${l}`,requirement:e.requirement,path:o?.path,issues:o?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},p=e.kind==="schema",m=o?.message??e.message??X(e.reference,c.lang)??(p?Q(c.lang):null)??r.message??J(c.lang);m!==void 0&&(c.message=typeof m=="function"?m(c):m),p&&(t.typed=!1),t.issues?t.issues.push(c):t.issues=[c]}function b(e){return{version:1,vendor:"valibot",validate(n){return e["~run"]({value:n},V())}}}function Z(e,n){const t=[...new Set(e)];return t.length>1?`(${t.join(` ${n} `)})`:t[0]??"never"}function ee(e,n,t){return typeof e.fallback=="function"?e.fallback(n,t):e.fallback}function W(e,n,t){return typeof e.default=="function"?e.default(n,t):e.default}function d(e,n){return{kind:"schema",type:"array",reference:d,expects:"Array",async:!1,item:e,message:n,get"~standard"(){return b(this)},"~run"(t,r){const o=t.value;if(Array.isArray(o)){t.typed=!0,t.value=[];for(let s=0;s<o.length;s++){const i=o[s],l=this.item["~run"]({value:i},r);if(l.issues){const c={type:"array",origin:"value",input:o,key:s,value:i};for(const p of l.issues)p.path?p.path.unshift(c):p.path=[c],t.issues?.push(p);if(t.issues||(t.issues=l.issues),r.abortEarly){t.typed=!1;break}}l.typed||(t.typed=!1),t.value.push(l.value)}}else h(this,"type",t,r);return t}}}function C(e){return{kind:"schema",type:"boolean",reference:C,expects:"boolean",async:!1,message:e,get"~standard"(){return b(this)},"~run"(n,t){return typeof n.value=="boolean"?n.typed=!0:h(this,"type",n,t),n}}}function g(e,n){return{kind:"schema",type:"literal",reference:g,expects:q(e),async:!1,literal:e,message:n,get"~standard"(){return b(this)},"~run"(t,r){return t.value===this.literal?t.typed=!0:h(this,"type",t,r),t}}}function E(e,n){return{kind:"schema",type:"optional",reference:E,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:n,get"~standard"(){return b(this)},"~run"(t,r){return t.value===void 0&&(this.default!==void 0&&(t.value=W(this,t,r)),t.value===void 0)?(t.typed=!0,t):this.wrapped["~run"](t,r)}}}function f(e,n){return{kind:"schema",type:"strict_object",reference:f,expects:"Object",async:!1,entries:e,message:n,get"~standard"(){return b(this)},"~run"(t,r){const o=t.value;if(o&&typeof o=="object"){t.typed=!0,t.value={};for(const s in this.entries){const i=this.entries[s];if(s in o||(i.type==="exact_optional"||i.type==="optional"||i.type==="nullish")&&i.default!==void 0){const l=s in o?o[s]:W(i),c=i["~run"]({value:l},r);if(c.issues){const p={type:"object",origin:"value",input:o,key:s,value:l};for(const m of c.issues)m.path?m.path.unshift(p):m.path=[p],t.issues?.push(m);if(t.issues||(t.issues=c.issues),r.abortEarly){t.typed=!1;break}}c.typed||(t.typed=!1),t.value[s]=c.value}else if(i.fallback!==void 0)t.value[s]=ee(i);else if(i.type!=="exact_optional"&&i.type!=="optional"&&i.type!=="nullish"&&(h(this,"key",t,r,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]}),r.abortEarly))break}if(!t.issues||!r.abortEarly){for(const s in o)if(!(s in this.entries)){h(this,"key",t,r,{input:s,expected:"never",path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]});break}}}else h(this,"type",t,r);return t}}}function y(e){return{kind:"schema",type:"string",reference:y,expects:"string",async:!1,message:e,get"~standard"(){return b(this)},"~run"(n,t){return typeof n.value=="string"?n.typed=!0:h(this,"type",n,t),n}}}function F(e){let n;if(e)for(const t of e)n?n.push(...t.issues):n=t.issues;return n}function S(e,n){return{kind:"schema",type:"union",reference:S,expects:Z(e.map(t=>t.expects),"|"),async:!1,options:e,message:n,get"~standard"(){return b(this)},"~run"(t,r){let o,s,i;for(const l of this.options){const c=l["~run"]({value:t.value},r);if(c.typed)if(c.issues)s?s.push(c):s=[c];else{o=c;break}else i?i.push(c):i=[c]}if(o)return o;if(s){if(s.length===1)return s[0];h(this,"type",t,r,{issues:F(s)}),t.typed=!0}else{if(i?.length===1)return i[0];h(this,"type",t,r,{issues:F(i)})}return t}}}const me={component:x},te=d(d(f({text:y()}))),I={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return u.useEffect(()=>{if(e.current)return x({doc:n,schema:te,copy:[j(),M(),k()],paste:[D(),N(r=>({text:r})),v()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:n.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},ne=f({text:y(),bold:E(C()),italic:E(C()),underline:E(C()),strike:E(C())}),re=d(d(ne)),se=({node:e})=>{const n=e.bold?"strong":"span",t={};return e.italic&&(t.fontStyle="italic"),e.underline&&(t.textDecoration="underline"),e.strike&&(t.textDecoration=t.textDecoration?`${t.textDecoration} line-through`:"line-through"),a.jsx(n,{style:t,children:e.text||a.jsx("br",{})})},P={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{text:"Hello",bold:!0},{text:" "},{text:"World",italic:!0},{text:"."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]),r=u.useMemo(()=>x({doc:n,schema:re,copy:[j(),k()],paste:[D(),v()],onChange:t}),[]);return u.useEffect(()=>{if(e.current)return r.input(e.current)},[]),a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("button",{onClick:()=>{r.apply(w,"bold")},children:"bold"}),a.jsx("button",{onClick:()=>{r.apply(w,"italic")},children:"italic"}),a.jsx("button",{onClick:()=>{r.apply(w,"underline")},children:"underline"}),a.jsx("button",{onClick:()=>{r.apply(w,"strike")},children:"strike"})]}),a.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:n.map((o,s)=>a.jsx("div",{children:o.map((i,l)=>a.jsx(se,{node:i},l))},s))})]})}},oe=d(d(S([f({type:g("text"),text:y()}),f({type:g("tag"),label:y(),value:y()})]))),T={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return u.useEffect(()=>{if(e.current)return x({doc:n,schema:oe,plugins:[K()],copy:[j(),k(r=>"text"in r?r.text:r.label)],paste:[D(),v()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:n[0].map((r,o)=>r.type==="tag"?a.jsx("span",{contentEditable:!1,"data-tag-value":r.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.label},o):a.jsx("span",{children:r.text||a.jsx("br",{})},o))})}},ie=d(d(S([f({type:g("text"),text:y()}),f({type:g("image"),src:y()})]))),H={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return u.useEffect(()=>{if(e.current)return x({doc:n,schema:ie,copy:[j(),M(),k()],paste:[D(),N(r=>({type:"text",text:r}),[r=>{if(r.tagName==="IMG")return{type:"image",src:r.src}}]),v()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:n.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="image"?a.jsx("img",{src:s.src,style:{maxWidth:200}},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},ae=d(d(S([f({type:g("text"),text:y()}),f({type:g("video"),src:y()})]))),O={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return u.useEffect(()=>{if(e.current)return x({doc:n,schema:ae,copy:[j(),M(),k()],paste:[D(),N(r=>({type:"text",text:r}),[r=>{if(r.tagName==="VIDEO")return{type:"video",src:r.childNodes[0].src}}]),v()],onChange:t}).input(e.current)},[]),a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:n.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="video"?a.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:a.jsx("source",{src:s.src})},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},ce=d(d(S([f({type:g("text"),text:y()}),f({type:g("youtube"),id:y()})]))),le=({id:e})=>a.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),R={render:()=>{const e=u.useRef(null),[n,t]=u.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return u.useEffect(()=>{if(e.current)return x({doc:n,schema:ce,copy:[j(),M(),k()],paste:[D(),N(r=>({type:"text",text:r}),[r=>{if(r.dataset.youtubeNode)return{type:"youtube",id:r.dataset.youtubeId}}]),v()],onChange:t}).input(e.current)},[]),a.jsx("div",{children:a.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:n.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="youtube"?a.jsx(le,{id:s.id},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})})}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
        paste: [internalPaste(), htmlPaste<Doc>(text => ({
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
}`,...H.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};const he=["Basic","RichText","Tag","Image","Video","Iframe"];export{I as Basic,R as Iframe,H as Image,P as RichText,T as Tag,O as Video,he as __namedExportsOrder,me as default};
