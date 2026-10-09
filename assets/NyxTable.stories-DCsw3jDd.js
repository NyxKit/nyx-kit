import{n as e}from"./chunk-BneVvdWh.js";import{S as t,t as n}from"./vue.esm-bundler-BCs4lh10.js";import{D as r,S as i,T as a,i as o}from"./string-CevuJH_I.js";import{n as s,t as c}from"./NyxButton-DXBWTIf7.js";import{c as l,t as u}from"./utils-DImGTvri.js";import{n as d,t as f}from"./NyxTable-Rk3K_2zB.js";var p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{n(),d(),o(),u(),s(),p=[{id:`0`,name:`Lorem`,description:`Lorem ipsum dolor sit amet`},{id:`1`,name:`Ipsum`,description:`Lorem ipsum dolor sit amet`},{id:`2`,name:`Dolor`,description:`Lorem ipsum dolor sit amet`},{id:`3`,name:`Sit`,description:`Lorem ipsum dolor sit amet`},{id:`4`,name:`Amet`,description:`Lorem ipsum dolor sit amet`},{id:`5`,name:`Lorem`,description:`Lorem ipsum dolor sit amet`}],m={title:`Components/Data/NyxTable`,component:f,argTypes:{theme:{control:{type:`select`},options:Object.values(a)},variant:{control:{type:`select`},options:Object.values(r)},size:{control:{type:`select`},options:Object.values(i)}},args:{modelValue:p}},h=e=>t({components:{NyxTable:f},setup(){return{args:e}},template:`
    <nyx-table v-bind="args" />
  `}),g=()=>()=>t({components:{NyxTable:f,NyxButton:c},setup(){return{data:p,NyxSize:i,NyxTheme:a}},template:`
    <nyx-table v-model="data">
      <template #actions="{ item }">
        <nyx-button :size="NyxSize.Xsmall" :theme="NyxTheme.Danger">{{ item.name }}</nyx-button>
      </template>
    </nyx-table>
  `}),_=(e,n)=>()=>t({components:{NyxTable:f,NyxButton:c},setup(){return{prop:e,values:Object.values(n),getLabel:e=>l(n,e),data:p,NyxSize:i,NyxTheme:a,NyxVariant:r}},template:`
    <div class="flex-col gap-xl">
      <nyx-table v-model="data" v-bind="{ [prop]: value }" v-for="value of values">
        <template #actions="{ item }">
          <nyx-button
            :variant="prop === 'variant' ? value : NyxVariant.Filled"
            :size="prop === 'size' ? value : NyxSize.XSmall"
            :theme="prop === 'theme' ? value : NyxTheme.Danger"
          >{{ getLabel(value) }}</nyx-button>
        </template>
      </nyx-table>
    </div>
  `}),v=h({}),y=g(),b=()=>t({components:{NyxTable:f,NyxButton:c},setup(){return{data:p,NyxSize:i,NyxTheme:a,alertId:e=>window.alert(e)}},template:`
    <nyx-table v-model="data" :col-exclude="['id']">
      <template #actions="{ item }">
        <nyx-button
          :size="NyxSize.Xsmall"
          :theme="NyxTheme.Danger"
          @click="alertId(item.id)"
        >Alert ID</nyx-button>
      </template>
    </nyx-table>
  `}),x=_(`theme`,a),S=_(`variant`,r),C=_(`size`,i),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateActions()`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTable,
    NyxButton
  },
  setup() {
    const alertId = (id: string) => window.alert(id);
    return {
      data,
      NyxSize,
      NyxTheme,
      alertId
    };
  },
  template: \`
    <nyx-table v-model="data" :col-exclude="['id']">
      <template #actions="{ item }">
        <nyx-button
          :size="NyxSize.Xsmall"
          :theme="NyxTheme.Danger"
          @click="alertId(item.id)"
        >Alert ID</nyx-button>
      </template>
    </nyx-table>
  \`
})`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...C.parameters?.docs?.source}}},w=[`Default`,`WithActions`,`WithHiddenIdActions`,`Themes`,`Variants`,`Sizes`]}))();export{v as Default,C as Sizes,x as Themes,S as Variants,y as WithActions,b as WithHiddenIdActions,w as __namedExportsOrder,m as default};