import{d as o,c,a as i,b as r,B as m,n as u,o as d}from"./vue.esm-bundler-BOhbys1Y.js";import{c as p,a as y}from"./common-BBtRsYrk.js";const t=o({__name:"NyxSpinner",props:{theme:{default:p.Default},size:{},speed:{default:"2s"}},setup(n){const e=n,l=c(()=>({"--nyx-speed-spinner":e.speed}));return(x,a)=>(d(),i("svg",{class:u(["nyx-spinner",[`theme-${e.theme}`,e.size&&`size-${e.size}`]]),style:m(l.value),role:"progressbar","aria-label":"Loading"},a[0]||(a[0]=[r("circle",{class:"nyx-spinner__track"},null,-1),r("circle",{class:"nyx-spinner__indicator"},null,-1)]),6))}});t.__docgenInfo={exportName:"default",displayName:"NyxSpinner",description:"",tags:{},props:[{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"size",required:!1,type:{name:"NyxSize"}},{name:"speed",required:!1,type:{name:"DurationSpeed"},defaultValue:{func:!1,value:"'2s'"}}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxSpinner/NyxSpinner.vue"]};const S={title:"Components/NyxSpinner",component:t,argTypes:{type:{control:{type:"select"},options:["button","submit","reset"]},theme:{control:{type:"select"},options:Object.values(p)},size:{control:{type:"select"},options:Object.values(y)}}},f=n=>o({components:{NyxSpinner:t},setup(){return{args:n}},template:`
    <nyx-spinner v-bind="args" />
  `}),s=f({});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"Template({})",...s.parameters?.docs?.source}}};const z=["Default"];export{s as Default,z as __namedExportsOrder,S as default};
