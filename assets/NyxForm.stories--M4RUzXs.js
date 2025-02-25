import{d as r,r as a}from"./vue.esm-bundler-rm72CWhh.js";import{_ as m,a as s}from"./NyxFormField-BOwZWD8s.js";import{_ as l}from"./NyxInput-CO23DjyE.js";import{_ as p}from"./NyxSwitch-SS8LJkPW.js";import{_ as n}from"./NyxSelect-BDapdEuL.js";import{b as i}from"./common-D9Lon2f2.js";import"./useTeleportPosition-BZupKNp6.js";import"./number-BSU09LqX.js";import"./style-DbUoAtrk.js";const T={title:"Components/NyxForm",component:m,argTypes:{}},c=e=>r({components:{NyxForm:m},setup(){return{args:e}},template:`
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `}),f=()=>()=>r({components:{NyxForm:m,NyxFormField:s,NyxInput:l,NyxSwitch:p,NyxSelect:n},setup(){return{options:a(Object.values(i).map(e=>({label:e,value:e})))}},template:`
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
  `}),t=c({}),o=f();t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"Template({})",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateFullExample()",...o.parameters?.docs?.source}}};const E=["Default","ExampleForm"];export{t as Default,o as ExampleForm,E as __namedExportsOrder,T as default};
