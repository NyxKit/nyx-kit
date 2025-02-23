import{d as l}from"./vue.esm-bundler-DZGhvwA6.js";import{_ as p}from"./NyxTooltip-S4xujRWy.js";import{N as c,b as m,a as v}from"./common-BBDHxksy.js";import{N as u}from"./useTeleportPosition-Gnl-7-7k.js";import{g as T}from"./keydict-BK3rIzaC.js";import{_ as y}from"./NyxButton-E4GDMaYm.js";import"./useNyxProps-BX2TDVtI.js";const O={title:"Components/NyxTooltip",component:p,argTypes:{theme:{control:{type:"select"},options:Object.values(m)},position:{control:{type:"select"},options:Object.values(u)},size:{control:{type:"select"},options:Object.values(c)}}},b=n=>l({components:{NyxTooltip:p,NyxButton:y},setup(){return{args:n}},template:`
    <nyx-tooltip v-bind="args" :text="'Tooltip content'">
      <nyx-button>{{ Hover me }}</nyx-button>
    </nyx-tooltip>
  `}),r=(n,i)=>()=>l({components:{NyxTooltip:p,NyxButton:y},setup(){const x=Object.values(i);return{prop:n,values:x,getLabel:d=>T(i,d)}},template:`
    <div class="flex wrap">
      <nyx-tooltip
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
        :text="getLabel(value)"
      ><nyx-button v-bind="{ [prop]: value }">{{ getLabel(value) }}</nyx-button></nyx-tooltip>
    </div>
  `}),e=b({}),t=r("theme",m),o=r("position",u),s=r("variant",v),a=r("size",c);e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"Template({})",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateAll('position', NyxPosition)",...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"TemplateAll('variant', NyxVariant)",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...a.parameters?.docs?.source}}};const V=["Default","Themes","Positions","Variants","Sizes"];export{e as Default,o as Positions,a as Sizes,t as Themes,s as Variants,V as __namedExportsOrder,O as default};
