import{n as e}from"./chunk-BneVvdWh.js";import{A as t,G as n,J as r,K as i,L as a,M as o,O as s,P as c,S as l,U as ee,W as te,_ as u,b as d,d as f,et as p,h as m,it as ne,m as h,rt as g,st as _,t as v,v as y,x as b}from"./vue.esm-bundler-BCs4lh10.js";import{D as re,S as x,T as S,i as C,n as w,s as ie,t as ae}from"./string-CevuJH_I.js";import{n as oe}from"./useNyxProps-BBDE2PJZ.js";import{n as T,t as E}from"./NyxButton-BgZiJkK2.js";import{c as D,t as O}from"./utils-DImGTvri.js";import{s as se,t as k}from"./composables-C7uTgLsw.js";import{n as A,t as j}from"./NyxSelect-FcczPlpt.js";var M=e((()=>{})),N,P,F,I,L,R,z=e((()=>{v(),M(),T(),C(),k(),w(),N=[`aria-labelledby`],P={class:`nyx-modal__surface`},F={key:0,class:`nyx-modal__header`},I={class:`nyx-modal__body`},L={key:1,class:`nyx-modal__footer`},R=l({__name:`NyxModal`,props:s({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:s([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:s}){let l=e,p=s,v=ee(e,`modelValue`),x=te(),C=n(`elDialog`),w=`nyx-modal-title-${ae(8)}`,T=h(()=>v.value||l.static),D=h(()=>!!x.header||!!l.title),O=h(()=>!!x.footer||!!l.confirmText),k=h(()=>l.confirmText??`Confirm`),A=h(()=>l.cancelText??`Cancel`),j=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `),M=()=>{C.value?.showModal&&C.value.showModal(),t(()=>{(C.value?.querySelector(j))?.focus()})};o(()=>{T.value&&M()}),i(T,e=>{e?M():C.value?.close&&C.value.close()});let R=()=>{l.static||(v.value=!1,p(`close`))};se(ie.Esc,R);let z=()=>{p(`cancel`),R()},B=()=>{p(`confirm`),R()},{classList:V,nyxTheme:H}=oe(l,{origin:`NyxModal`});return(e,t)=>(c(),y(`dialog`,{class:ne([`nyx-modal`,[...g(V),!!l.customClass&&`${l.customClass}`,{"nyx-modal--open":T.value},{"nyx-modal--no-backdrop":!l.backdrop}]]),ref_key:`elDialog`,ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":D.value?w:void 0,onClick:f(R,[`self`]),onCancel:f(R,[`prevent`])},[m(`div`,P,[D.value?(c(),y(`header`,F,[a(e.$slots,`header`,{},()=>[m(`h1`,{id:w},_(l.title),1)]),l.static?u(``,!0):(c(),y(`button`,{key:0,class:`nyx-modal__close`,onClick:R},`×`))])):u(``,!0),m(`section`,I,[a(e.$slots,`default`,{},()=>[t[0]||=d(`NyxModal body`,-1)])]),O.value?(c(),y(`footer`,L,[a(e.$slots,`footer`,{},()=>[b(E,{variant:g(re).Subtle,theme:g(S).Info,onClick:z},{default:r(()=>[d(_(A.value),1)]),_:1},8,[`variant`,`theme`]),b(E,{theme:g(H),variant:g(re).Soft,onClick:B},{default:r(()=>[d(_(k.value),1)]),_:1},8,[`theme`,`variant`])])])):u(``,!0)])],42,N))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),H,U,W,G,K,q,J,Y,X,Z,Q,$,ce;e((()=>{v(),V(),C(),O(),T(),A(),H=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,U={title:`Components/Feedback/NyxModal`,component:B,argTypes:{size:{control:{type:`select`},options:Object.values(x)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},W=e=>l({components:{NyxModal:B},setup(){let t=p(!0);return{args:e,isOpen:t,onClick:()=>t.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),G=(e,t)=>()=>l({components:{NyxModal:B,NyxButton:E,NyxSelect:j},setup(){let n=Object.values(t),r=e=>D(t,e),i=p(!1),a=p(n[0]),o=p(`first`),s=p(1);return{prop:e,values:n,getLabel:r,isOpen:i,openModal:(e,t)=>{a.value=e,s.value=t+1,i.value=!0},currentValue:a,lipsum:H,numLoops:s,selectedValue:o}},template:`
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
  `}),K=()=>()=>l({components:{NyxModal:B,NyxButton:E},setup(){return{isOpen:p(!1),lipsum:H}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),q=W({}),J=G(`size`,x),Y=K(),X=()=>()=>l({components:{NyxModal:B,NyxButton:E},setup(){let e=p(!1),t=p(S.Primary);return{isOpen:e,currentTheme:t,themes:Object.values(S),openWithTheme:n=>{t.value=n,e.value=!0},lipsum:H}},template:`
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
  `}),Z=()=>()=>l({components:{NyxButton:E},setup(){return{}},template:`
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