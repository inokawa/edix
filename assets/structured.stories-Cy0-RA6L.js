import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-1XBhwzZN.js";import{a as M,b as R,i as T,r as _,c as v,p as x,e as b}from"./editor-C1c4Ixvl.js";import"./preload-helper-PPVm8Dsz.js";const k=()=>(e,r,t)=>{const n=document.createElement("div");n.appendChild(M(R(t),t).cloneContents()),e.setData("text/html",n.innerHTML)},E=(e,r=[])=>(t,n)=>{const a=t.getData("text/html");if(a){let s=new DOMParser().parseFromString(a,"text/html").body,i=!1;for(const l of[...s.childNodes])T(l)?l.data==="StartFragment"?(i=!0,s=new DocumentFragment):l.data==="EndFragment"&&(i=!1):i&&s.appendChild(l);return _(s,n,e,l=>{for(const u of r){const p=u(l);if(p)return p}})}return null};let V;function N(e){return{lang:e?.lang??V?.lang,message:e?.message,abortEarly:e?.abortEarly??V?.abortEarly,abortPipeEarly:e?.abortPipeEarly??V?.abortPipeEarly}}let q;function L(e){return q?.get(e)}let z;function A(e){return z?.get(e)}let F;function W(e,r){return F?.get(e)?.get(r)}function O(e){const r=typeof e;return r==="string"?`"${e}"`:r==="number"||r==="bigint"||r==="boolean"?`${e}`:r==="object"||r==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":r}function g(e,r,t,n,a){const s=a&&"input"in a?a.input:t.value,i=a?.expected??e.expects??null,l=a?.received??O(s),u={kind:e.kind,type:e.type,input:s,expected:i,received:l,message:`Invalid ${r}: ${i?`Expected ${i} but r`:"R"}eceived ${l}`,requirement:e.requirement,path:a?.path,issues:a?.issues,lang:n.lang,abortEarly:n.abortEarly,abortPipeEarly:n.abortPipeEarly},p=e.kind==="schema",m=a?.message??e.message??W(e.reference,u.lang)??(p?A(u.lang):null)??n.message??L(u.lang);m!==void 0&&(u.message=typeof m=="function"?m(u):m),p&&(t.typed=!1),t.issues?t.issues.push(u):t.issues=[u]}function j(e){return{version:1,vendor:"valibot",validate(r){return e["~run"]({value:r},N())}}}function G(e,r){const t=[...new Set(e)];return t.length>1?`(${t.join(` ${r} `)})`:t[0]??"never"}function Y(e,r,t){return typeof e.fallback=="function"?e.fallback(r,t):e.fallback}function K(e,r,t){return typeof e.default=="function"?e.default(r,t):e.default}function y(e,r){return{kind:"schema",type:"array",reference:y,expects:"Array",async:!1,item:e,message:r,get"~standard"(){return j(this)},"~run"(t,n){const a=t.value;if(Array.isArray(a)){t.typed=!0,t.value=[];for(let s=0;s<a.length;s++){const i=a[s],l=this.item["~run"]({value:i},n);if(l.issues){const u={type:"array",origin:"value",input:a,key:s,value:i};for(const p of l.issues)p.path?p.path.unshift(u):p.path=[u],t.issues?.push(p);if(t.issues||(t.issues=l.issues),n.abortEarly){t.typed=!1;break}}l.typed||(t.typed=!1),t.value.push(l.value)}}else g(this,"type",t,n);return t}}}function h(e,r){return{kind:"schema",type:"literal",reference:h,expects:O(e),async:!1,literal:e,message:r,get"~standard"(){return j(this)},"~run"(t,n){return t.value===this.literal?t.typed=!0:g(this,"type",t,n),t}}}function f(e,r){return{kind:"schema",type:"strict_object",reference:f,expects:"Object",async:!1,entries:e,message:r,get"~standard"(){return j(this)},"~run"(t,n){const a=t.value;if(a&&typeof a=="object"){t.typed=!0,t.value={};for(const s in this.entries){const i=this.entries[s];if(s in a||(i.type==="exact_optional"||i.type==="optional"||i.type==="nullish")&&i.default!==void 0){const l=s in a?a[s]:K(i),u=i["~run"]({value:l},n);if(u.issues){const p={type:"object",origin:"value",input:a,key:s,value:l};for(const m of u.issues)m.path?m.path.unshift(p):m.path=[p],t.issues?.push(m);if(t.issues||(t.issues=u.issues),n.abortEarly){t.typed=!1;break}}u.typed||(t.typed=!1),t.value[s]=u.value}else if(i.fallback!==void 0)t.value[s]=Y(i);else if(i.type!=="exact_optional"&&i.type!=="optional"&&i.type!=="nullish"&&(g(this,"key",t,n,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:a,key:s,value:a[s]}]}),n.abortEarly))break}if(!t.issues||!n.abortEarly){for(const s in a)if(!(s in this.entries)){g(this,"key",t,n,{input:s,expected:"never",path:[{type:"object",origin:"key",input:a,key:s,value:a[s]}]});break}}}else g(this,"type",t,n);return t}}}function d(e){return{kind:"schema",type:"string",reference:d,expects:"string",async:!1,message:e,get"~standard"(){return j(this)},"~run"(r,t){return typeof r.value=="string"?r.typed=!0:g(this,"type",r,t),r}}}function P(e){let r;if(e)for(const t of e)r?r.push(...t.issues):r=t.issues;return r}function S(e,r){return{kind:"schema",type:"union",reference:S,expects:G(e.map(t=>t.expects),"|"),async:!1,options:e,message:r,get"~standard"(){return j(this)},"~run"(t,n){let a,s,i;for(const l of this.options){const u=l["~run"]({value:t.value},n);if(u.typed)if(u.issues)s?s.push(u):s=[u];else{a=u;break}else i?i.push(u):i=[u]}if(a)return a;if(s){if(s.length===1)return s[0];g(this,"type",t,n,{issues:P(s)}),t.typed=!0}else{if(i?.length===1)return i[0];g(this,"type",t,n,{issues:P(i)})}return t}}}const re={component:v},B=y(y(f({text:d()}))),C={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]);return c.useEffect(()=>{if(e.current)return v({doc:r,schema:B,copy:[k(),x()],paste:[E(n=>({text:n})),b()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},J=y(y(S([f({type:h("text"),text:d()}),f({type:h("tag"),label:d(),value:d()})]))),D={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]);return c.useEffect(()=>{if(e.current)return v({doc:r,schema:J,singleline:!0,copy:[k(),x(n=>"text"in n?n.text:n.label)],paste:[E(n=>({type:"text",text:n}),[n=>{if(n.contentEditable==="false")return{type:"tag",label:n.textContent,value:n.dataset.tagValue}}]),b()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r[0].length?r[0].map((n,a)=>n.type==="tag"?o.jsx("span",{contentEditable:!1,"data-tag-value":n.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:n.label},a):o.jsx("span",{children:n.text},a)):o.jsx("br",{})})}},Q=y(y(S([f({type:h("text"),text:d()}),f({type:h("image"),src:d()})]))),w={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]);return c.useEffect(()=>{if(e.current)return v({doc:r,schema:Q,copy:[k(),x()],paste:[E(n=>({type:"text",text:n}),[n=>{if(n.tagName==="IMG")return{type:"image",src:n.src}}]),b()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="image"?o.jsx("img",{src:s.src,style:{maxWidth:200}},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},U=y(y(S([f({type:h("text"),text:d()}),f({type:h("video"),src:d()})]))),I={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]);return c.useEffect(()=>{if(e.current)return v({doc:r,schema:U,copy:[k(),x()],paste:[E(n=>({type:"text",text:n}),[n=>{if(n.tagName==="VIDEO")return{type:"video",src:n.childNodes[0].src}}]),b()],onChange:t}).input(e.current)},[]),o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="video"?o.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:o.jsx("source",{src:s.src})},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})}},X=y(y(S([f({type:h("text"),text:d()}),f({type:h("youtube"),id:d()})]))),Z=({id:e})=>o.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":e,width:"560",height:"315",src:"https://www.youtube.com/embed/"+e,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),H={render:()=>{const e=c.useRef(null),[r,t]=c.useState([[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]);return c.useEffect(()=>{if(e.current)return v({doc:r,schema:X,copy:[k(),x()],paste:[E(n=>({type:"text",text:n}),[n=>{if(n.dataset.youtubeNode)return{type:"youtube",id:n.dataset.youtubeId}}]),b()],onChange:t}).input(e.current)},[]),o.jsx("div",{children:o.jsx("div",{ref:e,style:{backgroundColor:"white",padding:8},children:r.map((n,a)=>o.jsx("div",{children:n.length?n.map((s,i)=>s.type==="youtube"?o.jsx(Z,{id:s.id},i):o.jsx("span",{children:s.text},i)):o.jsx("br",{})},a))})})}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}};const se=["Multiline","Tag","Image","Video","Iframe"];export{H as Iframe,w as Image,C as Multiline,D as Tag,I as Video,se as __namedExportsOrder,re as default};
