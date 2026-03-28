import{n as e}from"./chunk-BneVvdWh.js";import{i as t,m as n,x as r}from"./iframe-UZltYRQm.js";import{A as i,N as a,P as o,a as s,f as c,g as l,j as u}from"./composables-CJuhraA_.js";import{n as d,t as f}from"./NyxButton-Cef6wilO.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{t(),d(),l(),s(),p={title:`Components/NyxButton`,component:f,argTypes:{type:{control:{type:`select`},options:[`button`,`submit`,`reset`]},theme:{control:{type:`select`},options:Object.values(a)},gradient:{control:{type:`select`},options:[!0,!1,...Object.values(a)]},backlight:{control:{type:`select`},options:[!0,!1,...Object.values(a)]},variant:{control:{type:`select`},options:Object.values(o)},size:{control:{type:`select`},options:Object.values(u)},shape:{control:{type:`select`},options:Object.values(i)},onClick:{action:`click`}}},m=e=>r({components:{NyxButton:f},setup(){return{args:e}},template:`
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `}),h=(e,t)=>i=>r({components:{NyxButton:f},setup(){return{prop:e,values:Object.values(t),getLabel:e=>c(t,e),isTheme:n(()=>t===a)}},template:`
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        :theme="isTheme ? value : undefined"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `}),g=()=>()=>r({components:{NyxButton:f},setup(){return{themes:Object.values(a),variants:Object.values(o),sizes:Object.values(u),shapes:Object.values(i)}},template:`
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
  `}),_=m({}),v=h(`theme`,a),y=h(`variant`,o),b=h(`shape`,i),x=h(`size`,u),S=h(`backlight`,a),C=h(`gradient`,a),w=g(),_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`Template({})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAllProp('shape', NyxShape)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAllProp('backlight', NyxTheme)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAllProp('gradient', NyxTheme)`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`TemplateAll()`,...w.parameters?.docs?.source}}},T=[`Default`,`Themes`,`Variants`,`Shapes`,`Sizes`,`Backlights`,`Gradients`,`All`]}))();export{w as All,S as Backlights,_ as Default,C as Gradients,b as Shapes,x as Sizes,v as Themes,y as Variants,T as __namedExportsOrder,p as default};