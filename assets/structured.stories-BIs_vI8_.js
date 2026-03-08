import{j as a}from"./jsx-runtime-u17CrQMm.js";import{r as u}from"./iframe-Dnp46Z2W.js";import{g as W,a as Y,i as z,d as G,c as x,p as v,b as k,h as w,s as K}from"./singleline-BZcq3-HV.js";import{T as I}from"./commands-DGEVqJvi.js";import"./preload-helper-PPVm8Dsz.js";const L=()=>(t,n,e)=>{const r=document.createElement("div");r.appendChild(W(Y(e),e).cloneContents()),t.setData("text/html",r.innerHTML)},q="application/x-edix-editor",j=({key:t=q}={})=>(n,e)=>{n.setData(t,JSON.stringify(e))},V=t=>n=>{for(const e of n.items)if(e.kind==="file"){const r=t[e.type];if(r){const o=e.getAsFile();if(o)return[[r(o)]]}}return null},N=(t,n=[])=>(e,r)=>{const o=e.getData("text/html");if(o){let s=new DOMParser().parseFromString(o,"text/html").body,i=!1;for(const c of[...s.childNodes])z(c)?c.data==="StartFragment"?(i=!0,s=new DocumentFragment):c.data==="EndFragment"&&(i=!1):i&&s.appendChild(c);return G(s,r,t,c=>{for(const l of n){const d=l(c);if(d)return d}})}return null},D=({key:t=q}={})=>n=>{try{return JSON.parse(n.getData(t))}catch{return null}};let _;function J(t){return{lang:t?.lang??_?.lang,message:t?.message,abortEarly:t?.abortEarly??_?.abortEarly,abortPipeEarly:t?.abortPipeEarly??_?.abortPipeEarly}}let $;function Q(t){return $?.get(t)}let X;function Z(t){return X?.get(t)}let ee;function te(t,n){return ee?.get(t)?.get(n)}function U(t){const n=typeof t;return n==="string"?`"${t}"`:n==="number"||n==="bigint"||n==="boolean"?`${t}`:n==="object"||n==="function"?(t&&Object.getPrototypeOf(t)?.constructor?.name)??"null":n}function h(t,n,e,r,o){const s=o&&"input"in o?o.input:e.value,i=o?.expected??t.expects??null,c=o?.received??U(s),l={kind:t.kind,type:t.type,input:s,expected:i,received:c,message:`Invalid ${n}: ${i?`Expected ${i} but r`:"R"}eceived ${c}`,requirement:t.requirement,path:o?.path,issues:o?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},d=t.kind==="schema",m=o?.message??t.message??te(t.reference,l.lang)??(d?Z(l.lang):null)??r.message??Q(l.lang);m!==void 0&&(l.message=typeof m=="function"?m(l):m),d&&(e.typed=!1),e.issues?e.issues.push(l):e.issues=[l]}function b(t){return{version:1,vendor:"valibot",validate(n){return t["~run"]({value:n},J())}}}function ne(t,n){const e=[...new Set(t)];return e.length>1?`(${e.join(` ${n} `)})`:e[0]??"never"}function re(t,n,e){return typeof t.fallback=="function"?t.fallback(n,e):t.fallback}function A(t,n,e){return typeof t.default=="function"?t.default(n,e):t.default}function y(t,n){return{kind:"schema",type:"array",reference:y,expects:"Array",async:!1,item:t,message:n,get"~standard"(){return b(this)},"~run"(e,r){const o=e.value;if(Array.isArray(o)){e.typed=!0,e.value=[];for(let s=0;s<o.length;s++){const i=o[s],c=this.item["~run"]({value:i},r);if(c.issues){const l={type:"array",origin:"value",input:o,key:s,value:i};for(const d of c.issues)d.path?d.path.unshift(l):d.path=[l],e.issues?.push(d);if(e.issues||(e.issues=c.issues),r.abortEarly){e.typed=!1;break}}c.typed||(e.typed=!1),e.value.push(c.value)}}else h(this,"type",e,r);return e}}}function C(t){return{kind:"schema",type:"boolean",reference:C,expects:"boolean",async:!1,message:t,get"~standard"(){return b(this)},"~run"(n,e){return typeof n.value=="boolean"?n.typed=!0:h(this,"type",n,e),n}}}function g(t,n){return{kind:"schema",type:"literal",reference:g,expects:U(t),async:!1,literal:t,message:n,get"~standard"(){return b(this)},"~run"(e,r){return e.value===this.literal?e.typed=!0:h(this,"type",e,r),e}}}function E(t,n){return{kind:"schema",type:"optional",reference:E,expects:`(${t.expects} | undefined)`,async:!1,wrapped:t,default:n,get"~standard"(){return b(this)},"~run"(e,r){return e.value===void 0&&(this.default!==void 0&&(e.value=A(this,e,r)),e.value===void 0)?(e.typed=!0,e):this.wrapped["~run"](e,r)}}}function p(t,n){return{kind:"schema",type:"strict_object",reference:p,expects:"Object",async:!1,entries:t,message:n,get"~standard"(){return b(this)},"~run"(e,r){const o=e.value;if(o&&typeof o=="object"){e.typed=!0,e.value={};for(const s in this.entries){const i=this.entries[s];if(s in o||(i.type==="exact_optional"||i.type==="optional"||i.type==="nullish")&&i.default!==void 0){const c=s in o?o[s]:A(i),l=i["~run"]({value:c},r);if(l.issues){const d={type:"object",origin:"value",input:o,key:s,value:c};for(const m of l.issues)m.path?m.path.unshift(d):m.path=[d],e.issues?.push(m);if(e.issues||(e.issues=l.issues),r.abortEarly){e.typed=!1;break}}l.typed||(e.typed=!1),e.value[s]=l.value}else if(i.fallback!==void 0)e.value[s]=re(i);else if(i.type!=="exact_optional"&&i.type!=="optional"&&i.type!=="nullish"&&(h(this,"key",e,r,{input:void 0,expected:`"${s}"`,path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]}),r.abortEarly))break}if(!e.issues||!r.abortEarly){for(const s in o)if(!(s in this.entries)){h(this,"key",e,r,{input:s,expected:"never",path:[{type:"object",origin:"key",input:o,key:s,value:o[s]}]});break}}}else h(this,"type",e,r);return e}}}function f(t){return{kind:"schema",type:"string",reference:f,expects:"string",async:!1,message:t,get"~standard"(){return b(this)},"~run"(n,e){return typeof n.value=="string"?n.typed=!0:h(this,"type",n,e),n}}}function F(t){let n;if(t)for(const e of t)n?n.push(...e.issues):n=e.issues;return n}function S(t,n){return{kind:"schema",type:"union",reference:S,expects:ne(t.map(e=>e.expects),"|"),async:!1,options:t,message:n,get"~standard"(){return b(this)},"~run"(e,r){let o,s,i;for(const c of this.options){const l=c["~run"]({value:e.value},r);if(l.typed)if(l.issues)s?s.push(l):s=[l];else{o=l;break}else i?i.push(l):i=[l]}if(o)return o;if(s){if(s.length===1)return s[0];h(this,"type",e,r,{issues:F(s)}),e.typed=!0}else{if(i?.length===1)return i[0];h(this,"type",e,r,{issues:F(i)})}return e}}}const xe={component:x},se=p({children:y(y(p({text:f()})))}),P={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{text:"Hello world."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]});return u.useEffect(()=>{if(t.current)return x({doc:n,schema:se,copy:[j(),L(),k()],paste:[D(),N(r=>({text:r})),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:n.children.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},oe=p({text:f(),bold:E(C()),italic:E(C()),underline:E(C()),strike:E(C())}),ie=p({children:y(y(oe))}),ae=({node:t})=>{const n=t.bold?"strong":"span",e={};return t.italic&&(e.fontStyle="italic"),t.underline&&(e.textDecoration="underline"),t.strike&&(e.textDecoration=e.textDecoration?`${e.textDecoration} line-through`:"line-through"),a.jsx(n,{style:e,children:t.text||a.jsx("br",{})})},R={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{text:"Hello",bold:!0},{text:" "},{text:"World",italic:!0},{text:"."}],[{text:"こんにちは。"}],[{text:"👍❤️🧑‍🧑‍🧒"}]]}),r=()=>{c.apply(I,"bold")},o=()=>{c.apply(I,"italic")},s=()=>{c.apply(I,"underline")},i=()=>{c.apply(I,"strike")},c=u.useMemo(()=>x({doc:n,schema:ie,keyboard:[w("b",r,{mod:!0}),w("i",o,{mod:!0}),w("u",s,{mod:!0}),w("s",i,{mod:!0})],copy:[j(),k()],paste:[D(),v()],onChange:e}),[]);return u.useEffect(()=>{if(t.current)return c.input(t.current)},[]),a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("button",{onClick:r,children:"bold"}),a.jsx("button",{onClick:o,children:"italic"}),a.jsx("button",{onClick:s,children:"underline"}),a.jsx("button",{onClick:i,children:"strike"})]}),a.jsx("div",{ref:t,style:{backgroundColor:"white",border:"solid 1px darkgray",padding:8},children:n.children.map((l,d)=>a.jsx("div",{children:l.map((m,B)=>a.jsx(ae,{node:m},B))},d))})]})}},le=p({children:y(y(S([p({type:g("text"),text:f()}),p({type:g("tag"),label:f(),value:f()})])))}),T={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{type:"text",text:"Hello "},{type:"tag",label:"Apple",value:"1"},{type:"text",text:" world "},{type:"tag",label:"Orange",value:"2"}]]});return u.useEffect(()=>{if(t.current)return x({doc:n,schema:le,plugins:[K()],copy:[j(),k(r=>"text"in r?r.text:r.label)],paste:[D(),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:n.children[0].map((r,o)=>r.type==="tag"?a.jsx("span",{contentEditable:!1,"data-tag-value":r.value,style:{background:"slategray",color:"white",fontSize:12,padding:4,borderRadius:8},children:r.label},o):a.jsx("span",{children:r.text||a.jsx("br",{})},o))})}},ce=p({children:y(y(S([p({type:g("text"),text:f()}),p({type:g("image"),src:f()})])))}),H={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{type:"text",text:"Hello "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=1"},{type:"text",text:" world "},{type:"image",src:"https://loremflickr.com/320/240/cats?lock=2"}]]});return u.useEffect(()=>{if(t.current)return x({doc:n,schema:ce,copy:[j(),L(),k()],paste:[D(),V({"image/png":r=>({type:"image",src:URL.createObjectURL(r)})}),N(r=>({type:"text",text:r}),[r=>{if(r.tagName==="IMG")return{type:"image",src:r.src}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:n.children.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="image"?a.jsx("img",{src:s.src,style:{maxWidth:200}},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},ue=p({children:y(y(S([p({type:g("text"),text:f()}),p({type:g("video"),src:f()})])))}),O={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{type:"text",text:"Hello "},{type:"video",src:"https://download.samplelib.com/mp4/sample-5s.mp4"},{type:"text",text:" world "}]]});return u.useEffect(()=>{if(t.current)return x({doc:n,schema:ue,copy:[j(),L(),k()],paste:[D(),N(r=>({type:"text",text:r}),[r=>{if(r.tagName==="VIDEO")return{type:"video",src:r.childNodes[0].src}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:n.children.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="video"?a.jsx("video",{width:400,controls:!0,contentEditable:"false",suppressContentEditableWarning:!0,children:a.jsx("source",{src:s.src})},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})}},pe=p({children:y(y(S([p({type:g("text"),text:f()}),p({type:g("youtube"),id:f()})])))}),de=({id:t})=>a.jsx("iframe",{"data-youtube-node":!0,"data-youtube-id":t,width:"560",height:"315",src:"https://www.youtube.com/embed/"+t,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}),M={render:()=>{const t=u.useRef(null),[n,e]=u.useState({children:[[{type:"text",text:"Hello "},{type:"youtube",id:"IqKz0SfHaqI"},{type:"text",text:" Youtube"}]]});return u.useEffect(()=>{if(t.current)return x({doc:n,schema:pe,copy:[j(),L(),k()],paste:[D(),N(r=>({type:"text",text:r}),[r=>{if(r.dataset.youtubeNode)return{type:"youtube",id:r.dataset.youtubeId}}]),v()],onChange:e}).input(t.current)},[]),a.jsx("div",{children:a.jsx("div",{ref:t,style:{backgroundColor:"white",padding:8},children:n.children.map((r,o)=>a.jsx("div",{children:r.map((s,i)=>s.type==="youtube"?a.jsx(de,{id:s.id},i):a.jsx("span",{children:s.text||a.jsx("br",{})},i))},o))})})}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof basicSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [[{
        text: "Hello world."
      }], [{
        text: "こんにちは。"
      }], [{
        text: "👍❤️🧑‍🧑‍🧒"
      }]]
    });
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
        {doc.children.map((r, i) => <div key={i}>
            {r.map((n, j) => <span key={j}>{n.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof richSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [[{
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
      }]]
    });
    const toggleBold = () => {
      editor.apply(ToggleFormat, "bold");
    };
    const toggleItalic = () => {
      editor.apply(ToggleFormat, "italic");
    };
    const toggleUnderline = () => {
      editor.apply(ToggleFormat, "underline");
    };
    const toggleStrike = () => {
      editor.apply(ToggleFormat, "strike");
    };
    const editor = useMemo(() => createEditor({
      doc: doc,
      schema: richSchema,
      keyboard: [hotkey("b", toggleBold, {
        mod: true
      }), hotkey("i", toggleItalic, {
        mod: true
      }), hotkey("u", toggleUnderline, {
        mod: true
      }), hotkey("s", toggleStrike, {
        mod: true
      })],
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
          <button onClick={toggleBold}>bold</button>
          <button onClick={toggleItalic}>italic</button>
          <button onClick={toggleUnderline}>underline</button>
          <button onClick={toggleStrike}>strike</button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }}>
          {doc.children.map((r, i) => <div key={i}>
              {r.map((n, j) => <Text key={j} node={n} />)}
            </div>)}
        </div>
      </div>;
  }
}`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof tagSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [[{
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
      }]]
    });
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
        {doc.children[0].map((t, j) => t.type === "tag" ? <span key={j} contentEditable={false} data-tag-value={t.value} style={{
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
    const [doc, setDoc] = useState<Doc>({
      children: [[{
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
      }]]
    });
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
        {doc.children.map((r, i) => <div key={i}>
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
    const [doc, setDoc] = useState<Doc>({
      children: [[{
        type: "text",
        text: "Hello "
      }, {
        type: "video",
        src: "https://download.samplelib.com/mp4/sample-5s.mp4"
      }, {
        type: "text",
        text: " world "
      }]]
    });
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
        {doc.children.map((r, i) => <div key={i}>
            {r.map((t, j) => t.type === "video" ?
        // safari needs contentEditable="false"
        <video key={j} width={400} controls contentEditable="false" suppressContentEditableWarning>
                  <source src={t.src} />
                </video> : <span key={j}>{t.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...O.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof youtubeSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [[{
        type: "text",
        text: "Hello "
      }, {
        type: "youtube",
        id: "IqKz0SfHaqI"
      }, {
        type: "text",
        text: " Youtube"
      }]]
    });
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
          {doc.children.map((r, i) => <div key={i}>
              {r.map((t, j) => t.type === "youtube" ? <Youtube key={j} id={t.id} /> : <span key={j}>{t.text || <br />}</span>)}
            </div>)}
        </div>
      </div>;
  }
}`,...M.parameters?.docs?.source}}};const be=["Basic","RichText","Tag","Image","Video","Iframe"];export{P as Basic,M as Iframe,H as Image,R as RichText,T as Tag,O as Video,be as __namedExportsOrder,xe as default};
