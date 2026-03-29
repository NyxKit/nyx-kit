import{n as e}from"./chunk-BneVvdWh.js";import{G as t,i as n,x as r}from"./iframe-w6ztlrld.js";import{N as i,g as a}from"./composables-BBoL0ZNj.js";import{i as o,n as s,r as c,t as l}from"./NyxFormField-ByXcc24M.js";import{n as u,t as d}from"./NyxInput-BhLLkt0g.js";import{n as f,t as p}from"./NyxSwitch-34mmZNPM.js";import{n as m,t as h}from"./NyxSelect-Cy1lcWI8.js";var g,_,v,y,b,x;e((()=>{n(),o(),s(),u(),f(),m(),a(),g={title:`Components/NyxForm`,component:c,argTypes:{}},_=e=>r({components:{NyxForm:c},setup(){return{args:e}},template:`
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