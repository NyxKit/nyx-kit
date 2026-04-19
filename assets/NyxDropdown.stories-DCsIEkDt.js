import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,D as i,E as a,L as o,N as s,O as ee,Q as c,Y as l,d as u,et as te,f as d,g as f,m as p,p as m,t as h,v as g,y as _,z as ne}from"./vue.esm-bundler-C_Vkk7g_.js";import{M as v,N as y,O as b,d as x,j as S,l as C,t as w,u as T}from"./utils-I3j1AIuu.js";import{o as re,r as ie,t as E}from"./composables-DIeLoQQz.js";import{n as D,t as O}from"./NyxIcon-qPhKzAEA.js";import{r as k}from"./NyxDropdownItem-BNv8f-P9.js";import{n as A,t as j}from"./NyxDropdownMenu-DPIGj0h2.js";var M,N,P,F=e((()=>{h(),k(),T(),E(),A(),M=[`id`,`aria-expanded`,`aria-controls`],N=[`data-position`,`id`,`aria-labelledby`],P=_({__name:`NyxDropdown`,props:{theme:{},size:{},variant:{},trigger:{default:v.Click},position:{default:x.BottomRight},options:{default:()=>[]}},emits:[`select`],setup(e,{emit:h}){let _=e,y=h,x=ne(),{classList:S}=re(_,{origin:`NyxDropdown`}),C=l(!1),w=r(`elTrigger`),T=r(`elDropdown`),E=o(),D=o(),O=l(!1),k=null,{cssVariables:A,computedPosition:P}=ie(w,T,{position:d(()=>_.position),gap:l(b.Medium),isUpdateAllowed:C}),F=d(()=>!!x.dropdown),I=d(()=>_.trigger===v.Hover),L=()=>T.value?Array.from(T.value.querySelectorAll(`[data-nyx-dropdown-item]`)):[],R=()=>{k&&=(window.clearTimeout(k),null)},z=()=>{R(),k=window.setTimeout(()=>{U({blurTrigger:!0})},120)},B=async e=>{await a(),L()[e]?.focus()},V=async e=>{let t=L();if(!t.length)return;let n=t.findIndex(e=>e===document.activeElement);t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length]?.focus()},H=async e=>{R(),!C.value&&(C.value=!0,e!==void 0&&!F.value&&await B(e))},U=async e=>{R(),C.value&&(C.value=!1,await a(),e?.focusTrigger?w.value?.focus():e?.blurTrigger&&w.value?.blur())},W=async e=>{if(C.value){await U(e);return}await H()},G=async()=>{await W({blurTrigger:!0})},K=async e=>{if(e.key===`Escape`){e.preventDefault(),await U({focusTrigger:!0});return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),await W({focusTrigger:!0});return}if(!F.value&&(e.key===`ArrowDown`&&(e.preventDefault(),C.value?await V(1):await H(0)),e.key===`ArrowUp`))if(e.preventDefault(),C.value)await V(-1);else{let e=L();await H(Math.max(e.length-1,0))}},q=()=>{!I.value||!O.value||H()},J=()=>{!I.value||!O.value||z()},Y=()=>{!I.value||!O.value||R()},X=()=>{!I.value||!O.value||z()},Z=async e=>{if(!F.value){if(e.key===`Escape`){e.preventDefault(),await U({focusTrigger:!0});return}e.key===`ArrowDown`&&(e.preventDefault(),await V(1)),e.key===`ArrowUp`&&(e.preventDefault(),await V(-1))}},ae=async e=>{y(`select`,e),await U({blurTrigger:!0})},Q=()=>w.value?.ownerDocument??document,$=e=>{if(!C.value)return;let t=e.target;t&&(w.value?.contains(t)||T.value?.contains(t)||U({blurTrigger:!0}))};return ee(()=>{O.value=typeof window<`u`?window.matchMedia?.(`(hover: hover) and (pointer: fine)`)?.matches??!1:!1,Q().addEventListener(`click`,$)}),i(()=>{R(),Q().removeEventListener(`click`,$)}),(e,r)=>(n(),f(`div`,{class:t([`nyx-dropdown`,c(S)])},[m(`div`,{ref_key:`elTrigger`,ref:w,class:`nyx-dropdown__trigger`,id:c(D),role:`button`,tabindex:`0`,"aria-haspopup":`menu`,"aria-expanded":C.value,"aria-controls":c(E),onClick:G,onKeydown:K,onPointerenter:q,onPointerleave:J},[s(e.$slots,`default`)],40,M),(n(),p(u,{to:`body`},[m(`div`,{ref_key:`elDropdown`,ref:T,class:t([`nyx-dropdown__panel`,[...c(S),`nyx-dropdown__panel--${c(P)}`,{"nyx-dropdown__panel--open":C.value}]]),"data-position":c(P),id:c(E),style:te(c(A)),role:`menu`,"aria-labelledby":c(D),onKeydown:Z,onPointerenter:Y,onPointerleave:X},[s(e.$slots,`dropdown`,{},()=>[g(j,{theme:_.theme,size:_.size,variant:_.variant,options:_.options,onSelect:ae},null,8,[`theme`,`size`,`variant`,`options`])])],46,N)]))],2))}})})),I,L=e((()=>{F(),F(),I=P,P.__docgenInfo=Object.assign({displayName:P.name??P.__name},{exportName:`default`,displayName:`NyxDropdown`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`trigger`,required:!1,type:{name:`NyxTrigger`},defaultValue:{func:!1,value:`NyxTrigger.Click`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.BottomRight`}},{name:`options`,required:!1,type:{name:`Array`,elements:[{name:`NyxSelectOption`,elements:[{name:`T`}]}]},defaultValue:{func:!1,value:`() => []`}}],events:[{name:`select`,type:{names:[`NyxSelectOption`],elements:[{name:`T`}]}}],slots:[{name:`default`},{name:`dropdown`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxDropdown/NyxDropdown.vue`]})})),R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;e((()=>{h(),L(),T(),w(),D(),R=[{label:`Edit`,value:`edit`,icon:`edit`},{label:`Duplicate`,value:`duplicate`,icon:`plus`},{label:`Delete`,value:`delete`,disabled:!0,icon:`trash`}],z={title:`Components/Navigation/NyxDropdown`,component:I,argTypes:{theme:{control:{type:`select`},options:Object.values(S)},variant:{control:{type:`select`},options:Object.values(y)},size:{control:{type:`select`},options:Object.values(b)},position:{control:{type:`select`},options:Object.values(x)},trigger:{control:{type:`select`},options:Object.values(v)}}},B=e=>_({components:{NyxDropdown:I,NyxIcon:O},setup(){return{args:e}},template:`
    <nyx-dropdown v-bind="args">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="menu" />
        <span>Actions</span>
      </button>
    </nyx-dropdown>
  `}),V={render:()=>B({options:R,theme:S.Primary,size:b.Medium,variant:y.Filled,position:x.Bottom,trigger:v.Click})},H={render:()=>_({components:{NyxDropdown:I,NyxIcon:O},setup(){return{sampleOptions:R}},template:`
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  `})},U={render:()=>_({components:{NyxDropdown:I,NyxIcon:O},setup(){let e=[{label:`Ten`,value:10},{label:`Forty-two`,value:42},{label:`One hundred`,value:100}],t=l(null);return{numericOptions:e,lastPayload:t,onSelect:e=>{t.value=e}}},template:`
      <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start;">
        <nyx-dropdown :options="numericOptions" theme="primary" size="md" variant="filled" @select="onSelect">
          <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
            <nyx-icon name="menu" />
            <span>Numeric actions</span>
          </button>
        </nyx-dropdown>
        <p v-if="lastPayload" style="margin:0;font-family:monospace;font-size:0.875rem;">
          Last select: value={{ lastPayload.value }} (typeof {{ typeof lastPayload.value }})
        </p>
        <p v-else style="margin:0;font-size:0.875rem;opacity:0.7;">Pick an item to see the payload type.</p>
      </div>
    `})},W=function(e){return e.Low=`low`,e.Normal=`normal`,e.High=`high`,e}(W||{}),G={render:()=>_({components:{NyxDropdown:I,NyxIcon:O},setup(){let e=[{label:`Low`,value:W.Low,icon:`arrow-down`},{label:`Normal`,value:W.Normal,icon:`minus`},{label:`High`,value:W.High,icon:`arrow-up`}],t=l(null);return{enumOptions:e,lastPayload:t,onSelect:e=>{t.value=e}}},template:`
      <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start;">
        <nyx-dropdown :options="enumOptions" theme="primary" size="md" variant="filled" @select="onSelect">
          <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
            <nyx-icon name="flag" />
            <span>Priority (enum)</span>
          </button>
        </nyx-dropdown>
        <p v-if="lastPayload" style="margin:0;font-family:monospace;font-size:0.875rem;">
          Last select: {{ lastPayload.value }}
        </p>
        <p v-else style="margin:0;font-size:0.875rem;opacity:0.7;">Pick an item to see the enum payload.</p>
      </div>
    `})},K={render:()=>_({components:{NyxDropdown:I,NyxIcon:O},template:`
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
  `})},q=(e,t)=>()=>_({components:{NyxDropdown:I,NyxIcon:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>C(t,e),sampleOptions:R}},template:`
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
  `}),J={render:q(`theme`,S)},Y={render:q(`variant`,y)},X={render:q(`size`,b)},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => Template({
    options: sampleOptions,
    theme: NyxTheme.Primary,
    size: NyxSize.Medium,
    variant: NyxVariant.Filled,
    position: NyxPosition.Bottom,
    trigger: NyxTrigger.Click
  })
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxDropdown,
      NyxIcon
    },
    setup() {
      const numericOptions: NyxSelectOption<number>[] = [{
        label: 'Ten',
        value: 10
      }, {
        label: 'Forty-two',
        value: 42
      }, {
        label: 'One hundred',
        value: 100
      }];
      const lastPayload = ref<NyxSelectOption<number> | null>(null);
      const onSelect = (option: NyxSelectOption<number>) => {
        lastPayload.value = option;
      };
      return {
        numericOptions,
        lastPayload,
        onSelect
      };
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start;">
        <nyx-dropdown :options="numericOptions" theme="primary" size="md" variant="filled" @select="onSelect">
          <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
            <nyx-icon name="menu" />
            <span>Numeric actions</span>
          </button>
        </nyx-dropdown>
        <p v-if="lastPayload" style="margin:0;font-family:monospace;font-size:0.875rem;">
          Last select: value={{ lastPayload.value }} (typeof {{ typeof lastPayload.value }})
        </p>
        <p v-else style="margin:0;font-size:0.875rem;opacity:0.7;">Pick an item to see the payload type.</p>
      </div>
    \`
  })
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxDropdown,
      NyxIcon
    },
    setup() {
      const enumOptions: NyxSelectOption<MenuPriority>[] = [{
        label: 'Low',
        value: MenuPriority.Low,
        icon: 'arrow-down'
      }, {
        label: 'Normal',
        value: MenuPriority.Normal,
        icon: 'minus'
      }, {
        label: 'High',
        value: MenuPriority.High,
        icon: 'arrow-up'
      }];
      const lastPayload = ref<NyxSelectOption<MenuPriority> | null>(null);
      const onSelect = (option: NyxSelectOption<MenuPriority>) => {
        lastPayload.value = option;
      };
      return {
        enumOptions,
        lastPayload,
        onSelect
      };
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start;">
        <nyx-dropdown :options="enumOptions" theme="primary" size="md" variant="filled" @select="onSelect">
          <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
            <nyx-icon name="flag" />
            <span>Priority (enum)</span>
          </button>
        </nyx-dropdown>
        <p v-if="lastPayload" style="margin:0;font-family:monospace;font-size:0.875rem;">
          Last select: {{ lastPayload.value }}
        </p>
        <p v-else style="margin:0;font-size:0.875rem;opacity:0.7;">Pick an item to see the enum payload.</p>
      </div>
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
}`,...X.parameters?.docs?.source}}},Z=[`Default`,`InteractivePreview`,`NumericValues`,`EnumValues`,`CustomDropdown`,`Themes`,`Variants`,`Sizes`]}))();export{K as CustomDropdown,V as Default,G as EnumValues,H as InteractivePreview,U as NumericValues,X as Sizes,J as Themes,Y as Variants,Z as __namedExportsOrder,z as default};