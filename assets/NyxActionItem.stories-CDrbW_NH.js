import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,N as r,Q as i,U as a,_ as o,g as s,h as c,m as l,p as u,t as d,tt as f,y as p}from"./vue.esm-bundler-C_Vkk7g_.js";import{N as m,O as h,j as g,u as _}from"./utils-I3j1AIuu.js";import{o as v,t as y}from"./composables-CT8Ab5sb.js";import{n as b,t as x}from"./NyxButton-DhWB_Sho.js";var S=e((()=>{})),C,w,T,E,D,O=e((()=>{d(),S(),_(),y(),b(),C={class:`nyx-action-item__title`},w={class:`nyx-action-item__description`},T={class:`nyx-action-item__description-text`},E={class:`nyx-action-item__action`},D=p({__name:`NyxActionItem`,props:{title:{},theme:{},description:{},action:{}},emits:[`click`],setup(e,{emit:d}){let p=e,g=d,{classList:_}=v(p,{origin:`NyxActionItem`});return(d,v)=>(n(),s(`div`,{class:t([`nyx-action-item`,i(_)])},[u(`span`,C,f(e.title),1),u(`div`,w,[r(d.$slots,`default`,{},()=>[u(`p`,T,f(e.description),1)])]),u(`div`,E,[r(d.$slots,`action`,{},()=>[p.action?(n(),l(x,{key:0,theme:p.theme,size:i(h).Small,variant:i(m).Soft,onClick:v[0]||=e=>g(`click`)},{default:a(()=>[o(f(p.action),1)]),_:1},8,[`theme`,`size`,`variant`])):c(``,!0)])])],2))}})})),k,A=e((()=>{O(),O(),k=D,D.__docgenInfo=Object.assign({displayName:D.name??D.__name},{exportName:`default`,displayName:`NyxActionItem`,description:``,tags:{},props:[{name:`title`,required:!0,type:{name:`string`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`description`,required:!1,type:{name:`string`}},{name:`action`,required:!1,type:{name:`string`}}],events:[{name:`click`}],slots:[{name:`default`},{name:`action`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxActionItem/NyxActionItem.vue`]})})),j,M,N,P,F,I,L;e((()=>{d(),A(),_(),j={title:`Components/NyxActionItem`,component:k,argTypes:{theme:{control:{type:`select`},options:Object.values(g)},onClick:{action:`click`}}},M=()=>p({components:{NyxActionItem:k},template:`
    <div>
      <nyx-action-item title="Save Changes" action="Save">
        Save your changes to the database.
      </nyx-action-item>
    </div>
  `}),N=()=>p({components:{NyxActionItem:k},setup(){return{themes:Object.values(g)}},template:`
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
  `}),P=()=>p({components:{NyxActionItem:k},template:`
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
  `}),F=()=>p({components:{NyxActionItem:k},template:`
    <div>
      <nyx-action-item title="Information">
        This action item has no action button.
      </nyx-action-item>
    </div>
  `}),I=()=>p({components:{NyxActionItem:k},template:`
    <div>
      <nyx-action-item 
        title="Very Long Title That Should Truncate With Ellipsis" 
        action="Action"
      >
        This is a very long description that might wrap to multiple lines depending on the container width. It contains a lot of text to test the layout handling.
      </nyx-action-item>
    </div>
  `}),M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...I.parameters?.docs?.source}}},L=[`Default`,`Themes`,`WithActionSlot`,`EmptyAction`,`LongText`]}))();export{M as Default,F as EmptyAction,I as LongText,N as Themes,P as WithActionSlot,L as __namedExportsOrder,j as default};