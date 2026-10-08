import{n as e}from"./chunk-BneVvdWh.js";import{S as t,m as n,t as r}from"./vue.esm-bundler-BCs4lh10.js";import{D as i,S as a,T as o,i as s,x as c}from"./string-CevuJH_I.js";import{n as l,t as u}from"./NyxButton-BgZiJkK2.js";import{c as d,t as f}from"./utils-DImGTvri.js";var p,m,h,g,_,v,y,b,x,S,C,w,T;e((()=>{r(),l(),s(),f(),p={title:`Components/Basic/NyxButton`,component:u,argTypes:{type:{control:{type:`select`},options:[`button`,`submit`,`reset`]},theme:{control:{type:`select`},options:Object.values(o)},gradient:{control:{type:`select`},options:[!0,!1,...Object.values(o)]},backlight:{control:{type:`select`},options:[!0,!1,...Object.values(o)]},variant:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(a)},shape:{control:{type:`select`},options:Object.values(c)},onClick:{action:`click`}}},m=e=>t({components:{NyxButton:u},setup(){return{args:e}},template:`
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `}),h=(e,r)=>i=>t({components:{NyxButton:u},setup(){return{prop:e,values:Object.values(r),getLabel:e=>d(r,e),isTheme:n(()=>r===o)}},template:`
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        :theme="isTheme ? value : undefined"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `}),g=()=>()=>t({components:{NyxButton:u},setup(){return{themes:Object.values(o),variants:Object.values(i),sizes:Object.values(a),shapes:Object.values(c)}},template:`
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
  `}),_=m({}),v=h(`theme`,o),y=h(`variant`,i),b=h(`shape`,c),x=h(`size`,a),S=h(`backlight`,o),C=h(`gradient`,o),w=g(),_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`Template({})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`TemplateAllProp('shape', NyxShape)`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`TemplateAllProp('backlight', NyxTheme)`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`TemplateAllProp('gradient', NyxTheme)`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`TemplateAll()`,...w.parameters?.docs?.source}}},T=[`Default`,`Themes`,`Variants`,`Shapes`,`Sizes`,`Backlights`,`Gradients`,`All`]}))();export{w as All,S as Backlights,_ as Default,C as Gradients,b as Shapes,x as Sizes,v as Themes,y as Variants,T as __namedExportsOrder,p as default};