import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,P as n,W as r,_ as i,b as a,et as o,g as s,h as c,j as l,m as u,t as d,u as f,v as p}from"./vue.esm-bundler-BYSzMkkg.js";import{A as m,F as h,N as g,d as _,f as v,k as y,t as b}from"./utils-D7ENd3Hb.js";import{ft as x,t as S}from"./composables-BpSFaobz.js";import{n as C,t as w}from"./NyxButton-DiWvMxO-.js";var T=e((()=>{})),E,D=e((()=>{d(),T(),v(),C(),S(),E=a({__name:`NyxBadge`,props:{disabled:{type:Boolean,default:!1},theme:{},variant:{},size:{},hasClose:{type:Boolean,default:!1}},emits:[`click`,`close`],setup(e,{emit:a}){let d=e,m=a,{classList:g}=x(d,{origin:`NyxBadge`,primitive:`badge`});return(a,_)=>(l(),i(`div`,{class:o([`nyx-badge`,[...t(g),{"nyx-badge--closable":e.hasClose}]]),onClick:_[1]||=f(e=>m(`click`),[`self`])},[u(`span`,null,[n(a.$slots,`default`,{},()=>[_[2]||=p(`NyxBadge`,-1)])]),e.hasClose?(l(),c(w,{key:0,class:`nyx-badge__button`,size:d.size,shape:t(y).Circle,variant:t(h).Ghost,onClick:_[0]||=e=>m(`close`)},{default:r(()=>[..._[3]||=[p(`×`,-1)]]),_:1},8,[`size`,`shape`,`variant`])):s(``,!0)],2))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxBadge`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`hasClose`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`click`},{name:`close`}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBadge/NyxBadge.vue`]})})),A,j,M,N,P,F,I,L;e((()=>{d(),k(),v(),b(),A={title:`Components/Basic/NyxBadge`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(g)},variant:{control:{type:`select`},options:Object.values(h)},size:{control:{type:`select`},options:Object.values(m)},onClick:{action:`click`}}},j=e=>a({components:{NyxBadge:O},setup(){return{args:e}},template:`
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `}),M=(e,t)=>()=>a({components:{NyxBadge:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>_(t,e),onDismiss:()=>alert(`Dismiss`)}},template:`
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
  `}),N=j({}),P=M(`theme`,g),F=M(`variant`,h),I=M(`size`,m),N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`Template({})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...I.parameters?.docs?.source}}},L=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{N as Default,I as Sizes,P as Themes,F as Variants,L as __namedExportsOrder,A as default};