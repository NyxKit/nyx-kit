import{n as e}from"./chunk-BneVvdWh.js";import{i as t,x as n}from"./iframe-DKH6pIYo.js";import{N as r,P as i,a,f as o,g as s,j as c,y as l}from"./composables-CoSPR3z5.js";import{i as u,n as d,r as f,t as p}from"./NyxFormField-vrO0ZkT5.js";import{n as m,t as h}from"./NyxSelect-o73Hclj2.js";var g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{t(),m(),s(),a(),u(),d(),g=Object.values(r).map(e=>({label:e,value:e})),_=[{label:`Brand`,options:[{label:`Primary`,value:r.Primary},{label:`Secondary`,value:r.Secondary}]},{label:`Status`,options:[{label:`Info`,value:r.Info},{label:`Success`,value:r.Success},{label:`Warning`,value:r.Warning},{label:`Danger`,value:r.Danger}]}],v={title:`Components/NyxSelect`,component:h,argTypes:{type:{control:{type:`select`},options:Object.values(l)},theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(c)}},args:{options:g}},y=e=>n({components:{NyxSelect:h},inheritAttrs:!1,setup(){return{args:e}},template:`
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `}),b=(e,t)=>()=>n({components:{NyxSelect:h,NyxForm:f,NyxFormField:p},setup(){return{prop:e,values:Object.values(t),getLabel:e=>o(t,e),options:g}},template:`
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
  `}),x=y({options:g}),S=()=>n({components:{NyxSelect:h},setup(){return{options:_}},template:`<nyx-select :options="options" placeholder="NyxSelect" />`}),C=b(`type`,l),w=b(`theme`,r),T=b(`variant`,i),E=b(`size`,c),x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`Template({
  options
})`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    return {
      options: groupedOptions
    };
  },
  template: \`<nyx-select :options="options" placeholder="NyxSelect" />\`
})`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxSelectType)`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...E.parameters?.docs?.source}}},D=[`Default`,`WithGroups`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{x as Default,E as Sizes,w as Themes,C as Types,T as Variants,S as WithGroups,D as __namedExportsOrder,v as default};