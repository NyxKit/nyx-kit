import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,E as i,N as a,Q as o,R as ee,U as s,V as te,Y as c,_ as l,f as u,g as d,h as f,l as p,p as m,t as h,tt as g,v as _,w as v,y,z as ne}from"./vue.esm-bundler-C_Vkk7g_.js";import{D as b,O as re,T as x,d as S,i as C,l as w,r as T,t as E,u as D}from"./utils-CWkZdHks.js";import{o as O,s as ie,t as k}from"./composables-BUwQcKcV.js";import{n as A,t as j}from"./NyxButton-CYka9yMm.js";var M=e((()=>{})),N,P,F,I,L,R=e((()=>{h(),M(),A(),D(),k(),C(),N=[`aria-labelledby`],P={key:0,class:`nyx-modal__header`},F={class:`nyx-modal__body`},I={key:1,class:`nyx-modal__footer`},L=y({__name:`NyxModal`,props:v({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:v([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:c}){let h=e,v=c,y=ee(e,`modelValue`),x=ne(),C=r(`elDialog`),w=`nyx-modal-title-${T(8)}`,E=u(()=>y.value||h.static),D=u(()=>!!x.header||!!h.title),k=u(()=>!!x.footer||!!h.confirmText),A=u(()=>h.confirmText??`Confirm`),M=u(()=>h.cancelText??`Cancel`),L=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `);te(E,e=>{e?(C.value?.showModal&&C.value.showModal(),i(()=>{(C.value?.querySelector(L))?.focus()})):C.value?.close&&C.value.close()});let R=()=>{h.static||(y.value=!1,v(`close`))};ie(S.Esc,R);let z=()=>{v(`cancel`),R()},B=()=>{v(`confirm`),R()},{classList:V,nyxTheme:H}=O(h,{origin:`NyxModal`});return(e,r)=>(n(),d(`dialog`,{class:t([`nyx-modal`,[...o(V),!!h.customClass&&`${h.customClass}`,{"nyx-modal--open":E.value},{"nyx-modal--no-backdrop":!h.backdrop}]]),ref_key:`elDialog`,ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":D.value?w:void 0,onClick:p(R,[`self`]),onCancel:p(R,[`prevent`])},[D.value?(n(),d(`header`,P,[a(e.$slots,`header`,{},()=>[m(`h1`,{id:w},g(h.title),1)]),h.static?f(``,!0):(n(),d(`button`,{key:0,class:`nyx-modal__close`,onClick:R},`×`))])):f(``,!0),m(`section`,F,[a(e.$slots,`default`,{},()=>[r[0]||=l(`NyxModal body`,-1)])]),k.value?(n(),d(`footer`,I,[a(e.$slots,`footer`,{},()=>[_(j,{variant:o(re).Subtle,theme:o(b).Info,onClick:z},{default:s(()=>[l(g(M.value),1)]),_:1},8,[`variant`,`theme`]),_(j,{theme:o(H),onClick:B},{default:s(()=>[l(g(A.value),1)]),_:1},8,[`theme`])])])):f(``,!0)],42,N))}})})),z,B=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),B(),D(),E(),A(),V=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,H={title:`Components/NyxModal`,component:z,argTypes:{size:{control:{type:`select`},options:Object.values(x)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},U=e=>y({components:{NyxModal:z},setup(){let t=c(!0);return{args:e,isOpen:t,onClick:()=>t.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),W=(e,t)=>()=>y({components:{NyxModal:z,NyxButton:j},setup(){let n=Object.values(t),r=e=>w(t,e),i=c(!1),a=c(n[0]),o=c(1);return{prop:e,values:n,getLabel:r,isOpen:i,openModal:(e,t)=>{a.value=e,o.value=t+1,i.value=!0},currentValue:a,lipsum:V,numLoops:o}},template:`
    <div class="flex">
      <nyx-button
        v-for="(value, i) of values"
        :key="value"
        v-bind="{ [prop]: value }"
        @click="openModal(value, i)"
      >{{ getLabel(value) }}</nyx-button>
      <nyx-modal
        v-bind="{ [prop]: currentValue }"
        :title="getLabel(currentValue)"
        v-model="isOpen"
      ><template v-for="i in numLoops"><p>{{ lipsum }}</p></template></nyx-modal>
    </div>
  `}),G=()=>()=>y({components:{NyxModal:z,NyxButton:j},setup(){return{isOpen:c(!1),lipsum:V}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),K=U({}),q=W(`size`,x),J=G(),Y=()=>()=>y({components:{NyxModal:z,NyxButton:j},setup(){let e=c(!1),t=c(b.Primary);return{isOpen:e,currentTheme:t,themes:Object.values(b),openWithTheme:n=>{t.value=n,e.value=!0},lipsum:V}},template:`
    <div class="flex">
      <nyx-button
        v-for="theme in themes"
        :key="theme"
        :theme="theme"
        @click="openWithTheme(theme)"
      >{{ theme }}</nyx-button>
      <nyx-modal
        :theme="currentTheme"
        title="Confirm"
        confirm-text="Confirm"
        cancel-text="Cancel"
        v-model="isOpen"
      ><p>{{ lipsum }}</p></nyx-modal>
    </div>
  `}),X=()=>()=>y({components:{NyxButton:j},setup(){return{}},template:`
    <div>
      <p class="mb-4">Programmatically spawn a modal dialog from anywhere in your app:</p>
      <pre class="bg-gray-100 p-4 rounded text-sm font-mono text-gray-800">
const result = await NyxKit.confirm({
  theme: NyxTheme.Danger,
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText: 'Delete',
  cancelText: 'Cancel'
})

if (result.isSuccess) {
  // User clicked Confirm → result.value is void
} else {
  // User clicked Cancel / pressed Escape / clicked backdrop
  // result.error = 'cancelled', result.message = 'User cancelled'
}</pre>
      <p class="mt-4 text-sm text-gray-600">
        The modal is rendered programmatically via Vue's render function. 
        No template required — just call NyxKit.confirm() from any component.
      </p>
    </div>
  `}),Z=Y(),Q=X(),K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`Template({})`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`TemplatePixel()`,...J.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`TemplateThemes()`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`TemplateProgrammatic()`,...Q.parameters?.docs?.source}}},$=[`Default`,`Sizes`,`Pixel`,`Themes`,`Programmatic`]}))();export{K as Default,J as Pixel,Q as Programmatic,q as Sizes,Z as Themes,$ as __namedExportsOrder,H as default};