import{d as n,m as o,g as d,b as u,h as l,j as r,v as m,n as c,f}from"./vue.esm-bundler-CfsXIL5g.js";import{a as y,N as p,b as x}from"./common-D9Lon2f2.js";const v=["id"],N=n({__name:"NyxSwitch",props:o({theme:{default:x.Success},size:{default:p.Medium},variant:{default:y.Solid},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(t){const s=t,a=d(t,"modelValue");return(h,e)=>(f(),u("div",{class:c(["nyx-switch",[`theme-${s.theme}`,`variant-${s.variant}`,`size-${s.size}`,{"nyx-switch--on":a.value}]]),onClick:e[1]||(e[1]=i=>a.value=!a.value)},[e[2]||(e[2]=l("div",{class:"nyx-switch__knob"},null,-1)),r(l("input",{type:"checkbox",class:"nyx-switch__hidden","onUpdate:modelValue":e[0]||(e[0]=i=>a.value=i),id:s.id},null,8,v),[[m,a.value]])],2))}});N.__docgenInfo={exportName:"default",displayName:"NyxSwitch",description:"",tags:{},props:[{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Success"}},{name:"size",required:!1,type:{name:"NyxSize"},defaultValue:{func:!1,value:"NyxSize.Medium"}},{name:"variant",required:!1,type:{name:"NyxVariant"},defaultValue:{func:!1,value:"NyxVariant.Solid"}},{name:"id",required:!1,type:{name:"string"}}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxSwitch/NyxSwitch.vue"]};export{N as _};
