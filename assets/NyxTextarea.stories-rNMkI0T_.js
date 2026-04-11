import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{O as r,T as i,k as a,l as o,t as s,u as c}from"./utils-CVfGrNSp.js";import{i as l,n as u,r as d,t as f}from"./NyxFormField-E3xLiAWA.js";import{n as p,t as m}from"./NyxTextarea-D0L2Q2j_.js";var h,g,_,v,y,b,x,S;e((()=>{t(),p(),c(),s(),l(),u(),h={title:`Components/NyxTextarea`,component:m,argTypes:{theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(i)}}},g=e=>n({components:{NyxTextarea:m},setup(){return{args:e}},template:`
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
  `}),v=g({}),y=_(`theme`,r),b=_(`variant`,a),x=_(`size`,i),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...x.parameters?.docs?.source}}},S=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{v as Default,x as Sizes,y as Themes,b as Variants,S as __namedExportsOrder,h as default};