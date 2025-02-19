import{d as r,r as a}from"./vue.esm-bundler-BOhbys1Y.js";import{_ as m,a as s}from"./NyxFormField-BXw7-jb-.js";import{_ as l}from"./NyxInput-qE92XNXR.js";import{_ as n}from"./NyxSwitch-B1nElVPT.js";import{_ as p}from"./NyxSelect--RkeIidX.js";import{c as i}from"./common-BBtRsYrk.js";import"./useTeleportPosition-CSHUcrKa.js";const b={title:"Components/NyxForm",component:m,argTypes:{}},c=e=>r({components:{NyxForm:m},setup(){return{args:e}},template:`
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
