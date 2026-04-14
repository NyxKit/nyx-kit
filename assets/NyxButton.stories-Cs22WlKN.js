import{n as e}from"./chunk-BneVvdWh.js";import{f as t,t as n,y as r}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as i,D as a,E as o,j as s,l as c,t as l,u}from"./utils-BWpCgr6y.js";import{n as d,t as f}from"./NyxButton-CLCQnChg.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{n(),d(),u(),l(),p={title:`Components/NyxButton`,component:f,argTypes:{type:{control:{type:`select`},options:[`button`,`submit`,`reset`]},theme:{control:{type:`select`},options:Object.values(i)},gradient:{control:{type:`select`},options:[!0,!1,...Object.values(i)]},backlight:{control:{type:`select`},options:[!0,!1,...Object.values(i)]},variant:{control:{type:`select`},options:Object.values(s)},size:{control:{type:`select`},options:Object.values(a)},shape:{control:{type:`select`},options:Object.values(o)},onClick:{action:`click`}}},m=e=>r({components:{NyxButton:f},setup(){return{args:e}},template:`
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `}),h=(e,n)=>a=>r({components:{NyxButton:f},setup(){return{prop:e,values:Object.values(n),getLabel:e=>c(n,e),isTheme:t(()=>n===i)}},template:`
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        :theme="isTheme ? value : undefined"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `}),g=()=>()=>r({components:{NyxButton:f},setup(){return{themes:Object.values(i),variants:Object.values(s),sizes:Object.values(a),shapes:Object.values(o)}},template:`
    <div class="flex-col">
      <div class="flex-col" v-for="shape of shapes" style="margin-bottom: 4rem">
        <div class="flex-col" v-for="size of sizes" style="margin-bottom: 2rem">
          <div class="flex" v-for="variant of variants">
            <nyx-button
              v-for="theme of themes"
              :key="value"
              :variant="variant"
              :theme="theme"
              :shape="shape"
              :size="size"
            >Click me</nyx-button>
          </div>
        </div>
      </div>
    </div>
  `}),_=m({}),v=h(`theme`,i),y=h(`variant`,s),b=h(`shape`,o),x=h(`size`,a),S=h(`backlight`,i),C=h(`gradient`,i),w=g(),_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`Template({})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAllProp('shape', NyxShape)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAllProp('backlight', NyxTheme)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAllProp('gradient', NyxTheme)`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`TemplateAll()`,...w.parameters?.docs?.source}}},T=[`Default`,`Themes`,`Variants`,`Shapes`,`Sizes`,`Backlights`,`Gradients`,`All`]}))();export{w as All,S as Backlights,_ as Default,C as Gradients,b as Shapes,x as Sizes,v as Themes,y as Variants,T as __namedExportsOrder,p as default};