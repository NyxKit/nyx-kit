import{d,a as b,b as h,h as k,j as z,k as B,l as v,p as C,n as V,o as x,q as g,s as S}from"./vue.esm-bundler-BOhbys1Y.js";import{a as p,b as c,c as f,N as T}from"./common-BBtRsYrk.js";import{_ as D}from"./NyxButton-DD6RldN7.js";import{g as $}from"./keydict-BK3rIzaC.js";const m=d({__name:"NyxBadge",props:{disabled:{type:Boolean,default:!1},theme:{default:f.Default},variant:{default:c.Solid},size:{default:p.Medium},hasClose:{type:Boolean,default:!1}},emits:["click","close"],setup(s,{emit:t}){const a=s,u=t;return(l,e)=>(x(),b("div",{class:V(["nyx-badge",[{"nyx-badge--closable":l.hasClose},`theme-${a.theme}`,`variant-${a.variant}`,`size-${a.size}`]]),onClick:e[1]||(e[1]=C(N=>u("click"),["self"]))},[h("span",null,[B(l.$slots,"default",{},()=>[e[2]||(e[2]=g("NyxBadge"))])]),l.hasClose?(x(),k(D,{key:0,class:"nyx-badge__button",size:a.size,shape:v(T).Circle,variant:v(c).Ghost,onClick:e[0]||(e[0]=N=>u("close"))},{default:S(()=>e[3]||(e[3]=[g("×")])),_:1},8,["size","shape","variant"])):z("",!0)],2))}});m.__docgenInfo={exportName:"default",displayName:"NyxBadge",description:"",tags:{},props:[{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"variant",required:!1,type:{name:"NyxVariant"},defaultValue:{func:!1,value:"NyxVariant.Solid"}},{name:"size",required:!1,type:{name:"NyxSize"},defaultValue:{func:!1,value:"NyxSize.Medium"}},{name:"hasClose",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click"},{name:"close"}],slots:[{name:"default"}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxBadge/NyxBadge.vue"]};const L={title:"Components/NyxBadge",component:m,argTypes:{theme:{control:{type:"select"},options:Object.values(f)},variant:{control:{type:"select"},options:Object.values(c)},size:{control:{type:"select"},options:Object.values(p)},onClick:{action:"click"}}},j=s=>d({components:{NyxBadge:m},setup(){return{args:s}},template:`
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `}),y=(s,t)=>()=>d({components:{NyxBadge:m},setup(){const a=Object.values(t);return{prop:s,values:a,getLabel:e=>$(t,e),onDismiss:()=>alert("Dismiss")}},template:`
    <div class="flex-col">
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
        >{{ getLabel(value) }}</nyx-badge>
      </div>
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
          hasClose
        >{{ getLabel(value) }}</nyx-badge>
      </div>
    </div>
  `}),o=j({}),r=y("theme",f),n=y("variant",c),i=y("size",p);o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"Template({})",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAllProp('theme', NyxTheme)",...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"TemplateAllProp('variant', NyxVariant)",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"TemplateAllProp('size', NyxSize)",...i.parameters?.docs?.source}}};const P=["Default","Themes","Variants","Sizes"];export{o as Default,i as Sizes,r as Themes,n as Variants,P as __namedExportsOrder,L as default};
