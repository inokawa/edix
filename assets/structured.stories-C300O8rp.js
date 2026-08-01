import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-CWCrpZa4.js";import{t as r}from"./react-dom-Bk7uK6h9.js";import{t as i}from"./jsx-runtime-O9QVJvLM.js";import{A as a,F as o,G as s,I as c,J as l,K as u,L as d,M as f,S as p,U as m,W as h,Y as g,a as _,b as v,d as y,f as b,g as x,h as S,j as C,k as w,s as T,t as E,y as D,z as ee}from"./src-CLrumGAl.js";import{a as O,c as k,i as A,l as j,n as M,o as N,r as te,s as ne,t as P,u as F}from"./dist-BMstJve2.js";function re(e,t=e.selection[0]){let[n,,r]=h(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:(n.indent??0)+1})}function ie(e,t=e.selection[0]){let[n,,r]=h(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:Math.max((n.indent??0)-1,0)})}var I,ae,L,oe,se,R,ce,le,z,ue,B,V,de,H,U,fe,W,G,K,pe,q,me,he,J,ge,Y,X,Z,_e,Q,ve,$,ye;t((()=>{I=e(n()),E(),te(),ae=e(r()),L=i(),oe={component:p},se=k({children:P(k({children:P(k({text:j()}))}))}),R={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:``}]}]}),r=(0,I.useMemo)(()=>{let e=p({doc:t,schema:se}).exec(S).exec(D);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,I.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{children:e.children.map((e,t)=>(0,L.jsx)(`span`,{children:e.text||(0,L.jsx)(`br`,{})},t))},t))})}},ce=k({text:j(),fontSize:N(O()),bold:N(M()),italic:N(M()),underline:N(M()),strike:N(M())}),le=k({children:P(k({align:N(ne([`left`,`right`])),indent:N(O()),children:P(ce)}))}),z=10,ue=({node:e})=>{let t=e.bold?`strong`:`span`,n={fontSize:`${e.fontSize??z}pt`};return e.italic&&(n.fontStyle=`italic`),e.underline&&(n.textDecoration=`underline`),e.strike&&(n.textDecoration=n.textDecoration?`${n.textDecoration} line-through`:`line-through`),(0,L.jsx)(t,{style:n,children:e.text||(0,L.jsx)(`br`,{})})},B={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:`Hello`,bold:!0},{text:` `},{text:`World`,italic:!0},{text:`.`}]},{children:[{text:`こんにちは。`}]},{children:[{text:`👍❤️🧑‍🧑‍🧒`}]}]}),[r,i]=(0,I.useState)(null),[o,s]=(0,I.useState)(),[l,u]=(0,I.useState)(!1),[f,m]=(0,I.useState)(!1),[h,g]=(0,I.useState)(!1),[_,v]=(0,I.useState)(!1),b=e=>{O.exec(a,`fontSize`,e)},x=()=>{O.exec(d,`bold`)},C=()=>{O.exec(d,`italic`)},w=()=>{O.exec(d,`underline`)},E=()=>{O.exec(d,`strike`)},O=(0,I.useMemo)(()=>{let e=()=>{let e=new Set,t=!1,n=!1,r=!1,i=!1;for(let a of O.exec(ee))a.fontSize?e.add(a.fontSize):e.add(z),a.bold&&(t=!0),a.italic&&(n=!0),a.underline&&(r=!0),a.strike&&(i=!0);s(e.size===1?e.values().next().value:void 0),u(t),m(n),g(r),v(i)},r=p({doc:t,schema:le}).exec(y,{"Mod+B":x,"Mod+I":C,"Mod+U":w,"Mod+S":E}).exec(T,e=>{O.selection[0]===O.selection[1]?i(null):i(t=>{let n=e();return t&&t.top===n.top&&t.left===n.left?t:{top:n.top,left:n.left}})}).exec(S).exec(D);return r.on(`change`,()=>{n(r.doc),e()}),r.on(`selectionchange`,()=>{e()}),r},[]);return(0,I.useEffect)(()=>{if(e.current)return O.input(e.current)},[]),(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4,padding:4,paddingBottom:8},children:[(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`select`,{value:o??`--`,onChange:e=>{e.preventDefault();let t=Number(e.target.value);Number.isNaN(t)||b(t)},children:[(0,L.jsx)(`option`,{value:`--`,children:`--`}),(0,L.jsx)(`option`,{value:`8`,children:`8`}),(0,L.jsx)(`option`,{value:`10`,children:`10`}),(0,L.jsx)(`option`,{value:`12`,children:`12`}),(0,L.jsx)(`option`,{value:`14`,children:`14`}),(0,L.jsx)(`option`,{value:`16`,children:`16`}),(0,L.jsx)(`option`,{value:`18`,children:`18`}),(0,L.jsx)(`option`,{value:`20`,children:`20`})]}),(0,L.jsx)(`button`,{style:{fontWeight:l?`bold`:void 0},onClick:x,children:`bold`}),(0,L.jsx)(`button`,{style:{fontWeight:f?`bold`:void 0},onClick:C,children:`italic`}),(0,L.jsx)(`button`,{style:{fontWeight:h?`bold`:void 0},onClick:w,children:`underline`}),(0,L.jsx)(`button`,{style:{fontWeight:_?`bold`:void 0},onClick:E,children:`strike`})]}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`button`,{onClick:()=>{O.exec(c,`align`,`right`,void 0)},children:`align`}),(0,L.jsx)(`button`,{onClick:()=>{O.exec(re)},children:`indent`}),(0,L.jsx)(`button`,{onClick:()=>{O.exec(ie)},children:`outdent`})]})]}),(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{style:{textAlign:e.align,textIndent:e.indent?`${e.indent}em`:void 0},children:e.children.map((e,t)=>(0,L.jsx)(ue,{node:e},t))},t))}),r?(0,L.jsxs)(`div`,{style:{position:`fixed`,top:r.top-30,left:r.left,whiteSpace:`nowrap`},children:[(0,L.jsx)(`button`,{style:{fontWeight:l?`bold`:void 0},onClick:x,children:`bold`}),(0,L.jsx)(`button`,{style:{fontWeight:f?`bold`:void 0},onClick:C,children:`italic`}),(0,L.jsx)(`button`,{style:{fontWeight:h?`bold`:void 0},onClick:w,children:`underline`}),(0,L.jsx)(`button`,{style:{fontWeight:_?`bold`:void 0},onClick:E,children:`strike`})]}):null]})}},V=k({children:P(F([k({text:j()}),k({type:A(`tag`),label:j(),value:j()})]))}),de=({onClick:e})=>{let[t,n]=(0,I.useState)(!1);return(0,L.jsx)(`span`,{onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onClick:e,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:14,height:14,borderRadius:`50%`,background:t?`#999`:`#c4c4c4`,color:`white`,fontSize:9,lineHeight:1,cursor:`pointer`},children:`✕`})},H=({label:e,onLabelClick:t,onRemove:n})=>(0,L.jsxs)(`span`,{contentEditable:!1,style:{display:`inline-flex`,alignItems:`center`,gap:4,background:`#f0f0f0`,color:`#444`,border:`solid 1px #ccc`,fontSize:12,lineHeight:1.5,padding:`1px 4px 1px 8px`,borderRadius:999,margin:`0 2px`},children:[(0,L.jsx)(`span`,{style:{cursor:t?`pointer`:void 0},onClick:t,children:e}),(0,L.jsx)(de,{onClick:n})]}),U={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{text:`Hello `},{type:`tag`,label:`Apple`,value:`1`},{text:` world `},{type:`tag`,label:`Orange`,value:`2`}]}),r=(0,I.useMemo)(()=>{let e=p({doc:t,schema:V}).exec(S).exec(D,{voidToString:e=>e.label}).exec(_);return e.on(`change`,()=>{n(r.doc)}),e},[]);(0,I.useEffect)(()=>{if(e.current)return r.input(e.current)},[]);let i=(0,I.useRef)(null),a=(0,I.useRef)(null);return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`label`,{children:[`label:`,(0,L.jsx)(`input`,{ref:i,defaultValue:`Grape`})]}),(0,L.jsxs)(`label`,{children:[`value:`,(0,L.jsx)(`input`,{ref:a,defaultValue:`123`})]}),(0,L.jsx)(`button`,{onClick:()=>{let e=i.current?.value,t=a.current?.value;!e||!t||r.exec(C,{type:`tag`,value:t,label:e})},children:`insert`})]}),(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,n)=>`text`in e?e.text||(0,L.jsx)(`br`,{}):(0,L.jsx)(H,{label:e.label,onLabelClick:n=>{n.preventDefault();let i=s(t,e);if(i==null)return;let a=window.prompt(`label:`,e.label);a&&r.exec(o,`label`,a,i+u(e))},onRemove:n=>{n.preventDefault();let i=s(t,e);i!=null&&r.exec(w,[i,i+u(e)])}},n))})]})}},fe=({items:e,index:t,selected:n,onSelect:r})=>{let i=(0,I.useRef)(null);return(0,I.useEffect)(()=>{t!==-1&&i.current?.children[t]?.scrollIntoView({block:`nearest`})},[t]),(0,L.jsx)(`ul`,{ref:i,style:{position:`absolute`,zIndex:1,top:`100%`,left:0,right:0,maxHeight:200,overflowY:`auto`,margin:`2px 0 0`,padding:0,listStyleType:`none`,fontSize:12,background:`white`,border:`solid 1px #ccc`,borderRadius:4,cursor:`pointer`},children:e.length?e.map((e,i)=>(0,L.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:6,padding:`3px 8px`,...t===i&&{color:`white`,background:`#2A6AD3`}},onMouseDown:t=>{t.preventDefault(),r(e)},children:[(0,L.jsx)(`span`,{style:{width:10},children:n.has(e)?`✓`:``}),e]},e)):(0,L.jsx)(`li`,{style:{padding:`3px 8px`,color:`#999`},children:`No results`})})},W=(e,t)=>{let n=m(e,t,!0);return n&&`text`in n[0]?n[0].text.slice(0,n[1]):``},G={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{type:`tag`,label:`Luke Skywalker`,value:`Luke Skywalker`}]}),[r,i]=(0,I.useState)(0),[a,o]=(0,I.useState)(!1),[c,l]=(0,I.useState)(-1),d=(0,I.useMemo)(()=>new Set(t.children.flatMap(e=>`text`in e?[]:[e.value])),[t]),f=(0,I.useMemo)(()=>W(t,r),[t,r]),m=(0,I.useMemo)(()=>{let e=f.trim().toLowerCase();return e?K.filter(t=>t.toLowerCase().includes(e)):K},[f]);c>m.length-1&&l(-1);let h=e=>{let n=t.children.find(t=>!(`text`in t)&&t.value===e),i=n&&s(t,n);if(n&&i!=null)T.exec(w,[i,i+u(n)]);else{let t=r-f.length;f&&T.exec(w,[t,r]),T.exec(C,{type:`tag`,label:e,value:e},t)}o(!1),l(-1)},g=(0,I.useEffectEvent)(()=>{if(!a||!m.length)return!1;l(e=>e<=0?m.length-1:e-1)}),v=(0,I.useEffectEvent)(()=>{if(!a||!m.length)return!1;l(e=>e>=m.length-1?0:e+1)}),b=(0,I.useEffectEvent)(()=>{if(!a||c===-1)return!1;h(m[c])}),x=(0,I.useEffectEvent)(()=>{if(!a)return!1;o(!1),l(-1)}),T=(0,I.useMemo)(()=>{let e=p({doc:t,schema:V}).exec(S).exec(D,{voidToString:e=>e.label}).exec(_).exec(y,{ArrowUp:g,ArrowDown:v,Enter:b,Escape:x});return e.on(`change`,()=>{let t=Math.min(...e.selection);n(e.doc),i(t),o(!!W(e.doc,t).trim()),l(-1)}),e.on(`selectionchange`,()=>{i(Math.min(...e.selection))}),e},[]);return(0,I.useEffect)(()=>{if(e.current)return T.input(e.current)},[]),(0,L.jsxs)(`div`,{style:{position:`relative`,width:320,fontSize:13},onBlur:()=>{o(!1),l(-1)},children:[(0,L.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,background:`white`,border:`solid 1px darkgray`,borderRadius:4},children:[(0,L.jsx)(`div`,{ref:e,style:{flex:1,minWidth:0,padding:6,lineHeight:2},children:t.children.map((e,t)=>`text`in e?e.text||(0,L.jsx)(`br`,{}):(0,L.jsx)(H,{label:e.label,onRemove:t=>{t.preventDefault(),h(e.value)}},t))}),(0,L.jsx)(`button`,{style:{alignSelf:`stretch`,padding:`0 6px`,border:`none`,borderLeft:`solid 1px #ddd`,background:`transparent`,cursor:`pointer`},onMouseDown:e=>{e.preventDefault()},onClick:()=>{e.current?.focus(),o(e=>!e),l(-1)},children:`▾`})]}),a&&(0,L.jsx)(fe,{items:m,index:c,selected:d,onSelect:h})]})}},K=`Aayla Secura,Adi Gallia,Admiral Dodd Rancit,Admiral Firmus Piett,Admiral Gial Ackbar,Admiral Ozzel,Admiral Raddus,Admiral Terrinald Screed,Admiral Trench,Admiral U.O. Statura,Agen Kolar,Agent Kallus,Aiolin and Morit Astarte,Aks Moe,Almec,Alton Kastle,Amee,AP-5,Armitage Hux,Artoo,Arvel Crynyd,Asajj Ventress,Aurra Sing,AZI-3,Bala-Tik,Barada,Bargwill Tomder,Baron Papanoida,Barriss Offee,Baze Malbus,Bazine Netal,BB-8,BB-9E,Ben Quadinaros,Berch Teller,Beru Lars,Bib Fortuna,Biggs Darklighter,Black Krrsantan,Bo-Katan Kryze,Boba Fett,Bobbajo,Bodhi Rook,Borvo the Hutt,Boss Nass,Bossk,Breha Antilles-Organa,Bren Derlin,Brendol Hux,BT-1,C-3PO,C1-10P,Cad Bane,Caluan Ematt,Captain Gregor,Captain Phasma,Captain Quarsh Panaka,Captain Rex,Carlist Rieekan,Casca Panzoro,Cassian Andor,Cassio Tagge,Cham Syndulla,Che Amanwe Papanoida,Chewbacca,Chi Eekway Papanoida,Chief Chirpa,Chirrut Îmwe,Ciena Ree,Cin Drallig,Clegg Holdfast,Cliegg Lars,Coleman Kcaj,Coleman Trebor,Colonel Kaplan,Commander Bly,Commander Cody (CC-2224),Commander Fil (CC-3714),Commander Fox,Commander Gree,Commander Jet,Commander Wolffe,Conan Antonio Motti,Conder Kyl,Constable Zuvio,Cordé,Cpatain Typho,Crix Madine,Cut Lawquane,Dak Ralter,Dapp,Darth Bane,Darth Maul,Darth Tyranus,Daultay Dofine,Del Meeko,Delian Mors,Dengar,Depa Billaba,Derek Klivian,Dexter Jettster,Dineé Ellberger,DJ,Doctor Aphra,Doctor Evazan,Dogma,Dormé,Dr. Cylo,Droidbait,Droopy McCool,Dryden Vos,Dud Bolt,Ebe E. Endocott,Echuu Shen-Jon,Eeth Koth,Eighth Brother,Eirtaé,Eli Vanto,Ellé,Ello Asty,Embo,Eneb Ray,Enfys Nest,EV-9D9,Evaan Verlaine,Even Piell,Ezra Bridger,Faro Argyus,Feral,Fifth Brother,Finis Valorum,Finn,Fives,FN-1824,FN-2003,Fodesinbeed Annodue,Fulcrum,FX-7,GA-97,Galen Erso,Gallius Rax,Garazeb "Zeb" Orrelios,Gardulla the Hutt,Garrick Versio,Garven Dreis,Gavyn Sykes,Gideon Hask,Gizor Dellso,Gonk droid,Grand Inquisitor,Greeata Jendowanian,Greedo,Greer Sonnel,Grievous,Grummgar,Gungi,Hammerhead,Han Solo,Harter Kalonia,Has Obbit,Hera Syndulla,Hevy,Hondo Ohnaka,Huyang,Iden Versio,IG-88,Ima-Gun Di,Inquisitors,Inspector Thanoth,Jabba,Jacen Syndulla,Jan Dodonna,Jango Fett,Janus Greejatus,Jar Jar Binks,Jas Emari,Jaxxon,Jek Tono Porkins,Jeremoch Colton,Jira,Jobal Naberrie,Jocasta Nu,Joclad Danva,Joh Yowza,Jom Barell,Joph Seastriker,Jova Tarkin,Jubnuk,Jyn Erso,K-2SO,Kanan Jarrus,Karbin,Karina the Great,Kes Dameron,Ketsu Onyo,Ki-Adi-Mundi,King Katuunko,Kit Fisto,Kitster Banai,Klaatu,Klik-Klak,Korr Sella,Kylo Ren,L3-37,Lama Su,Lando Calrissian,Lanever Villecham,Leia Organa,Letta Turmond,Lieutenant Kaydel Ko Connix,Lieutenant Thire,Lobot,Logray,Lok Durd,Longo Two-Guns,Lor San Tekka,Lorth Needa,Lott Dod,Luke Skywalker,Lumat,Luminara Unduli,Lux Bonteri,Lyn Me,Lyra Erso,Mace Windu,Malakili,Mama the Hutt,Mars Guo,Mas Amedda,Mawhonic,Max Rebo,Maximilian Veers,Maz Kanata,ME-8D9,Meena Tills,Mercurial Swift,Mina Bonteri,Miraj Scintel,Mister Bones,Mod Terrik,Moden Canady,Mon Mothma,Moradmin Bast,Moralo Eval,Morley,Mother Talzin,Nahdar Vebb,Nahdonnis Praji,Nien Nunb,Niima the Hutt,Nines,Norra Wexley,Nute Gunray,Nuvo Vindi,Obi-Wan Kenobi,Odd Ball,Ody Mandrell,Omi,Onaconda Farr,Oola,OOM-9,Oppo Rancisis,Orn Free Taa,Oro Dassyne,Orrimarko,Osi Sobeck,Owen Lars,Pablo-Jill,Padmé Amidala,Pagetti Rook,Paige Tico,Paploo,Petty Officer Thanisson,Pharl McQuarrie,Plo Koon,Po Nudo,Poe Dameron,Poggle the Lesser,Pong Krell,Pooja Naberrie,PZ-4CO,Quarrie,Quay Tolsite,Queen Apailana,Queen Jamillia,Queen Neeyutnee,Qui-Gon Jinn,Quiggold,Quinlan Vos,R2-D2,R2-KT,R3-S6,R4-P17,R5-D4,RA-7,Rabé,Rako Hardeen,Ransolm Casterfo,Rappertunie,Ratts Tyerell,Raymus Antilles,Ree-Yees,Reeve Panzoro,Rey,Ric Olié,Riff Tamson,Riley,Rinnriyin Di,Rio Durant,Rogue Squadron,Romba,Roos Tarpals,Rose Tico,Rotta the Hutt,Rukh,Rune Haako,Rush Clovis,Ruwee Naberrie,Ryoo Naberrie,Sabé,Sabine Wren,Saché,Saelt-Marae,Saesee Tiin,Salacious B. Crumb,San Hill,Sana Starros,Sarco Plank,Sarkli,Satine Kryze,Savage Opress,Sebulba,Senator Organa,Sergeant Kreel,Seventh Sister,Shaak Ti,Shara Bey,Shmi Skywalker,Shu Mai,Sidon Ithano,Sifo-Dyas,Sim Aloo,Siniir Rath Velus,Sio Bibble,Sixth Brother,Slowen Lo,Sly Moore,Snaggletooth,Snap Wexley,Snoke,Sola Naberrie,Sora Bulq,Strono Tuggs,Sy Snootles,Tallissan Lintra,Tarfful,Tasu Leech,Taun We,TC-14,Tee Watt Kaa,Teebo,Teedo,Teemto Pagalies,Temiri Blagg,Tessek,Tey How,Thane Kyrell,The Bendu,The Smuggler,Thrawn,Tiaan Jerjerrod,Tion Medon,Tobias Beckett,Tulon Voidgazer,Tup,U9-C4,Unkar Plutt,Val Beckett,Vanden Willard,Vice Admiral Amilyn Holdo,Vober Dand,WAC-47,Wag Too,Wald,Walrus Man,Warok,Wat Tambor,Watto,Wedge Antilles,Wes Janson,Wicket W. Warrick,Wilhuff Tarkin,Wollivan,Wuher,Wullf Yularen,Xamuel Lennox,Yaddle,Yarael Poof,Yoda,Zam Wesell,Zev Senesca,Ziro the Hutt,Zuckuss`.split(`,`),pe=8,q=/\B@([\-+\w]*)$/,me=({chars:e,index:t,top:n,left:r,complete:i})=>(0,L.jsx)(`div`,{style:{position:`fixed`,top:n,left:r,fontSize:`12px`,border:`solid 1px gray`,borderRadius:`3px`,background:`white`,cursor:`pointer`},children:e.map((e,n)=>(0,L.jsx)(`div`,{style:{padding:`4px`,...t===n&&{color:`white`,background:`#2A6AD3`}},onMouseDown:e=>{e.preventDefault(),i(n)},children:e},e))}),he=k({children:P(k({children:P(F([k({text:j()}),k({type:A(`mention`),name:j()})]))}))}),J={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:`Hi `},{type:`mention`,name:`Luke Skywalker`},{text:` and `},{type:`mention`,name:`Leia Organa`},{text:`, could you check this out? Type @ to mention someone.`}]},{children:[{text:``}]}]}),[r,i]=(0,I.useState)(null),[a,o]=(0,I.useState)(0),s=(r&&g(t,0,r.caret).match(q))?.[1]??``,c=(0,I.useMemo)(()=>K.filter(e=>e.toLowerCase().startsWith(s.toLowerCase())).slice(0,pe),[s]),l=t=>{if(!e.current||!r)return;let n=c[t],a=r.caret-s.length-1,l=r.caret;_.exec(w,[a,l]).exec(C,{type:`mention`,name:n},a).exec(f,` `),i(null),o(0)},u=(0,I.useEffectEvent)(()=>{if(!r||!c.length)return!1;o(e=>e<=0?c.length-1:e-1)}),d=(0,I.useEffectEvent)(()=>{if(!r||!c.length)return!1;o(e=>e>=c.length-1?0:e+1)}),m=(0,I.useEffectEvent)(()=>{if(!r||!c.length)return!1;l(a)}),h=(0,I.useEffectEvent)(()=>{if(!r||!c.length)return!1;i(null),o(0)}),_=(0,I.useMemo)(()=>{let e=p({doc:t,schema:he}).exec(D,{voidToString:e=>`@${e.name}`}).exec(y,{ArrowUp:u,ArrowDown:d,Enter:m,Escape:h}).exec(T,e=>{let t=Math.min(..._.selection);if(q.test(g(_.doc,0,t))){let n=e();i({top:n.top+n.height,left:n.left,caret:t})}else i(null);o(0)});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,I.useEffect)(()=>{if(e.current)return _.input(e.current)},[]),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,L.jsx)(`br`,{}):(0,L.jsxs)(`span`,{contentEditable:!1,style:{background:`#EAF5F9`,color:`#4276AA`,borderRadius:`3px`},children:[`@`,e.name]},t))},t))}),r&&(0,ae.createPortal)((0,L.jsx)(me,{top:r.top,left:r.left,chars:c,index:a,complete:l}),document.body)]})}},ge=k({children:P(k({children:P(k({text:j(),comment:N(j())}))}))}),Y={render:()=>{let e=(0,I.useRef)(null),t=(0,I.useRef)(0),[n,r]=(0,I.useState)([{id:`0`,text:`This is comment.`}]),[i,o]=(0,I.useState)(null),[s,c]=(0,I.useState)(!1),[d,f]=(0,I.useState)({children:[{children:[{text:`Hello `},{text:` world`,comment:`0`},{text:`.`}]},{children:[{text:`Select text and add comments.`}]}]}),m=(0,I.useMemo)(()=>{let e=p({doc:d,schema:ge}).exec(S).exec(D);return e.on(`change`,()=>{f(e.doc);let t=new Set;for(let[n]of l(e.doc,[0,u(e.doc)]))n.comment&&t.add(n.comment);r(e=>e.filter(e=>t.has(e.id)))}),e.on(`selectionchange`,()=>{c(e.selection[0]!==e.selection[1]);let t=null;for(let n of e.exec(ee))if(n.comment){t=n.comment;break}o(t)}),e},[]);(0,I.useEffect)(()=>{if(e.current)return m.input(e.current)},[]);let h=(0,I.useRef)(null);return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`textarea`,{ref:h,placeholder:`Select text and write comment`}),(0,L.jsx)(`button`,{disabled:!s,onClick:()=>{let e=h.current;if(!e)return;let n=e.value;if(!n)return;let i=String(++t.current);m.exec(a,`comment`,i),r(e=>[...e,{id:i,text:n}]),o(i),e.value=``},children:`Add comment`})]}),(0,L.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`},children:[(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8,flex:1,minHeight:120},children:d.children.map((e,t)=>(0,L.jsx)(`div`,{children:e.children.map((e,t)=>(0,L.jsx)(`span`,{style:{backgroundColor:e.comment?e.comment===i?`gold`:`khaki`:void 0},children:e.text||(0,L.jsx)(`br`,{})},t))},t))}),(0,L.jsx)(`div`,{style:{width:200,background:`#f5f5f5`,padding:8,display:`flex`,flexDirection:`column`,gap:8},children:n.map(e=>(0,L.jsxs)(`div`,{style:{padding:8,background:`white`,border:e.id===i?`solid 1px orange`:`solid 1px #e0e0e0`,borderRadius:6,cursor:`pointer`,fontSize:13},onClick:()=>{o(e.id)},children:[(0,L.jsx)(`div`,{children:e.text}),(0,L.jsx)(`button`,{style:{marginTop:6,fontSize:11},onClick:t=>{t.stopPropagation();let n=[];for(let[t,r]of l(m.doc,[0,u(m.doc)]))t.comment===e.id&&n.push([r,r+u(t)]);for(let e of n)m.exec(a,`comment`,void 0,e)},children:`delete`})]},e.id))})]})]})}},X=k({children:P(k({children:P(F([k({text:j()}),k({type:A(`image`),src:j()}),k({type:A(`video`),src:j()})]))}))}),Z={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:`Hello `},{type:`image`,src:`https://picsum.photos/seed/1/320/240`},{text:` world `},{type:`image`,src:`https://picsum.photos/seed/2/320/240`}]},{children:[{text:`Hello `},{type:`video`,src:`https://mdn.github.io/shared-assets/videos/flower.mp4`},{text:` world `}]}]}),r=(0,I.useMemo)(()=>{let e=p({doc:t,schema:X}).exec(S).exec(v,{"image/png":e=>({type:`image`,src:URL.createObjectURL(e)})}).exec(x,{serializers:{text:e=>({text:e}),img:e=>({type:`image`,src:e.src}),video:e=>({type:`video`,src:e.childNodes[0].src})}}).exec(D);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,I.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{style:{display:`flex`,padding:4,gap:4},children:[(0,L.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(C,{type:`image`,src:e})},children:`insert image`}),(0,L.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(C,{type:`video`,src:e})},children:`insert video`})]}),(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:16},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,L.jsx)(`br`,{}):e.type===`image`?(0,L.jsx)(`img`,{src:e.src,style:{maxWidth:240,borderRadius:4,verticalAlign:`middle`}},t):e.type===`video`?(0,L.jsx)(`video`,{width:320,controls:!0,contentEditable:`false`,suppressContentEditableWarning:!0,style:{borderRadius:4,verticalAlign:`middle`},children:(0,L.jsx)(`source`,{src:e.src})},t):null)},t))})]})}},_e=k({children:P(k({locked:N(M()),children:P(k({text:j()}))}))}),Q={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:`You can edit this paragraph.`}]},{locked:!0,children:[{text:`This paragraph is locked. You can select and copy it, but can't edit it.`}]},{children:[{text:`You can edit this paragraph too.`}]}]}),[r,i]=(0,I.useState)(null),a=(0,I.useMemo)(()=>{let e=p({doc:t,schema:_e}).exec(S).exec(D).exec(b,{isLocked:e=>!!e.locked});return e.on(`change`,()=>{n(e.doc)}),e.on(`selectionchange`,()=>{i(h(e.doc,e.selection[0])[2][0]??null)}),e},[]);(0,I.useEffect)(()=>{if(e.current)return a.input(e.current)},[]);let o=r!=null&&!!t.children[r]?.locked;return(0,L.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`26px 1fr`,columnGap:6,rowGap:8,maxWidth:640,fontFamily:`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,fontSize:14,color:`#1e1e1e`,background:`#fff`,border:`1px solid #ddd`,borderRadius:4,padding:16,boxShadow:`0 1px 2px rgba(0, 0, 0, 0.05)`},children:[(0,L.jsx)(`style`,{children:`
          .lock-toggle:not([aria-pressed="true"]):hover { border-color: #757575; }
        `}),r!=null&&(0,L.jsx)(`button`,{className:`lock-toggle`,style:{gridColumn:1,gridRow:r+1,display:`flex`,alignItems:`center`,justifyContent:`center`,width:26,height:26,marginTop:2,padding:0,fontSize:13,background:o?`#757575`:`#fff`,border:`1px solid ${o?`#757575`:`#ccc`}`,borderRadius:2,cursor:`pointer`},title:o?`Unlock this block`:`Lock this block`,"aria-pressed":o,onMouseDown:e=>{e.preventDefault()},onClick:()=>{a.exec(c,`locked`,!0,void 0)},children:`🔒`}),(0,L.jsx)(`div`,{ref:e,style:{gridColumn:2,gridRow:`1 / span ${t.children.length}`,display:`grid`,gridTemplateRows:`subgrid`,outline:`none`},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{style:{padding:`4px 8px`,borderRadius:2,lineHeight:1.6,...e.locked&&{background:`#f6f7f7`,boxShadow:`inset 0 0 0 1px #ddd`},...t===r&&{outline:`1.5px solid #007cba`,outlineOffset:1}},children:e.children.map((e,t)=>(0,L.jsx)(`span`,{children:e.text||(0,L.jsx)(`br`,{})},t))},t))})]})}},ve=k({children:P(k({children:P(F([k({text:j()}),k({type:A(`ruby`),ruby:j(),value:j()})]))}))}),$={render:()=>{let e=(0,I.useRef)(null),[t,n]=(0,I.useState)({children:[{children:[{text:`また`},{type:`ruby`,ruby:`あした`,value:`明日`},{text:`お`},{type:`ruby`,ruby:`あ`,value:`会`},{text:`いしましょう。`}]}]}),r=(0,I.useMemo)(()=>{let e=p({doc:t,schema:ve}).exec(D,{voidToString:e=>e.value});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,I.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,L.jsx)(`div`,{children:(0,L.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,t)=>(0,L.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,L.jsx)(`br`,{}):(0,L.jsxs)(`ruby`,{contentEditable:!1,children:[e.value,(0,L.jsx)(`rp`,{children:`(`}),(0,L.jsx)(`rt`,{children:e.ruby}),(0,L.jsx)(`rp`,{children:`)`})]},t))},t))})})}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof basicSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: ""
        }]
      }]
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: basicSchema
      }).exec(internalTransferPlugin).exec(plainTransferPlugin);
      e.on("change", () => {
        setDoc(e.doc);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div ref={ref} style={{
      backgroundColor: "white",
      border: "solid 1px darkgray",
      padding: 8
    }}>
        {doc.children.map((b, i) => <div key={i}>
            {b.children.map((n, j) => <span key={j}>{n.text || <br />}</span>)}
          </div>)}
      </div>;
  }
}`,...R.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const [doc, setDoc] = useState<RichDoc>({
      children: [{
        children: [{
          text: "Hello",
          bold: true
        }, {
          text: " "
        }, {
          text: "World",
          italic: true
        }, {
          text: "."
        }]
      }, {
        children: [{
          text: "こんにちは。"
        }]
      }, {
        children: [{
          text: "👍❤️🧑‍🧑‍🧒"
        }]
      }]
    });
    const [menuRect, setMenuRect] = useState<{
      top: number;
      left: number;
    } | null>(null);
    const [currentFontSize, setCurrentFontSize] = useState<number | undefined>();
    const [currentBold, setCurrentBold] = useState(false);
    const [currentItalic, setCurrentItalic] = useState(false);
    const [currentUnderline, setCurrentUnderline] = useState(false);
    const [currentStrike, setCurrentStrike] = useState(false);
    const setFontSize = (value: number) => {
      editor.exec(Format, "fontSize", value);
    };
    const toggleBold = () => {
      editor.exec(ToggleFormat, "bold");
    };
    const toggleItalic = () => {
      editor.exec(ToggleFormat, "italic");
    };
    const toggleUnderline = () => {
      editor.exec(ToggleFormat, "underline");
    };
    const toggleStrike = () => {
      editor.exec(ToggleFormat, "strike");
    };
    const editor = useMemo(() => {
      const updateMenu = () => {
        let fontSizes = new Set<number>();
        let hasBold = false;
        let hasItalic = false;
        let hasUnderline = false;
        let hasStrike = false;
        for (const leaf of editor.exec(LeavesInRange)) {
          if (leaf.fontSize) {
            fontSizes.add(leaf.fontSize);
          } else {
            fontSizes.add(defaultFontSize);
          }
          if (leaf.bold) {
            hasBold = true;
          }
          if (leaf.italic) {
            hasItalic = true;
          }
          if (leaf.underline) {
            hasUnderline = true;
          }
          if (leaf.strike) {
            hasStrike = true;
          }
        }
        setCurrentFontSize(fontSizes.size === 1 ? fontSizes.values().next().value : undefined);
        setCurrentBold(hasBold);
        setCurrentItalic(hasItalic);
        setCurrentUnderline(hasUnderline);
        setCurrentStrike(hasStrike);
      };
      const e = createEditor({
        doc: doc,
        schema: richSchema
      }).exec(keymapPlugin, {
        "Mod+B": toggleBold,
        "Mod+I": toggleItalic,
        "Mod+U": toggleUnderline,
        "Mod+S": toggleStrike
      }).exec(selectionRectPlugin, getRect => {
        if (editor.selection[0] !== editor.selection[1]) {
          setMenuRect(prev => {
            const rect = getRect();
            if (prev && prev.top === rect.top && prev.left === rect.left) {
              return prev;
            } else {
              return {
                top: rect.top,
                left: rect.left
              };
            }
          });
        } else {
          setMenuRect(null);
        }
      }).exec(internalTransferPlugin).exec(plainTransferPlugin);
      e.on("change", () => {
        setDoc(e.doc);
        updateMenu();
      });
      e.on("selectionchange", () => {
        updateMenu();
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
        paddingBottom: 8
      }}>
          <div>
            <select value={currentFontSize ?? "--"} onChange={e => {
            e.preventDefault();
            const value = Number(e.target.value);
            if (Number.isNaN(value)) return;
            setFontSize(value);
          }}>
              <option value="--">--</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
            <button style={{
            fontWeight: currentBold ? "bold" : undefined
          }} onClick={toggleBold}>
              bold
            </button>
            <button style={{
            fontWeight: currentItalic ? "bold" : undefined
          }} onClick={toggleItalic}>
              italic
            </button>
            <button style={{
            fontWeight: currentUnderline ? "bold" : undefined
          }} onClick={toggleUnderline}>
              underline
            </button>
            <button style={{
            fontWeight: currentStrike ? "bold" : undefined
          }} onClick={toggleStrike}>
              strike
            </button>
          </div>
          <div>
            <button onClick={() => {
            editor.exec(ToggleBlockAttr, "align", "right", undefined);
          }}>
              align
            </button>
            <button onClick={() => {
            editor.exec(Indent);
          }}>
              indent
            </button>
            <button onClick={() => {
            editor.exec(Outdent);
          }}>
              outdent
            </button>
          </div>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }}>
          {doc.children.map((b, i) => <div key={i} style={{
          textAlign: b.align,
          textIndent: b.indent ? \`\${b.indent}em\` : undefined
        }}>
              {b.children.map((n, j) => <Text key={j} node={n} />)}
            </div>)}
        </div>
        {menuRect ? <div style={{
        position: "fixed",
        top: menuRect.top - 30,
        left: menuRect.left,
        whiteSpace: "nowrap"
      }}>
            <button style={{
          fontWeight: currentBold ? "bold" : undefined
        }} onClick={toggleBold}>
              bold
            </button>
            <button style={{
          fontWeight: currentItalic ? "bold" : undefined
        }} onClick={toggleItalic}>
              italic
            </button>
            <button style={{
          fontWeight: currentUnderline ? "bold" : undefined
        }} onClick={toggleUnderline}>
              underline
            </button>
            <button style={{
          fontWeight: currentStrike ? "bold" : undefined
        }} onClick={toggleStrike}>
              strike
            </button>
          </div> : null}
      </div>;
  }
}`,...B.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof tagSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        text: "Hello "
      }, {
        type: "tag",
        label: "Apple",
        value: "1"
      }, {
        text: " world "
      }, {
        type: "tag",
        label: "Orange",
        value: "2"
      }]
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: tagSchema
      }).exec(internalTransferPlugin).exec(plainTransferPlugin, {
        voidToString: node => node.label
      }).exec(singlelinePlugin);
      e.on("change", () => {
        setDoc(editor.doc);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    const labelRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    return <div>
        <div>
          <label>
            label:
            <input ref={labelRef} defaultValue="Grape" />
          </label>
          <label>
            value:
            <input ref={valueRef} defaultValue="123" />
          </label>
          <button onClick={() => {
          const label = labelRef.current?.value;
          const value = valueRef.current?.value;
          if (!label || !value) return;
          editor.exec(InsertNode, {
            type: "tag",
            value,
            label
          });
        }}>
            insert
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 8
      }}>
          {doc.children.map((t, j) => "text" in t ? t.text || <br /> : <TagChip key={j} label={t.label} onLabelClick={e => {
          e.preventDefault();
          const start = getNodeOffset(doc, t);
          if (start == null) return;
          const value = window.prompt("label:", t.label);
          if (!value) return;
          editor.exec(SetVoidAttr, "label", value, start + getNodeSize(t));
        }} onRemove={e => {
          e.preventDefault();
          const start = getNodeOffset(doc, t);
          if (start == null) return;
          editor.exec(Delete, [start, start + getNodeSize(t)]);
        }} />)}
        </div>
      </div>;
  }
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof tagSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        type: "tag",
        label: "Luke Skywalker",
        value: "Luke Skywalker"
      }]
    });
    const [caret, setCaret] = useState(0);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(-1);
    const selected = useMemo((): ReadonlySet<string> => new Set(doc.children.flatMap(n => "text" in n ? [] : [n.value])), [doc]);
    const query = useMemo(() => getQuery(doc, caret), [doc, caret]);
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return q ? CHARACTERS.filter(c => c.toLowerCase().includes(q)) : CHARACTERS;
    }, [query]);
    if (index > filtered.length - 1) {
      setIndex(-1);
    }
    const toggle = (item: string) => {
      const tag = doc.children.find(n => !("text" in n) && n.value === item);
      const start = tag && getNodeOffset(doc, tag);
      if (tag && start != null) {
        // remove the tag if it's already inserted
        editor.exec(Delete, [start, start + getNodeSize(tag)]);
      } else {
        // replace the query with the tag
        const start = caret - query.length;
        if (query) {
          editor.exec(Delete, [start, caret]);
        }
        editor.exec(InsertNode, {
          type: "tag",
          label: item,
          value: item
        }, start);
      }
      setOpen(false);
      setIndex(-1);
    };
    const onPrev = useEffectEvent(() => {
      if (!open || !filtered.length) return false;
      setIndex(prev => prev <= 0 ? filtered.length - 1 : prev - 1);
    });
    const onNext = useEffectEvent(() => {
      if (!open || !filtered.length) return false;
      setIndex(prev => prev >= filtered.length - 1 ? 0 : prev + 1);
    });
    const onComplete = useEffectEvent(() => {
      if (!open || index === -1) return false;
      toggle(filtered[index]!);
    });
    const onClose = useEffectEvent(() => {
      if (!open) return false;
      setOpen(false);
      setIndex(-1);
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: tagSchema
      }).exec(internalTransferPlugin).exec(plainTransferPlugin, {
        voidToString: node => node.label
      }).exec(singlelinePlugin).exec(keymapPlugin, {
        ArrowUp: onPrev,
        ArrowDown: onNext,
        Enter: onComplete,
        Escape: onClose
      });
      e.on("change", () => {
        const at = Math.min(...e.selection);
        setDoc(e.doc);
        setCaret(at);
        setOpen(!!getQuery(e.doc, at).trim());
        setIndex(-1);
      });
      e.on("selectionchange", () => {
        setCaret(Math.min(...e.selection));
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div style={{
      position: "relative",
      width: 320,
      fontSize: 13
    }} onBlur={() => {
      setOpen(false);
      setIndex(-1);
    }}>
        <div style={{
        display: "flex",
        alignItems: "flex-start",
        background: "white",
        border: "solid 1px darkgray",
        borderRadius: 4
      }}>
          <div ref={ref} style={{
          flex: 1,
          minWidth: 0,
          padding: 6,
          lineHeight: 2
        }}>
            {doc.children.map((t, j) => "text" in t ? t.text || <br /> : <TagChip key={j} label={t.label} onRemove={e => {
            e.preventDefault();
            toggle(t.value);
          }} />)}
          </div>
          <button style={{
          alignSelf: "stretch",
          padding: "0 6px",
          border: "none",
          borderLeft: "solid 1px #ddd",
          background: "transparent",
          cursor: "pointer"
        }} onMouseDown={e => {
          // keep focus in the editor not to close the menu
          e.preventDefault();
        }} onClick={() => {
          ref.current?.focus();
          setOpen(prev => !prev);
          setIndex(-1);
        }}>
            ▾
          </button>
        </div>
        {open && <ComboboxMenu items={filtered} index={index} selected={selected} onSelect={toggle} />}
      </div>;
  }
}`,...G.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof mentionSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: "Hi "
        }, {
          type: "mention",
          name: "Luke Skywalker"
        }, {
          text: " and "
        }, {
          type: "mention",
          name: "Leia Organa"
        }, {
          text: ", could you check this out? Type @ to mention someone."
        }]
      }, {
        children: [{
          text: ""
        }]
      }]
    });
    const [pos, setPos] = useState<{
      top: number;
      left: number;
      caret: number;
    } | null>(null);
    const [index, setIndex] = useState<number>(0);
    const match = pos && sliceText(doc, 0, pos.caret).match(MENTION_REG);
    const name = match?.[1] ?? "";
    const filtered = useMemo(() => CHARACTERS.filter(c => c.toLowerCase().startsWith(name.toLowerCase())).slice(0, MAX_LIST_LENGTH), [name]);
    const complete = (i: number) => {
      if (!ref.current || !pos) return;
      const selected = filtered[i];
      const start = pos.caret - name.length - 1;
      const end = pos.caret;
      editor.exec(Delete, [start, end]).exec(InsertNode, {
        type: "mention",
        name: selected
      }, start).exec(InsertText, " ");
      setPos(null);
      setIndex(0);
    };
    const onUp = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setIndex(prev => prev <= 0 ? filtered.length - 1 : prev - 1);
    });
    const onDown = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setIndex(prev => prev >= filtered.length - 1 ? 0 : prev + 1);
    });
    const onComplete = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      complete(index);
    });
    const onClose = useEffectEvent(() => {
      if (!pos || !filtered.length) return false;
      setPos(null);
      setIndex(0);
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc,
        schema: mentionSchema
      }).exec(plainTransferPlugin, {
        voidToString: n => \`@\${n.name}\`
      }).exec(keymapPlugin, {
        ArrowUp: onUp,
        ArrowDown: onDown,
        Enter: onComplete,
        Escape: onClose
      }).exec(selectionRectPlugin, getRect => {
        const selectionStart = Math.min(...editor.selection);
        if (MENTION_REG.test(sliceText(editor.doc, 0, selectionStart))) {
          const r = getRect();
          setPos({
            top: r.top + r.height,
            left: r.left,
            caret: selectionStart
          });
        } else {
          setPos(null);
        }
        setIndex(0);
      });
      e.on("change", () => {
        setDoc(e.doc);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div ref={ref} style={{
        backgroundColor: "white",
        border: "solid 1px darkgray",
        padding: 8
      }}>
          {doc.children.map((r, i) => <div key={i}>
              {r.children.map((n, j) => "text" in n ? n.text || <br /> : <span key={j} contentEditable={false} style={{
            background: "#EAF5F9",
            color: "#4276AA",
            borderRadius: "3px"
          }}>
                    @{n.name}
                  </span>)}
            </div>)}
        </div>
        {pos && createPortal(<Menu top={pos.top} left={pos.left} chars={filtered} index={index} complete={complete} />, document.body)}
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const commentIdRef = useRef(0);
    const [comments, setComments] = useState([{
      id: "0",
      text: "This is comment."
    }]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [hasSelection, setHasSelection] = useState(false);
    type Doc = v.InferOutput<typeof commentSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: "Hello "
        }, {
          text: " world",
          comment: "0"
        }, {
          text: "."
        }]
      }, {
        children: [{
          text: "Select text and add comments."
        }]
      }]
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: commentSchema
      }).exec(internalTransferPlugin).exec(plainTransferPlugin);
      e.on("change", () => {
        setDoc(e.doc);
        const ids = new Set<string>();
        for (const [leaf] of iterLeaves(e.doc, [0, getNodeSize(e.doc)])) {
          if (leaf.comment) {
            ids.add(leaf.comment);
          }
        }
        setComments(prev => prev.filter(c => ids.has(c.id)));
      });
      e.on("selectionchange", () => {
        setHasSelection(e.selection[0] !== e.selection[1]);
        let active: string | null = null;
        for (const leaf of e.exec(LeavesInRange)) {
          if (leaf.comment) {
            active = leaf.comment;
            break;
          }
        }
        setActiveId(active);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    return <div>
        <div>
          <textarea ref={inputRef} placeholder="Select text and write comment" />
          <button disabled={!hasSelection} onClick={() => {
          const input = inputRef.current;
          if (!input) return;
          const value = input.value;
          if (!value) return;
          const id = String(++commentIdRef.current);
          editor.exec(Format, "comment", id);
          setComments(prev => [...prev, {
            id,
            text: value
          }]);
          setActiveId(id);
          input.value = "";
        }}>
            Add comment
          </button>
        </div>
        <div style={{
        display: "flex",
        alignItems: "flex-start"
      }}>
          <div ref={ref} style={{
          backgroundColor: "white",
          padding: 8,
          flex: 1,
          minHeight: 120
        }}>
            {doc.children.map((b, i) => <div key={i}>
                {b.children.map((t, j) => <span key={j} style={{
              backgroundColor: t.comment ? t.comment === activeId ? "gold" : "khaki" : undefined
            }}>
                    {t.text || <br />}
                  </span>)}
              </div>)}
          </div>
          <div style={{
          width: 200,
          background: "#f5f5f5",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
            {comments.map(c => <div key={c.id} style={{
            padding: 8,
            background: "white",
            border: c.id === activeId ? "solid 1px orange" : "solid 1px #e0e0e0",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13
          }} onClick={() => {
            setActiveId(c.id);
          }}>
                <div>{c.text}</div>
                <button style={{
              marginTop: 6,
              fontSize: 11
            }} onClick={e => {
              e.stopPropagation();
              const ranges: [number, number][] = [];
              for (const [leaf, offset] of iterLeaves(editor.doc, [0, getNodeSize(editor.doc)])) {
                if (leaf.comment === c.id) {
                  ranges.push([offset, offset + getNodeSize(leaf)]);
                }
              }
              for (const range of ranges) {
                editor.exec(Format, "comment", undefined, range);
              }
            }}>
                  delete
                </button>
              </div>)}
          </div>
        </div>
      </div>;
  }
}`,...Y.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof mediaSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: "Hello "
        }, {
          type: "image",
          src: "https://picsum.photos/seed/1/320/240"
        }, {
          text: " world "
        }, {
          type: "image",
          src: "https://picsum.photos/seed/2/320/240"
        }]
      }, {
        children: [{
          text: "Hello "
        }, {
          type: "video",
          src: "https://mdn.github.io/shared-assets/videos/flower.mp4"
        }, {
          text: " world "
        }]
      }]
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: mediaSchema
      }).exec(internalTransferPlugin).exec(fileTransferPlugin, {
        "image/png": file => ({
          type: "image",
          src: URL.createObjectURL(file)
        })
      }).exec(htmlTransferPlugin, {
        serializers: {
          text: text => ({
            text
          }),
          img: e => {
            return {
              type: "image",
              src: e.src
            };
          },
          video: e => {
            return {
              type: "video",
              src: (e.childNodes[0] as HTMLSourceElement).src
            };
          }
        }
      }).exec(plainTransferPlugin);
      e.on("change", () => {
        setDoc(e.doc);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div style={{
        display: "flex",
        padding: 4,
        gap: 4
      }}>
          <button onClick={() => {
          const value = window.prompt("url:");
          if (!value) return;
          editor.exec(InsertNode, {
            type: "image",
            src: value
          });
        }}>
            insert image
          </button>
          <button onClick={() => {
          const value = window.prompt("url:");
          if (!value) return;
          editor.exec(InsertNode, {
            type: "video",
            src: value
          });
        }}>
            insert video
          </button>
        </div>
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 16
      }}>
          {doc.children.map((b, i) => <div key={i}>
              {b.children.map((t, j) => "text" in t ? t.text || <br /> : t.type === "image" ? <img key={j} src={t.src} style={{
            maxWidth: 240,
            borderRadius: 4,
            verticalAlign: "middle"
          }} /> : t.type === "video" ?
          // safari needs contentEditable="false"
          <video key={j} width={320} controls contentEditable="false" suppressContentEditableWarning style={{
            borderRadius: 4,
            verticalAlign: "middle"
          }}>
                    <source src={t.src} />
                  </video> : null)}
            </div>)}
        </div>
      </div>;
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof lockSchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: "You can edit this paragraph."
        }]
      }, {
        locked: true,
        children: [{
          text: "This paragraph is locked. You can select and copy it, but can't edit it."
        }]
      }, {
        children: [{
          text: "You can edit this paragraph too."
        }]
      }]
    });
    const [blockIndex, setBlockIndex] = useState<number | null>(null);
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: lockSchema
      }).exec(internalTransferPlugin).exec(plainTransferPlugin).exec(blockLockPlugin, {
        isLocked: b => !!b.locked
      });
      e.on("change", () => {
        setDoc(e.doc);
      });
      e.on("selectionchange", () => {
        setBlockIndex(getLeafBlockAt(e.doc, e.selection[0])[2][0] ?? null);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    const locked = blockIndex != null && !!doc.children[blockIndex]?.locked;
    return <div style={{
      display: "grid",
      gridTemplateColumns: "26px 1fr",
      columnGap: 6,
      rowGap: 8,
      maxWidth: 640,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: 14,
      color: "#1e1e1e",
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 4,
      padding: 16,
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
    }}>
        <style>{\`
          .lock-toggle:not([aria-pressed="true"]):hover { border-color: #757575; }
        \`}</style>
        {blockIndex != null && <button className="lock-toggle" style={{
        gridColumn: 1,
        gridRow: blockIndex + 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        marginTop: 2,
        padding: 0,
        fontSize: 13,
        background: locked ? "#757575" : "#fff",
        border: \`1px solid \${locked ? "#757575" : "#ccc"}\`,
        borderRadius: 2,
        cursor: "pointer"
      }} title={locked ? "Unlock this block" : "Lock this block"} aria-pressed={locked} onMouseDown={e => {
        e.preventDefault();
      }} onClick={() => {
        editor.exec(ToggleBlockAttr, "locked", true, undefined);
      }}>
            🔒
          </button>}
        <div ref={ref} style={{
        gridColumn: 2,
        gridRow: \`1 / span \${doc.children.length}\`,
        display: "grid",
        gridTemplateRows: "subgrid",
        outline: "none"
      }}>
          {doc.children.map((b, i) => <div key={i} style={{
          padding: "4px 8px",
          borderRadius: 2,
          lineHeight: 1.6,
          ...(b.locked && {
            background: "#f6f7f7",
            boxShadow: "inset 0 0 0 1px #ddd"
          }),
          ...(i === blockIndex && {
            outline: "1.5px solid #007cba",
            outlineOffset: 1
          })
        }}>
              {b.children.map((n, j) => <span key={j}>{n.text || <br />}</span>)}
            </div>)}
        </div>
      </div>;
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    type Doc = v.InferOutput<typeof rubySchema>;
    const [doc, setDoc] = useState<Doc>({
      children: [{
        children: [{
          text: "また"
        }, {
          type: "ruby",
          ruby: "あした",
          value: "明日"
        }, {
          text: "お"
        }, {
          type: "ruby",
          ruby: "あ",
          value: "会"
        }, {
          text: "いしましょう。"
        }]
      }]
    });
    const editor = useMemo(() => {
      const e = createEditor({
        doc: doc,
        schema: rubySchema
      }).exec(plainTransferPlugin, {
        voidToString: n => n.value
      });
      e.on("change", () => {
        setDoc(e.doc);
      });
      return e;
    }, []);
    useEffect(() => {
      if (!ref.current) return;
      return editor.input(ref.current);
    }, []);
    return <div>
        <div ref={ref} style={{
        backgroundColor: "white",
        padding: 8
      }}>
          {doc.children.map((b, i) => <div key={i}>
              {b.children.map((t, j) => "text" in t ? t.text || <br /> : <ruby key={j} contentEditable={false}>
                    {t.value}
                    <rp>(</rp>
                    <rt>{t.ruby}</rt>
                    <rp>)</rp>
                  </ruby>)}
            </div>)}
        </div>
      </div>;
  }
}`,...$.parameters?.docs?.source}}},ye=[`Empty`,`RichText`,`Tag`,`Combobox`,`Mention`,`Comment`,`Media`,`BlockLock`,`Ruby`]}))();export{Q as BlockLock,G as Combobox,Y as Comment,R as Empty,Z as Media,J as Mention,B as RichText,$ as Ruby,U as Tag,ye as __namedExportsOrder,oe as default};