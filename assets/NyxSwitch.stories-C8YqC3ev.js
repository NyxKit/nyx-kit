import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as r,F as i,N as a,c as o,f as s,t as c}from"./utils-BN10c1sN.js";import{i as l,n as u,r as d,t as f}from"./NyxFormField-o__mqYdy.js";import{n as p,t as m}from"./NyxSwitch-ky9K-Blt.js";var h,g,_,v,y,b,x;e((()=>{t(),p(),s(),c(),l(),u(),h={title:`Components/Form/NyxSwitch`,component:m,argTypes:{theme:{control:{type:`select`},options:Object.values(a)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(r)}}},g=e=>n({components:{NyxSwitch:m},setup(){return{args:e}},template:`
    <nyx-switch v-bind="args" />
  `}),_=(e,t)=>()=>n({components:{NyxForm:d,NyxFormField:f,NyxSwitch:m},setup(){return{prop:e,values:Object.values(t),getLabel:e=>o(t,e)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-switch v-bind="{ [prop]: value }" :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),v=g({}),y=_(`theme`,a),b=_(`size`,r),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...b.parameters?.docs?.source}}},x=[`Default`,`Themes`,`Sizes`]}))();export{v as Default,b as Sizes,y as Themes,x as __namedExportsOrder,h as default};