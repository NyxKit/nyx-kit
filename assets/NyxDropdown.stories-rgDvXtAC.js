import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,D as i,E as a,L as o,N as s,O as c,Q as l,Y as u,d,et as ee,f,g as te,m as p,p as m,t as h,v as g,y as _,z as v}from"./vue.esm-bundler-C_Vkk7g_.js";import{M as y,N as b,O as x,d as S,j as C,l as w,t as T,u as E}from"./utils-I3j1AIuu.js";import{o as D,r as O,t as k}from"./composables-CT8Ab5sb.js";import{n as A,t as j}from"./NyxIcon-qPhKzAEA.js";import{r as M}from"./NyxDropdownItem-B_29WsRK.js";import{n as N,t as P}from"./NyxDropdownMenu-BoT0H8nJ.js";var F,I,L,R=e((()=>{h(),M(),E(),k(),N(),F=[`id`,`aria-expanded`,`aria-controls`],I=[`data-position`,`id`,`aria-labelledby`],L=_({__name:`NyxDropdown`,props:{theme:{},size:{},variant:{},trigger:{default:y.Click},position:{default:S.BottomRight},options:{default:()=>[]}},emits:[`select`],setup(e,{emit:h}){let _=e,b=h,S=v(),{classList:C}=D(_,{origin:`NyxDropdown`}),w=u(!1),T=r(`elTrigger`),E=r(`elDropdown`),k=o(),A=o(),j=u(!1),M=null,{cssVariables:N,computedPosition:L}=O(T,E,{position:f(()=>_.position),gap:u(x.Medium),isUpdateAllowed:w}),R=f(()=>!!S.dropdown),z=f(()=>_.trigger===y.Hover),B=()=>E.value?Array.from(E.value.querySelectorAll(`[data-nyx-dropdown-item]`)):[],V=()=>{M&&=(window.clearTimeout(M),null)},H=()=>{V(),M=window.setTimeout(()=>{K({blurTrigger:!0})},120)},U=async e=>{await a(),B()[e]?.focus()},W=async e=>{let t=B();if(!t.length)return;let n=t.findIndex(e=>e===document.activeElement);t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length]?.focus()},G=async e=>{V(),!w.value&&(w.value=!0,e!==void 0&&!R.value&&await U(e))},K=async e=>{V(),w.value&&(w.value=!1,await a(),e?.focusTrigger?T.value?.focus():e?.blurTrigger&&T.value?.blur())},q=async e=>{if(w.value){await K(e);return}await G()},J=async()=>{await q({blurTrigger:!0})},Y=async e=>{if(e.key===`Escape`){e.preventDefault(),await K({focusTrigger:!0});return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),await q({focusTrigger:!0});return}if(!R.value&&(e.key===`ArrowDown`&&(e.preventDefault(),w.value?await W(1):await G(0)),e.key===`ArrowUp`))if(e.preventDefault(),w.value)await W(-1);else{let e=B();await G(Math.max(e.length-1,0))}},X=()=>{!z.value||!j.value||G()},Z=()=>{!z.value||!j.value||H()},ne=()=>{!z.value||!j.value||V()},re=()=>{!z.value||!j.value||H()},ie=async e=>{if(!R.value){if(e.key===`Escape`){e.preventDefault(),await K({focusTrigger:!0});return}e.key===`ArrowDown`&&(e.preventDefault(),await W(1)),e.key===`ArrowUp`&&(e.preventDefault(),await W(-1))}},ae=async e=>{b(`select`,e),await K({blurTrigger:!0})},Q=()=>T.value?.ownerDocument??document,$=e=>{if(!w.value)return;let t=e.target;t&&(T.value?.contains(t)||E.value?.contains(t)||K({blurTrigger:!0}))};return c(()=>{j.value=typeof window<`u`?window.matchMedia?.(`(hover: hover) and (pointer: fine)`)?.matches??!1:!1,Q().addEventListener(`click`,$)}),i(()=>{V(),Q().removeEventListener(`click`,$)}),(e,r)=>(n(),te(`div`,{class:t([`nyx-dropdown`,l(C)])},[m(`div`,{ref_key:`elTrigger`,ref:T,class:`nyx-dropdown__trigger`,id:l(A),role:`button`,tabindex:`0`,"aria-haspopup":`menu`,"aria-expanded":w.value,"aria-controls":l(k),onClick:J,onKeydown:Y,onPointerenter:X,onPointerleave:Z},[s(e.$slots,`default`)],40,F),(n(),p(d,{to:`body`},[m(`div`,{ref_key:`elDropdown`,ref:E,class:t([`nyx-dropdown__panel`,[...l(C),`nyx-dropdown__panel--${l(L)}`,{"nyx-dropdown__panel--open":w.value}]]),"data-position":l(L),id:l(k),style:ee(l(N)),role:`menu`,"aria-labelledby":l(A),onKeydown:ie,onPointerenter:ne,onPointerleave:re},[s(e.$slots,`dropdown`,{},()=>[g(P,{theme:_.theme,size:_.size,variant:_.variant,options:_.options,onSelect:ae},null,8,[`theme`,`size`,`variant`,`options`])])],46,I)]))],2))}})})),z,B=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxDropdown`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`trigger`,required:!1,type:{name:`NyxTrigger`},defaultValue:{func:!1,value:`NyxTrigger.Click`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.BottomRight`}},{name:`options`,required:!1,type:{name:`Array`,elements:[{name:`NyxSelectOption`}]},defaultValue:{func:!1,value:`() => []`}}],events:[{name:`select`,type:{names:[`NyxSelectOption`]}}],slots:[{name:`default`},{name:`dropdown`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxDropdown/NyxDropdown.vue`]})})),V,H,U,W,G,K,q,J,Y,X,Z;e((()=>{h(),B(),E(),T(),A(),V=[{label:`Edit`,value:`edit`,icon:`edit`},{label:`Duplicate`,value:`duplicate`,icon:`plus`},{label:`Delete`,value:`delete`,disabled:!0,icon:`trash`}],H={title:`Components/NyxDropdown`,component:z,argTypes:{theme:{control:{type:`select`},options:Object.values(C)},variant:{control:{type:`select`},options:Object.values(b)},size:{control:{type:`select`},options:Object.values(x)},position:{control:{type:`select`},options:Object.values(S)},trigger:{control:{type:`select`},options:Object.values(y)}}},U=e=>_({components:{NyxDropdown:z,NyxIcon:j},setup(){return{args:e}},template:`
    <nyx-dropdown v-bind="args">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="menu" />
        <span>Actions</span>
      </button>
    </nyx-dropdown>
  `}),W={render:()=>U({options:V,theme:C.Primary,size:x.Medium,variant:b.Filled,position:S.Bottom,trigger:y.Click})},G={render:()=>_({components:{NyxDropdown:z,NyxIcon:j},setup(){return{sampleOptions:V}},template:`
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  `})},K={render:()=>_({components:{NyxDropdown:z,NyxIcon:j},template:`
    <nyx-dropdown>
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="settings" />
        <span>Open menu</span>
      </button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; display:flex;align-items:center;gap:0.5rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          <nyx-icon name="settings" />
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  `})},q=(e,t)=>()=>_({components:{NyxDropdown:z,NyxIcon:j},setup(){return{prop:e,values:Object.values(t),getLabel:e=>w(t,e),sampleOptions:V}},template:`
    <div class="flex-col" style="gap: 1rem; align-items: flex-start;">
      <nyx-dropdown
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value, options: sampleOptions }"
      >
        <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
          <nyx-icon name="arrow-right" />
          <span>{{ getLabel(value) }}</span>
        </button>
      </nyx-dropdown>
    </div>
  `}),J={render:q(`theme`,C)},Y={render:q(`variant`,b)},X={render:q(`size`,x)},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    options: sampleOptions,
    theme: NyxTheme.Primary,
    size: NyxSize.Medium,
    variant: NyxVariant.Filled,
    position: NyxPosition.Bottom,
    trigger: NyxTrigger.Click
  })
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxDropdown,
      NyxIcon
    },
    setup() {
      return {
        sampleOptions
      };
    },
    template: \`
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  \`
  })
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxDropdown,
      NyxIcon
    },
    template: \`
    <nyx-dropdown>
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="settings" />
        <span>Open menu</span>
      </button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; display:flex;align-items:center;gap:0.5rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          <nyx-icon name="settings" />
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  \`
  })
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: TemplateAll('theme', NyxTheme)
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: TemplateAll('variant', NyxVariant)
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: TemplateAll('size', NyxSize)
}`,...X.parameters?.docs?.source}}},Z=[`Default`,`InteractivePreview`,`CustomDropdown`,`Themes`,`Variants`,`Sizes`]}))();export{K as CustomDropdown,W as Default,G as InteractivePreview,X as Sizes,J as Themes,Y as Variants,Z as __namedExportsOrder,H as default};