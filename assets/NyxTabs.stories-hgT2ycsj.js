import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,B as n,N as r,P as i,R as a,T as o,_ as s,b as c,d as l,et as u,g as d,j as f,m as p,nt as m,p as h,t as g,tt as _,v,z as y}from"./vue.esm-bundler-BYSzMkkg.js";import{A as b,M as x,N as S,f as C,p as w}from"./utils-D7ENd3Hb.js";import{ft as T,t as E}from"./composables-BpSFaobz.js";var D=e((()=>{})),O,k,A,j,M,N=e((()=>{g(),D(),C(),E(),O=[`id`,`aria-selected`,`aria-controls`,`tabindex`,`onClick`],k={class:`nyx-tabs__container`},A=[`id`,`aria-labelledby`],j={key:0},M=c({__name:`NyxTabs`,props:o({tabs:{},theme:{},size:{},variant:{default:x.Modern},position:{default:w.TopLeft},floating:{type:Boolean,default:!1},border:{type:Boolean,default:!1},tabTransition:{default:`fade`}},{modelValue:{},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let o=e,c=y(e,`modelValue`),g=n(),{classList:b}=T(o,{origin:`NyxTabs`}),x=h(()=>c.value??o.tabs[0]),S=h(()=>({"--nyx-tab-index":o.tabs.indexOf(x.value)})),C=a(),w=e=>`${C}-tab-${e}`,E=e=>`${C}-panel-${e}`,D=e=>{let t=o.tabs.indexOf(x.value);e.key===`ArrowRight`||e.key===`ArrowDown`?(e.preventDefault(),c.value=o.tabs[(t+1)%o.tabs.length]):e.key===`ArrowLeft`||e.key===`ArrowUp`?(e.preventDefault(),c.value=o.tabs[(t-1+o.tabs.length)%o.tabs.length]):e.key===`Home`?(e.preventDefault(),c.value=o.tabs[0]):e.key===`End`&&(e.preventDefault(),c.value=o.tabs[o.tabs.length-1])};return(n,a)=>(f(),s(`section`,{class:u([`nyx-tabs`,[...t(b),{floating:e.floating,border:e.border}]]),style:_(S.value)},[p(`nav`,null,[p(`ul`,{role:`tablist`,onKeydown:D},[(f(!0),s(l,null,r(e.tabs,e=>(f(),s(`li`,{key:e},[p(`button`,{class:u([`nyx-tabs__button`,{active:e===x.value}]),role:`tab`,id:w(e),"aria-selected":e===x.value,"aria-controls":E(e),tabindex:e===x.value?0:-1,onClick:t=>c.value=e},[i(n.$slots,`tab-button-${e}`,{},()=>[v(m(e),1)])],10,O)]))),128))],32)]),i(n.$slots,`default`),p(`div`,k,[(f(!0),s(l,null,r(e.tabs,e=>(f(),s(`div`,{key:e,class:u([`nyx-tabs__tab`,{active:e===x.value}]),role:`tabpanel`,id:E(e),"aria-labelledby":w(e)},[i(n.$slots,`tab-${e}`,{},()=>[a[0]||=p(`p`,null,`This tab has no content. Add content by using the following template.`,-1),p(`code`,null,m(`<template v-slot:tab-${e}>Your content here</template>`),1)])],10,A))),128))]),t(g).footer?(f(),s(`footer`,j,[i(n.$slots,`footer`)])):d(``,!0)],6))}})})),P,F=e((()=>{N(),N(),P=M,M.__docgenInfo=Object.assign({displayName:M.name??M.__name},{exportName:`default`,displayName:`NyxTabs`,description:``,tags:{},props:[{name:`tabs`,required:!0,type:{name:`Array`,elements:[{name:`string`}]}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxTabsVariant`},defaultValue:{func:!1,value:`NyxTabsVariant.Modern`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.TopLeft`}},{name:`floating`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`border`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`tabTransition`,required:!1,type:{name:`union`,elements:[{name:`"none"`},{name:`"fade"`},{name:`"slide-fade"`},{name:`"slide-full"`}]},defaultValue:{func:!1,value:`'fade'`}}],slots:[{name:"`tab-button-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`default`},{name:"`tab-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTabs/NyxTabs.vue`]})})),I,L,R,z,B,V;e((()=>{g(),F(),C(),I=[`profile`,`account`,`settings`],L=Array.from({length:18},(e,t)=>t+1),R=[`Permissions review`,`Connected devices`,`Notification digest`,`Security timeline`,`Export history`,`Automation rules`],z={title:`Components/Navigation/NyxTabs`,component:P,argTypes:{theme:{control:{type:`select`},options:Object.values(S)},variant:{control:{type:`select`},options:Object.values(x)},size:{control:{type:`select`},options:Object.values(b)}},args:{tabs:I}},B={render:e=>c({components:{NyxTabs:P},setup(){return{args:e,filler:L,checklist:R}},template:`
      <div style="height: 24rem; max-height: 24rem;">
        <nyx-tabs v-bind="args" style="height: 100%;">
          <template v-slot:tab-profile>
            <div>
              <h3>Profile overview</h3>
              <p>Scrollable content keeps the tabs usable when a panel grows taller than the available space.</p>
              <ul>
                <li v-for="item in checklist" :key="'profile-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'profile-' + item">
                Profile section {{ item }} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </template>

          <template v-slot:tab-account>
            <div>
              <h3>Account activity</h3>
              <p>Use the vertical scrollbar inside the active panel to review long account details without losing the tab navigation.</p>
              <ul>
                <li v-for="item in checklist" :key="'account-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'account-' + item">
                Account event {{ item }} - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </template>

          <template v-slot:tab-settings>
            <div>
              <h3>Settings audit</h3>
              <p>This panel intentionally overflows so the default Storybook example demonstrates the scroll behaviour.</p>
              <ul>
                <li v-for="item in checklist" :key="'settings-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'settings-' + item">
                Settings note {{ item }} - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </template>
        </nyx-tabs>
      </div>
    `})},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: (args: NyxTabsProps) => defineComponent({
    components: {
      NyxTabs
    },
    setup() {
      return {
        args,
        filler,
        checklist
      };
    },
    template: \`
      <div style="height: 24rem; max-height: 24rem;">
        <nyx-tabs v-bind="args" style="height: 100%;">
          <template v-slot:tab-profile>
            <div>
              <h3>Profile overview</h3>
              <p>Scrollable content keeps the tabs usable when a panel grows taller than the available space.</p>
              <ul>
                <li v-for="item in checklist" :key="'profile-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'profile-' + item">
                Profile section {{ item }} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </template>

          <template v-slot:tab-account>
            <div>
              <h3>Account activity</h3>
              <p>Use the vertical scrollbar inside the active panel to review long account details without losing the tab navigation.</p>
              <ul>
                <li v-for="item in checklist" :key="'account-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'account-' + item">
                Account event {{ item }} - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </template>

          <template v-slot:tab-settings>
            <div>
              <h3>Settings audit</h3>
              <p>This panel intentionally overflows so the default Storybook example demonstrates the scroll behaviour.</p>
              <ul>
                <li v-for="item in checklist" :key="'settings-check-' + item">{{ item }}</li>
              </ul>
              <p v-for="item in filler" :key="'settings-' + item">
                Settings note {{ item }} - Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </template>
        </nyx-tabs>
      </div>
    \`
  })
}`,...B.parameters?.docs?.source}}},V=[`Default`]}))();export{B as Default,V as __namedExportsOrder,z as default};