import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,D as i,E as a,L as o,N as s,O as c,Q as l,Y as u,d,et as f,f as p,g as m,m as h,p as g,t as _,v,y,z as b}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as x,D as S,M as C,d as w,j as T,l as E,t as D,u as O}from"./utils-BplIUxiH.js";import{o as k,r as A,t as j}from"./composables-BwyT4XI4.js";import{r as M}from"./NyxDropdownItem-behKhMKa.js";import{n as N,t as P}from"./NyxDropdownMenu-5QdVfPev.js";var F,I,L,R=e((()=>{_(),M(),O(),j(),N(),F=[`id`,`aria-expanded`,`aria-controls`],I=[`data-position`,`id`,`aria-labelledby`],L=y({__name:`NyxDropdown`,props:{theme:{},size:{},variant:{},trigger:{default:T.Hover},position:{default:w.BottomRight},options:{default:()=>[]}},emits:[`select`],setup(e,{emit:_}){let y=e,x=_,C=b(),{classList:w}=k(y,{origin:`NyxDropdown`}),E=u(!1),D=r(`elTrigger`),O=r(`elDropdown`),j=o(),M=o(),N=u(!1),L=null,{cssVariables:R,computedPosition:z}=A(D,O,{position:p(()=>y.position),gap:u(S.Medium),isUpdateAllowed:E}),B=p(()=>!!C.dropdown),V=p(()=>y.trigger===T.Hover),H=()=>O.value?Array.from(O.value.querySelectorAll(`[data-nyx-dropdown-item]`)):[],U=()=>{L&&=(window.clearTimeout(L),null)},W=()=>{U(),L=window.setTimeout(()=>{J()},120)},G=async e=>{await a(),H()[e]?.focus()},K=async e=>{let t=H();if(!t.length)return;let n=t.findIndex(e=>e===document.activeElement);t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length]?.focus()},q=async e=>{U(),!E.value&&(E.value=!0,e!==void 0&&!B.value&&await G(e))},J=async()=>{U(),E.value&&(E.value=!1,await a(),D.value?.focus())},Y=async()=>{if(E.value){await J();return}await q()},X=async e=>{if(e.key===`Escape`){e.preventDefault(),await J();return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),await Y();return}if(!B.value&&(e.key===`ArrowDown`&&(e.preventDefault(),E.value?await K(1):await q(0)),e.key===`ArrowUp`))if(e.preventDefault(),E.value)await K(-1);else{let e=H();await q(Math.max(e.length-1,0))}},Z=()=>{!V.value||!N.value||q()},ee=()=>{!V.value||!N.value||W()},te=()=>{!V.value||!N.value||U()},ne=()=>{!V.value||!N.value||W()},re=async e=>{if(!B.value){if(e.key===`Escape`){e.preventDefault(),await J();return}e.key===`ArrowDown`&&(e.preventDefault(),await K(1)),e.key===`ArrowUp`&&(e.preventDefault(),await K(-1))}},ie=async e=>{x(`select`,e),await J()},Q=()=>D.value?.ownerDocument??document,$=e=>{if(!E.value)return;let t=e.target;t&&(D.value?.contains(t)||O.value?.contains(t)||J())};return c(()=>{N.value=typeof window<`u`?window.matchMedia?.(`(hover: hover) and (pointer: fine)`)?.matches??!1:!1,Q().addEventListener(`click`,$)}),i(()=>{U(),Q().removeEventListener(`click`,$)}),(e,r)=>(n(),m(`div`,{class:t([`nyx-dropdown`,l(w)])},[g(`div`,{ref_key:`elTrigger`,ref:D,class:`nyx-dropdown__trigger`,id:l(M),role:`button`,tabindex:`0`,"aria-haspopup":`menu`,"aria-expanded":E.value,"aria-controls":l(j),onClick:Y,onKeydown:X,onPointerenter:Z,onPointerleave:ee},[s(e.$slots,`default`)],40,F),(n(),h(d,{to:`body`},[g(`div`,{ref_key:`elDropdown`,ref:O,class:t([`nyx-dropdown__panel`,[...l(w),`nyx-dropdown__panel--${l(z)}`,{"nyx-dropdown__panel--open":E.value}]]),"data-position":l(z),id:l(j),style:f(l(R)),role:`menu`,"aria-labelledby":l(M),onKeydown:re,onPointerenter:te,onPointerleave:ne},[s(e.$slots,`dropdown`,{},()=>[v(P,{theme:y.theme,size:y.size,variant:y.variant,options:y.options,onSelect:ie},null,8,[`theme`,`size`,`variant`,`options`])])],46,I)]))],2))}})})),z,B=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxDropdown`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`trigger`,required:!1,type:{name:`NyxTrigger`},defaultValue:{func:!1,value:`NyxTrigger.Hover`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.BottomRight`}},{name:`options`,required:!1,type:{name:`Array`,elements:[{name:`NyxSelectOption`}]},defaultValue:{func:!1,value:`() => []`}}],events:[{name:`select`,type:{names:[`NyxSelectOption`]}}],slots:[{name:`default`},{name:`dropdown`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxDropdown/NyxDropdown.vue`]})})),V,H,U,W,G,K,q,J,Y,X,Z;e((()=>{_(),B(),O(),D(),V=[{label:`Edit`,value:`edit`},{label:`Duplicate`,value:`duplicate`},{label:`Delete`,value:`delete`,disabled:!0}],H={title:`Components/NyxDropdown`,component:z,argTypes:{theme:{control:{type:`select`},options:Object.values(x)},variant:{control:{type:`select`},options:Object.values(C)},size:{control:{type:`select`},options:Object.values(S)},position:{control:{type:`select`},options:Object.values(w)},trigger:{control:{type:`select`},options:Object.values(T)}}},U=e=>y({components:{NyxDropdown:z},setup(){return{args:e}},template:`
    <nyx-dropdown v-bind="args">
      <button type="button">Actions</button>
    </nyx-dropdown>
  `}),W=U({options:V,theme:x.Primary,size:S.Medium,variant:C.Filled,position:w.Bottom,trigger:T.Hover}),G=()=>y({components:{NyxDropdown:z},setup(){let e=u(null);return c(()=>{window.setTimeout(()=>e.value?.click(),0)}),{sampleOptions:V,triggerRef:e}},template:`
    <nyx-dropdown :options="sampleOptions" trigger="click">
      <button ref="triggerRef" type="button">Open menu</button>
    </nyx-dropdown>
  `}),K=()=>y({components:{NyxDropdown:z},template:`
    <nyx-dropdown>
      <button type="button">Open menu</button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  `}),q=(e,t)=>()=>y({components:{NyxDropdown:z},setup(){return{prop:e,values:Object.values(t),getLabel:e=>E(t,e),sampleOptions:V}},template:`
    <div class="flex-col" style="gap: 1rem; align-items: flex-start;">
      <nyx-dropdown
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value, options: sampleOptions }"
      >
        <button type="button">{{ getLabel(value) }}</button>
      </nyx-dropdown>
    </div>
  `}),J=q(`theme`,x),Y=q(`variant`,C),X=q(`size`,S),W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`Template({
  options: sampleOptions,
  theme: NyxTheme.Primary,
  size: NyxSize.Medium,
  variant: NyxVariant.Filled,
  position: NyxPosition.Bottom,
  trigger: NyxTrigger.Hover
})`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxDropdown
  },
  setup() {
    const triggerRef = ref<HTMLButtonElement | null>(null);
    onMounted(() => {
      window.setTimeout(() => triggerRef.value?.click(), 0);
    });
    return {
      sampleOptions,
      triggerRef
    };
  },
  template: \`
    <nyx-dropdown :options="sampleOptions" trigger="click">
      <button ref="triggerRef" type="button">Open menu</button>
    </nyx-dropdown>
  \`
})`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxDropdown
  },
  template: \`
    <nyx-dropdown>
      <button type="button">Open menu</button>
      <template #dropdown>
        <div style="padding: 1rem; min-width: 14rem; background: var(--nyx-c-bg-soft); border: 1px solid var(--nyx-c-divider); border-radius: var(--nyx-radius-md);">
          Custom dropdown content
        </div>
      </template>
    </nyx-dropdown>
  \`
})`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...X.parameters?.docs?.source}}},Z=[`Default`,`InteractivePreview`,`CustomDropdown`,`Themes`,`Variants`,`Sizes`]}))();export{K as CustomDropdown,W as Default,G as InteractivePreview,X as Sizes,J as Themes,Y as Variants,Z as __namedExportsOrder,H as default};