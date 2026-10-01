import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,B as n,D as r,E as i,G as a,H as o,L as s,N as ee,P as c,R as te,T as l,W as u,X as d,_ as f,b as p,c as ne,d as m,et as re,g as ie,h as ae,j as h,m as g,n as oe,nt as se,p as _,t as v,v as ce,x as le,y as ue,z as de}from"./vue.esm-bundler-BYSzMkkg.js";import{A as y,N as b,f as x}from"./utils-D7ENd3Hb.js";import{dt as S,ft as fe}from"./composables-BpSFaobz.js";import{n as C,t as w}from"./NyxButton-DiWvMxO-.js";import{n as T,t as E}from"./NyxInput-B1hDQZQB.js";import{i as D,n as O,r as k,t as A}from"./NyxFormField-CQfrgRdf.js";import{n as pe,t as j}from"./NyxActionItem-CCU1JnEw.js";var M=e((()=>{})),N,P,F,I,L,R,z=e((()=>{v(),S(),M(),N=[`id`,`disabled`,`aria-expanded`,`aria-controls`,`onClick`,`onKeydown`],P={class:`nyx-accordion__label`},F=[`id`,`aria-hidden`,`inert`],I={class:`nyx-accordion__clip`},L={class:`nyx-accordion__body`},R=p({__name:`NyxAccordion`,props:l({items:{},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},headingLevel:{default:3},theme:{},size:{}},{modelValue:{},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let l=e,p=de(e,`modelValue`),v=n(),{classList:y}=fe(l,{origin:`NyxAccordion`}),b=le(),x=()=>{let e=b.vnode.props??{};return(`modelValue`in e||`model-value`in e)&&(`onUpdate:modelValue`in e||`onUpdate:model-value`in e)},S=d(p.value),C=_(()=>{let e=new Set;return l.items.filter(t=>typeof t.id!=`string`||!t.id.trim()||e.has(t.id)?!1:(e.add(t.id),!0))}),w=_(()=>new Set(C.value.map(e=>e.id))),T=e=>{let t=Array.isArray(e)?e:e?[e]:[],n=[...new Set(t)].filter(e=>w.value.has(e));return l.multiple?n:n[0]??``},E=_({get:()=>T(x()?p.value:S.value),set:e=>{let t=T(e);x()||(S.value=t),!x()&&Object.is(p.value,t)?b.emit(`update:modelValue`,t):p.value=t}});o(p,e=>{x()||(S.value=T(e))}),o([()=>l.multiple,w],()=>{x()||(S.value=T(S.value))});let D=_(()=>new Set(Array.isArray(E.value)?E.value:E.value?[E.value]:[])),O=_(()=>C.value.map((e,t)=>({item:e,index:t,open:D.value.has(e.id),disabled:l.disabled||!!e.disabled}))),k=te(),A=e=>`${k}-${Array.from(e,e=>e.codePointAt(0).toString(16)).join(`-`)}`,pe=e=>`${A(e)}-trigger`,j=e=>`${A(e)}-panel`,M=e=>v[`header-${e}`]?`header-${e}`:`header`,R=e=>v[`item-${e}`]?`item-${e}`:`default`,z=d(null),B=new Map,V=new Map,H=(e,t,n)=>{n instanceof HTMLElement?e.set(t,n):e.delete(t)},U=e=>{e.disabled||(B.get(e.item.id)?.focus(),E.value=l.multiple?e.open?[...D.value].filter(t=>t!==e.item.id):[...D.value,e.item.id]:e.open?``:e.item.id)},W=(e,t)=>{if(e.target!==e.currentTarget||t.disabled)return;let n=O.value.filter(e=>!e.disabled),r=n.findIndex(e=>e.item.id===t.item.id),i;switch(e.key){case`ArrowDown`:i=(r+1)%n.length;break;case`ArrowUp`:i=(r-1+n.length)%n.length;break;case`Home`:i=0;break;case`End`:i=n.length-1;break;default:return}e.preventDefault(),B.get(n[i].item.id)?.focus()};return o(O,(e,t)=>{let n=z.value?.ownerDocument.activeElement;if(!n)return;let i=t.find(t=>{let r=e.find(e=>e.item.id===t.item.id);return V.get(t.item.id)?.contains(n)&&(!r||!r.open)||B.get(t.item.id)===n&&(!r||r.disabled)});i&&r(()=>{let e=z.value?.ownerDocument;if(!e||e.activeElement!==n&&e.activeElement!==e.body)return;let t=O.value,r=t.findIndex(e=>e.item.id===i.item.id),a=t[r],o=r<0?i.index:r+1,s=a&&!a.disabled?a:t.slice(o).find(e=>!e.disabled)??t.slice(0,o).reverse().find(e=>!e.disabled);s?B.get(s.item.id)?.focus():z.value?.focus()})}),(n,r)=>(h(),f(`div`,{ref_key:`root`,ref:z,class:re([`nyx-accordion`,t(y)]),tabindex:`-1`},[(h(!0),f(m,null,ee(O.value,o=>(h(),f(`div`,{key:o.item.id,class:`nyx-accordion__item`},[(h(),ae(s(`h${e.headingLevel}`),{class:`nyx-accordion__heading`},{default:u(()=>[g(`button`,{ref_for:!0,ref:e=>H(t(B),o.item.id,e),id:pe(o.item.id),class:`nyx-accordion__trigger`,type:`button`,disabled:o.disabled,"aria-expanded":o.open,"aria-controls":j(o.item.id),onClick:e=>U(o),onKeydown:e=>W(e,o)},[g(`span`,P,[v[`header-${o.item.id}`]||v.header?c(n.$slots,M(o.item.id),i({key:0,ref_for:!0},o)):(h(),f(m,{key:1},[ce(se(o.item.label),1)],64))]),r[0]||=g(`svg`,{class:`nyx-accordion__indicator`,"aria-hidden":`true`,viewBox:`0 0 16 16`,fill:`none`},[g(`path`,{d:`m4 6 4 4 4-4`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.5`})],-1)],40,N)]),_:2},1024)),ue(oe,{name:`nyx-accordion-panel`},{default:u(()=>[a(g(`div`,{ref_for:!0,ref:e=>H(t(V),o.item.id,e),id:j(o.item.id),class:`nyx-accordion__panel`,"aria-hidden":!o.open,inert:!o.open},[g(`div`,I,[g(`div`,L,[c(n.$slots,R(o.item.id),i({ref_for:!0},o))])])],8,F),[[ne,o.open]])]),_:2},1024)]))),128)),O.value.length?ie(``,!0):c(n.$slots,`empty`,{key:0})],2))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxAccordion`,description:``,tags:{},props:[{name:`items`,required:!0,type:{name:`Array`,elements:[{name:`NyxAccordionItem`}]}},{name:`multiple`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`headingLevel`,required:!1,type:{name:`union`,elements:[{name:`2`},{name:`3`},{name:`4`},{name:`5`},{name:`6`}]},defaultValue:{func:!1,value:`3`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],slots:[{name:`getHeaderSlotName(row.item.id)`,scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`getBodySlotName(row.item.id)`,scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`empty`},{name:`header`},{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxAccordion/NyxAccordion.vue`]})})),H,U,W,G,K,q,J,Y,X,Z,Q,$,me;e((()=>{v(),V(),C(),T(),D(),O(),pe(),x(),H=[{id:`account`,label:`Account details`},{id:`privacy`,label:`Privacy and permissions`},{id:`notifications`,label:`Notifications`}],U={account:`Manage the details you share with your team. Your edits stay here when you close this section.`,privacy:`Choose who can view your profile and which services can access your account.`,notifications:`Choose the updates you want to receive and how often they arrive.`},W=`<template #default="{ item }"><p>{{ content[item.id] }}</p></template>`,G={title:`Components/Navigation/NyxAccordion`,component:B,args:{items:H},argTypes:{theme:{control:`select`,options:Object.values(b)},size:{control:`select`,options:Object.values(y)},multiple:{control:`boolean`},disabled:{control:`boolean`},headingLevel:{control:`select`,options:[2,3,4,5,6]}},render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E},setup:()=>({args:e,content:U}),template:`<NyxAccordion v-bind="args">${W}</NyxAccordion>`})},K={},q={args:{multiple:!0}},J={render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E,NyxForm:k,NyxFormField:A,NyxActionItem:j},setup:()=>({args:e,content:U,open:d(`account`),name:d(``),isProfilePrivate:d(!0)}),template:`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <NyxAccordion v-bind="args" v-model="open">
          ${W}
          <template #item-account>
            <NyxForm>
              <p>{{ content.account }}</p>
              <NyxFormField label="Display name" v-slot="{ id }">
                <NyxInput :id="id" v-model="name" autocomplete="name" placeholder="Your name" />
              </NyxFormField>
            </NyxForm>
          </template>
          <template #item-privacy>
            <NyxActionItem
              title="Profile visibility"
              :action="isProfilePrivate ? 'Make public' : 'Make private'"
              @click="isProfilePrivate = !isProfilePrivate"
            >
              {{ isProfilePrivate ? 'Your profile is only visible to you.' : 'Your profile is visible to other members.' }}
            </NyxActionItem>
          </template>
        </NyxAccordion>
        <p>Open section: {{ open || 'None' }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
          <NyxButton @click="open = 'privacy'">Open privacy</NyxButton>
          <NyxButton @click="open = ''">Close all</NyxButton>
        </div>
      </div>`})},Y={args:{multiple:!0},render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E},setup:()=>({args:e,content:U,open:d([`account`,`privacy`])}),template:`<div><NyxAccordion v-bind="args" v-model="open">${W}</NyxAccordion><p>Open sections: {{ open }}</p></div>`})},X={render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E},setup:()=>({args:e,content:U}),template:`
      <NyxAccordion v-bind="args">
        <template #header="{ item, index }">{{ index + 1 }}. {{ item.label }}</template>
        <template #header-privacy>Privacy <small>(Review recommended)</small></template>
        ${W}
        <template #item-privacy>
          <p>Two connected services can access your profile.</p>
          <a href="#connected-services">Review connected services</a>
        </template>
      </NyxAccordion>`})},Z={args:{items:[H[0],{...H[1],disabled:!0},H[2]]}},Q={args:{items:[]},render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E},setup:()=>({args:e}),template:`<NyxAccordion v-bind="args"><template #empty>No settings sections are available.</template></NyxAccordion>`})},$={render:e=>({components:{NyxAccordion:B,NyxButton:w,NyxInput:E},setup(){let t=d(!0),n=d([`account`,`privacy`]),r=d([...H]);return{args:e,content:U,multiple:t,open:n,sections:r,toggleExpansionMode:()=>{t.value=!t.value,n.value=t.value?n.value?[String(n.value)]:[]:Array.isArray(n.value)?n.value[0]??``:n.value}}},template:`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
        <NyxButton @click="toggleExpansionMode">Switch to {{ multiple ? 'single' : 'multiple' }}</NyxButton>
        <NyxButton @click="sections = [...sections].reverse()">Reverse sections</NyxButton>
        <NyxButton @click="sections = sections.filter(item => item.id !== 'privacy')">Remove privacy</NyxButton>
        </div>
        <NyxAccordion v-bind="args" :items="sections" :multiple="multiple" v-model="open">${W}</NyxAccordion>
        <p>Open sections: {{ open }}</p>
      </div>`})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    multiple: true
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxAccordion,
      NyxButton,
      NyxInput,
      NyxForm,
      NyxFormField,
      NyxActionItem
    },
    setup: () => ({
      args,
      content,
      open: ref<NyxAccordionModel>('account'),
      name: ref(''),
      isProfilePrivate: ref(true)
    }),
    template: \`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <NyxAccordion v-bind="args" v-model="open">
          \${body}
          <template #item-account>
            <NyxForm>
              <p>{{ content.account }}</p>
              <NyxFormField label="Display name" v-slot="{ id }">
                <NyxInput :id="id" v-model="name" autocomplete="name" placeholder="Your name" />
              </NyxFormField>
            </NyxForm>
          </template>
          <template #item-privacy>
            <NyxActionItem
              title="Profile visibility"
              :action="isProfilePrivate ? 'Make public' : 'Make private'"
              @click="isProfilePrivate = !isProfilePrivate"
            >
              {{ isProfilePrivate ? 'Your profile is only visible to you.' : 'Your profile is visible to other members.' }}
            </NyxActionItem>
          </template>
        </NyxAccordion>
        <p>Open section: {{ open || 'None' }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
          <NyxButton @click="open = 'privacy'">Open privacy</NyxButton>
          <NyxButton @click="open = ''">Close all</NyxButton>
        </div>
      </div>\`
  })
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    multiple: true
  },
  render: args => ({
    components: {
      NyxAccordion,
      NyxButton,
      NyxInput
    },
    setup: () => ({
      args,
      content,
      open: ref<NyxAccordionModel>(['account', 'privacy'])
    }),
    template: \`<div><NyxAccordion v-bind="args" v-model="open">\${body}</NyxAccordion><p>Open sections: {{ open }}</p></div>\`
  })
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxAccordion,
      NyxButton,
      NyxInput
    },
    setup: () => ({
      args,
      content
    }),
    template: \`
      <NyxAccordion v-bind="args">
        <template #header="{ item, index }">{{ index + 1 }}. {{ item.label }}</template>
        <template #header-privacy>Privacy <small>(Review recommended)</small></template>
        \${body}
        <template #item-privacy>
          <p>Two connected services can access your profile.</p>
          <a href="#connected-services">Review connected services</a>
        </template>
      </NyxAccordion>\`
  })
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    items: [items[0], {
      ...items[1],
      disabled: true
    }, items[2]]
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    items: []
  },
  render: args => ({
    components: {
      NyxAccordion,
      NyxButton,
      NyxInput
    },
    setup: () => ({
      args
    }),
    template: '<NyxAccordion v-bind="args"><template #empty>No settings sections are available.</template></NyxAccordion>'
  })
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxAccordion,
      NyxButton,
      NyxInput
    },
    setup() {
      const multiple = ref(true);
      const open = ref<NyxAccordionModel>(['account', 'privacy']);
      const sections = ref([...items]);
      const toggleExpansionMode = () => {
        multiple.value = !multiple.value;
        open.value = multiple.value ? open.value ? [String(open.value)] : [] : Array.isArray(open.value) ? open.value[0] ?? '' : open.value;
      };
      return {
        args,
        content,
        multiple,
        open,
        sections,
        toggleExpansionMode
      };
    },
    template: \`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
        <NyxButton @click="toggleExpansionMode">Switch to {{ multiple ? 'single' : 'multiple' }}</NyxButton>
        <NyxButton @click="sections = [...sections].reverse()">Reverse sections</NyxButton>
        <NyxButton @click="sections = sections.filter(item => item.id !== 'privacy')">Remove privacy</NyxButton>
        </div>
        <NyxAccordion v-bind="args" :items="sections" :multiple="multiple" v-model="open">\${body}</NyxAccordion>
        <p>Open sections: {{ open }}</p>
      </div>\`
  })
}`,...$.parameters?.docs?.source}}},me=[`Default`,`UnboundMultiple`,`BoundSingle`,`Multiple`,`CustomSlots`,`Disabled`,`Empty`,`DynamicItemsAndMode`]}))();export{J as BoundSingle,X as CustomSlots,K as Default,Z as Disabled,$ as DynamicItemsAndMode,Q as Empty,Y as Multiple,q as UnboundMultiple,me as __namedExportsOrder,G as default};