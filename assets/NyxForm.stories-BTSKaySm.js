import{d as r,r as a}from"./vue.esm-bundler-CW8VNZbY.js";import{_ as m,a as s}from"./NyxFormField-BonwxpOR.js";import{_ as l}from"./NyxInput-DbTUXITA.js";import{_ as p}from"./NyxSwitch-CrR3XRKS.js";import{_ as i}from"./NyxSelect-BHDK9gfQ.js";import{b as n}from"./common-D0hF21is.js";import"./useNyxProps-4Ss1XjVC.js";import"./useTeleportPosition-CGa1nf0n.js";import"./number-BSU09LqX.js";import"./style-DbUoAtrk.js";const E={title:"Components/NyxForm",component:m,argTypes:{}},c=e=>r({components:{NyxForm:m},setup(){return{args:e}},template:`
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `}),f=()=>()=>r({components:{NyxForm:m,NyxFormField:s,NyxInput:l,NyxSwitch:p,NyxSelect:i},setup(){return{options:a(Object.values(n).map(e=>({label:e,value:e})))}},template:`
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
  `}),t=c({}),o=f();t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"Template({})",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateFullExample()",...o.parameters?.docs?.source}}};const g=["Default","ExampleForm"];export{t as Default,o as ExampleForm,g as __namedExportsOrder,E as default};
