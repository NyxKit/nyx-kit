import{n as e}from"./chunk-BneVvdWh.js";import{b as t,t as n}from"./vue.esm-bundler-BYSzMkkg.js";import{A as r,F as i,N as a,d as o,f as s,t as c}from"./utils-D7ENd3Hb.js";import{i as l,n as u,r as d,t as f}from"./NyxFormField-CQfrgRdf.js";import{n as p,t as m}from"./NyxSwitch-CidSs-n_.js";var h,g,_,v,y,b,x;e((()=>{n(),p(),s(),c(),l(),u(),h={title:`Components/Form/NyxSwitch`,component:m,argTypes:{theme:{control:{type:`select`},options:Object.values(a)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(r)}}},g=e=>t({components:{NyxSwitch:m},setup(){return{args:e}},template:`
    <nyx-switch v-bind="args" />
  `}),_=(e,n)=>()=>t({components:{NyxForm:d,NyxFormField:f,NyxSwitch:m},setup(){return{prop:e,values:Object.values(n),getLabel:e=>o(n,e)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-switch v-bind="{ [prop]: value }" :id="id" />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),v=g({}),y=_(`theme`,a),b=_(`size`,r),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...b.parameters?.docs?.source}}},x=[`Default`,`Themes`,`Sizes`]}))();export{v as Default,b as Sizes,y as Themes,x as __namedExportsOrder,h as default};