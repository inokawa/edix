import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-Bnz1WkYc.js";import{t as r}from"./react-dom-CJ-u-h1H.js";import{t as i}from"./jsx-runtime-O9QVJvLM.js";import{A as a,F as o,G as s,I as c,J as l,L as u,M as d,S as f,U as p,W as m,a as h,b as g,d as _,f as v,g as y,h as b,j as x,k as S,q as C,s as w,t as T,y as E,z as ee}from"./src-BtBXeuRK.js";import{a as D,c as O,i as k,l as A,n as j,o as M,r as te,s as ne,t as N,u as P}from"./dist-BMstJve2.js";function re(e,t=e.selection[0]){let[n,,r]=m(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:(n.indent??0)+1})}function ie(e,t=e.selection[0]){let[n,,r]=m(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:Math.max((n.indent??0)-1,0)})}var F,ae,I,oe,se,L,ce,R,z,le,B,V,ue,H,U,de,W,G,K,fe,q,pe,me,J,he,Y,X,Z,ge,Q,_e,$,ve;t((()=>{F=e(n()),T(),te(),ae=e(r()),I=i(),oe={component:f},se=O({children:N(O({children:N(O({text:A()}))}))}),L={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:``}]}]}),r=(0,F.useMemo)(()=>{let e=f({doc:t,schema:se}).exec(b).exec(E);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,F.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{children:e.children.map((e,t)=>(0,I.jsx)(`span`,{children:e.text||(0,I.jsx)(`br`,{})},t))},t))})}},ce=O({text:A(),fontSize:M(D()),bold:M(j()),italic:M(j()),underline:M(j()),strike:M(j())}),R=O({children:N(O({align:M(ne([`left`,`right`])),indent:M(D()),children:N(ce)}))}),z=10,le=({node:e})=>{let t=e.bold?`strong`:`span`,n={fontSize:`${e.fontSize??z}pt`};return e.italic&&(n.fontStyle=`italic`),e.underline&&(n.textDecoration=`underline`),e.strike&&(n.textDecoration=n.textDecoration?`${n.textDecoration} line-through`:`line-through`),(0,I.jsx)(t,{style:n,children:e.text||(0,I.jsx)(`br`,{})})},B={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:`Hello`,bold:!0},{text:` `},{text:`World`,italic:!0},{text:`.`}]},{children:[{text:`こんにちは。`}]},{children:[{text:`👍❤️🧑‍🧑‍🧒`}]}]}),[r,i]=(0,F.useState)(null),[o,s]=(0,F.useState)(),[l,d]=(0,F.useState)(!1),[p,m]=(0,F.useState)(!1),[h,g]=(0,F.useState)(!1),[v,y]=(0,F.useState)(!1),x=e=>{O.exec(a,`fontSize`,e)},S=()=>{O.exec(u,`bold`)},C=()=>{O.exec(u,`italic`)},T=()=>{O.exec(u,`underline`)},D=()=>{O.exec(u,`strike`)},O=(0,F.useMemo)(()=>{let e=()=>{let e=new Set,t=!1,n=!1,r=!1,i=!1;for(let a of O.exec(ee))a.fontSize?e.add(a.fontSize):e.add(z),a.bold&&(t=!0),a.italic&&(n=!0),a.underline&&(r=!0),a.strike&&(i=!0);s(e.size===1?e.values().next().value:void 0),d(t),m(n),g(r),y(i)},r=f({doc:t,schema:R}).exec(_,{"Mod+B":S,"Mod+I":C,"Mod+U":T,"Mod+S":D}).exec(w,e=>{O.selection[0]===O.selection[1]?i(null):i(t=>{let n=e();return t&&t.top===n.top&&t.left===n.left?t:{top:n.top,left:n.left}})}).exec(b).exec(E);return r.on(`change`,()=>{n(r.doc),e()}),r.on(`selectionchange`,()=>{e()}),r},[]);return(0,F.useEffect)(()=>{if(e.current)return O.input(e.current)},[]),(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4,padding:4,paddingBottom:8},children:[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`select`,{value:o??`--`,onChange:e=>{e.preventDefault();let t=Number(e.target.value);Number.isNaN(t)||x(t)},children:[(0,I.jsx)(`option`,{value:`--`,children:`--`}),(0,I.jsx)(`option`,{value:`8`,children:`8`}),(0,I.jsx)(`option`,{value:`10`,children:`10`}),(0,I.jsx)(`option`,{value:`12`,children:`12`}),(0,I.jsx)(`option`,{value:`14`,children:`14`}),(0,I.jsx)(`option`,{value:`16`,children:`16`}),(0,I.jsx)(`option`,{value:`18`,children:`18`}),(0,I.jsx)(`option`,{value:`20`,children:`20`})]}),(0,I.jsx)(`button`,{style:{fontWeight:l?`bold`:void 0},onClick:S,children:`bold`}),(0,I.jsx)(`button`,{style:{fontWeight:p?`bold`:void 0},onClick:C,children:`italic`}),(0,I.jsx)(`button`,{style:{fontWeight:h?`bold`:void 0},onClick:T,children:`underline`}),(0,I.jsx)(`button`,{style:{fontWeight:v?`bold`:void 0},onClick:D,children:`strike`})]}),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`button`,{onClick:()=>{O.exec(c,`align`,`right`,void 0)},children:`align`}),(0,I.jsx)(`button`,{onClick:()=>{O.exec(re)},children:`indent`}),(0,I.jsx)(`button`,{onClick:()=>{O.exec(ie)},children:`outdent`})]})]}),(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{style:{textAlign:e.align,textIndent:e.indent?`${e.indent}em`:void 0},children:e.children.map((e,t)=>(0,I.jsx)(le,{node:e},t))},t))}),r?(0,I.jsxs)(`div`,{style:{position:`fixed`,top:r.top-30,left:r.left,whiteSpace:`nowrap`},children:[(0,I.jsx)(`button`,{style:{fontWeight:l?`bold`:void 0},onClick:S,children:`bold`}),(0,I.jsx)(`button`,{style:{fontWeight:p?`bold`:void 0},onClick:C,children:`italic`}),(0,I.jsx)(`button`,{style:{fontWeight:h?`bold`:void 0},onClick:T,children:`underline`}),(0,I.jsx)(`button`,{style:{fontWeight:v?`bold`:void 0},onClick:D,children:`strike`})]}):null]})}},V=O({children:N(P([O({text:A()}),O({type:k(`tag`),label:A(),value:A()})]))}),ue=({onClick:e})=>{let[t,n]=(0,F.useState)(!1);return(0,I.jsx)(`span`,{onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onClick:e,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:14,height:14,borderRadius:`50%`,background:t?`#999`:`#c4c4c4`,color:`white`,fontSize:9,lineHeight:1,cursor:`pointer`},children:`✕`})},H=({label:e,onLabelClick:t,onRemove:n})=>(0,I.jsxs)(`span`,{contentEditable:!1,style:{display:`inline-flex`,alignItems:`center`,gap:4,background:`#f0f0f0`,color:`#444`,border:`solid 1px #ccc`,fontSize:12,lineHeight:1.5,padding:`1px 4px 1px 8px`,borderRadius:999,margin:`0 2px`},children:[(0,I.jsx)(`span`,{style:{cursor:t?`pointer`:void 0},onClick:t,children:e}),(0,I.jsx)(ue,{onClick:n})]}),U={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{text:`Hello `},{type:`tag`,label:`Apple`,value:`1`},{text:` world `},{type:`tag`,label:`Orange`,value:`2`}]}),r=(0,F.useMemo)(()=>{let e=f({doc:t,schema:V}).exec(b).exec(E,{voidToString:e=>e.label}).exec(h);return e.on(`change`,()=>{n(r.doc)}),e},[]);(0,F.useEffect)(()=>{if(e.current)return r.input(e.current)},[]);let i=(0,F.useRef)(null),a=(0,F.useRef)(null);return(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`label`,{children:[`label:`,(0,I.jsx)(`input`,{ref:i,defaultValue:`Grape`})]}),(0,I.jsxs)(`label`,{children:[`value:`,(0,I.jsx)(`input`,{ref:a,defaultValue:`123`})]}),(0,I.jsx)(`button`,{onClick:()=>{let e=i.current?.value,t=a.current?.value;!e||!t||r.exec(x,{type:`tag`,value:t,label:e})},children:`insert`})]}),(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,n)=>`text`in e?e.text||(0,I.jsx)(`br`,{}):(0,I.jsx)(H,{label:e.label,onLabelClick:n=>{n.preventDefault();let i=t.children.indexOf(e);if(i===-1)return;let a=window.prompt(`label:`,e.label);if(!a)return;let c=t.children.slice(0,i+1).reduce((e,t)=>e+s(t),0);r.exec(o,`label`,a,c)},onRemove:n=>{n.preventDefault();let i=t.children.indexOf(e);if(i===-1)return;let a=t.children.slice(0,i).reduce((e,t)=>e+s(t),0);r.exec(S,[a,a+s(e)])}},n))})]})}},de=({items:e,index:t,selected:n,onSelect:r})=>{let i=(0,F.useRef)(null);return(0,F.useEffect)(()=>{t!==-1&&i.current?.children[t]?.scrollIntoView({block:`nearest`})},[t]),(0,I.jsx)(`ul`,{ref:i,style:{position:`absolute`,zIndex:1,top:`100%`,left:0,right:0,maxHeight:200,overflowY:`auto`,margin:`2px 0 0`,padding:0,listStyleType:`none`,fontSize:12,background:`white`,border:`solid 1px #ccc`,borderRadius:4,cursor:`pointer`},children:e.length?e.map((e,i)=>(0,I.jsxs)(`li`,{style:{display:`flex`,alignItems:`center`,gap:6,padding:`3px 8px`,...t===i&&{color:`white`,background:`#2A6AD3`}},onMouseDown:t=>{t.preventDefault(),r(e)},children:[(0,I.jsx)(`span`,{style:{width:10},children:n.has(e)?`✓`:``}),e]},e)):(0,I.jsx)(`li`,{style:{padding:`3px 8px`,color:`#999`},children:`No results`})})},W=(e,t)=>{let n=p(e,t,!0);return n&&`text`in n[0]?n[0].text.slice(0,n[1]):``},G={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{type:`tag`,label:`Luke Skywalker`,value:`Luke Skywalker`}]}),[r,i]=(0,F.useState)(0),[a,o]=(0,F.useState)(!1),[c,l]=(0,F.useState)(-1),u=(0,F.useMemo)(()=>new Set(t.children.flatMap(e=>`text`in e?[]:[e.value])),[t]),d=(0,F.useMemo)(()=>W(t,r),[t,r]),p=(0,F.useMemo)(()=>{let e=d.trim().toLowerCase();return e?K.filter(t=>t.toLowerCase().includes(e)):K},[d]);c>p.length-1&&l(-1);let m=e=>{let n=t.children.findIndex(t=>!(`text`in t)&&t.value===e);if(n!==-1){let e=t.children.slice(0,n).reduce((e,t)=>e+s(t),0);w.exec(S,[e,e+s(t.children[n])])}else{let t=r-d.length;d&&w.exec(S,[t,r]),w.exec(x,{type:`tag`,label:e,value:e},t)}o(!1),l(-1)},g=(0,F.useEffectEvent)(()=>{if(!a||!p.length)return!1;l(e=>e<=0?p.length-1:e-1)}),v=(0,F.useEffectEvent)(()=>{if(!a||!p.length)return!1;l(e=>e>=p.length-1?0:e+1)}),y=(0,F.useEffectEvent)(()=>{if(!a||c===-1)return!1;m(p[c])}),C=(0,F.useEffectEvent)(()=>{if(!a)return!1;o(!1),l(-1)}),w=(0,F.useMemo)(()=>{let e=f({doc:t,schema:V}).exec(b).exec(E,{voidToString:e=>e.label}).exec(h).exec(_,{ArrowUp:g,ArrowDown:v,Enter:y,Escape:C});return e.on(`change`,()=>{let t=Math.min(...e.selection);n(e.doc),i(t),o(!!W(e.doc,t).trim()),l(-1)}),e.on(`selectionchange`,()=>{i(Math.min(...e.selection))}),e},[]);return(0,F.useEffect)(()=>{if(e.current)return w.input(e.current)},[]),(0,I.jsxs)(`div`,{style:{position:`relative`,width:320,fontSize:13},onBlur:()=>{o(!1),l(-1)},children:[(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,background:`white`,border:`solid 1px darkgray`,borderRadius:4},children:[(0,I.jsx)(`div`,{ref:e,style:{flex:1,minWidth:0,padding:6,lineHeight:2},children:t.children.map((e,t)=>`text`in e?e.text||(0,I.jsx)(`br`,{}):(0,I.jsx)(H,{label:e.label,onRemove:t=>{t.preventDefault(),m(e.value)}},t))}),(0,I.jsx)(`button`,{style:{alignSelf:`stretch`,padding:`0 6px`,border:`none`,borderLeft:`solid 1px #ddd`,background:`transparent`,cursor:`pointer`},onMouseDown:e=>{e.preventDefault()},onClick:()=>{e.current?.focus(),o(e=>!e),l(-1)},children:`▾`})]}),a&&(0,I.jsx)(de,{items:p,index:c,selected:u,onSelect:m})]})}},K=`Aayla Secura,Adi Gallia,Admiral Dodd Rancit,Admiral Firmus Piett,Admiral Gial Ackbar,Admiral Ozzel,Admiral Raddus,Admiral Terrinald Screed,Admiral Trench,Admiral U.O. Statura,Agen Kolar,Agent Kallus,Aiolin and Morit Astarte,Aks Moe,Almec,Alton Kastle,Amee,AP-5,Armitage Hux,Artoo,Arvel Crynyd,Asajj Ventress,Aurra Sing,AZI-3,Bala-Tik,Barada,Bargwill Tomder,Baron Papanoida,Barriss Offee,Baze Malbus,Bazine Netal,BB-8,BB-9E,Ben Quadinaros,Berch Teller,Beru Lars,Bib Fortuna,Biggs Darklighter,Black Krrsantan,Bo-Katan Kryze,Boba Fett,Bobbajo,Bodhi Rook,Borvo the Hutt,Boss Nass,Bossk,Breha Antilles-Organa,Bren Derlin,Brendol Hux,BT-1,C-3PO,C1-10P,Cad Bane,Caluan Ematt,Captain Gregor,Captain Phasma,Captain Quarsh Panaka,Captain Rex,Carlist Rieekan,Casca Panzoro,Cassian Andor,Cassio Tagge,Cham Syndulla,Che Amanwe Papanoida,Chewbacca,Chi Eekway Papanoida,Chief Chirpa,Chirrut Îmwe,Ciena Ree,Cin Drallig,Clegg Holdfast,Cliegg Lars,Coleman Kcaj,Coleman Trebor,Colonel Kaplan,Commander Bly,Commander Cody (CC-2224),Commander Fil (CC-3714),Commander Fox,Commander Gree,Commander Jet,Commander Wolffe,Conan Antonio Motti,Conder Kyl,Constable Zuvio,Cordé,Cpatain Typho,Crix Madine,Cut Lawquane,Dak Ralter,Dapp,Darth Bane,Darth Maul,Darth Tyranus,Daultay Dofine,Del Meeko,Delian Mors,Dengar,Depa Billaba,Derek Klivian,Dexter Jettster,Dineé Ellberger,DJ,Doctor Aphra,Doctor Evazan,Dogma,Dormé,Dr. Cylo,Droidbait,Droopy McCool,Dryden Vos,Dud Bolt,Ebe E. Endocott,Echuu Shen-Jon,Eeth Koth,Eighth Brother,Eirtaé,Eli Vanto,Ellé,Ello Asty,Embo,Eneb Ray,Enfys Nest,EV-9D9,Evaan Verlaine,Even Piell,Ezra Bridger,Faro Argyus,Feral,Fifth Brother,Finis Valorum,Finn,Fives,FN-1824,FN-2003,Fodesinbeed Annodue,Fulcrum,FX-7,GA-97,Galen Erso,Gallius Rax,Garazeb "Zeb" Orrelios,Gardulla the Hutt,Garrick Versio,Garven Dreis,Gavyn Sykes,Gideon Hask,Gizor Dellso,Gonk droid,Grand Inquisitor,Greeata Jendowanian,Greedo,Greer Sonnel,Grievous,Grummgar,Gungi,Hammerhead,Han Solo,Harter Kalonia,Has Obbit,Hera Syndulla,Hevy,Hondo Ohnaka,Huyang,Iden Versio,IG-88,Ima-Gun Di,Inquisitors,Inspector Thanoth,Jabba,Jacen Syndulla,Jan Dodonna,Jango Fett,Janus Greejatus,Jar Jar Binks,Jas Emari,Jaxxon,Jek Tono Porkins,Jeremoch Colton,Jira,Jobal Naberrie,Jocasta Nu,Joclad Danva,Joh Yowza,Jom Barell,Joph Seastriker,Jova Tarkin,Jubnuk,Jyn Erso,K-2SO,Kanan Jarrus,Karbin,Karina the Great,Kes Dameron,Ketsu Onyo,Ki-Adi-Mundi,King Katuunko,Kit Fisto,Kitster Banai,Klaatu,Klik-Klak,Korr Sella,Kylo Ren,L3-37,Lama Su,Lando Calrissian,Lanever Villecham,Leia Organa,Letta Turmond,Lieutenant Kaydel Ko Connix,Lieutenant Thire,Lobot,Logray,Lok Durd,Longo Two-Guns,Lor San Tekka,Lorth Needa,Lott Dod,Luke Skywalker,Lumat,Luminara Unduli,Lux Bonteri,Lyn Me,Lyra Erso,Mace Windu,Malakili,Mama the Hutt,Mars Guo,Mas Amedda,Mawhonic,Max Rebo,Maximilian Veers,Maz Kanata,ME-8D9,Meena Tills,Mercurial Swift,Mina Bonteri,Miraj Scintel,Mister Bones,Mod Terrik,Moden Canady,Mon Mothma,Moradmin Bast,Moralo Eval,Morley,Mother Talzin,Nahdar Vebb,Nahdonnis Praji,Nien Nunb,Niima the Hutt,Nines,Norra Wexley,Nute Gunray,Nuvo Vindi,Obi-Wan Kenobi,Odd Ball,Ody Mandrell,Omi,Onaconda Farr,Oola,OOM-9,Oppo Rancisis,Orn Free Taa,Oro Dassyne,Orrimarko,Osi Sobeck,Owen Lars,Pablo-Jill,Padmé Amidala,Pagetti Rook,Paige Tico,Paploo,Petty Officer Thanisson,Pharl McQuarrie,Plo Koon,Po Nudo,Poe Dameron,Poggle the Lesser,Pong Krell,Pooja Naberrie,PZ-4CO,Quarrie,Quay Tolsite,Queen Apailana,Queen Jamillia,Queen Neeyutnee,Qui-Gon Jinn,Quiggold,Quinlan Vos,R2-D2,R2-KT,R3-S6,R4-P17,R5-D4,RA-7,Rabé,Rako Hardeen,Ransolm Casterfo,Rappertunie,Ratts Tyerell,Raymus Antilles,Ree-Yees,Reeve Panzoro,Rey,Ric Olié,Riff Tamson,Riley,Rinnriyin Di,Rio Durant,Rogue Squadron,Romba,Roos Tarpals,Rose Tico,Rotta the Hutt,Rukh,Rune Haako,Rush Clovis,Ruwee Naberrie,Ryoo Naberrie,Sabé,Sabine Wren,Saché,Saelt-Marae,Saesee Tiin,Salacious B. Crumb,San Hill,Sana Starros,Sarco Plank,Sarkli,Satine Kryze,Savage Opress,Sebulba,Senator Organa,Sergeant Kreel,Seventh Sister,Shaak Ti,Shara Bey,Shmi Skywalker,Shu Mai,Sidon Ithano,Sifo-Dyas,Sim Aloo,Siniir Rath Velus,Sio Bibble,Sixth Brother,Slowen Lo,Sly Moore,Snaggletooth,Snap Wexley,Snoke,Sola Naberrie,Sora Bulq,Strono Tuggs,Sy Snootles,Tallissan Lintra,Tarfful,Tasu Leech,Taun We,TC-14,Tee Watt Kaa,Teebo,Teedo,Teemto Pagalies,Temiri Blagg,Tessek,Tey How,Thane Kyrell,The Bendu,The Smuggler,Thrawn,Tiaan Jerjerrod,Tion Medon,Tobias Beckett,Tulon Voidgazer,Tup,U9-C4,Unkar Plutt,Val Beckett,Vanden Willard,Vice Admiral Amilyn Holdo,Vober Dand,WAC-47,Wag Too,Wald,Walrus Man,Warok,Wat Tambor,Watto,Wedge Antilles,Wes Janson,Wicket W. Warrick,Wilhuff Tarkin,Wollivan,Wuher,Wullf Yularen,Xamuel Lennox,Yaddle,Yarael Poof,Yoda,Zam Wesell,Zev Senesca,Ziro the Hutt,Zuckuss`.split(`,`),fe=8,q=/\B@([\-+\w]*)$/,pe=({chars:e,index:t,top:n,left:r,complete:i})=>(0,I.jsx)(`div`,{style:{position:`fixed`,top:n,left:r,fontSize:`12px`,border:`solid 1px gray`,borderRadius:`3px`,background:`white`,cursor:`pointer`},children:e.map((e,n)=>(0,I.jsx)(`div`,{style:{padding:`4px`,...t===n&&{color:`white`,background:`#2A6AD3`}},onMouseDown:e=>{e.preventDefault(),i(n)},children:e},e))}),me=O({children:N(O({children:N(P([O({text:A()}),O({type:k(`mention`),name:A()})]))}))}),J={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:`Hi `},{type:`mention`,name:`Luke Skywalker`},{text:` and `},{type:`mention`,name:`Leia Organa`},{text:`, could you check this out? Type @ to mention someone.`}]},{children:[{text:``}]}]}),[r,i]=(0,F.useState)(null),[a,o]=(0,F.useState)(0),s=(r&&l(t,0,r.caret).match(q))?.[1]??``,c=(0,F.useMemo)(()=>K.filter(e=>e.toLowerCase().startsWith(s.toLowerCase())).slice(0,fe),[s]),u=t=>{if(!e.current||!r)return;let n=c[t],a=r.caret-s.length-1,l=r.caret;v.exec(S,[a,l]).exec(x,{type:`mention`,name:n},a).exec(d,` `),i(null),o(0)},p=(0,F.useEffectEvent)(()=>{if(!r||!c.length)return!1;o(e=>e<=0?c.length-1:e-1)}),m=(0,F.useEffectEvent)(()=>{if(!r||!c.length)return!1;o(e=>e>=c.length-1?0:e+1)}),h=(0,F.useEffectEvent)(()=>{if(!r||!c.length)return!1;u(a)}),g=(0,F.useEffectEvent)(()=>{if(!r||!c.length)return!1;i(null),o(0)}),v=(0,F.useMemo)(()=>{let e=f({doc:t,schema:me}).exec(E,{voidToString:e=>`@${e.name}`}).exec(_,{ArrowUp:p,ArrowDown:m,Enter:h,Escape:g}).exec(w,e=>{let t=Math.min(...v.selection);if(q.test(l(v.doc,0,t))){let n=e();i({top:n.top+n.height,left:n.left,caret:t})}else i(null);o(0)});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,F.useEffect)(()=>{if(e.current)return v.input(e.current)},[]),(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,I.jsx)(`br`,{}):(0,I.jsxs)(`span`,{contentEditable:!1,style:{background:`#EAF5F9`,color:`#4276AA`,borderRadius:`3px`},children:[`@`,e.name]},t))},t))}),r&&(0,ae.createPortal)((0,I.jsx)(pe,{top:r.top,left:r.left,chars:c,index:a,complete:u}),document.body)]})}},he=O({children:N(O({children:N(O({text:A(),comment:M(A())}))}))}),Y={render:()=>{let e=(0,F.useRef)(null),t=(0,F.useRef)(0),[n,r]=(0,F.useState)([{id:`0`,text:`This is comment.`}]),[i,o]=(0,F.useState)(null),[c,l]=(0,F.useState)(!1),[u,d]=(0,F.useState)({children:[{children:[{text:`Hello `},{text:` world`,comment:`0`},{text:`.`}]},{children:[{text:`Select text and add comments.`}]}]}),p=(0,F.useMemo)(()=>{let e=f({doc:u,schema:he}).exec(b).exec(E);return e.on(`change`,()=>{d(e.doc);let t=new Set;for(let[n]of C(e.doc,[0,s(e.doc)]))n.comment&&t.add(n.comment);r(e=>e.filter(e=>t.has(e.id)))}),e.on(`selectionchange`,()=>{l(e.selection[0]!==e.selection[1]);let t=null;for(let n of e.exec(ee))if(n.comment){t=n.comment;break}o(t)}),e},[]);(0,F.useEffect)(()=>{if(e.current)return p.input(e.current)},[]);let m=(0,F.useRef)(null);return(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{children:[(0,I.jsx)(`textarea`,{ref:m,placeholder:`Select text and write comment`}),(0,I.jsx)(`button`,{disabled:!c,onClick:()=>{let e=m.current;if(!e)return;let n=e.value;if(!n)return;let i=String(++t.current);p.exec(a,`comment`,i),r(e=>[...e,{id:i,text:n}]),o(i),e.value=``},children:`Add comment`})]}),(0,I.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`},children:[(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8,flex:1,minHeight:120},children:u.children.map((e,t)=>(0,I.jsx)(`div`,{children:e.children.map((e,t)=>(0,I.jsx)(`span`,{style:{backgroundColor:e.comment?e.comment===i?`gold`:`khaki`:void 0},children:e.text||(0,I.jsx)(`br`,{})},t))},t))}),(0,I.jsx)(`div`,{style:{width:200,background:`#f5f5f5`,padding:8,display:`flex`,flexDirection:`column`,gap:8},children:n.map(e=>(0,I.jsxs)(`div`,{style:{padding:8,background:`white`,border:e.id===i?`solid 1px orange`:`solid 1px #e0e0e0`,borderRadius:6,cursor:`pointer`,fontSize:13},onClick:()=>{o(e.id)},children:[(0,I.jsx)(`div`,{children:e.text}),(0,I.jsx)(`button`,{style:{marginTop:6,fontSize:11},onClick:t=>{t.stopPropagation();let n=[];for(let[t,r]of C(p.doc,[0,s(p.doc)]))t.comment===e.id&&n.push([r,r+s(t)]);for(let e of n)p.exec(a,`comment`,void 0,e)},children:`delete`})]},e.id))})]})]})}},X=O({children:N(O({children:N(P([O({text:A()}),O({type:k(`image`),src:A()}),O({type:k(`video`),src:A()})]))}))}),Z={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:`Hello `},{type:`image`,src:`https://picsum.photos/seed/1/320/240`},{text:` world `},{type:`image`,src:`https://picsum.photos/seed/2/320/240`}]},{children:[{text:`Hello `},{type:`video`,src:`https://mdn.github.io/shared-assets/videos/flower.mp4`},{text:` world `}]}]}),r=(0,F.useMemo)(()=>{let e=f({doc:t,schema:X}).exec(b).exec(g,{"image/png":e=>({type:`image`,src:URL.createObjectURL(e)})}).exec(y,{serializers:{text:e=>({text:e}),img:e=>({type:`image`,src:e.src}),video:e=>({type:`video`,src:e.childNodes[0].src})}}).exec(E);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,F.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,I.jsxs)(`div`,{children:[(0,I.jsxs)(`div`,{style:{display:`flex`,padding:4,gap:4},children:[(0,I.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(x,{type:`image`,src:e})},children:`insert image`}),(0,I.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(x,{type:`video`,src:e})},children:`insert video`})]}),(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:16},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,I.jsx)(`br`,{}):e.type===`image`?(0,I.jsx)(`img`,{src:e.src,style:{maxWidth:240,borderRadius:4,verticalAlign:`middle`}},t):e.type===`video`?(0,I.jsx)(`video`,{width:320,controls:!0,contentEditable:`false`,suppressContentEditableWarning:!0,style:{borderRadius:4,verticalAlign:`middle`},children:(0,I.jsx)(`source`,{src:e.src})},t):null)},t))})]})}},ge=O({children:N(O({locked:M(j()),children:N(O({text:A()}))}))}),Q={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:`You can edit this paragraph.`}]},{locked:!0,children:[{text:`This paragraph is locked. You can select and copy it, but can't edit it.`}]},{children:[{text:`You can edit this paragraph too.`}]}]}),[r,i]=(0,F.useState)(null),a=(0,F.useMemo)(()=>{let e=f({doc:t,schema:ge}).exec(b).exec(E).exec(v,{isLocked:e=>!!e.locked});return e.on(`change`,()=>{n(e.doc)}),e.on(`selectionchange`,()=>{i(m(e.doc,e.selection[0])[2][0]??null)}),e},[]);(0,F.useEffect)(()=>{if(e.current)return a.input(e.current)},[]);let o=r!=null&&!!t.children[r]?.locked;return(0,I.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`26px 1fr`,columnGap:6,rowGap:8,maxWidth:640,fontFamily:`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,fontSize:14,color:`#1e1e1e`,background:`#fff`,border:`1px solid #ddd`,borderRadius:4,padding:16,boxShadow:`0 1px 2px rgba(0, 0, 0, 0.05)`},children:[(0,I.jsx)(`style`,{children:`
          .lock-toggle:not([aria-pressed="true"]):hover { border-color: #757575; }
        `}),r!=null&&(0,I.jsx)(`button`,{className:`lock-toggle`,style:{gridColumn:1,gridRow:r+1,display:`flex`,alignItems:`center`,justifyContent:`center`,width:26,height:26,marginTop:2,padding:0,fontSize:13,background:o?`#757575`:`#fff`,border:`1px solid ${o?`#757575`:`#ccc`}`,borderRadius:2,cursor:`pointer`},title:o?`Unlock this block`:`Lock this block`,"aria-pressed":o,onMouseDown:e=>{e.preventDefault()},onClick:()=>{a.exec(c,`locked`,!0,void 0)},children:`🔒`}),(0,I.jsx)(`div`,{ref:e,style:{gridColumn:2,gridRow:`1 / span ${t.children.length}`,display:`grid`,gridTemplateRows:`subgrid`,outline:`none`},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{style:{padding:`4px 8px`,borderRadius:2,lineHeight:1.6,...e.locked&&{background:`#f6f7f7`,boxShadow:`inset 0 0 0 1px #ddd`},...t===r&&{outline:`1.5px solid #007cba`,outlineOffset:1}},children:e.children.map((e,t)=>(0,I.jsx)(`span`,{children:e.text||(0,I.jsx)(`br`,{})},t))},t))})]})}},_e=O({children:N(O({children:N(P([O({text:A()}),O({type:k(`ruby`),ruby:A(),value:A()})]))}))}),$={render:()=>{let e=(0,F.useRef)(null),[t,n]=(0,F.useState)({children:[{children:[{text:`また`},{type:`ruby`,ruby:`あした`,value:`明日`},{text:`お`},{type:`ruby`,ruby:`あ`,value:`会`},{text:`いしましょう。`}]}]}),r=(0,F.useMemo)(()=>{let e=f({doc:t,schema:_e}).exec(E,{voidToString:e=>e.value});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,F.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,I.jsx)(`div`,{children:(0,I.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,t)=>(0,I.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,I.jsx)(`br`,{}):(0,I.jsxs)(`ruby`,{contentEditable:!1,children:[e.value,(0,I.jsx)(`rp`,{children:`(`}),(0,I.jsx)(`rt`,{children:e.ruby}),(0,I.jsx)(`rp`,{children:`)`})]},t))},t))})})}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
          const tagIndex = doc.children.indexOf(t);
          if (tagIndex === -1) return;
          const value = window.prompt("label:", t.label);
          if (!value) return;
          const offset = doc.children.slice(0, tagIndex + 1).reduce((acc, n) => acc + getNodeSize(n), 0);
          editor.exec(SetVoidAttr, "label", value, offset);
        }} onRemove={e => {
          e.preventDefault();
          const tagIndex = doc.children.indexOf(t);
          if (tagIndex === -1) return;
          const start = doc.children.slice(0, tagIndex).reduce((acc, n) => acc + getNodeSize(n), 0);
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
      const tagIndex = doc.children.findIndex(n => !("text" in n) && n.value === item);
      if (tagIndex !== -1) {
        // remove the tag if it's already inserted
        const start = doc.children.slice(0, tagIndex).reduce((acc, n) => acc + getNodeSize(n), 0);
        editor.exec(Delete, [start, start + getNodeSize(doc.children[tagIndex]!)]);
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
}`,...$.parameters?.docs?.source}}},ve=[`Empty`,`RichText`,`Tag`,`Combobox`,`Mention`,`Comment`,`Media`,`BlockLock`,`Ruby`]}))();export{Q as BlockLock,G as Combobox,Y as Comment,L as Empty,Z as Media,J as Mention,B as RichText,$ as Ruby,U as Tag,ve as __namedExportsOrder,oe as default};