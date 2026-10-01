import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,B as n,P as r,_ as i,b as a,et as o,g as s,j as c,m as l,nt as u,p as d,t as f,v as p}from"./vue.esm-bundler-BYSzMkkg.js";import{A as m,F as h,N as g,d as _,f as v,t as y,x as b}from"./utils-D7ENd3Hb.js";import{ft as x,t as S}from"./composables-BpSFaobz.js";var C=e((()=>{})),w,T,E,D=e((()=>{f(),S(),v(),C(),w=[`aria-hidden`],T={key:0,class:`nyx-status-dot__label`},E=a({__name:`NyxStatusDot`,props:{theme:{default:g.Success},size:{default:m.Medium},variant:{default:h.Filled},backlight:{type:Boolean,default:!1},animation:{default:b.Paused},label:{}},setup(e){let a=e,{classList:f}=x(a,{origin:`NyxStatusDot`}),m=d(()=>`animation-${a.animation}`),h=n(),g=d(()=>!h.default&&!a.label);return(e,n)=>(c(),i(`span`,{class:o([`nyx-status-dot`,[...t(f),m.value]]),"aria-hidden":g.value?`true`:void 0},[n[0]||=l(`span`,{class:`nyx-status-dot__indicator`,"aria-hidden":`true`},null,-1),e.$slots.default||a.label?(c(),i(`span`,T,[r(e.$slots,`default`,{},()=>[p(u(a.label),1)])])):s(``,!0)],10,w))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxStatusDot`,description:``,tags:{},props:[{name:`theme`,required:!1,type:{name:`NyxTheme`},defaultValue:{func:!1,value:`NyxTheme.Success`}},{name:`size`,required:!1,type:{name:`NyxSize`},defaultValue:{func:!1,value:`NyxSize.Medium`}},{name:`variant`,required:!1,type:{name:`NyxVariant`},defaultValue:{func:!1,value:`NyxVariant.Filled`}},{name:`backlight`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`animation`,required:!1,type:{name:`NyxAnimationState`},defaultValue:{func:!1,value:`NyxAnimationState.Paused`}},{name:`label`,required:!1,type:{name:`string`}}],slots:[{name:`default`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxStatusDot/NyxStatusDot.vue`]})})),A,j,M,N,P,F,I,L,R,z,B,V,H;e((()=>{f(),k(),v(),y(),A={title:`Components/Feedback/NyxStatusDot`,component:O,argTypes:{theme:{control:{type:`select`},options:Object.values(g)},variant:{control:{type:`select`},options:Object.values(h)},size:{control:{type:`select`},options:Object.values(m)},animation:{control:{type:`select`},options:Object.values(b)},backlight:{control:{type:`boolean`}},label:{control:{type:`text`}}}},j=e=>a({components:{NyxStatusDot:O},setup(){return{args:e}},template:`
    <nyx-status-dot v-bind="args" />
  `}),M=(e,t)=>()=>a({components:{NyxStatusDot:O},setup(){return{prop:e,values:Object.values(t),getLabel:e=>_(t,e)}},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div v-for="value of values" :key="value" class="flex" style="align-items: center; gap: 0.5rem; min-width: 8rem;">
          <nyx-status-dot v-bind="{ [prop]: value, label: getLabel(value) }" />
        </div>
      </div>
    </div>
  `}),N=()=>()=>a({components:{NyxStatusDot:O},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Online" :backlight="true" />
        <nyx-status-dot :backlight="true">
          Custom slot label
        </nyx-status-dot>
        <nyx-status-dot theme="info" label="Offline" variant="soft" />
      </div>
    </div>
  `}),P=()=>()=>a({components:{NyxStatusDot:O},template:`
    <div class="flex-col">
      <div class="flex" style="align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <nyx-status-dot label="Paused" :backlight="true" animation="paused" />
        <nyx-status-dot label="Playing" :backlight="true" animation="playing" />
      </div>
    </div>
  `}),F=j({}),I=N(),L=P(),R=M(`theme`,g),z=M(`variant`,h),B=M(`size`,m),V=M(`animation`,b),F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`Template({})`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`LabelsTemplate()`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`AnimationTemplate()`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme)`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant)`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize)`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`TemplateAllProp('animation', NyxAnimationState)`,...V.parameters?.docs?.source}}},H=[`Default`,`Labels`,`Animation`,`Themes`,`Variants`,`Sizes`,`Animations`]}))();export{L as Animation,V as Animations,F as Default,I as Labels,B as Sizes,R as Themes,z as Variants,H as __namedExportsOrder,A as default};