import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,N as r,Q as i,U as a,_ as o,g as s,h as c,l,m as u,p as d,t as f,y as p}from"./vue.esm-bundler-C_Vkk7g_.js";import{D as m,N as h,O as g,j as _,l as v,t as y,u as b}from"./utils-I3j1AIuu.js";import{o as x,t as S}from"./composables-DIeLoQQz.js";import{n as C,t as w}from"./NyxButton-2tBI-Q1t.js";var T=e((()=>{})),E,D=e((()=>{f(),T(),b(),C(),S(),E=p({__name:`NyxBadge`,props:{disabled:{type:Boolean,default:!1},theme:{},variant:{},size:{},hasClose:{type:Boolean,default:!1}},emits:[`click`,`close`],setup(e,{emit:f}){let p=e,g=f,{classList:_}=x(p,{origin:`NyxBadge`,primitive:`badge`});return(f,v)=>(n(),s(`div`,{class:t([`nyx-badge`,[...i(_),{"nyx-badge--closable":e.hasClose}]]),onClick:v[1]||=l(e=>g(`click`),[`self`])},[d(`span`,null,[r(f.$slots,`default`,{},()=>[v[2]||=o(`NyxBadge`,-1)])]),e.hasClose?(n(),u(w,{key:0,class:`nyx-badge__button`,size:p.size,shape:i(m).Circle,variant:i(h).Ghost,onClick:v[0]||=e=>g(`close`)},{default:a(()=>[...v[3]||=[o(`×`,-1)]]),_:1},8,[`size`,`shape`,`variant`])):c(``,!0)],2))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxBadge`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`hasClose`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`click`},{name:`close`}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBadge/NyxBadge.vue`]})})),A,j,M,N,P,F,I,L;e((()=>{f(),k(),b(),y(),A={title:`Components/NyxBadge`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(_)},variant:{control:{type:`select`},options:Object.values(h)},size:{control:{type:`select`},options:Object.values(g)},onClick:{action:`click`}}},j=e=>p({components:{NyxBadge:O},setup(){return{args:e}},template:`
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `}),M=(e,t)=>()=>p({components:{NyxBadge:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>v(t,e),onDismiss:()=>alert(`Dismiss`)}},template:`
    <div class="flex-col">
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
        >{{ getLabel(value) }}</nyx-badge>
      </div>
      <div class="flex">
        <nyx-badge
          v-for="value of values"
          :key="value"
          v-bind="{ [prop]: value }"
          hasClose
        >{{ getLabel(value) }}</nyx-badge>
      </div>
    </div>
  `}),N=j({}),P=M(`theme`,_),F=M(`variant`,h),I=M(`size`,g),N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`Template({})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...I.parameters?.docs?.source}}},L=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{N as Default,I as Sizes,P as Themes,F as Variants,L as __namedExportsOrder,A as default};