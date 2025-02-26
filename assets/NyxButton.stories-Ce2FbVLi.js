import{d as v,c as N}from"./vue.esm-bundler-CW8VNZbY.js";import{_ as u}from"./NyxButton-4u1vuCQ7.js";import{N as y,a as h,b as e,c as b}from"./common-D0hF21is.js";import{g as S}from"./keydict-BK3rIzaC.js";import"./useNyxProps-DzKGUGIw.js";const _={title:"Components/NyxButton",component:u,argTypes:{type:{control:{type:"select"},options:["button","submit","reset"]},theme:{control:{type:"select"},options:Object.values(e)},gradient:{control:{type:"select"},options:[!0,!1,...Object.values(e)]},backlight:{control:{type:"select"},options:[!0,!1,...Object.values(e)]},variant:{control:{type:"select"},options:Object.values(h)},size:{control:{type:"select"},options:Object.values(y)},shape:{control:{type:"select"},options:Object.values(b)},onClick:{action:"click"}}},k=s=>v({components:{NyxButton:u},setup(){return{args:s}},template:`
    <nyx-button v-bind="args" @click="onClick">Button</nyx-button>
  `}),t=(s,a)=>x=>v({components:{NyxButton:u},setup(){const d=Object.values(a),f=T=>S(a,T),g=N(()=>a===e);return{prop:s,values:d,getLabel:f,isTheme:g}},template:`
    <div class="flex">
      <nyx-button
        v-for="value of values"
        :key="value"
        :theme="isTheme ? value : undefined"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-button>
    </div>
  `}),z=()=>()=>v({components:{NyxButton:u},setup(){const s=Object.values(e),a=Object.values(h),x=Object.values(y),d=Object.values(b);return{themes:s,variants:a,sizes:x,shapes:d}},template:`
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
  `}),o=k({}),r=t("theme",e),c=t("variant",h),l=t("shape",b),n=t("size",y),p=t("backlight",e),i=t("gradient",e),m=z();o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"Template({})",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAllProp('theme', NyxTheme)",...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"TemplateAllProp('variant', NyxVariant)",...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"TemplateAllProp('shape', NyxShape)",...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"TemplateAllProp('size', NyxSize)",...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"TemplateAllProp('backlight', NyxTheme)",...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"TemplateAllProp('gradient', NyxTheme)",...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"TemplateAll()",...m.parameters?.docs?.source}}};const C=["Default","Themes","Variants","Shapes","Sizes","Backlights","Gradients","All"];export{m as All,p as Backlights,o as Default,i as Gradients,l as Shapes,n as Sizes,r as Themes,c as Variants,C as __namedExportsOrder,_ as default};
