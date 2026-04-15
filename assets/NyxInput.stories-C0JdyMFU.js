import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as r,D as i,h as a,j as o,l as s,t as c,u as l}from"./utils-BWpCgr6y.js";import{i as u,n as d,r as f,t as p}from"./NyxFormField-4Lg2sEgk.js";import{n as m,t as h}from"./NyxInput-D3YkL9dz.js";var g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{t(),m(),l(),c(),u(),d(),g={title:`Components/NyxInput`,component:h,argTypes:{prefix:{control:`text`},suffix:{control:`text`},type:{control:{type:`select`},options:Object.values(a)},theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(o)},size:{control:{type:`select`},options:Object.values(i)}}},_=e=>n({components:{NyxInput:h},setup(){return{args:e}},template:`
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
  `}),y={render:()=>_({})},b={render:()=>_({prefix:`$`,placeholder:`Amount`})},x={render:()=>_({suffix:`kg`,placeholder:`Weight`})},S={render:()=>_({prefix:`$`,suffix:`USD`,placeholder:`Total`})},C={render:()=>v(`type`,a)()},w={render:()=>v(`theme`,r)()},T={render:()=>v(`variant`,o)()},E={render:()=>v(`size`,i)()},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => Template({})
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    prefix: '$',
    placeholder: 'Amount'
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    suffix: 'kg',
    placeholder: 'Weight'
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    prefix: '$',
    suffix: 'USD',
    placeholder: 'Total'
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('type', NyxInputType)()
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('theme', NyxTheme)()
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('variant', NyxVariant)()
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('size', NyxSize)()
}`,...E.parameters?.docs?.source}}},D=[`Default`,`WithPrefix`,`WithSuffix`,`WithPrefixAndSuffix`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{y as Default,E as Sizes,w as Themes,C as Types,T as Variants,b as WithPrefix,S as WithPrefixAndSuffix,x as WithSuffix,D as __namedExportsOrder,g as default};