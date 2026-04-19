import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{N as r,b as i,u as a}from"./utils-I3j1AIuu.js";import{n as o,t as s}from"./NyxButton-2tBI-Q1t.js";import{n as c,t as l}from"./NyxButtonGroup-UC9h3vMN.js";var u,d,f,p,m,h,g;e((()=>{t(),c(),o(),a(),u=[`Primary`,`Secondary`,`Tertiary`],d={title:`Components/Basic/NyxButtonGroup`,component:l,argTypes:{direction:{control:{type:`select`},options:Object.values(i)},variant:{control:{type:`select`},options:[r.Soft,r.Ghost]}},args:{direction:i.Horizontal,variant:r.Ghost}},f=e=>n({components:{NyxButtonGroup:l,NyxButton:s},setup(){return{args:e,labels:u}},template:`
    <nyx-button-group v-bind="args">
      <nyx-button v-for="label in labels" :key="label">
        {{ label }}
      </nyx-button>
    </nyx-button-group>
  `}),p={render:e=>f(e)},m={args:{direction:i.Vertical},render:e=>f(e)},h={args:{variant:r.Soft},render:e=>f(e)},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args: NyxButtonGroupProps) => renderGroup(args)
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    direction: NyxDirection.Vertical
  },
  render: (args: NyxButtonGroupProps) => renderGroup(args)
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: NyxVariant.Soft
  },
  render: (args: NyxButtonGroupProps) => renderGroup(args)
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Vertical`,`Soft`]}))();export{p as Default,h as Soft,m as Vertical,g as __namedExportsOrder,d as default};