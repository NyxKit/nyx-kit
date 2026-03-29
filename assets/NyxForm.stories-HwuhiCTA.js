import{n as e}from"./chunk-BneVvdWh.js";import{G as t,i as n,x as r}from"./iframe-BnzjW9vR.js";import{N as i,g as a}from"./composables-Dh3ovrBi.js";import{i as o,n as s,r as c,t as l}from"./NyxFormField-BCyY2_VV.js";import{n as u,t as d}from"./NyxInput-CWW1HPO-.js";import{n as f,t as p}from"./NyxSwitch-CZ7rUt61.js";import{n as m,t as h}from"./NyxSelect-DQI6MSXk.js";var g,_,v,y,b,x;e((()=>{n(),o(),s(),u(),f(),m(),a(),g={title:`Components/NyxForm`,component:c,argTypes:{}},_=e=>r({components:{NyxForm:c},setup(){return{args:e}},template:`
    <nyx-form v-bind="args" @click="onClick">Form</nyx-form>
  `}),v=()=>()=>r({components:{NyxForm:c,NyxFormField:l,NyxInput:d,NyxSwitch:p,NyxSelect:h},setup(){return{options:t(Object.values(i).map(e=>({label:e,value:e})))}},template:`
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