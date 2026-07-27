import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-DiHTDPJ_.js";import{t as r}from"./react-dom-tmC7aEMN.js";import{t as i}from"./jsx-runtime-O9QVJvLM.js";import{A as a,B as o,D as s,F as c,H as l,L as u,N as d,O as f,P as p,U as m,_ as h,a as g,b as _,d as v,k as y,m as b,p as x,s as ee,t as te,v as S,z as C}from"./src-CaQ2DK0u.js";import{a as w,c as T,i as E,l as D,n as O,o as k,r as ne,s as re,t as A,u as j}from"./dist-BMstJve2.js";function ie(e,t=e.selection[0]){let[n,,r]=C(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:(n.indent??0)+1})}function ae(e,t=e.selection[0]){let[n,,r]=C(e.doc,t);e.apply({type:`patch_node`,path:r,key:`indent`,value:Math.max((n.indent??0)-1,0)})}var M,oe,N,se,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,ce,X,Z,Q,le,$,ue;t((()=>{M=e(n()),te(),ne(),oe=e(r()),N=i(),se={component:_},P=T({children:A(T({children:A(T({text:D()}))}))}),F={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{children:[{text:``}]}]}),r=(0,M.useMemo)(()=>{let e=_({doc:t,schema:P}).exec(x).exec(h);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,M.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,N.jsx)(`div`,{children:e.children.map((e,t)=>(0,N.jsx)(`span`,{children:e.text||(0,N.jsx)(`br`,{})},t))},t))})}},I=T({text:D(),fontSize:k(w()),bold:k(O()),italic:k(O()),underline:k(O()),strike:k(O())}),L=T({children:A(T({align:k(re([`left`,`right`])),indent:k(w()),children:A(I)}))}),R=10,z=({node:e})=>{let t=e.bold?`strong`:`span`,n={fontSize:`${e.fontSize??R}pt`};return e.italic&&(n.fontStyle=`italic`),e.underline&&(n.textDecoration=`underline`),e.strike&&(n.textDecoration=n.textDecoration?`${n.textDecoration} line-through`:`line-through`),(0,N.jsx)(t,{style:n,children:e.text||(0,N.jsx)(`br`,{})})},B={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{children:[{text:`Hello`,bold:!0},{text:` `},{text:`World`,italic:!0},{text:`.`}]},{children:[{text:`こんにちは。`}]},{children:[{text:`👍❤️🧑‍🧑‍🧒`}]}]}),[r,i]=(0,M.useState)(null),[a,o]=(0,M.useState)(),[s,l]=(0,M.useState)(!1),[d,m]=(0,M.useState)(!1),[g,y]=(0,M.useState)(!1),[b,te]=(0,M.useState)(!1),S=e=>{D.exec(f,`fontSize`,e)},C=()=>{D.exec(c,`bold`)},w=()=>{D.exec(c,`italic`)},T=()=>{D.exec(c,`underline`)},E=()=>{D.exec(c,`strike`)},D=(0,M.useMemo)(()=>{let e=()=>{let e=new Set,t=!1,n=!1,r=!1,i=!1;for(let a of D.exec(u))a.fontSize?e.add(a.fontSize):e.add(R),a.bold&&(t=!0),a.italic&&(n=!0),a.underline&&(r=!0),a.strike&&(i=!0);o(e.size===1?e.values().next().value:void 0),l(t),m(n),y(r),te(i)},r=_({doc:t,schema:L}).exec(v,{"Mod+B":C,"Mod+I":w,"Mod+U":T,"Mod+S":E}).exec(ee,e=>{D.selection[0]===D.selection[1]?i(null):i(t=>{let n=e();return t&&t.top===n.top&&t.left===n.left?t:{top:n.top,left:n.left}})}).exec(x).exec(h);return r.on(`change`,()=>{n(r.doc),e()}),r.on(`selectionchange`,()=>{e()}),r},[]);return(0,M.useEffect)(()=>{if(e.current)return D.input(e.current)},[]),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:4,padding:4,paddingBottom:8},children:[(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`select`,{value:a??`--`,onChange:e=>{e.preventDefault();let t=Number(e.target.value);Number.isNaN(t)||S(t)},children:[(0,N.jsx)(`option`,{value:`--`,children:`--`}),(0,N.jsx)(`option`,{value:`8`,children:`8`}),(0,N.jsx)(`option`,{value:`10`,children:`10`}),(0,N.jsx)(`option`,{value:`12`,children:`12`}),(0,N.jsx)(`option`,{value:`14`,children:`14`}),(0,N.jsx)(`option`,{value:`16`,children:`16`}),(0,N.jsx)(`option`,{value:`18`,children:`18`}),(0,N.jsx)(`option`,{value:`20`,children:`20`})]}),(0,N.jsx)(`button`,{style:{fontWeight:s?`bold`:void 0},onClick:C,children:`bold`}),(0,N.jsx)(`button`,{style:{fontWeight:d?`bold`:void 0},onClick:w,children:`italic`}),(0,N.jsx)(`button`,{style:{fontWeight:g?`bold`:void 0},onClick:T,children:`underline`}),(0,N.jsx)(`button`,{style:{fontWeight:b?`bold`:void 0},onClick:E,children:`strike`})]}),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`button`,{onClick:()=>{D.exec(p,`align`,`right`,void 0)},children:`align`}),(0,N.jsx)(`button`,{onClick:()=>{D.exec(ie)},children:`indent`}),(0,N.jsx)(`button`,{onClick:()=>{D.exec(ae)},children:`outdent`})]})]}),(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,N.jsx)(`div`,{style:{textAlign:e.align,textIndent:e.indent?`${e.indent}em`:void 0},children:e.children.map((e,t)=>(0,N.jsx)(z,{node:e},t))},t))}),r?(0,N.jsxs)(`div`,{style:{position:`fixed`,top:r.top-30,left:r.left,whiteSpace:`nowrap`},children:[(0,N.jsx)(`button`,{style:{fontWeight:s?`bold`:void 0},onClick:C,children:`bold`}),(0,N.jsx)(`button`,{style:{fontWeight:d?`bold`:void 0},onClick:w,children:`italic`}),(0,N.jsx)(`button`,{style:{fontWeight:g?`bold`:void 0},onClick:T,children:`underline`}),(0,N.jsx)(`button`,{style:{fontWeight:b?`bold`:void 0},onClick:E,children:`strike`})]}):null]})}},V=T({children:A(j([T({text:D()}),T({type:E(`tag`),label:D(),value:D()})]))}),H=({onClick:e})=>{let[t,n]=(0,M.useState)(!1);return(0,N.jsx)(`span`,{onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onClick:e,style:{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,width:14,height:14,borderRadius:`50%`,background:t?`#999`:`#c4c4c4`,color:`white`,fontSize:9,lineHeight:1,cursor:`pointer`},children:`✕`})},U={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{text:`Hello `},{type:`tag`,label:`Apple`,value:`1`},{text:` world `},{type:`tag`,label:`Orange`,value:`2`}]}),r=(0,M.useMemo)(()=>{let e=_({doc:t,schema:V}).exec(x).exec(h,{voidToString:e=>e.label}).exec(g);return e.on(`change`,()=>{n(r.doc)}),e},[]);(0,M.useEffect)(()=>{if(e.current)return r.input(e.current)},[]);let i=(0,M.useRef)(null),a=(0,M.useRef)(null);return(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`label`,{children:[`label:`,(0,N.jsx)(`input`,{ref:i,defaultValue:`Grape`})]}),(0,N.jsxs)(`label`,{children:[`value:`,(0,N.jsx)(`input`,{ref:a,defaultValue:`123`})]}),(0,N.jsx)(`button`,{onClick:()=>{let e=i.current?.value,t=a.current?.value;!e||!t||r.exec(y,{type:`tag`,value:t,label:e})},children:`insert`})]}),(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,n)=>`text`in e?e.text||(0,N.jsx)(`br`,{}):(0,N.jsxs)(`span`,{contentEditable:!1,style:{display:`inline-flex`,alignItems:`center`,gap:4,background:`#f0f0f0`,color:`#444`,border:`solid 1px #ccc`,fontSize:12,lineHeight:1.5,padding:`1px 4px 1px 8px`,borderRadius:999,margin:`0 2px`},children:[(0,N.jsx)(`span`,{style:{cursor:`pointer`},onClick:n=>{n.preventDefault();let i=t.children.indexOf(e);if(i===-1)return;let a=window.prompt(`label:`,e.label);if(!a)return;let s=t.children.slice(0,i+1).reduce((e,t)=>e+o(t),0);r.exec(d,`label`,a,s)},children:e.label}),(0,N.jsx)(H,{onClick:n=>{n.preventDefault();let i=t.children.indexOf(e);if(i===-1)return;let a=t.children.slice(0,i).reduce((e,t)=>e+o(t),0);r.exec(s,[a,a+o(e)])}})]},n))})]})}},W=`Aayla Secura,Adi Gallia,Admiral Dodd Rancit,Admiral Firmus Piett,Admiral Gial Ackbar,Admiral Ozzel,Admiral Raddus,Admiral Terrinald Screed,Admiral Trench,Admiral U.O. Statura,Agen Kolar,Agent Kallus,Aiolin and Morit Astarte,Aks Moe,Almec,Alton Kastle,Amee,AP-5,Armitage Hux,Artoo,Arvel Crynyd,Asajj Ventress,Aurra Sing,AZI-3,Bala-Tik,Barada,Bargwill Tomder,Baron Papanoida,Barriss Offee,Baze Malbus,Bazine Netal,BB-8,BB-9E,Ben Quadinaros,Berch Teller,Beru Lars,Bib Fortuna,Biggs Darklighter,Black Krrsantan,Bo-Katan Kryze,Boba Fett,Bobbajo,Bodhi Rook,Borvo the Hutt,Boss Nass,Bossk,Breha Antilles-Organa,Bren Derlin,Brendol Hux,BT-1,C-3PO,C1-10P,Cad Bane,Caluan Ematt,Captain Gregor,Captain Phasma,Captain Quarsh Panaka,Captain Rex,Carlist Rieekan,Casca Panzoro,Cassian Andor,Cassio Tagge,Cham Syndulla,Che Amanwe Papanoida,Chewbacca,Chi Eekway Papanoida,Chief Chirpa,Chirrut Îmwe,Ciena Ree,Cin Drallig,Clegg Holdfast,Cliegg Lars,Coleman Kcaj,Coleman Trebor,Colonel Kaplan,Commander Bly,Commander Cody (CC-2224),Commander Fil (CC-3714),Commander Fox,Commander Gree,Commander Jet,Commander Wolffe,Conan Antonio Motti,Conder Kyl,Constable Zuvio,Cordé,Cpatain Typho,Crix Madine,Cut Lawquane,Dak Ralter,Dapp,Darth Bane,Darth Maul,Darth Tyranus,Daultay Dofine,Del Meeko,Delian Mors,Dengar,Depa Billaba,Derek Klivian,Dexter Jettster,Dineé Ellberger,DJ,Doctor Aphra,Doctor Evazan,Dogma,Dormé,Dr. Cylo,Droidbait,Droopy McCool,Dryden Vos,Dud Bolt,Ebe E. Endocott,Echuu Shen-Jon,Eeth Koth,Eighth Brother,Eirtaé,Eli Vanto,Ellé,Ello Asty,Embo,Eneb Ray,Enfys Nest,EV-9D9,Evaan Verlaine,Even Piell,Ezra Bridger,Faro Argyus,Feral,Fifth Brother,Finis Valorum,Finn,Fives,FN-1824,FN-2003,Fodesinbeed Annodue,Fulcrum,FX-7,GA-97,Galen Erso,Gallius Rax,Garazeb "Zeb" Orrelios,Gardulla the Hutt,Garrick Versio,Garven Dreis,Gavyn Sykes,Gideon Hask,Gizor Dellso,Gonk droid,Grand Inquisitor,Greeata Jendowanian,Greedo,Greer Sonnel,Grievous,Grummgar,Gungi,Hammerhead,Han Solo,Harter Kalonia,Has Obbit,Hera Syndulla,Hevy,Hondo Ohnaka,Huyang,Iden Versio,IG-88,Ima-Gun Di,Inquisitors,Inspector Thanoth,Jabba,Jacen Syndulla,Jan Dodonna,Jango Fett,Janus Greejatus,Jar Jar Binks,Jas Emari,Jaxxon,Jek Tono Porkins,Jeremoch Colton,Jira,Jobal Naberrie,Jocasta Nu,Joclad Danva,Joh Yowza,Jom Barell,Joph Seastriker,Jova Tarkin,Jubnuk,Jyn Erso,K-2SO,Kanan Jarrus,Karbin,Karina the Great,Kes Dameron,Ketsu Onyo,Ki-Adi-Mundi,King Katuunko,Kit Fisto,Kitster Banai,Klaatu,Klik-Klak,Korr Sella,Kylo Ren,L3-37,Lama Su,Lando Calrissian,Lanever Villecham,Leia Organa,Letta Turmond,Lieutenant Kaydel Ko Connix,Lieutenant Thire,Lobot,Logray,Lok Durd,Longo Two-Guns,Lor San Tekka,Lorth Needa,Lott Dod,Luke Skywalker,Lumat,Luminara Unduli,Lux Bonteri,Lyn Me,Lyra Erso,Mace Windu,Malakili,Mama the Hutt,Mars Guo,Mas Amedda,Mawhonic,Max Rebo,Maximilian Veers,Maz Kanata,ME-8D9,Meena Tills,Mercurial Swift,Mina Bonteri,Miraj Scintel,Mister Bones,Mod Terrik,Moden Canady,Mon Mothma,Moradmin Bast,Moralo Eval,Morley,Mother Talzin,Nahdar Vebb,Nahdonnis Praji,Nien Nunb,Niima the Hutt,Nines,Norra Wexley,Nute Gunray,Nuvo Vindi,Obi-Wan Kenobi,Odd Ball,Ody Mandrell,Omi,Onaconda Farr,Oola,OOM-9,Oppo Rancisis,Orn Free Taa,Oro Dassyne,Orrimarko,Osi Sobeck,Owen Lars,Pablo-Jill,Padmé Amidala,Pagetti Rook,Paige Tico,Paploo,Petty Officer Thanisson,Pharl McQuarrie,Plo Koon,Po Nudo,Poe Dameron,Poggle the Lesser,Pong Krell,Pooja Naberrie,PZ-4CO,Quarrie,Quay Tolsite,Queen Apailana,Queen Jamillia,Queen Neeyutnee,Qui-Gon Jinn,Quiggold,Quinlan Vos,R2-D2,R2-KT,R3-S6,R4-P17,R5-D4,RA-7,Rabé,Rako Hardeen,Ransolm Casterfo,Rappertunie,Ratts Tyerell,Raymus Antilles,Ree-Yees,Reeve Panzoro,Rey,Ric Olié,Riff Tamson,Riley,Rinnriyin Di,Rio Durant,Rogue Squadron,Romba,Roos Tarpals,Rose Tico,Rotta the Hutt,Rukh,Rune Haako,Rush Clovis,Ruwee Naberrie,Ryoo Naberrie,Sabé,Sabine Wren,Saché,Saelt-Marae,Saesee Tiin,Salacious B. Crumb,San Hill,Sana Starros,Sarco Plank,Sarkli,Satine Kryze,Savage Opress,Sebulba,Senator Organa,Sergeant Kreel,Seventh Sister,Shaak Ti,Shara Bey,Shmi Skywalker,Shu Mai,Sidon Ithano,Sifo-Dyas,Sim Aloo,Siniir Rath Velus,Sio Bibble,Sixth Brother,Slowen Lo,Sly Moore,Snaggletooth,Snap Wexley,Snoke,Sola Naberrie,Sora Bulq,Strono Tuggs,Sy Snootles,Tallissan Lintra,Tarfful,Tasu Leech,Taun We,TC-14,Tee Watt Kaa,Teebo,Teedo,Teemto Pagalies,Temiri Blagg,Tessek,Tey How,Thane Kyrell,The Bendu,The Smuggler,Thrawn,Tiaan Jerjerrod,Tion Medon,Tobias Beckett,Tulon Voidgazer,Tup,U9-C4,Unkar Plutt,Val Beckett,Vanden Willard,Vice Admiral Amilyn Holdo,Vober Dand,WAC-47,Wag Too,Wald,Walrus Man,Warok,Wat Tambor,Watto,Wedge Antilles,Wes Janson,Wicket W. Warrick,Wilhuff Tarkin,Wollivan,Wuher,Wullf Yularen,Xamuel Lennox,Yaddle,Yarael Poof,Yoda,Zam Wesell,Zev Senesca,Ziro the Hutt,Zuckuss`.split(`,`),G=8,K=/\B@([\-+\w]*)$/,q=({chars:e,index:t,top:n,left:r,complete:i})=>(0,N.jsx)(`div`,{style:{position:`fixed`,top:n,left:r,fontSize:`12px`,border:`solid 1px gray`,borderRadius:`3px`,background:`white`,cursor:`pointer`},children:e.map((e,n)=>(0,N.jsx)(`div`,{style:{padding:`4px`,...t===n&&{color:`white`,background:`#2A6AD3`}},onMouseDown:e=>{e.preventDefault(),i(n)},children:e},e))}),J=T({children:A(T({children:A(j([T({text:D()}),T({type:E(`mention`),name:D()})]))}))}),Y={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{children:[{text:`Hi `},{type:`mention`,name:`Luke Skywalker`},{text:` and `},{type:`mention`,name:`Leia Organa`},{text:`, could you check this out? Type @ to mention someone.`}]},{children:[{text:``}]}]}),[r,i]=(0,M.useState)(null),[o,c]=(0,M.useState)(0),l=(r&&m(t,0,r.caret).match(K))?.[1]??``,u=(0,M.useMemo)(()=>W.filter(e=>e.toLowerCase().startsWith(l.toLowerCase())).slice(0,G),[l]),d=t=>{if(!e.current||!r)return;let n=u[t],o=r.caret-l.length-1,d=r.caret;x.exec(s,[o,d]).exec(y,{type:`mention`,name:n},o).exec(a,` `),i(null),c(0)},f=(0,M.useEffectEvent)(()=>{if(!r||!u.length)return!1;c(e=>e<=0?u.length-1:e-1)}),p=(0,M.useEffectEvent)(()=>{if(!r||!u.length)return!1;c(e=>e>=u.length-1?0:e+1)}),g=(0,M.useEffectEvent)(()=>{if(!r||!u.length)return!1;d(o)}),b=(0,M.useEffectEvent)(()=>{if(!r||!u.length)return!1;i(null),c(0)}),x=(0,M.useMemo)(()=>{let e=_({doc:t,schema:J}).exec(h,{voidToString:e=>`@${e.name}`}).exec(v,{ArrowUp:f,ArrowDown:p,Enter:g,Escape:b}).exec(ee,e=>{let t=Math.min(...x.selection);if(K.test(m(x.doc,0,t))){let n=e();i({top:n.top+n.height,left:n.left,caret:t})}else i(null);c(0)});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,M.useEffect)(()=>{if(e.current)return x.input(e.current)},[]),(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,border:`solid 1px darkgray`,padding:8},children:t.children.map((e,t)=>(0,N.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,N.jsx)(`br`,{}):(0,N.jsxs)(`span`,{contentEditable:!1,style:{background:`#EAF5F9`,color:`#4276AA`,borderRadius:`3px`},children:[`@`,e.name]},t))},t))}),r&&(0,oe.createPortal)((0,N.jsx)(q,{top:r.top,left:r.left,chars:u,index:o,complete:d}),document.body)]})}},ce=T({children:A(T({children:A(T({text:D(),comment:k(D())}))}))}),X={render:()=>{let e=(0,M.useRef)(null),t=(0,M.useRef)(0),[n,r]=(0,M.useState)([{id:`0`,text:`This is comment.`}]),[i,a]=(0,M.useState)(null),[s,c]=(0,M.useState)(!1),[d,p]=(0,M.useState)({children:[{children:[{text:`Hello `},{text:` world`,comment:`0`},{text:`.`}]},{children:[{text:`Select text and add comments.`}]}]}),m=(0,M.useMemo)(()=>{let e=_({doc:d,schema:ce}).exec(x).exec(h);return e.on(`change`,()=>{p(e.doc);let t=new Set;for(let[n]of l(e.doc,[0,o(e.doc)]))n.comment&&t.add(n.comment);r(e=>e.filter(e=>t.has(e.id)))}),e.on(`selectionchange`,()=>{c(e.selection[0]!==e.selection[1]);let t=null;for(let n of e.exec(u))if(n.comment){t=n.comment;break}a(t)}),e},[]);(0,M.useEffect)(()=>{if(e.current)return m.input(e.current)},[]);let g=(0,M.useRef)(null);return(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`textarea`,{ref:g,placeholder:`Select text and write comment`}),(0,N.jsx)(`button`,{disabled:!s,onClick:()=>{let e=g.current;if(!e)return;let n=e.value;if(!n)return;let i=String(++t.current);m.exec(f,`comment`,i),r(e=>[...e,{id:i,text:n}]),a(i),e.value=``},children:`Add comment`})]}),(0,N.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`},children:[(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8,flex:1,minHeight:120},children:d.children.map((e,t)=>(0,N.jsx)(`div`,{children:e.children.map((e,t)=>(0,N.jsx)(`span`,{style:{backgroundColor:e.comment?e.comment===i?`gold`:`khaki`:void 0},children:e.text||(0,N.jsx)(`br`,{})},t))},t))}),(0,N.jsx)(`div`,{style:{width:200,background:`#f5f5f5`,padding:8,display:`flex`,flexDirection:`column`,gap:8},children:n.map(e=>(0,N.jsxs)(`div`,{style:{padding:8,background:`white`,border:e.id===i?`solid 1px orange`:`solid 1px #e0e0e0`,borderRadius:6,cursor:`pointer`,fontSize:13},onClick:()=>{a(e.id)},children:[(0,N.jsx)(`div`,{children:e.text}),(0,N.jsx)(`button`,{style:{marginTop:6,fontSize:11},onClick:t=>{t.stopPropagation();let n=[];for(let[t,r]of l(m.doc,[0,o(m.doc)]))t.comment===e.id&&n.push([r,r+o(t)]);for(let e of n)m.exec(f,`comment`,void 0,e)},children:`delete`})]},e.id))})]})]})}},Z=T({children:A(T({children:A(j([T({text:D()}),T({type:E(`image`),src:D()}),T({type:E(`video`),src:D()})]))}))}),Q={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{children:[{text:`Hello `},{type:`image`,src:`https://picsum.photos/seed/1/320/240`},{text:` world `},{type:`image`,src:`https://picsum.photos/seed/2/320/240`}]},{children:[{text:`Hello `},{type:`video`,src:`https://mdn.github.io/shared-assets/videos/flower.mp4`},{text:` world `}]}]}),r=(0,M.useMemo)(()=>{let e=_({doc:t,schema:Z}).exec(x).exec(S,{"image/png":e=>({type:`image`,src:URL.createObjectURL(e)})}).exec(b,{serializers:{text:e=>({text:e}),img:e=>({type:`image`,src:e.src}),video:e=>({type:`video`,src:e.childNodes[0].src})}}).exec(h);return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,M.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{style:{display:`flex`,padding:4,gap:4},children:[(0,N.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(y,{type:`image`,src:e})},children:`insert image`}),(0,N.jsx)(`button`,{onClick:()=>{let e=window.prompt(`url:`);e&&r.exec(y,{type:`video`,src:e})},children:`insert video`})]}),(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:16},children:t.children.map((e,t)=>(0,N.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,N.jsx)(`br`,{}):e.type===`image`?(0,N.jsx)(`img`,{src:e.src,style:{maxWidth:240,borderRadius:4,verticalAlign:`middle`}},t):e.type===`video`?(0,N.jsx)(`video`,{width:320,controls:!0,contentEditable:`false`,suppressContentEditableWarning:!0,style:{borderRadius:4,verticalAlign:`middle`},children:(0,N.jsx)(`source`,{src:e.src})},t):null)},t))})]})}},le=T({children:A(T({children:A(j([T({text:D()}),T({type:E(`ruby`),ruby:D(),value:D()})]))}))}),$={render:()=>{let e=(0,M.useRef)(null),[t,n]=(0,M.useState)({children:[{children:[{text:`また`},{type:`ruby`,ruby:`あした`,value:`明日`},{text:`お`},{type:`ruby`,ruby:`あ`,value:`会`},{text:`いしましょう。`}]}]}),r=(0,M.useMemo)(()=>{let e=_({doc:t,schema:le}).exec(h,{voidToString:e=>e.value});return e.on(`change`,()=>{n(e.doc)}),e},[]);return(0,M.useEffect)(()=>{if(e.current)return r.input(e.current)},[]),(0,N.jsx)(`div`,{children:(0,N.jsx)(`div`,{ref:e,style:{backgroundColor:`white`,padding:8},children:t.children.map((e,t)=>(0,N.jsx)(`div`,{children:e.children.map((e,t)=>`text`in e?e.text||(0,N.jsx)(`br`,{}):(0,N.jsxs)(`ruby`,{contentEditable:!1,children:[e.value,(0,N.jsx)(`rp`,{children:`(`}),(0,N.jsx)(`rt`,{children:e.ruby}),(0,N.jsx)(`rp`,{children:`)`})]},t))},t))})})}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
      }).exec(internalTranferPlugin).exec(plainTransferPlugin);
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
}`,...F.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
      }).exec(internalTranferPlugin).exec(plainTransferPlugin);
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
      }).exec(internalTranferPlugin).exec(plainTransferPlugin, {
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
          {doc.children.map((t, j) => "text" in t ? t.text || <br /> : <span key={j} contentEditable={false} style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "#f0f0f0",
          color: "#444",
          border: "solid 1px #ccc",
          fontSize: 12,
          lineHeight: 1.5,
          padding: "1px 4px 1px 8px",
          borderRadius: 999,
          margin: "0 2px"
        }}>
                <span style={{
            cursor: "pointer"
          }} onClick={e => {
            e.preventDefault();
            const tagIndex = doc.children.indexOf(t);
            if (tagIndex === -1) return;
            const value = window.prompt("label:", t.label);
            if (!value) return;
            const offset = doc.children.slice(0, tagIndex + 1).reduce((acc, n) => acc + getNodeSize(n), 0);
            editor.exec(SetVoidAttr, "label", value, offset);
          }}>
                  {t.label}
                </span>
                <TagRemoveButton onClick={e => {
            e.preventDefault();
            const tagIndex = doc.children.indexOf(t);
            if (tagIndex === -1) return;
            const start = doc.children.slice(0, tagIndex).reduce((acc, n) => acc + getNodeSize(n), 0);
            editor.exec(Delete, [start, start + getNodeSize(t)]);
          }} />
              </span>)}
        </div>
      </div>;
  }
}`,...U.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
      }).exec(internalTranferPlugin).exec(plainTransferPlugin);
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
}`,...X.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
      }).exec(internalTranferPlugin).exec(fileTransferPlugin, {
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
}`,...$.parameters?.docs?.source}}},ue=[`Empty`,`RichText`,`Tag`,`Mention`,`Comment`,`Media`,`Ruby`]}))();export{X as Comment,F as Empty,Q as Media,Y as Mention,B as RichText,$ as Ruby,U as Tag,ue as __namedExportsOrder,se as default};