const t=e=>e.reduce((r,i,a)=>(a!==0&&(r+=`
`),r+i.reduce((s,n)=>s+(typeof n=="string"?n:""),"")),""),o=({multiline:e}={})=>({single:!e,data:t,plain:t});export{o as p};
