import{n as e}from"./chunk-BneVvdWh.js";import{S as t,et as n,t as r}from"./vue.esm-bundler-BCs4lh10.js";import{T as i,i as a}from"./string-CevuJH_I.js";import{n as o,t as s}from"./NyxInput-BGFzubt1.js";import{i as c,n as l,r as u,t as d}from"./NyxFormField-CNhQyKk5.js";import{n as f,t as p}from"./NyxSwitch-5M4iJ2E7.js";import{n as m,t as h}from"./NyxSelect-Bve-7Oac.js";var g,_,v,y,b,x;e((()=>{r(),c(),l(),o(),f(),m(),a(),g={title:`Components/Form/NyxForm`,component:u,argTypes:{}},_=e=>t({components:{NyxForm:u},setup(){return{args:e}},template:`
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `}),v=()=>()=>t({components:{NyxForm:u,NyxFormField:d,NyxInput:s,NyxSwitch:p,NyxSelect:h},setup(){return{options:n(Object.values(i).map(e=>({label:e,value:e})))}},template:`
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
  `}),y=_({}),b=v(),y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`Template({})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateFullExample()`,...b.parameters?.docs?.source}}},x=[`Default`,`ExampleForm`]}))();export{y as Default,b as ExampleForm,x as __namedExportsOrder,g as default};