import{d as m}from"./vue.esm-bundler-CJj2rol9.js";import{_ as o}from"./NyxSwitch-D80LVg2k.js";import{N as c,a as u,b as l}from"./common-BBDHxksy.js";import{g as y}from"./keydict-BK3rIzaC.js";import{a as d,_ as f}from"./NyxFormField-D5RoB5EQ.js";const g={title:"Components/NyxSwitch",component:o,argTypes:{theme:{control:{type:"select"},options:Object.values(l)},variant:{control:{type:"select"},options:Object.values(u)},size:{control:{type:"select"},options:Object.values(c)}}},x=a=>m({components:{NyxSwitch:o},setup(){return{args:a}},template:`
    <nyx-switch v-bind="args" />
  `}),n=(a,r)=>()=>m({components:{NyxForm:f,NyxFormField:d,NyxSwitch:o},setup(){const p=Object.values(r);return{prop:a,values:p,getLabel:i=>y(r,i)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-switch v-bind="{ [prop]: value }" :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),e=x({}),t=n("theme",l),s=n("size",c);e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"Template({})",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...s.parameters?.docs?.source}}};const T=["Default","Themes","Sizes"];export{e as Default,s as Sizes,t as Themes,T as __namedExportsOrder,g as default};
