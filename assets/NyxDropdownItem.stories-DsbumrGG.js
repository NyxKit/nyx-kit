import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{n as r,t as i}from"./NyxDropdownItem-behKhMKa.js";var a,o,s,c;e((()=>{t(),r(),a={title:`Components/NyxDropdownItem`,component:i},o=()=>n({components:{NyxDropdownItem:i},template:`
    <div style="min-width: 12rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'Open', value: 'open' }" />
      <nyx-dropdown-item :option="{ label: 'Disabled', value: 'disabled', disabled: true }" />
    </div>
  `}),s=()=>n({components:{NyxDropdownItem:i},template:`
    <div style="min-width: 18rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'A very long menu label that should still read cleanly', value: 'long' }" />
    </div>
  `}),o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxDropdownItem
  },
  template: \`
    <div style="min-width: 12rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'Open', value: 'open' }" />
      <nyx-dropdown-item :option="{ label: 'Disabled', value: 'disabled', disabled: true }" />
    </div>
  \`
})`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxDropdownItem
  },
  template: \`
    <div style="min-width: 18rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md); overflow: hidden;">
      <nyx-dropdown-item :option="{ label: 'A very long menu label that should still read cleanly', value: 'long' }" />
    </div>
  \`
})`,...s.parameters?.docs?.source}}},c=[`Default`,`LongLabel`]}))();export{o as Default,s as LongLabel,c as __namedExportsOrder,a as default};