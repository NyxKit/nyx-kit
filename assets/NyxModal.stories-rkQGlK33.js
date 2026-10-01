import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,B as n,D as r,H as i,P as a,T as o,V as s,W as c,X as l,_ as u,b as d,et as ee,g as f,j as p,k as te,m,nt as h,p as g,t as _,u as v,v as y,y as b,z as ne}from"./vue.esm-bundler-BYSzMkkg.js";import{A as x,F as S,N as C,d as w,f as T,h as re,i as E,r as ie,t as D}from"./utils-D7ENd3Hb.js";import{ft as ae,s as oe,t as se}from"./composables-BpSFaobz.js";import{n as O,t as k}from"./NyxButton-DiWvMxO-.js";import{n as A,t as j}from"./NyxSelect-C2QdbcJB.js";var M=e((()=>{})),N,P,F,I,L,R,z=e((()=>{_(),M(),O(),T(),se(),E(),N=[`aria-labelledby`],P={class:`nyx-modal__surface`},F={key:0,class:`nyx-modal__header`},I={class:`nyx-modal__body`},L={key:1,class:`nyx-modal__footer`},R=d({__name:`NyxModal`,props:o({title:{},confirmText:{},cancelText:{default:`Close`},size:{},static:{type:Boolean,default:!1},backdrop:{type:Boolean,default:!0},customClass:{},pixel:{type:Boolean,default:!1},theme:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:o([`close`,`cancel`,`confirm`,`open`],[`update:modelValue`]),setup(e,{emit:o}){let l=e,d=o,_=ne(e,`modelValue`),x=n(),w=s(`elDialog`),T=`nyx-modal-title-${ie(8)}`,E=g(()=>_.value||l.static),D=g(()=>!!x.header||!!l.title),se=g(()=>!!x.footer||!!l.confirmText),O=g(()=>l.confirmText??`Confirm`),A=g(()=>l.cancelText??`Cancel`),j=[`a[href]`,`button:not([disabled])`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `),M=()=>{w.value?.showModal&&w.value.showModal(),r(()=>{(w.value?.querySelector(j))?.focus()})};te(()=>{E.value&&M()}),i(E,e=>{e?M():w.value?.close&&w.value.close()});let R=()=>{l.static||(_.value=!1,d(`close`))};oe(re.Esc,R);let z=()=>{d(`cancel`),R()},B=()=>{d(`confirm`),R()},{classList:V,nyxTheme:H}=ae(l,{origin:`NyxModal`});return(e,n)=>(p(),u(`dialog`,{class:ee([`nyx-modal`,[...t(V),!!l.customClass&&`${l.customClass}`,{"nyx-modal--open":E.value},{"nyx-modal--no-backdrop":!l.backdrop}]]),ref_key:`elDialog`,ref:w,role:`dialog`,"aria-modal":`true`,"aria-labelledby":D.value?T:void 0,onClick:v(R,[`self`]),onCancel:v(R,[`prevent`])},[m(`div`,P,[D.value?(p(),u(`header`,F,[a(e.$slots,`header`,{},()=>[m(`h1`,{id:T},h(l.title),1)]),l.static?f(``,!0):(p(),u(`button`,{key:0,class:`nyx-modal__close`,onClick:R},`×`))])):f(``,!0),m(`section`,I,[a(e.$slots,`default`,{},()=>[n[0]||=y(`NyxModal body`,-1)])]),se.value?(p(),u(`footer`,L,[a(e.$slots,`footer`,{},()=>[b(k,{variant:t(S).Subtle,theme:t(C).Info,onClick:z},{default:c(()=>[y(h(A.value),1)]),_:1},8,[`variant`,`theme`]),b(k,{theme:t(H),variant:t(S).Soft,onClick:B},{default:c(()=>[y(h(O.value),1)]),_:1},8,[`theme`,`variant`])])])):f(``,!0)])],42,N))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxModal`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`confirmText`,required:!1,type:{name:`string`}},{name:`cancelText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close'`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`static`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`backdrop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`customClass`,required:!1,type:{name:`string`}},{name:`pixel`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],events:[{name:`close`},{name:`cancel`},{name:`confirm`},{name:`open`}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxModal/NyxModal.vue`]})})),H,U,W,G,K,q,J,Y,X,Z,Q,$,ce;e((()=>{_(),V(),T(),D(),O(),A(),H=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque justo enim, ultrices ac enim ut, placerat facilisis mauris. Cras luctus ante ante, viverra interdum mauris bibendum et. `,U={title:`Components/Feedback/NyxModal`,component:B,argTypes:{size:{control:{type:`select`},options:Object.values(x)},modelValue:{control:{type:`boolean`}}},args:{title:`My Model`}},W=e=>d({components:{NyxModal:B},setup(){let t=l(!0);return{args:e,isOpen:t,onClick:()=>t.value=!0}},template:`
    <div>
      <nyx-modal v-bind="args">My model</nyx-button>
    </div>
  `}),G=(e,t)=>()=>d({components:{NyxModal:B,NyxButton:k,NyxSelect:j},setup(){let n=Object.values(t),r=e=>w(t,e),i=l(!1),a=l(n[0]),o=l(`first`),s=l(1);return{prop:e,values:n,getLabel:r,isOpen:i,openModal:(e,t)=>{a.value=e,s.value=t+1,i.value=!0},currentValue:a,lipsum:H,numLoops:s,selectedValue:o}},template:`
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
  `}),K=()=>()=>d({components:{NyxModal:B,NyxButton:k},setup(){return{isOpen:l(!1),lipsum:H}},template:`
    <div class="flex">
      <nyx-button pixel @click="isOpen = !isOpen">Pixel</nyx-button>
      <nyx-modal pixel title="Pixel" v-model="isOpen">
        <template v-for="i in 3"><p>{{ lipsum }}</p></template>
      </nyx-modal>
    </div>
  `}),q=W({}),J=G(`size`,x),Y=K(),X=()=>()=>d({components:{NyxModal:B,NyxButton:k},setup(){let e=l(!1),t=l(C.Primary);return{isOpen:e,currentTheme:t,themes:Object.values(C),openWithTheme:n=>{t.value=n,e.value=!0},lipsum:H}},template:`
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
  `}),Z=()=>()=>d({components:{NyxButton:k},setup(){return{}},template:`
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