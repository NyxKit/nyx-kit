import{d as i}from"./vue.esm-bundler-CW8VNZbY.js";import{N as u,_ as c}from"./NyxSelect-BoIIbf57.js";import{N as y,a as d,b as p}from"./common-D0hF21is.js";import{g as v}from"./keydict-BK3rIzaC.js";import{a as N,_ as S}from"./NyxFormField-BonwxpOR.js";import"./useTeleportPosition-CGa1nf0n.js";import"./number-BSU09LqX.js";import"./style-DbUoAtrk.js";const m=Object.values(p).map(e=>({label:e,value:e})),L={title:"Components/NyxSelect",component:c,argTypes:{type:{control:{type:"select"},options:Object.values(u)},theme:{control:{type:"select"},options:Object.values(p)},variant:{control:{type:"select"},options:Object.values(d)},size:{control:{type:"select"},options:Object.values(y)}},args:{options:m}},T=e=>i({components:{NyxSelect:c},setup(){return{args:e}},template:`
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `}),l=(e,n)=>()=>i({components:{NyxSelect:c,NyxForm:S,NyxFormField:N},setup(){const x=Object.values(n);return{prop:e,values:x,getLabel:f=>v(n,f),options:m}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-select
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
            :options="options"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),t=T({options:m}),a=l("type",u),s=l("theme",p),o=l("variant",d),r=l("size",y);t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`Template({
  options
})`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"TemplateAll('type', NyxSelectType)",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateAll('variant', NyxVariant)",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...r.parameters?.docs?.source}}};const D=["Default","Types","Themes","Variants","Sizes"];export{t as Default,r as Sizes,s as Themes,a as Types,o as Variants,D as __namedExportsOrder,L as default};
