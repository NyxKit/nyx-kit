import{n as e}from"./chunk-BneVvdWh.js";import{i as t,x as n}from"./iframe-DKH6pIYo.js";import{N as r,P as i,a,f as o,g as s,j as c}from"./composables-CoSPR3z5.js";import{i as l,n as u,r as d,t as f}from"./NyxFormField-vrO0ZkT5.js";import{n as p,t as m}from"./NyxTextarea-DpJGSH15.js";var h,g,_,v,y,b,x,S;e((()=>{t(),p(),s(),a(),l(),u(),h={title:`Components/NyxTextarea`,component:m,argTypes:{theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(c)}}},g=e=>n({components:{NyxTextarea:m},setup(){return{args:e}},template:`
    <nyx-textarea v-bind="args" :placeholder="'NyxTextarea'" />
  `}),_=(e,t)=>()=>n({components:{NyxTextarea:m,NyxForm:d,NyxFormField:f},setup(){return{prop:e,values:Object.values(t),getLabel:e=>o(t,e)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-textarea
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),v=g({}),y=_(`theme`,r),b=_(`variant`,i),x=_(`size`,c),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...x.parameters?.docs?.source}}},S=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{v as Default,x as Sizes,y as Themes,b as Variants,S as __namedExportsOrder,h as default};