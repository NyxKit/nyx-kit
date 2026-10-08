import{n as e}from"./chunk-BneVvdWh.js";import{S as t,t as n}from"./vue.esm-bundler-BCs4lh10.js";import{T as r,i}from"./string-CevuJH_I.js";import{n as a,t as o}from"./NyxActionItem-9IKgL2bJ.js";var s,c,l,u,d,f,p;e((()=>{n(),a(),i(),s={title:`Components/Data/NyxActionItem`,component:o,argTypes:{theme:{control:{type:`select`},options:Object.values(r)},onClick:{action:`click`}}},c=()=>t({components:{NyxActionItem:o},template:`
    <div>
      <nyx-action-item title="Save Changes" action="Save">
        Save your changes to the database.
      </nyx-action-item>
    </div>
  `}),l=()=>t({components:{NyxActionItem:o},setup(){return{themes:Object.values(r)}},template:`
    <div class="flex-col" style="gap: 1rem;">
      <nyx-action-item
        v-for="theme in themes"
        :key="theme"
        :title="'Action ' + theme"
        :action="theme"
        :theme="theme"
      >
        This is a description for {{ theme }} theme.
      </nyx-action-item>
    </div>
  `}),u=()=>t({components:{NyxActionItem:o},template:`
    <div>
      <nyx-action-item title="Export Data">
        Export your data in various formats.
        <template #action>
          <div class="flex" style="gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">CSV</button>
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">JSON</button>
          </div>
        </template>
      </nyx-action-item>
    </div>
  `}),d=()=>t({components:{NyxActionItem:o},template:`
    <div>
      <nyx-action-item title="Information">
        This action item has no action button.
      </nyx-action-item>
    </div>
  `}),f=()=>t({components:{NyxActionItem:o},template:`
    <div>
      <nyx-action-item 
        title="Very Long Title That Should Truncate With Ellipsis" 
        action="Action"
      >
        This is a very long description that might wrap to multiple lines depending on the container width. It contains a lot of text to test the layout handling.
      </nyx-action-item>
    </div>
  `}),c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxActionItem
  },
  template: \`
    <div>
      <nyx-action-item title="Save Changes" action="Save">
        Save your changes to the database.
      </nyx-action-item>
    </div>
  \`
})`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxActionItem
  },
  setup() {
    const themes = Object.values(NyxTheme);
    return {
      themes
    };
  },
  template: \`
    <div class="flex-col" style="gap: 1rem;">
      <nyx-action-item
        v-for="theme in themes"
        :key="theme"
        :title="'Action ' + theme"
        :action="theme"
        :theme="theme"
      >
        This is a description for {{ theme }} theme.
      </nyx-action-item>
    </div>
  \`
})`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxActionItem
  },
  template: \`
    <div>
      <nyx-action-item title="Export Data">
        Export your data in various formats.
        <template #action>
          <div class="flex" style="gap: 0.5rem;">
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">CSV</button>
            <button style="padding: 0.5rem 1rem; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer;">JSON</button>
          </div>
        </template>
      </nyx-action-item>
    </div>
  \`
})`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxActionItem
  },
  template: \`
    <div>
      <nyx-action-item title="Information">
        This action item has no action button.
      </nyx-action-item>
    </div>
  \`
})`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxActionItem
  },
  template: \`
    <div>
      <nyx-action-item 
        title="Very Long Title That Should Truncate With Ellipsis" 
        action="Action"
      >
        This is a very long description that might wrap to multiple lines depending on the container width. It contains a lot of text to test the layout handling.
      </nyx-action-item>
    </div>
  \`
})`,...f.parameters?.docs?.source}}},p=[`Default`,`Themes`,`WithActionSlot`,`EmptyAction`,`LongText`]}))();export{c as Default,d as EmptyAction,f as LongText,l as Themes,u as WithActionSlot,p as __namedExportsOrder,s as default};