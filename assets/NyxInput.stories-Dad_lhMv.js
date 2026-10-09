import{n as e}from"./chunk-BneVvdWh.js";import{S as t,et as n,t as r}from"./vue.esm-bundler-BCs4lh10.js";import{D as i,S as a,T as o,c as s,i as c,l}from"./string-CevuJH_I.js";import{c as u,t as d}from"./utils-DImGTvri.js";import{n as f,t as p}from"./NyxInput-BGFzubt1.js";import{i as m,n as h,r as g,t as _}from"./NyxFormField-CNhQyKk5.js";var v,y,b,x,S,C,w,T,E,D,O,k,A;e((()=>{r(),f(),c(),d(),m(),h(),v={title:`Components/Form/NyxInput`,component:p,argTypes:{prefix:{control:`text`},suffix:{control:`text`},type:{control:{type:`select`},options:Object.values(l)},theme:{control:{type:`select`},options:Object.values(o)},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(a)}}},y=e=>t({components:{NyxInput:p},setup(){return{args:e}},template:`
    <nyx-input v-bind="args" :placeholder="'NyxInput'" />
  `}),b=(e,n)=>()=>t({components:{NyxInput:p,NyxForm:g,NyxFormField:_},setup(){return{prop:e,values:Object.values(n),getLabel:e=>u(n,e)}},template:`
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
  `}),x={render:()=>y({})},S={render:()=>y({prefix:`$`,placeholder:`Amount`})},C={render:()=>y({suffix:`kg`,placeholder:`Weight`})},w={render:()=>y({prefix:`$`,suffix:`USD`,placeholder:`Total`})},T={render:()=>b(`type`,l)()},E={render:()=>t({components:{NyxInput:p},setup(){return{value:n(`0.3`),NyxInputType:l,NyxInputNumberControls:s}},template:`
      <nyx-input
        v-model="value"
        :type="NyxInputType.Number"
        :step="0.05"
        :number-controls="NyxInputNumberControls.Stacked"
      />
    `})},D={render:()=>b(`theme`,o)()},O={render:()=>b(`variant`,i)()},k={render:()=>b(`size`,a)()},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => Template({})
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    prefix: '$',
    placeholder: 'Amount'
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    suffix: 'kg',
    placeholder: 'Weight'
  })
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    prefix: '$',
    suffix: 'USD',
    placeholder: 'Total'
  })
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('type', NyxInputType)()
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxInput
    },
    setup() {
      const value = ref('0.3');
      return {
        value,
        NyxInputType,
        NyxInputNumberControls
      };
    },
    template: \`
      <nyx-input
        v-model="value"
        :type="NyxInputType.Number"
        :step="0.05"
        :number-controls="NyxInputNumberControls.Stacked"
      />
    \`
  })
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('theme', NyxTheme)()
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('variant', NyxVariant)()
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => TemplateAll('size', NyxSize)()
}`,...k.parameters?.docs?.source}}},A=[`Default`,`WithPrefix`,`WithSuffix`,`WithPrefixAndSuffix`,`Types`,`DecimalNumberStepper`,`Themes`,`Variants`,`Sizes`]}))();export{E as DecimalNumberStepper,x as Default,k as Sizes,D as Themes,T as Types,O as Variants,S as WithPrefix,w as WithPrefixAndSuffix,C as WithSuffix,A as __namedExportsOrder,v as default};