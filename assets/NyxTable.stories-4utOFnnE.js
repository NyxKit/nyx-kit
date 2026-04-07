import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{O as r,T as i,k as a,l as o,t as s,u as c}from"./utils-CVfGrNSp.js";import{n as l,t as u}from"./NyxButton-D5qXYlFj.js";import{n as d,t as f}from"./NyxTable-1_PDtcLf.js";var p,m,h,g,_,v,y,b,x,S,C;e((()=>{t(),d(),c(),s(),l(),p=[{id:`0`,name:`Lorem`,description:`Lorem ipsum dolor sit amet`},{id:`1`,name:`Ipsum`,description:`Lorem ipsum dolor sit amet`},{id:`2`,name:`Dolor`,description:`Lorem ipsum dolor sit amet`},{id:`3`,name:`Sit`,description:`Lorem ipsum dolor sit amet`},{id:`4`,name:`Amet`,description:`Lorem ipsum dolor sit amet`},{id:`5`,name:`Lorem`,description:`Lorem ipsum dolor sit amet`}],m={title:`Components/NyxTable`,component:f,argTypes:{theme:{control:{type:`select`},options:Object.values(r)},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(i)}},args:{modelValue:p}},h=e=>n({components:{NyxTable:f},setup(){return{args:e}},template:`
    <nyx-table v-bind="args" />
  `}),g=()=>()=>n({components:{NyxTable:f,NyxButton:u},setup(){return{data:p,NyxSize:i,NyxTheme:r}},template:`
    <nyx-table v-model="data">
      <template #actions="{ item }">
        <nyx-button :size="NyxSize.Xsmall" :theme="NyxTheme.Danger">{{ item.name }}</nyx-button>
      </template>
    </nyx-table>
  `}),_=(e,t)=>()=>n({components:{NyxTable:f,NyxButton:u},setup(){return{prop:e,values:Object.values(t),getLabel:e=>o(t,e),data:p,NyxSize:i,NyxTheme:r,NyxVariant:a}},template:`
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
  `}),v=h({}),y=g(),b=_(`theme`,r),x=_(`variant`,a),S=_(`size`,i),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`Template({})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateActions()`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...S.parameters?.docs?.source}}},C=[`Default`,`WithActions`,`Themes`,`Variants`,`Sizes`]}))();export{v as Default,S as Sizes,b as Themes,x as Variants,y as WithActions,C as __namedExportsOrder,m as default};