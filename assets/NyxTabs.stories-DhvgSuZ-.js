import{n as e}from"./chunk-BneVvdWh.js";import{D as t,F as n,H as r,I as i,N as a,S as o,U as s,V as c,_ as l,at as u,b as d,f,h as p,it as m,m as h,nt as g,rt as _,t as v,v as y}from"./vue.esm-bundler-DwhgfrFn.js";import{S as b,T as x,a as S,i as C,w}from"./string-CevuJH_I.js";import{n as T}from"./useNyxProps-St-cgklA.js";import{t as E}from"./composables-BJ-rw_s4.js";var D=e((()=>{})),O,k,A,j,M,N=e((()=>{v(),D(),C(),E(),O=[`id`,`aria-selected`,`aria-controls`,`tabindex`,`onClick`],k={class:`nyx-tabs__container`},A=[`id`,`aria-labelledby`],j={key:0},M=o({__name:`NyxTabs`,props:t({tabs:{},theme:{},size:{},variant:{default:w.Modern},position:{default:S.TopLeft},floating:{type:Boolean,default:!1},border:{type:Boolean,default:!1},tabTransition:{default:`fade`}},{modelValue:{},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let t=e,o=r(e,`modelValue`),v=s(),{classList:b}=T(t,{origin:`NyxTabs`}),x=h(()=>o.value??t.tabs[0]),S=h(()=>({"--nyx-tab-index":t.tabs.indexOf(x.value)})),C=c(),w=e=>`${C}-tab-${e}`,E=e=>`${C}-panel-${e}`,D=e=>{let n=t.tabs.indexOf(x.value);e.key===`ArrowRight`||e.key===`ArrowDown`?(e.preventDefault(),o.value=t.tabs[(n+1)%t.tabs.length]):e.key===`ArrowLeft`||e.key===`ArrowUp`?(e.preventDefault(),o.value=t.tabs[(n-1+t.tabs.length)%t.tabs.length]):e.key===`Home`?(e.preventDefault(),o.value=t.tabs[0]):e.key===`End`&&(e.preventDefault(),o.value=t.tabs[t.tabs.length-1])};return(t,r)=>(a(),y(`section`,{class:_([`nyx-tabs`,[...g(b),{floating:e.floating,border:e.border}]]),style:m(S.value)},[p(`nav`,null,[p(`ul`,{role:`tablist`,onKeydown:D},[(a(!0),y(f,null,n(e.tabs,e=>(a(),y(`li`,{key:e},[p(`button`,{class:_([`nyx-tabs__button`,{active:e===x.value}]),role:`tab`,id:w(e),"aria-selected":e===x.value,"aria-controls":E(e),tabindex:e===x.value?0:-1,onClick:t=>o.value=e},[i(t.$slots,`tab-button-${e}`,{},()=>[d(u(e),1)])],10,O)]))),128))],32)]),i(t.$slots,`default`),p(`div`,k,[(a(!0),y(f,null,n(e.tabs,e=>(a(),y(`div`,{key:e,class:_([`nyx-tabs__tab`,{active:e===x.value}]),role:`tabpanel`,id:E(e),"aria-labelledby":w(e)},[i(t.$slots,`tab-${e}`,{},()=>[r[0]||=p(`p`,null,`This tab has no content. Add content by using the following template.`,-1),p(`code`,null,u(`<template v-slot:tab-${e}>Your content here</template>`),1)])],10,A))),128))]),g(v).footer?(a(),y(`footer`,j,[i(t.$slots,`footer`)])):l(``,!0)],6))}})})),P,F=e((()=>{N(),N(),P=M,M.__docgenInfo=Object.assign({displayName:M.name??M.__name},{exportName:`default`,displayName:`NyxTabs`,description:``,tags:{},props:[{name:`tabs`,required:!0,type:{name:`Array`,elements:[{name:`string`}]}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxTabsVariant`},defaultValue:{func:!1,value:`NyxTabsVariant.Modern`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.TopLeft`}},{name:`floating`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`border`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`tabTransition`,required:!1,type:{name:`union`,elements:[{name:`"none"`},{name:`"fade"`},{name:`"slide-fade"`},{name:`"slide-full"`}]},defaultValue:{func:!1,value:`'fade'`}}],slots:[{name:"`tab-button-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`default`},{name:"`tab-${tab}`",scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTabs/NyxTabs.vue`]})})),I,L,R,z,B,V;e((()=>{v(),F(),C(),I=[`profile`,`account`,`settings`],L=Array.from({length:18},(e,t)=>t+1),R=[`Permissions review`,`Connected devices`,`Notification digest`,`Security timeline`,`Export history`,`Automation rules`],z={title:`Components/Navigation/NyxTabs`,component:P,argTypes:{theme:{control:{type:`select`},options:Object.values(x)},variant:{control:{type:`select`},options:Object.values(w)},size:{control:{type:`select`},options:Object.values(b)}},args:{tabs:I}},B={render:e=>o({components:{NyxTabs:P},setup(){return{args:e,filler:L,checklist:R}},template:`
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