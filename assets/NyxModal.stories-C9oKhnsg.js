import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,E as i,N as a,O as o,Q as s,R as ee,U as c,V as te,Y as l,_ as u,f as d,g as f,h as p,l as m,p as h,t as g,tt as _,v as ne,w as v,y,z as re}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as b,F as x,N as S,c as C,f as w,h as ie,i as T,r as ae,t as E}from"./utils-BN10c1sN.js";import{c as oe,o as se,t as D}from"./composables-D41-uQ7I.js";import{n as O,t as k}from"./NyxButton-DoetK-17.js";import{n as A,t as j}from"./NyxSelect-Dz6Brbet.js";var M=e((()=>{})),N,P,F,I,L,R,z=e((()=>{g(),M(),O(),w(),D(),T(),N=[`aria-labelledby`],P={class:`nyx-modal__surface`},F={key:0,class:`nyx-modal__header`},I={class:`nyx-modal__body`},L={key:1,class:`nyx-modal__footer`},R=y({__name:`NyxModal`,props:v({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:v([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:l}){let g=e,v=l,y=ee(e,`modelValue`),b=re(),C=r(`elDialog`),w=`nyx-modal-title-${ae(8)}`,T=d(()=>y.value||g.static),E=d(()=>!!b.header||!!g.title),D=d(()=>!!b.footer||!!g.confirmText),O=d(()=>g.confirmText??`Confirm`),A=d(()=>g.cancelText??`Cancel`),j=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `),M=()=>{C.value?.showModal&&C.value.showModal(),i(()=>{(C.value?.querySelector(j))?.focus()})};o(()=>{T.value&&M()}),te(T,e=>{e?M():C.value?.close&&C.value.close()});let R=()=>{g.static||(y.value=!1,v(`close`))};oe(ie.Esc,R);let z=()=>{v(`cancel`),R()},B=()=>{v(`confirm`),R()},{classList:V,nyxTheme:H}=se(g,{origin:`NyxModal`});return(e,r)=>(n(),f(`dialog`,{class:t([`nyx-modal`,[...s(V),!!g.customClass&&`${g.customClass}`,{"nyx-modal--open":T.value},{"nyx-modal--no-backdrop":!g.backdrop}]]),ref_key:`elDialog`,ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":E.value?w:void 0,onClick:m(R,[`self`]),onCancel:m(R,[`prevent`])},[h(`div`,P,[E.value?(n(),f(`header`,F,[a(e.$slots,`header`,{},()=>[h(`h1`,{id:w},_(g.title),1)]),g.static?p(``,!0):(n(),f(`button`,{key:0,class:`nyx-modal__close`,onClick:R},`×`))])):p(``,!0),h(`section`,I,[a(e.$slots,`default`,{},()=>[r[0]||=u(`NyxModal body`,-1)])]),D.value?(n(),f(`footer`,L,[a(e.$slots,`footer`,{},()=>[ne(k,{variant:s(x).Subtle,theme:s(S).Info,onClick:z},{default:c(()=>[u(_(A.value),1)]),_:1},8,[`variant`,`theme`]),ne(k,{theme:s(H),variant:s(x).Soft,onClick:B},{default:c(()=>[u(_(O.value),1)]),_:1},8,[`theme`,`variant`])])])):p(``,!0)])],42,N))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),H,U,W,G,K,q,J,Y,X,Z,Q,$,ce;e((()=>{g(),V(),w(),E(),O(),A(),H=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,U={title:`Components/Feedback/NyxModal`,component:B,argTypes:{size:{control:{type:`select`},options:Object.values(b)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},W=e=>y({components:{NyxModal:B},setup(){let t=l(!0);return{args:e,isOpen:t,onClick:()=>t.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),G=(e,t)=>()=>y({components:{NyxModal:B,NyxButton:k,NyxSelect:j},setup(){let n=Object.values(t),r=e=>C(t,e),i=l(!1),a=l(n[0]),o=l(`first`),s=l(1);return{prop:e,values:n,getLabel:r,isOpen:i,openModal:(e,t)=>{a.value=e,s.value=t+1,i.value=!0},currentValue:a,lipsum:H,numLoops:s,selectedValue:o}},template:`
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
      >
        <template v-for="i in numLoops"><p>{{ lipsum }}</p></template>
        <nyx-select
          class="mt-4"
          :options="[
            { label: 'First option', value: 'first' },
            { label: 'Second option', value: 'second' },
            { label: 'Third option', value: 'third' }
          ]"
          v-model="selectedValue"
        />
      </nyx-modal>
    </div>
  `}),K=()=>()=>y({components:{NyxModal:B,NyxButton:k},setup(){return{isOpen:l(!1),lipsum:H}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),q=W({}),J=G(`size`,b),Y=K(),X=()=>()=>y({components:{NyxModal:B,NyxButton:k},setup(){let e=l(!1),t=l(S.Primary);return{isOpen:e,currentTheme:t,themes:Object.values(S),openWithTheme:n=>{t.value=n,e.value=!0},lipsum:H}},template:`
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
  `}),Z=()=>()=>y({components:{NyxButton:k},setup(){return{}},template:`
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
  `}),Q=X(),$=Z(),q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`Template({})`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`TemplatePixel()`,...Y.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`TemplateThemes()`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`TemplateProgrammatic()`,...$.parameters?.docs?.source}}},ce=[`Default`,`Sizes`,`Pixel`,`Themes`,`Programmatic`]}))();export{q as Default,Y as Pixel,$ as Programmatic,J as Sizes,Q as Themes,ce as __namedExportsOrder,U as default};