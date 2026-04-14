import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,Q as r,g as i,h as a,p as o,t as s,tt as c,v as l,y as u}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as d,D as f,j as p,l as m,t as h,u as g}from"./utils-BWpCgr6y.js";import{o as _,t as v}from"./composables-D169zPLY.js";import{n as y,t as b}from"./NyxIcon-GwyHDNLt.js";var x=e((()=>{})),S,C,w,T,E,D,O,k,A=e((()=>{s(),x(),g(),y(),v(),S={class:`nyx-metric-card__body`},C={class:`nyx-metric-card__title`},w={class:`nyx-metric-card__row`},T={class:`nyx-metric-card__value`},E={key:0,class:`nyx-metric-card__unit`},D={key:1,class:`nyx-metric-card__suffix`},O={key:2,class:`nyx-metric-card__icon`},k=u({__name:`NyxMetricCard`,props:{title:{},value:{},unit:{},suffix:{},theme:{},icon:{},variant:{default:p.Text}},setup(e){let s=e,{classList:u}=_(s,{origin:`NyxMetricCard`});return(d,p)=>(n(),i(`div`,{class:t([`nyx-metric-card`,r(u)])},[o(`div`,S,[o(`div`,C,c(e.title),1),o(`div`,w,[o(`span`,T,c(e.value),1),e.unit?(n(),i(`span`,E,c(e.unit),1)):a(``,!0),e.suffix?(n(),i(`span`,D,c(e.suffix),1)):a(``,!0),e.icon?(n(),i(`span`,O,[l(b,{name:e.icon,theme:s.theme,size:r(f).Small,"aria-hidden":`true`},null,8,[`name`,`theme`,`size`])])):a(``,!0)])])],2))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxMetricCard`,description:``,tags:{},props:[{name:`title`,required:!0,type:{name:`string`}},{name:`value`,required:!0,type:{name:`string`}},{name:`unit`,required:!1,type:{name:`string`}},{name:`suffix`,required:!1,type:{name:`string`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`icon`,required:!1,type:{name:`string`}},{name:`variant`,required:!1,type:{name:`NyxVariant`},defaultValue:{func:!1,value:`NyxVariant.Text`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxMetricCard/NyxMetricCard.vue`]})})),N,P,F,I,L,R,z,B,V,H,U,W;e((()=>{s(),M(),g(),h(),N={title:`Components/NyxMetricCard`,component:j,argTypes:{title:{control:`text`},value:{control:`text`},unit:{control:`text`},suffix:{control:`text`},icon:{control:`text`},theme:{control:{type:`select`},options:Object.values(d)},variant:{control:{type:`select`},options:Object.values(p)}}},P=e=>({components:{NyxMetricCard:j},setup(){return{args:e}},template:`<nyx-metric-card v-bind="args" style="width: 220px" />`}),F=(e,t,n)=>()=>u({components:{NyxMetricCard:j},setup(){return{prop:e,values:Object.values(t),getLabel:e=>m(t,e),baseProps:n}},template:`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <div v-for="value of values" :key="value" style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <span style="font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em;">{{ getLabel(value) }}</span>
        <nyx-metric-card
          v-bind="{ ...baseProps, [prop]: value }"
          style="width: 200px"
        />
      </div>
    </div>
  `}),I=Object.assign(P.bind({}),{args:{title:`ACTIVE NODES`,value:`12/12`}}),L=Object.assign(P.bind({}),{args:{title:`SYSTEM UPTIME`,value:`182`,unit:`h`,theme:d.Secondary,variant:p.Soft}}),R=Object.assign(P.bind({}),{args:{title:`ACTIVE NODES`,value:`12/12`,suffix:`STABLE`,theme:d.Success,variant:p.Soft}}),z=Object.assign(P.bind({}),{args:{title:`NETWORK LATENCY`,value:`24`,unit:`ms`,icon:`wifi`,theme:d.Primary,variant:p.Soft}}),B=Object.assign(P.bind({}),{args:{title:`AVG. HUMIDITY`,value:`64`,unit:`%`,suffix:`RISING`,icon:`trending-up`,theme:d.Warning,variant:p.Soft}}),V=F(`variant`,p,{title:`ACTIVE NODES`,value:`12/12`,suffix:`STABLE`,theme:d.Success}),H=F(`theme`,d,{title:`METRIC`,value:`42`,unit:`%`,icon:`activity`,variant:p.Soft}),U=F(`theme`,d,{title:`CPU LOAD`,value:`42`,unit:`%`,icon:`cpu`,variant:p.Filled}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    title: 'ACTIVE NODES',
    value: '12/12'
  } as NyxMetricCardProps
})`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    title: 'SYSTEM UPTIME',
    value: '182',
    unit: 'h',
    theme: NyxTheme.Secondary,
    variant: NyxVariant.Soft
  } as NyxMetricCardProps
})`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    title: 'ACTIVE NODES',
    value: '12/12',
    suffix: 'STABLE',
    theme: NyxTheme.Success,
    variant: NyxVariant.Soft
  } as NyxMetricCardProps
})`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    title: 'NETWORK LATENCY',
    value: '24',
    unit: 'ms',
    icon: 'wifi',
    theme: NyxTheme.Primary,
    variant: NyxVariant.Soft
  } as NyxMetricCardProps
})`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    title: 'AVG. HUMIDITY',
    value: '64',
    unit: '%',
    suffix: 'RISING',
    icon: 'trending-up',
    theme: NyxTheme.Warning,
    variant: NyxVariant.Soft
  } as NyxMetricCardProps
})`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`TemplateAllProp('variant', NyxVariant, {
  title: 'ACTIVE NODES',
  value: '12/12',
  suffix: 'STABLE',
  theme: NyxTheme.Success
})`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme, {
  title: 'METRIC',
  value: '42',
  unit: '%',
  icon: 'activity',
  variant: NyxVariant.Soft
})`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme, {
  title: 'CPU LOAD',
  value: '42',
  unit: '%',
  icon: 'cpu',
  variant: NyxVariant.Filled
})`,...U.parameters?.docs?.source}}},W=[`Default`,`WithUnit`,`WithSuffix`,`WithIcon`,`WithAll`,`AllVariants`,`AllThemes`,`FilledVariants`]}))();export{H as AllThemes,V as AllVariants,I as Default,U as FilledVariants,B as WithAll,z as WithIcon,R as WithSuffix,L as WithUnit,W as __namedExportsOrder,N as default};