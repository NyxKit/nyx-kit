import{d,e as b,j as h,l as z,f as B,q as k,u as v,s as C,n as V,g as x,x as g,y as S}from"./vue.esm-bundler-CW8VNZbY.js";import{N as p,a as c,b as f,c as T}from"./common-D0hF21is.js";import{_ as D}from"./NyxButton-cKLhLVyV.js";import{g as $}from"./keydict-BK3rIzaC.js";import"./useNyxProps-4Ss1XjVC.js";const m=d({__name:"NyxBadge",props:{disabled:{type:Boolean,default:!1},theme:{default:f.Default},variant:{default:c.Solid},size:{default:p.Medium},hasClose:{type:Boolean,default:!1}},emits:["click","close"],setup(s,{emit:t}){const a=s,u=t;return(l,e)=>(x(),b("div",{class:V(["nyx-badge",[{"nyx-badge--closable":l.hasClose},`theme-${a.theme}`,`variant-${a.variant}`,`size-${a.size}`]]),onClick:e[1]||(e[1]=C(N=>u("click"),["self"]))},[h("span",null,[k(l.$slots,"default",{},()=>[e[2]||(e[2]=g("NyxBadge"))])]),l.hasClose?(x(),z(D,{key:0,class:"nyx-badge__button",size:a.size,shape:v(T).Circle,variant:v(c).Ghost,onClick:e[0]||(e[0]=N=>u("close"))},{default:S(()=>e[3]||(e[3]=[g("×")])),_:1},8,["size","shape","variant"])):B("",!0)],2))}});m.__docgenInfo={exportName:"default",displayName:"NyxBadge",description:"",tags:{},props:[{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"variant",required:!1,type:{name:"NyxVariant"},defaultValue:{func:!1,value:"NyxVariant.Solid"}},{name:"size",required:!1,type:{name:"NyxSize"},defaultValue:{func:!1,value:"NyxSize.Medium"}},{name:"hasClose",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click"},{name:"close"}],slots:[{name:"default"}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxBadge/NyxBadge.vue"]};const P={title:"Components/NyxBadge",component:m,argTypes:{theme:{control:{type:"select"},options:Object.values(f)},variant:{control:{type:"select"},options:Object.values(c)},size:{control:{type:"select"},options:Object.values(p)},onClick:{action:"click"}}},j=s=>d({components:{NyxBadge:m},setup(){return{args:s}},template:`
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
  `}),o=j({}),r=y("theme",f),n=y("variant",c),i=y("size",p);o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"Template({})",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAllProp('theme', NyxTheme)",...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"TemplateAllProp('variant', NyxVariant)",...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"TemplateAllProp('size', NyxSize)",...i.parameters?.docs?.source}}};const M=["Default","Themes","Variants","Sizes"];export{o as Default,i as Sizes,r as Themes,n as Variants,M as __namedExportsOrder,P as default};
