const n=t=>t.reduce((e,a,i)=>(i!==0&&(e+=`
`),e+a.reduce((p,r)=>p+(typeof r=="string"?r:""),"")),""),s=({multiline:t}={})=>({single:!t,data:n,plain:n,paste:e=>e.getData("text/plain")});export{s as p};
