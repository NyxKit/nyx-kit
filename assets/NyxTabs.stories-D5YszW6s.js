import{n as e}from"./chunk-BneVvdWh.js";import{A as t,F as n,I as r,J as i,L as a,M as o,T as s,X as c,Y as l,_ as u,f as d,h as f,i as p,j as m,m as h,q as g,v as _,x as v,y}from"./iframe-w6ztlrld.js";import{M as b,N as x,g as S,j as C,p as w,t as T,v as E}from"./composables-BBoL0ZNj.js";var D=e((()=>{})),O,k,A,j,M,N=e((()=>{p(),D(),S(),T(),O=[`id`,`aria-selected`,`aria-controls`,`tabindex`,`onClick`],k={class:`nyx-tabs__container`},A=[`id`,`aria-labelledby`],j={key:0},M=v({__name:`NyxTabs`,props:s({tabs:{},theme:{},size:{},variant:{default:b.Modern},position:{default:E.TopLeft},floating:{type:Boolean,default:!1},border:{type:Boolean,default:!1},tabTransition:{default:`fade`}},{modelValue:{},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let s=e,p=r(e,`modelValue`),v=a(),{classList:b}=w(s,{origin:`NyxTabs`}),x=h(()=>p.value??s.tabs[0]),S=h(()=>({"--nyx-tab-index":s.tabs.indexOf(x.value)})),C=n(),T=e=>`${C}-tab-${e}`,E=e=>`${C}-panel-${e}`,D=e=>{let t=s.tabs.indexOf(x.value);e.key===`ArrowRight`||e.key===`ArrowDown`?(e.preventDefault(),p.value=s.tabs[(t+1)%s.tabs.length]):e.key===`ArrowLeft`||e.key===`ArrowUp`?(e.preventDefault(),p.value=s.tabs[(t-1+s.tabs.length)%s.tabs.length]):e.key===`Home`?(e.preventDefault(),p.value=s.tabs[0]):e.key===`End`&&(e.preventDefault(),p.value=s.tabs[s.tabs.length-1])};return(n,r)=>(t(),_(`section`,{class:i([`nyx-tabs`,[...g(b),{floating:e.floating,border:e.border}]]),style:l(S.value)},[f(`nav`,null,[f(`ul`,{role:`tablist`,onKeydown:D},[(t(!0),_(d,null,m(e.tabs,e=>(t(),_(`li`,{key:e},[f(`button`,{class:i([`nyx-tabs__button`,{active:e===x.value}]),role:`tab`,id:T(e),"aria-selected":e===x.value,"aria-controls":E(e),tabindex:e===x.value?0:-1,onClick:t=>p.value=e},[o(n.$slots,`tab-button-${e}`,{},()=>[y(c(e),1)])],10,O)]))),128))],32)]),o(n.$slots,`default`),f(`div`,k,[(t(!0),_(d,null,m(e.tabs,e=>(t(),_(`div`,{key:e,class:i([`nyx-tabs__tab`,{active:e===x.value}]),role:`tabpanel`,id:E(e),"aria-labelledby":T(e)},[o(n.$slots,`tab-${e}`,{},()=>[r[0]||=f(`p`,null,`This tab has no content. Add content by using the following template.`,-1),f(`code`,null,c(`<template v-slot:tab-${e}>Your content here</template>`),1)])],10,A))),128))]),g(v).footer?(t(),_(`footer`,j,[o(n.$slots,`footer`)])):u(``,!0)],6))}})})),P,F=e((()=>{N(),N(),P=M,M.__docgenInfo=Object.assign({displayName:M.name??M.__name},{exportName:`default`,displayName:`NyxTabs`,description:``,tags:{},props:[{name:`tabs`,required:!0,type:{name:`Array`,elements:[{name:`string`}]}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxTabsVariant`},defaultValue:{func:!1,value:`NyxTabsVariant.Modern`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.TopLeft`}},{name:`floating`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`border`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`tabTransition`,required:!1,type:{name:`union`,elements:[{name:`"none"`},{name:`"fade"`},{name:`"slide-fade"`},{name:`"slide-full"`}]},defaultValue:{func:!1,value:`'fade'`}}],slots:[{name:"`tab-button-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`default`},{name:"`tab-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTabs/NyxTabs.vue`]})})),I,L,R,z,B,V;e((()=>{p(),F(),S(),I=[`profile`,`account`,`settings`],L=Array.from({length:18},(e,t)=>t+1),R=[`Permissions review`,`Connected devices`,`Notification digest`,`Security timeline`,`Export history`,`Automation rules`],z={title:`Components/NyxTabs`,component:P,argTypes:{theme:{control:{type:`select`},options:Object.values(x)},variant:{control:{type:`select`},options:Object.values(b)},size:{control:{type:`select`},options:Object.values(C)}},args:{tabs:I}},B={render:e=>v({components:{NyxTabs:P},setup(){return{args:e,filler:L,checklist:R}},template:`
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