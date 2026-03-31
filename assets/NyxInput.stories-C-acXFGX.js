import{n as e}from"./chunk-BneVvdWh.js";import{i as t,x as n}from"./iframe-BYYAMpcJ.js";import{Ct as r,It as i,Lt as a,Pt as o,o as s,p as c,yt as l}from"./composables-CVw7ESGk.js";import{i as u,n as d,r as f,t as p}from"./NyxFormField-Dx937LFy.js";import{n as m,t as h}from"./NyxInput-CZprq4oG.js";var g,_,v,y,b,x,S,C,w;e((()=>{t(),m(),l(),s(),u(),d(),g={title:`Components/NyxInput`,component:h,argTypes:{type:{control:{type:`select`},options:Object.values(r)},theme:{control:{type:`select`},options:Object.values(i)},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(o)}}},_=e=>n({components:{NyxInput:h},setup(){return{args:e}},template:`
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `}),v=(e,t)=>()=>n({components:{NyxInput:h,NyxForm:f,NyxFormField:p},setup(){return{prop:e,values:Object.values(t),getLabel:e=>c(t,e)}},template:`
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
  `}),y=_({}),b=v(`type`,r),x=v(`theme`,i),S=v(`variant`,a),C=v(`size`,o),y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`Template({})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxInputType)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...C.parameters?.docs?.source}}},w=[`Default`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{y as Default,C as Sizes,x as Themes,b as Types,S as Variants,w as __namedExportsOrder,g as default};