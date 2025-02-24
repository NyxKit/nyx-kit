import{d as m}from"./vue.esm-bundler-CfsXIL5g.js";import{N as c,_ as l}from"./NyxInput-CGsG6oBI.js";import{N as i,a as u,b as y}from"./common-D9Lon2f2.js";import{g as f}from"./keydict-BK3rIzaC.js";import{a as v,_ as N}from"./NyxFormField-DYIYNuxG.js";const I={title:"Components/NyxInput",component:l,argTypes:{type:{control:{type:"select"},options:Object.values(c)},theme:{control:{type:"select"},options:Object.values(y)},variant:{control:{type:"select"},options:Object.values(u)},size:{control:{type:"select"},options:Object.values(i)}}},T=p=>m({components:{NyxInput:l},setup(){return{args:p}},template:`
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `}),o=(p,n)=>()=>m({components:{NyxInput:l,NyxForm:N,NyxFormField:v},setup(){const d=Object.values(n);return{prop:p,values:d,getLabel:x=>f(n,x)}},template:`
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
  `}),e=T({}),t=o("type",c),a=o("theme",y),s=o("variant",u),r=o("size",i);e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"Template({})",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"TemplateAll('type', NyxInputType)",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"TemplateAll('variant', NyxVariant)",...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...r.parameters?.docs?.source}}};const O=["Default","Types","Themes","Variants","Sizes"];export{e as Default,r as Sizes,a as Themes,t as Types,s as Variants,O as __namedExportsOrder,I as default};
