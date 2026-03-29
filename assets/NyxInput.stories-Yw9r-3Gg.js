import{n as e}from"./chunk-BneVvdWh.js";import{i as t,x as n}from"./iframe-DKH6pIYo.js";import{N as r,P as i,a,b as o,f as s,g as c,j as l}from"./composables-CoSPR3z5.js";import{i as u,n as d,r as f,t as p}from"./NyxFormField-vrO0ZkT5.js";import{n as m,t as h}from"./NyxInput-CSro91jj.js";var g,_,v,y,b,x,S,C,w;e((()=>{t(),m(),c(),a(),u(),d(),g={title:`Components/NyxInput`,component:h,argTypes:{type:{control:{type:`select`},options:Object.values(o)},theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(l)}}},_=e=>n({components:{NyxInput:h},setup(){return{args:e}},template:`
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `}),v=(e,t)=>()=>n({components:{NyxInput:h,NyxForm:f,NyxFormField:p},setup(){return{prop:e,values:Object.values(t),getLabel:e=>s(t,e)}},template:`
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
  `}),y=_({}),b=v(`type`,o),x=v(`theme`,r),S=v(`variant`,i),C=v(`size`,l),y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`Template({})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxInputType)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...C.parameters?.docs?.source}}},w=[`Default`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{y as Default,C as Sizes,x as Themes,b as Types,S as Variants,w as __namedExportsOrder,g as default};