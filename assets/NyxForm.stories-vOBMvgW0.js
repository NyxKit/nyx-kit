import{d as r,r as a}from"./vue.esm-bundler-B2XWfG50.js";import{_ as m,a as s}from"./NyxFormField-CrACOEZC.js";import{_ as l}from"./NyxInput-rb9v4BTk.js";import{_ as n}from"./NyxSwitch-D3lZ9y5y.js";import{_ as p}from"./NyxSelect-BnjI103T.js";import{c as i}from"./common-BBtRsYrk.js";import"./useTeleportPosition-CHFxyZ6P.js";const b={title:"Components/NyxForm",component:m,argTypes:{}},c=e=>r({components:{NyxForm:m},setup(){return{args:e}},template:`
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `}),f=()=>()=>r({components:{NyxForm:m,NyxFormField:s,NyxInput:l,NyxSwitch:n,NyxSelect:p},setup(){return{options:a(Object.values(i).map(e=>({label:e,value:e})))}},template:`
    <nyx-form>
      <nyx-form-field label="Input">
        <template #default="{ id }">
          <nyx-input :id="id" />
        </template>
      </nyx-form-field>
      <nyx-form-field label="Select">
        <template #default="{ id }">
          <nyx-select :id="id" :options="options" />
        </template>
      </nyx-form-field>
      <nyx-form-field label="Switch">
        <template #default="{ id }">
          <nyx-switch :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),t=c({}),o=f();t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"Template({})",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateFullExample()",...o.parameters?.docs?.source}}};const S=["Default","ExampleForm"];export{t as Default,o as ExampleForm,S as __namedExportsOrder,b as default};
