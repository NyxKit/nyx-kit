import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,D as ee,E as i,L as a,N as o,O as s,Q as c,Y as l,d as te,et as ne,f as u,g as d,m as re,p as f,t as p,v as m,y as h,z as g}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as _,F as v,N as y,P as b,c as x,f as S,p as C,t as w}from"./utils-BN10c1sN.js";import{o as T,r as E,t as D}from"./composables-D41-uQ7I.js";import{n as O,t as k}from"./NyxIcon-BAW9dCtC.js";import{r as A}from"./NyxDropdownItem-CJn3KYD1.js";import{n as j,t as ie}from"./NyxDropdownMenu-B5dcSns2.js";var M,N,P,F=e((()=>{p(),A(),S(),D(),j(),M=[`id`,`aria-expanded`,`aria-controls`],N=[`data-position`,`id`,`aria-labelledby`],P=h({__name:`NyxDropdown`,props:{theme:{},size:{},variant:{},trigger:{default:b.Click},position:{default:C.BottomRight},options:{default:()=>[]}},emits:[`select`],setup(e,{emit:p}){let h=e,v=p,y=g(),{classList:x}=T(h,{origin:`NyxDropdown`}),S=l(!1),C=r(`elTrigger`),w=r(`elDropdown`),D=a(),O=a(),k=l(!1),A=null,{cssVariables:j,computedPosition:P,teleportTarget:F}=E(C,w,{position:u(()=>h.position),gap:l(_.Medium),isUpdateAllowed:S}),I=u(()=>!!y.dropdown),L=u(()=>h.trigger===b.Hover),R=()=>w.value?Array.from(w.value.querySelectorAll(`[data-nyx-dropdown-item]`)):[],z=()=>{A&&=(window.clearTimeout(A),null)},B=()=>{z(),A=window.setTimeout(()=>{W({blurTrigger:!0})},120)},V=async e=>{await i(),R()[e]?.focus()},H=async e=>{let t=R();if(!t.length)return;let n=t.findIndex(e=>e===document.activeElement);t[n===-1?e>0?0:t.length-1:(n+e+t.length)%t.length]?.focus()},U=async e=>{z(),!S.value&&(S.value=!0,e!==void 0&&!I.value&&await V(e))},W=async e=>{z(),S.value&&(S.value=!1,await i(),e?.focusTrigger?C.value?.focus():e?.blurTrigger&&C.value?.blur())},G=async e=>{if(S.value){await W(e);return}await U()},K=async()=>{await G({blurTrigger:!0})},q=async e=>{if(e.key===`Escape`){e.preventDefault(),await W({focusTrigger:!0});return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),await G({focusTrigger:!0});return}if(!I.value&&(e.key===`ArrowDown`&&(e.preventDefault(),S.value?await H(1):await U(0)),e.key===`ArrowUp`))if(e.preventDefault(),S.value)await H(-1);else{let e=R();await U(Math.max(e.length-1,0))}},J=()=>{!L.value||!k.value||U()},Y=()=>{!L.value||!k.value||B()},X=()=>{!L.value||!k.value||z()},Z=()=>{!L.value||!k.value||B()},ae=async e=>{if(!I.value){if(e.key===`Escape`){e.preventDefault(),await W({focusTrigger:!0});return}e.key===`ArrowDown`&&(e.preventDefault(),await H(1)),e.key===`ArrowUp`&&(e.preventDefault(),await H(-1))}},oe=async e=>{v(`select`,e),await W({blurTrigger:!0})},Q=()=>C.value?.ownerDocument??document,$=e=>{if(!S.value)return;let t=e.target;t&&(C.value?.contains(t)||w.value?.contains(t)||W({blurTrigger:!0}))};return s(()=>{k.value=typeof window<`u`?window.matchMedia?.(`(hover: hover) and (pointer: fine)`)?.matches??!1:!1,Q().addEventListener(`click`,$)}),ee(()=>{z(),Q().removeEventListener(`click`,$)}),(e,r)=>(n(),d(`div`,{class:t([`nyx-dropdown`,c(x)])},[f(`div`,{ref_key:`elTrigger`,ref:C,class:`nyx-dropdown__trigger`,id:c(O),role:`button`,tabindex:`0`,"aria-haspopup":`menu`,"aria-expanded":S.value,"aria-controls":c(D),onClick:K,onKeydown:q,onPointerenter:J,onPointerleave:Y},[o(e.$slots,`default`)],40,M),(n(),re(te,{to:c(F)},[f(`div`,{ref_key:`elDropdown`,ref:w,class:t([`nyx-dropdown__panel`,[...c(x),`nyx-dropdown__panel--${c(P)}`,{"nyx-dropdown__panel--open":S.value}]]),"data-position":c(P),id:c(D),style:ne(c(j)),role:`menu`,"aria-labelledby":c(O),onKeydown:ae,onPointerenter:X,onPointerleave:Z},[o(e.$slots,`dropdown`,{},()=>[m(ie,{theme:h.theme,size:h.size,variant:h.variant,options:h.options,onSelect:oe},null,8,[`theme`,`size`,`variant`,`options`])])],46,N)],8,[`to`]))],2))}})})),I,L=e((()=>{F(),F(),I=P,P.__docgenInfo=Object.assign({displayName:P.name??P.__name},{exportName:`default`,displayName:`NyxDropdown`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`trigger`,required:!1,type:{name:`NyxTrigger`},defaultValue:{func:!1,value:`NyxTrigger.Click`}},{name:`position`,required:!1,type:{name:`NyxPosition`},defaultValue:{func:!1,value:`NyxPosition.BottomRight`}},{name:`options`,required:!1,type:{name:`Array`,elements:[{name:`NyxSelectOption`,elements:[{name:`T`}]}]},defaultValue:{func:!1,value:`() => []`}}],events:[{name:`select`,type:{names:[`NyxSelectOption`],elements:[{name:`T`}]}}],slots:[{name:`default`},{name:`dropdown`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxDropdown/NyxDropdown.vue`]})})),R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;e((()=>{p(),L(),S(),w(),O(),R=[{label:`Edit`,value:`edit`,icon:`edit`},{label:`Duplicate`,value:`duplicate`,icon:`plus`},{label:`Delete`,value:`delete`,disabled:!0,icon:`trash`}],z={title:`Components/Navigation/NyxDropdown`,component:I,argTypes:{theme:{control:{type:`select`},options:Object.values(y)},variant:{control:{type:`select`},options:Object.values(v)},size:{control:{type:`select`},options:Object.values(_)},position:{control:{type:`select`},options:Object.values(C)},trigger:{control:{type:`select`},options:Object.values(b)}}},B=e=>h({components:{NyxDropdown:I,NyxIcon:k},setup(){return{args:e}},template:`
    <nyx-dropdown v-bind="args">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="menu" />
        <span>Actions</span>
      </button>
    </nyx-dropdown>
  `}),V={render:()=>B({options:R,theme:y.Primary,size:_.Medium,variant:v.Filled,position:C.Bottom,trigger:b.Click})},H={render:()=>h({components:{NyxDropdown:I,NyxIcon:k},setup(){return{sampleOptions:R}},template:`
    <nyx-dropdown :options="sampleOptions" trigger="hover">
      <button type="button" style="display:inline-flex;align-items:center;gap:0.5rem;">
        <nyx-icon name="chevron-down" />
        <span>Open menu</span>
      </button>
    </nyx-dropdown>
  `})},U={render:()=>h({components:{NyxDropdown:I,NyxIcon:k},setup(){let e=[{label:`Ten`,value:10},{label:`Forty-two`,value:42},{label:`One hundred`,value:100}],t=l(null);return{numericOptions:e,lastPayload:t,onSelect:e=>{t.value=e}}},template:`
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
    `})},W=function(e){return e.Low=`low`,e.Normal=`normal`,e.High=`high`,e}(W||{}),G={render:()=>h({components:{NyxDropdown:I,NyxIcon:k},setup(){let e=[{label:`Low`,value:W.Low,icon:`arrow-down`},{label:`Normal`,value:W.Normal,icon:`minus`},{label:`High`,value:W.High,icon:`arrow-up`}],t=l(null);return{enumOptions:e,lastPayload:t,onSelect:e=>{t.value=e}}},template:`
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
    `})},K={render:()=>h({components:{NyxDropdown:I,NyxIcon:k},template:`
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
  `})},q=(e,t)=>()=>h({components:{NyxDropdown:I,NyxIcon:k},setup(){return{prop:e,values:Object.values(t),getLabel:e=>x(t,e),sampleOptions:R}},template:`
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
  `}),J={render:q(`theme`,y)},Y={render:q(`variant`,v)},X={render:q(`size`,_)},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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