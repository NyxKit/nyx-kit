const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-CFRXHY34-DaS34dv-.js","./iframe-CiWqbUqd.js","./index-CO-kbM61.js","./index-CDuLr8kb.js","./index-DrFu-skq.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./iframe-CiWqbUqd.js";var s=Object.entries(globalThis.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),l={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-CFRXHY34-DaS34dv-.js").then(r=>r.D),__vite__mapDeps([0,1,2,3,4]),import.meta.url);return new e},stories:{filter:e=>(e.tags||[]).filter(r=>s[r]).length===0&&!e.parameters.docs?.disable}}};export{l as parameters};
