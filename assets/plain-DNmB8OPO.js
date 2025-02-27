const n=e=>e.reduce((t,r,i)=>(i!==0&&(t+=`
`),t+r.reduce((p,a)=>p+(typeof a=="string"?a:""),"")),""),s=({multiline:e}={})=>({single:!e,data:n,copy:(t,r)=>{t.setData("text/plain",n(r))},paste:t=>t.getData("text/plain")});export{s as p};
