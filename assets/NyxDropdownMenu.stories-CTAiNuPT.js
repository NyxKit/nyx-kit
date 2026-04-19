import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{N as r,O as i,j as a,l as o,t as s,u as c}from"./utils-I3j1AIuu.js";import{n as l,t as u}from"./NyxDropdownMenu-DPIGj0h2.js";var d,f,p,m,h,g,_,v,y;e((()=>{t(),l(),c(),s(),d=[{label:`View`,value:`view`,icon:`search`},{label:`Rename`,value:`rename`,icon:`edit`},{label:`Archive`,value:`archive`,disabled:!0,icon:`alert-circle`}],f={title:`Components/Navigation/NyxDropdownMenu`,component:u,argTypes:{theme:{control:{type:`select`},options:Object.values(a)},variant:{control:{type:`select`},options:Object.values(r)},size:{control:{type:`select`},options:Object.values(i)}}},p=e=>n({components:{NyxDropdownMenu:u},setup(){return{args:e}},template:`
    <div style="padding: 1rem; background: var(--nyx-c-bg-soft);">
      <nyx-dropdown-menu v-bind="args" />
    </div>
  `}),m=p({options:d,theme:a.Primary,size:i.Medium,variant:r.Filled}),h=(e,t)=>()=>n({components:{NyxDropdownMenu:u},setup(){return{prop:e,values:Object.values(t),getLabel:e=>o(t,e),sampleOptions:d}},template:`
    <div class="flex-col" style="gap: 1rem; align-items: flex-start;">
      <div
        v-for="value of values"
        :key="value"
        :class="{ 'flex-col': true }"
        style="gap: 0.5rem;"
      >
        <strong>{{ getLabel(value) }}</strong>
        <nyx-dropdown-menu v-bind="{ [prop]: value, options: sampleOptions }" />
      </div>
    </div>
  `}),g=h(`theme`,a),_=h(`variant`,r),v=h(`size`,i),m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`Template({
  options: sampleOptions,
  theme: NyxTheme.Primary,
  size: NyxSize.Medium,
  variant: NyxVariant.Filled
})`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...v.parameters?.docs?.source}}},y=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{m as Default,v as Sizes,g as Themes,_ as Variants,y as __namedExportsOrder,f as default};