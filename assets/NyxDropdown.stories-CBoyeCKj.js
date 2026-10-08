import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,I as r,N as i,S as a,U as ee,V as o,W as s,g as c,h as l,it as te,j as ne,k as u,m as d,nt as f,p,rt as m,t as h,v as g,x as _}from"./vue.esm-bundler-DwhgfrFn.js";import{D as v,E as y,S as b,T as x,a as S,i as C}from"./string-CevuJH_I.js";import{n as re}from"./useNyxProps-St-cgklA.js";import{c as w,t as T}from"./utils-DImGTvri.js";import{r as ie,t as E}from"./composables-BJ-rw_s4.js";import{n as D,t as O}from"./NyxIcon-j2DTiZ18.js";import{r as k}from"./NyxDropdownItem-CDPuoJFo.js";import{n as A,t as j}from"./NyxDropdownMenu-vOCi0_VZ.js";var M,N,P,F=e((()=>{h(),k(),C(),E(),A(),M=[`id`,`aria-expanded`,`aria-controls`],N=[`data-position`,`id`,`aria-labelledby`],P=a({__name:`NyxDropdown`,props:{theme:{},size:{},variant:{},trigger:{default:y.Click},position:{default:S.BottomRight},options:{default:()=>[]}},emits:[`select`],setup(e,{emit:a}){let h=e,v=a,x=ee(),{classList:S}=re(h,{origin:`NyxDropdown`}),C=t(!1),w=s(`elTrigger`),T=s(`elDropdown`),E=o(),D=o(),O=t(!1),k=null,{cssVariables:A,computedPosition:P,teleportTarget:F}=ie(w,T,{position:d(()=>h.position),gap:t(b.Medium),isUpdateAllowed:C}),I=d(()=>!!x.dropdown),L=d(()=>h.trigger===y.Hover),R=()=>T.value?Array.from(T.value.querySelectorAll(`[data-nyx-dropdown-item]`)):[],z=()=>{k&&=(window.clearTimeout(k),null)},B=()=>{z(),k=window.setTimeout(()=>{W({blurTrigger:!0})},120)},V=async e=>{await u(),R()[e]?.focus()},H=async e=>{let t=R();if(!t.length)return;let n=t.findIndex(e=>e===document.activeElement);t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length]?.focus()},U=async e=>{z(),!C.value&&(C.value=!0,e!==void 0&&!I.value&&await V(e))},W=async e=>{z(),C.value&&(C.value=!1,await u(),e?.focusTrigger?w.value?.focus():e?.blurTrigger&&w.value?.blur())},G=async e=>{if(C.value){await W(e);return}await U()},K=async()=>{await G({blurTrigger:!0})},q=async e=>{if(e.key===`Escape`){e.preventDefault(),await W({focusTrigger:!0});return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),await G({focusTrigger:!0});return}if(!I.value&&(e.key===`ArrowDown`&&(e.preventDefault(),C.value?await H(1):await U(0)),e.key===`ArrowUp`))if(e.preventDefault(),C.value)await H(-1);else{let e=R();await U(Math.max(e.length-1,0))}},J=()=>{!L.value||!O.value||U()},Y=()=>{!L.value||!O.value||B()},X=()=>{!L.value||!O.value||z()},Z=()=>{!L.value||!O.value||B()},ae=async e=>{if(!I.value){if(e.key===`Escape`){e.preventDefault(),await W({focusTrigger:!0});return}e.key===`ArrowDown`&&(e.preventDefault(),await H(1)),e.key===`ArrowUp`&&(e.preventDefault(),await H(-1))}},oe=async e=>{v(`select`,e),await W({blurTrigger:!0})},Q=()=>w.value?.ownerDocument??document,$=e=>{if(!C.value)return;let t=e.target;t&&(w.value?.contains(t)||T.value?.contains(t)||W({blurTrigger:!0}))};return ne(()=>{O.value=typeof window<`u`?window.matchMedia?.(`(hover: hover) and (pointer: fine)`)?.matches??!1:!1,Q().addEventListener(`click`,$)}),n(()=>{z(),Q().removeEventListener(`click`,$)}),(e,t)=>(i(),g(`div`,{class:m([`nyx-dropdown`,f(S)])},[l(`div`,{ref_key:`elTrigger`,ref:w,class:`nyx-dropdown__trigger`,id:f(D),role:`button`,tabindex:`0`,"aria-haspopup":`menu`,"aria-expanded":C.value,"aria-controls":f(E),onClick:K,onKeydown:q,onPointerenter:J,onPointerleave:Y},[r(e.$slots,`default`)],40,M),(i(),c(p,{to:f(F)},[l(`div`,{ref_key:`elDropdown`,ref:T,class:m([`nyx-dropdown__panel`,[...f(S),`nyx-dropdown__panel--${f(P)}`,{"nyx-dropdown__panel--open":C.value}]]),"data-position":f(P),id:f(E),style:te(f(A)),role:`menu`,"aria-labelledby":f(D),onKeydown:ae,onPointerenter:X,onPointerleave:Z},[r(e.$slots,`dropdown`,{},()=>[_(j,{theme:h.theme,size:h.size,variant:h.variant,options:h.options,onSelect:oe},null,8,[`theme`,`size`,`variant`,`options`])])],46,N)],8,[`to`]))],2))}})})),I,L=e((()=>{F(),F(),I=P,P.__docgenInfo=Object.assign({displayName:P.name??P.__name},{exportName:`default`,displayName:`NyxDropdown`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`trigger`,required:!1,type:{name:`NyxTrigger`},defaultValue:{func:!1,value:`NyxTrigger.Click`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.BottomRight`}},{name:`options`,required:!1,type:{name:`Array`,elements:[{name:`NyxSelectOption`,elements:[{name:`T`}]}]},defaultValue:{func:!1,value:`() => []`}}],events:[{name:`select`,type:{names:[`NyxSelectOption`],elements:[{name:`T`}]}}],slots:[{name:`default`},{name:`dropdown`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxDropdown/NyxDropdown.vue`]})})),R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;e((()=>{h(),L(),C(),T(),D(),R=[{label:`Edit`,value:`edit`,icon:`edit`},{label:`Duplicate`,value:`duplicate`,icon:`plus`},{label:`Delete`,value:`delete`,disabled:!0,icon:`trash`}],z={title:`Components/Navigation/NyxDropdown`,component:I,argTypes:{theme:{control:{type:`select`},options:Object.values(x)},variant:{control:{type:`select`},options:Object.values(v)},size:{control:{type:`select`},options:Object.values(b)},position:{control:{type:`select`},options:Object.values(S)},trigger:{control:{type:`select`},options:Object.values(y)}}},B=e=>a({components:{NyxDropdown:I,NyxIcon:O},setup(){return{args:e}},template:`
    <nyx-dropdown v-bind="args">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="menu" />
        <span>Actions</span>
      </button>
    </nyx-dropdown>
  `}),V={render:()=>B({options:R,theme:x.Primary,size:b.Medium,variant:v.Filled,position:S.Bottom,trigger:y.Click})},H={render:()=>a({components:{NyxDropdown:I,NyxIcon:O},setup(){return{sampleOptions:R}},template:`
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  `})},U={render:()=>a({components:{NyxDropdown:I,NyxIcon:O},setup(){let e=[{label:`Ten`,value:10},{label:`Forty-two`,value:42},{label:`One hundred`,value:100}],n=t(null);return{numericOptions:e,lastPayload:n,onSelect:e=>{n.value=e}}},template:`
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
    `})},W=function(e){return e.Low=`low`,e.Normal=`normal`,e.High=`high`,e}(W||{}),G={render:()=>a({components:{NyxDropdown:I,NyxIcon:O},setup(){let e=[{label:`Low`,value:W.Low,icon:`arrow-down`},{label:`Normal`,value:W.Normal,icon:`minus`},{label:`High`,value:W.High,icon:`arrow-up`}],n=t(null);return{enumOptions:e,lastPayload:n,onSelect:e=>{n.value=e}}},template:`
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
    `})},K={render:()=>a({components:{NyxDropdown:I,NyxIcon:O},template:`
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
  `})},q=(e,t)=>()=>a({components:{NyxDropdown:I,NyxIcon:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>w(t,e),sampleOptions:R}},template:`
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
  `}),J={render:q(`theme`,x)},Y={render:q(`variant`,v)},X={render:q(`size`,b)},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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