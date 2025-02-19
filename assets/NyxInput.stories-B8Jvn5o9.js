import{d as c}from"./vue.esm-bundler-BOhbys1Y.js";import{N as m,_ as l}from"./NyxInput-qE92XNXR.js";import{a as i,b as u,c as y}from"./common-BBtRsYrk.js";import{g as f}from"./keydict-BK3rIzaC.js";import{a as v,_ as N}from"./NyxFormField-BXw7-jb-.js";const I={title:"Components/NyxInput",component:l,argTypes:{type:{control:{type:"select"},options:Object.values(m)},theme:{control:{type:"select"},options:Object.values(y)},variant:{control:{type:"select"},options:Object.values(u)},size:{control:{type:"select"},options:Object.values(i)}}},T=p=>c({components:{NyxInput:l},setup(){return{args:p}},template:`
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `}),o=(p,n)=>()=>c({components:{NyxInput:l,NyxForm:N,NyxFormField:v},setup(){const d=Object.values(n);return{prop:p,values:d,getLabel:x=>f(n,x)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-input
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),e=T({}),t=o("type",m),a=o("theme",y),s=o("variant",u),r=o("size",i);e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"Template({})",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"TemplateAll('type', NyxInputType)",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"TemplateAll('variant', NyxVariant)",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...r.parameters?.docs?.source}}};const O=["Default","Types","Themes","Variants","Sizes"];export{e as Default,r as Sizes,a as Themes,t as Types,s as Variants,O as __namedExportsOrder,I as default};
