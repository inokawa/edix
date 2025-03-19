import{N as s}from"./editable-D_MTagIj.js";const n=e=>e.reduce((t,r,i)=>(i!==0&&(t+=`
`),t+r.reduce((p,a)=>p+(a.type===s?a.text:""),"")),""),u=({multiline:e}={})=>({single:!e,data:n,copy:(t,r)=>{t.setData("text/plain",n(r))},paste:t=>t.getData("text/plain")});export{u as p};
