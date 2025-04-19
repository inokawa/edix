import{I as i,N as o}from"./editable-DS7PF5aL.js";const n=r=>r.reduce((t,e,s)=>(s!==0&&(t+=`
`),t+e.reduce((p,a)=>p+(a.type===o?a.text:""),"")),""),x=({multiline:r}={})=>({single:!r,js:n,void:()=>{},copy:(t,e)=>{t.setData("text/plain",n(e))},paste:(t,e)=>{e(i,t.getData("text/plain"))}});export{x as p};
