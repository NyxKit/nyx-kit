import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,N as r,Q as i,_ as a,f as o,g as s,h as c,p as l,t as u,tt as d,y as f,z as p}from"./vue.esm-bundler-C_Vkk7g_.js";import{N as m,O as h,j as g,l as _,t as v,u as y,y as b}from"./utils-I3j1AIuu.js";import{o as x,t as S}from"./composables-CT8Ab5sb.js";var C=e((()=>{})),w,T,E,D=e((()=>{u(),S(),y(),C(),w=[`aria-hidden`],T={key:0,class:`nyx-status-dot__label`},E=f({__name:`NyxStatusDot`,props:{theme:{default:g.Success},size:{default:h.Medium},variant:{default:m.Filled},backlight:{type:Boolean,default:!1},animation:{default:b.Paused},label:{}},setup(e){let u=e,{classList:f}=x(u,{origin:`NyxStatusDot`}),m=o(()=>`animation-${u.animation}`),h=p(),g=o(()=>!h.default&&!u.label);return(e,o)=>(n(),s(`span`,{class:t([`nyx-status-dot`,[...i(f),m.value]]),"aria-hidden":g.value?`true`:void 0},[o[0]||=l(`span`,{class:`nyx-status-dot__indicator`,"aria-hidden":`true`},null,-1),e.$slots.default||u.label?(n(),s(`span`,T,[r(e.$slots,`default`,{},()=>[a(d(u.label),1)])])):c(``,!0)],10,w))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxStatusDot`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`},defaultValue:{func:!1,value:`NyxTheme.Success`}},{name:`size`,required:!1,type:{name:`NyxSize`},defaultValue:{func:!1,value:`NyxSize.Medium`}},{name:`variant`,required:!1,type:{name:`NyxVariant`},defaultValue:{func:!1,value:`NyxVariant.Filled`}},{name:`backlight`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`animation`,required:!1,type:{name:`NyxAnimationState`},defaultValue:{func:!1,value:`NyxAnimationState.Paused`}},{name:`label`,required:!1,type:{name:`string`}}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxStatusDot/NyxStatusDot.vue`]})})),A,j,M,N,P,F,I,L,R,z,B,V,H;e((()=>{u(),k(),y(),v(),A={title:`Components/NyxStatusDot`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(g)},variant:{control:{type:`select`},options:Object.values(m)},size:{control:{type:`select`},options:Object.values(h)},animation:{control:{type:`select`},options:Object.values(b)},backlight:{control:{type:`boolean`}},label:{control:{type:`text`}}}},j=e=>f({components:{NyxStatusDot:O},setup(){return{args:e}},template:`
    <nyx-status-dot v-bind="args" />
  `}),M=(e,t)=>()=>f({components:{NyxStatusDot:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>_(t,e)}},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div v-for="value of values" :key="value" class="flex" style="align-items: center; gap: 0.5rem; min-width: 8rem;">
          <nyx-status-dot v-bind="{ [prop]: value, label: getLabel(value) }" />
        </div>
      </div>
    </div>
  `}),N=()=>()=>f({components:{NyxStatusDot:O},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Online" :backlight="true" />
        <nyx-status-dot :backlight="true">
          Custom slot label
        </nyx-status-dot>
        <nyx-status-dot theme="info" label="Offline" variant="soft" />
      </div>
    </div>
  `}),P=()=>()=>f({components:{NyxStatusDot:O},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Paused" :backlight="true" animation="paused" />
        <nyx-status-dot label="Playing" :backlight="true" animation="playing" />
      </div>
    </div>
  `}),F=j({}),I=N(),L=P(),R=M(`theme`,g),z=M(`variant`,m),B=M(`size`,h),V=M(`animation`,b),F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`Template({})`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`LabelsTemplate()`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`AnimationTemplate()`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`TemplateAllProp('animation', NyxAnimationState)`,...V.parameters?.docs?.source}}},H=[`Default`,`Labels`,`Animation`,`Themes`,`Variants`,`Sizes`,`Animations`]}))();export{L as Animation,V as Animations,F as Default,I as Labels,B as Sizes,R as Themes,z as Variants,H as __namedExportsOrder,A as default};