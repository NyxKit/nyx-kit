import{n as e}from"./chunk-BneVvdWh.js";import{I as t,N as n,S as r,_ as i,b as a,d as o,g as s,h as c,nt as l,q as u,rt as d,t as f,v as p}from"./vue.esm-bundler-DwhgfrFn.js";import{D as m,S as h,T as g,i as _,x as v}from"./string-CevuJH_I.js";import{n as y}from"./useNyxProps-St-cgklA.js";import{n as b,t as x}from"./NyxButton-C4Pl6wfC.js";import{c as S,t as C}from"./utils-DImGTvri.js";import{t as w}from"./composables-BJ-rw_s4.js";var T=e((()=>{})),E,D=e((()=>{f(),T(),_(),b(),w(),E=r({__name:`NyxBadge`,props:{disabled:{type:Boolean,default:!1},theme:{},variant:{},size:{},hasClose:{type:Boolean,default:!1}},emits:[`click`,`close`],setup(e,{emit:r}){let f=e,h=r,{classList:g}=y(f,{origin:`NyxBadge`,primitive:`badge`});return(r,_)=>(n(),p(`div`,{class:d([`nyx-badge`,[...l(g),{"nyx-badge--closable":e.hasClose}]]),onClick:_[1]||=o(e=>h(`click`),[`self`])},[c(`span`,null,[t(r.$slots,`default`,{},()=>[_[2]||=a(`NyxBadge`,-1)])]),e.hasClose?(n(),s(x,{key:0,class:`nyx-badge__button`,size:f.size,shape:l(v).Circle,variant:l(m).Ghost,onClick:_[0]||=e=>h(`close`)},{default:u(()=>[..._[3]||=[a(`×`,-1)]]),_:1},8,[`size`,`shape`,`variant`])):i(``,!0)],2))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxBadge`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`variant`,required:!1,type:{name:`NyxVariant`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`hasClose`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`click`},{name:`close`}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBadge/NyxBadge.vue`]})})),A,j,M,N,P,F,I,L;e((()=>{f(),k(),_(),C(),A={title:`Components/Basic/NyxBadge`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(g)},variant:{control:{type:`select`},options:Object.values(m)},size:{control:{type:`select`},options:Object.values(h)},onClick:{action:`click`}}},j=e=>r({components:{NyxBadge:O},setup(){return{args:e}},template:`
    <nyx-badge v-bind="args" @click="onClick">NyxBadge</nyx-badge>
  `}),M=(e,t)=>()=>r({components:{NyxBadge:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>S(t,e),onDismiss:()=>alert(`Dismiss`)}},template:`
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
  `}),N=j({}),P=M(`theme`,g),F=M(`variant`,m),I=M(`size`,h),N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`Template({})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...I.parameters?.docs?.source}}},L=[`Default`,`Themes`,`Variants`,`Sizes`]}))();export{N as Default,I as Sizes,P as Themes,F as Variants,L as __namedExportsOrder,A as default};