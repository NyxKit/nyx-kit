import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,C as n,D as r,F as i,G as a,H as o,I as s,J as ee,N as c,O as l,S as u,U as te,V as ne,_ as re,at as ie,b as ae,f as d,g as oe,h as f,k as se,l as ce,m as p,n as le,nt as m,q as ue,rt as de,t as h,v as g,x as fe,z as pe}from"./vue.esm-bundler-DwhgfrFn.js";import{S as _,T as v,i as y}from"./string-CevuJH_I.js";import{n as me,t as b}from"./useNyxProps-St-cgklA.js";import{n as x,t as S}from"./NyxButton-C4Pl6wfC.js";import{n as C,t as w}from"./NyxInput-CNlBluJb.js";import{i as T,n as E,r as D,t as O}from"./NyxFormField-B_T1UoQp.js";import{n as k,t as A}from"./NyxActionItem-DKxeqclc.js";var j=e((()=>{})),M,N,P,F,I,L,R=e((()=>{h(),b(),j(),M=[`id`,`disabled`,`aria-expanded`,`aria-controls`,`onClick`,`onKeydown`],N={class:`nyx-accordion__label`},P=[`id`,`aria-hidden`,`inert`],F={class:`nyx-accordion__clip`},I={class:`nyx-accordion__body`},L=u({__name:`NyxAccordion`,props:r({items:{},multiple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},headingLevel:{default:3},theme:{},size:{}},{modelValue:{},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let r=e,u=o(e,`modelValue`),h=te(),{classList:_}=me(r,{origin:`NyxAccordion`}),v=n(),y=()=>{let e=v.vnode.props??{};return(`modelValue`in e||`model-value`in e)&&(`onUpdate:modelValue`in e||`onUpdate:model-value`in e)},b=t(u.value),x=p(()=>{let e=new Set;return r.items.filter(t=>typeof t.id!=`string`||!t.id.trim()||e.has(t.id)?!1:(e.add(t.id),!0))}),S=p(()=>new Set(x.value.map(e=>e.id))),C=e=>{let t=Array.isArray(e)?e:e?[e]:[],n=[...new Set(t)].filter(e=>S.value.has(e));return r.multiple?n:n[0]??``},w=p({get:()=>C(y()?u.value:b.value),set:e=>{let t=C(e);y()||(b.value=t),!y()&&Object.is(u.value,t)?v.emit(`update:modelValue`,t):u.value=t}});a(u,e=>{y()||(b.value=C(e))}),a([()=>r.multiple,S],()=>{y()||(b.value=C(b.value))});let T=p(()=>new Set(Array.isArray(w.value)?w.value:w.value?[w.value]:[])),E=p(()=>x.value.map((e,t)=>({item:e,index:t,open:T.value.has(e.id),disabled:r.disabled||!!e.disabled}))),D=ne(),O=e=>`${D}-${Array.from(e,e=>e.codePointAt(0).toString(16)).join(`-`)}`,k=e=>`${O(e)}-trigger`,A=e=>`${O(e)}-panel`,j=e=>h[`header-${e}`]?`header-${e}`:`header`,L=e=>h[`item-${e}`]?`item-${e}`:`default`,R=t(null),z=new Map,B=new Map,V=(e,t,n)=>{n instanceof HTMLElement?e.set(t,n):e.delete(t)},H=e=>{e.disabled||(z.get(e.item.id)?.focus(),w.value=r.multiple?e.open?[...T.value].filter(t=>t!==e.item.id):[...T.value,e.item.id]:e.open?``:e.item.id)},U=(e,t)=>{if(e.target!==e.currentTarget||t.disabled)return;let n=E.value.filter(e=>!e.disabled),r=n.findIndex(e=>e.item.id===t.item.id),i;switch(e.key){case`ArrowDown`:i=(r+1)%n.length;break;case`ArrowUp`:i=(r-1+n.length)%n.length;break;case`Home`:i=0;break;case`End`:i=n.length-1;break;default:return}e.preventDefault(),z.get(n[i].item.id)?.focus()};return a(E,(e,t)=>{let n=R.value?.ownerDocument.activeElement;if(!n)return;let r=t.find(t=>{let r=e.find(e=>e.item.id===t.item.id);return B.get(t.item.id)?.contains(n)&&(!r||!r.open)||z.get(t.item.id)===n&&(!r||r.disabled)});r&&se(()=>{let e=R.value?.ownerDocument;if(!e||e.activeElement!==n&&e.activeElement!==e.body)return;let t=E.value,i=t.findIndex(e=>e.item.id===r.item.id),a=t[i],o=i<0?r.index:i+1,s=a&&!a.disabled?a:t.slice(o).find(e=>!e.disabled)??t.slice(0,o).reverse().find(e=>!e.disabled);s?z.get(s.item.id)?.focus():R.value?.focus()})}),(t,n)=>(c(),g(`div`,{ref_key:`root`,ref:R,class:de([`nyx-accordion`,m(_)]),tabindex:`-1`},[(c(!0),g(d,null,i(E.value,r=>(c(),g(`div`,{key:r.item.id,class:`nyx-accordion__item`},[(c(),oe(pe(`h${e.headingLevel}`),{class:`nyx-accordion__heading`},{default:ue(()=>[f(`button`,{ref_for:!0,ref:e=>V(m(z),r.item.id,e),id:k(r.item.id),class:`nyx-accordion__trigger`,type:`button`,disabled:r.disabled,"aria-expanded":r.open,"aria-controls":A(r.item.id),onClick:e=>H(r),onKeydown:e=>U(e,r)},[f(`span`,N,[h[`header-${r.item.id}`]||h.header?s(t.$slots,j(r.item.id),l({key:0,ref_for:!0},r)):(c(),g(d,{key:1},[ae(ie(r.item.label),1)],64))]),n[0]||=f(`svg`,{class:`nyx-accordion__indicator`,"aria-hidden":`true`,viewBox:`0 0 16 16`,fill:`none`},[f(`path`,{d:`m4 6 4 4 4-4`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.5`})],-1)],40,M)]),_:2},1024)),fe(le,{name:`nyx-accordion-panel`},{default:ue(()=>[ee(f(`div`,{ref_for:!0,ref:e=>V(m(B),r.item.id,e),id:A(r.item.id),class:`nyx-accordion__panel`,"aria-hidden":!r.open,inert:!r.open},[f(`div`,F,[f(`div`,I,[s(t.$slots,L(r.item.id),l({ref_for:!0},r))])])],8,P),[[ce,r.open]])]),_:2},1024)]))),128)),E.value.length?re(``,!0):s(t.$slots,`empty`,{key:0})],2))}})})),z,B=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxAccordion`,description:``,tags:{},props:[{name:`items`,required:!0,type:{name:`Array`,elements:[{name:`NyxAccordionItem`}]}},{name:`multiple`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`headingLevel`,required:!1,type:{name:`union`,elements:[{name:`2`},{name:`3`},{name:`4`},{name:`5`},{name:`6`}]},defaultValue:{func:!1,value:`3`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],slots:[{name:`getHeaderSlotName(row.item.id)`,scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`getBodySlotName(row.item.id)`,scoped:!0,bindings:[{name:`name`,title:`binding`}]},{name:`empty`},{name:`header`},{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxAccordion/NyxAccordion.vue`]})})),V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),B(),x(),C(),T(),E(),k(),y(),V=[{id:`account`,label:`Account details`},{id:`privacy`,label:`Privacy and permissions`},{id:`notifications`,label:`Notifications`}],H={account:`Manage the details you share with your team. Your edits stay here when you close this section.`,privacy:`Choose who can view your profile and which services can access your account.`,notifications:`Choose the updates you want to receive and how often they arrive.`},U=`<template #default="{ item }"><p>{{ content[item.id] }}</p></template>`,W={title:`Components/Navigation/NyxAccordion`,component:z,args:{items:V},argTypes:{theme:{control:`select`,options:Object.values(v)},size:{control:`select`,options:Object.values(_)},multiple:{control:`boolean`},disabled:{control:`boolean`},headingLevel:{control:`select`,options:[2,3,4,5,6]}},render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w},setup:()=>({args:e,content:H}),template:`<NyxAccordion v-bind="args">${U}</NyxAccordion>`})},G={},K={args:{multiple:!0}},q={render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w,NyxForm:D,NyxFormField:O,NyxActionItem:A},setup:()=>({args:e,content:H,open:t(`account`),name:t(``),isProfilePrivate:t(!0)}),template:`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <NyxAccordion v-bind="args" v-model="open">
          ${U}
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
      </div>`})},J={args:{multiple:!0},render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w},setup:()=>({args:e,content:H,open:t([`account`,`privacy`])}),template:`<div><NyxAccordion v-bind="args" v-model="open">${U}</NyxAccordion><p>Open sections: {{ open }}</p></div>`})},Y={render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w},setup:()=>({args:e,content:H}),template:`
      <NyxAccordion v-bind="args">
        <template #header="{ item, index }">{{ index + 1 }}. {{ item.label }}</template>
        <template #header-privacy>Privacy <small>(Review recommended)</small></template>
        ${U}
        <template #item-privacy>
          <p>Two connected services can access your profile.</p>
          <a href="#connected-services">Review connected services</a>
        </template>
      </NyxAccordion>`})},X={args:{items:[V[0],{...V[1],disabled:!0},V[2]]}},Z={args:{items:[]},render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w},setup:()=>({args:e}),template:`<NyxAccordion v-bind="args"><template #empty>No settings sections are available.</template></NyxAccordion>`})},Q={render:e=>({components:{NyxAccordion:z,NyxButton:S,NyxInput:w},setup(){let n=t(!0),r=t([`account`,`privacy`]),i=t([...V]);return{args:e,content:H,multiple:n,open:r,sections:i,toggleExpansionMode:()=>{n.value=!n.value,r.value=n.value?r.value?[String(r.value)]:[]:Array.isArray(r.value)?r.value[0]??``:r.value}}},template:`
      <div style="display: grid; gap: var(--nyx-gap-lg);">
        <div style="display: flex; flex-wrap: wrap; gap: var(--nyx-gap-md);">
        <NyxButton @click="toggleExpansionMode">Switch to {{ multiple ? 'single' : 'multiple' }}</NyxButton>
        <NyxButton @click="sections = [...sections].reverse()">Reverse sections</NyxButton>
        <NyxButton @click="sections = sections.filter(item => item.id !== 'privacy')">Remove privacy</NyxButton>
        </div>
        <NyxAccordion v-bind="args" :items="sections" :multiple="multiple" v-model="open">${U}</NyxAccordion>
        <p>Open sections: {{ open }}</p>
      </div>`})},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    multiple: true
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    items: [items[0], {
      ...items[1],
      disabled: true
    }, items[2]]
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`UnboundMultiple`,`BoundSingle`,`Multiple`,`CustomSlots`,`Disabled`,`Empty`,`DynamicItemsAndMode`]}))();export{q as BoundSingle,Y as CustomSlots,G as Default,X as Disabled,Q as DynamicItemsAndMode,Z as Empty,J as Multiple,K as UnboundMultiple,$ as __namedExportsOrder,W as default};