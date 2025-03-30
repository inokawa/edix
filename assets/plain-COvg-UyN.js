import{N as o}from"./editable-Bs_Ez4U6.js";const a=e=>e.reduce((t,r,p)=>(p!==0&&(t+=`
`),t+r.reduce((i,n)=>i+(n.type===o?n.text:""),"")),""),u=({multiline:e}={})=>({single:!e,js:a,void:()=>{},copy:(t,r)=>{t.setData("text/plain",a(r))},paste:t=>t.getData("text/plain")});export{u as p};
