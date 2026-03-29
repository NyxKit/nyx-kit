import{n as e}from"./chunk-BneVvdWh.js";import{A as t,J as n,M as r,V as i,_ as a,d as o,g as s,h as c,i as l,q as u,v as d,x as f,y as p}from"./iframe-DKH6pIYo.js";import{A as m,N as h,P as g,a as _,f as v,g as y,j as b,p as x,t as S}from"./composables-CoSPR3z5.js";import{n as C,t as w}from"./NyxButton-CZrP7yAi.js";var T=e((()=>{})),E,D=e((()=>{l(),T(),y(),C(),S(),E=f({__name:`NyxBadge`,props:{disabled:{type:Boolean,default:!1},theme:{},variant:{},size:{},hasClose:{type:Boolean,default:!1}},emits:[`click`,`close`],setup(e,{emit:l}){let f=e,h=l,{classList:_}=x(f,{origin:`NyxBadge`});return(l,v)=>(t(),d(`div`,{class:n([`nyx-badge`,[...u(_),{"nyx-badge--closable":e.hasClose}]]),onClick:v[1]||=o(e=>h(`click`),[`self`])},[c(`span`,null,[r(l.$slots,`default`,{},()=>[v[2]||=p(`NyxBadge`,-1)])]),e.hasClose?(t(),s(w,{key:0,class:`nyx-badge__button`,size:f.size,shape:u(m).Circle,variant:u(g).Ghost,onClick:v[0]||=e=>h(`close`)},{default:i(()=>[...v[3]||=[p(`×`,-1)]]),_:1},8,[`size`,`shape`,`variant`])):a(``,!0)],2))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxBadge`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`hasClose`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`click`},{name:`close`}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBadge/NyxBadge.vue`]})})),A,j,M,N,P,F,I,L;e((()=>{l(),k(),y(),_(),A={title:`Components/NyxBadge`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(h)},variant:{control:{type:`select`},options:Object.values(g)},size:{control:{type:`select`},options:Object.values(b)},onClick:{action:`click`}}},j=e=>f({components:{NyxBadge:O},setup(){return{args:e}},template:`
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `}),M=(e,t)=>()=>f({components:{NyxBadge:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>v(t,e),onDismiss:()=>alert(`Dismiss`)}},template:`
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
  `}),N=j({}),P=M(`theme`,h),F=M(`variant`,g),I=M(`size`,b),N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`Template({})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...I.parameters?.docs?.source}}},L=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{N as Default,I as Sizes,P as Themes,F as Variants,L as __namedExportsOrder,A as default};