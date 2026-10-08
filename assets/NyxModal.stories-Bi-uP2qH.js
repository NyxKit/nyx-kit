import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,D as n,G as r,H as i,I as a,N as o,S as s,U as c,W as ee,_ as l,at as u,b as d,d as f,h as p,j as te,k as ne,m,nt as h,q as g,rt as re,t as _,v,x as y}from"./vue.esm-bundler-DwhgfrFn.js";import{D as b,S as x,T as S,i as C,n as w,s as ie,t as ae}from"./string-CevuJH_I.js";import{n as oe}from"./useNyxProps-St-cgklA.js";import{n as T,t as E}from"./NyxButton-C4Pl6wfC.js";import{c as D,t as O}from"./utils-DImGTvri.js";import{s as se,t as k}from"./composables-BJ-rw_s4.js";import{n as A,t as j}from"./NyxSelect-CfcPCAMG.js";var M=e((()=>{})),N,P,F,I,L,R,z=e((()=>{_(),M(),T(),C(),k(),w(),N=[`aria-labelledby`],P={class:`nyx-modal__surface`},F={key:0,class:`nyx-modal__header`},I={class:`nyx-modal__body`},L={key:1,class:`nyx-modal__footer`},R=s({__name:`NyxModal`,props:n({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:n([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:t}){let n=e,s=t,_=i(e,`modelValue`),x=c(),C=ee(`elDialog`),w=`nyx-modal-title-${ae(8)}`,T=m(()=>_.value||n.static),D=m(()=>!!x.header||!!n.title),O=m(()=>!!x.footer||!!n.confirmText),k=m(()=>n.confirmText??`Confirm`),A=m(()=>n.cancelText??`Cancel`),j=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `),M=()=>{C.value?.showModal&&C.value.showModal(),ne(()=>{(C.value?.querySelector(j))?.focus()})};te(()=>{T.value&&M()}),r(T,e=>{e?M():C.value?.close&&C.value.close()});let R=()=>{n.static||(_.value=!1,s(`close`))};se(ie.Esc,R);let z=()=>{s(`cancel`),R()},B=()=>{s(`confirm`),R()},{classList:V,nyxTheme:H}=oe(n,{origin:`NyxModal`});return(e,t)=>(o(),v(`dialog`,{class:re([`nyx-modal`,[...h(V),!!n.customClass&&`${n.customClass}`,{"nyx-modal--open":T.value},{"nyx-modal--no-backdrop":!n.backdrop}]]),ref_key:`elDialog`,ref:C,role:`dialog`,"aria-modal":`true`,"aria-labelledby":D.value?w:void 0,onClick:f(R,[`self`]),onCancel:f(R,[`prevent`])},[p(`div`,P,[D.value?(o(),v(`header`,F,[a(e.$slots,`header`,{},()=>[p(`h1`,{id:w},u(n.title),1)]),n.static?l(``,!0):(o(),v(`button`,{key:0,class:`nyx-modal__close`,onClick:R},`×`))])):l(``,!0),p(`section`,I,[a(e.$slots,`default`,{},()=>[t[0]||=d(`NyxModal body`,-1)])]),O.value?(o(),v(`footer`,L,[a(e.$slots,`footer`,{},()=>[y(E,{variant:h(b).Subtle,theme:h(S).Info,onClick:z},{default:g(()=>[d(u(A.value),1)]),_:1},8,[`variant`,`theme`]),y(E,{theme:h(H),variant:h(b).Soft,onClick:B},{default:g(()=>[d(u(k.value),1)]),_:1},8,[`theme`,`variant`])])])):l(``,!0)])],42,N))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),H,U,W,G,K,q,J,Y,X,Z,Q,$,ce;e((()=>{_(),V(),C(),O(),T(),A(),H=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,U={title:`Components/Feedback/NyxModal`,component:B,argTypes:{size:{control:{type:`select`},options:Object.values(x)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},W=e=>s({components:{NyxModal:B},setup(){let n=t(!0);return{args:e,isOpen:n,onClick:()=>n.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),G=(e,n)=>()=>s({components:{NyxModal:B,NyxButton:E,NyxSelect:j},setup(){let r=Object.values(n),i=e=>D(n,e),a=t(!1),o=t(r[0]),s=t(`first`),c=t(1);return{prop:e,values:r,getLabel:i,isOpen:a,openModal:(e,t)=>{o.value=e,c.value=t+1,a.value=!0},currentValue:o,lipsum:H,numLoops:c,selectedValue:s}},template:`
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
  `}),K=()=>()=>s({components:{NyxModal:B,NyxButton:E},setup(){return{isOpen:t(!1),lipsum:H}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),q=W({}),J=G(`size`,x),Y=K(),X=()=>()=>s({components:{NyxModal:B,NyxButton:E},setup(){let e=t(!1),n=t(S.Primary);return{isOpen:e,currentTheme:n,themes:Object.values(S),openWithTheme:t=>{n.value=t,e.value=!0},lipsum:H}},template:`
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
  `}),Z=()=>()=>s({components:{NyxButton:E},setup(){return{}},template:`
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