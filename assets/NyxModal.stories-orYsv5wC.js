import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,E as i,N as a,O as o,Q as s,R as ee,U as c,V as te,Y as l,_ as u,f as d,g as f,h as p,l as m,p as h,t as g,tt as _,v,w as y,y as b,z as ne}from"./vue.esm-bundler-C_Vkk7g_.js";import{O as x,T as S,i as C,k as w,l as T,p as re,r as ie,t as E,u as D}from"./utils-CVfGrNSp.js";import{o as O,s as ae,t as k}from"./composables-BsMwJOZk.js";import{n as A,t as j}from"./NyxButton-_TlOdLFS.js";var M=e((()=>{})),N,P,F,I,L,R=e((()=>{g(),M(),A(),D(),k(),C(),N=[`aria-labelledby`],P={key:0,class:`nyx-modal__header`},F={class:`nyx-modal__body`},I={key:1,class:`nyx-modal__footer`},L=b({__name:`NyxModal`,props:y({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:y([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:l}){let g=e,y=l,b=ee(e,`modelValue`),S=ne(),C=r(`elDialog`),T=`nyx-modal-title-${ie(8)}`,E=d(()=>b.value||g.static),D=d(()=>!!S.header||!!g.title),k=d(()=>!!S.footer||!!g.confirmText),A=d(()=>g.confirmText??`Confirm`),M=d(()=>g.cancelText??`Cancel`),L=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `),R=()=>{C.value?.showModal&&C.value.showModal(),i(()=>{(C.value?.querySelector(L))?.focus()})};o(()=>{E.value&&R()}),te(E,e=>{e?R():C.value?.close&&C.value.close()});let z=()=>{g.static||(b.value=!1,y(`close`))};ae(re.Esc,z);let B=()=>{y(`cancel`),z()},V=()=>{y(`confirm`),z()},{classList:H,nyxTheme:U}=O(g,{origin:`NyxModal`});return(e,r)=>(n(),f(`dialog`,{class:t([`nyx-modal`,[...s(H),!!g.customClass&&`${g.customClass}`,{"nyx-modal--open":E.value},{"nyx-modal--no-backdrop":!g.backdrop}]]),ref_key:`elDialog`,ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":D.value?T:void 0,onClick:m(z,[`self`]),onCancel:m(z,[`prevent`])},[D.value?(n(),f(`header`,P,[a(e.$slots,`header`,{},()=>[h(`h1`,{id:T},_(g.title),1)]),g.static?p(``,!0):(n(),f(`button`,{key:0,class:`nyx-modal__close`,onClick:z},`×`))])):p(``,!0),h(`section`,F,[a(e.$slots,`default`,{},()=>[r[0]||=u(`NyxModal body`,-1)])]),k.value?(n(),f(`footer`,I,[a(e.$slots,`footer`,{},()=>[v(j,{variant:s(w).Subtle,theme:s(x).Info,onClick:B},{default:c(()=>[u(_(M.value),1)]),_:1},8,[`variant`,`theme`]),v(j,{theme:s(U),variant:s(w).Soft,onClick:V},{default:c(()=>[u(_(A.value),1)]),_:1},8,[`theme`,`variant`])])])):p(``,!0)],42,N))}})})),z,B=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{g(),B(),D(),E(),A(),V=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,H={title:`Components/NyxModal`,component:z,argTypes:{size:{control:{type:`select`},options:Object.values(S)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},U=e=>b({components:{NyxModal:z},setup(){let t=l(!0);return{args:e,isOpen:t,onClick:()=>t.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),W=(e,t)=>()=>b({components:{NyxModal:z,NyxButton:j},setup(){let n=Object.values(t),r=e=>T(t,e),i=l(!1),a=l(n[0]),o=l(1);return{prop:e,values:n,getLabel:r,isOpen:i,openModal:(e,t)=>{a.value=e,o.value=t+1,i.value=!0},currentValue:a,lipsum:V,numLoops:o}},template:`
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
  `}),G=()=>()=>b({components:{NyxModal:z,NyxButton:j},setup(){return{isOpen:l(!1),lipsum:V}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),K=U({}),q=W(`size`,S),J=G(),Y=()=>()=>b({components:{NyxModal:z,NyxButton:j},setup(){let e=l(!1),t=l(x.Primary);return{isOpen:e,currentTheme:t,themes:Object.values(x),openWithTheme:n=>{t.value=n,e.value=!0},lipsum:V}},template:`
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
  `}),X=()=>()=>b({components:{NyxButton:j},setup(){return{}},template:`
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