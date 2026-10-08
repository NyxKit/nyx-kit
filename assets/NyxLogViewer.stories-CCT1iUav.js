import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,D as n,H as r,N as i,S as a,_ as o,at as s,b as c,g as l,m as u,nt as d,q as f,rt as p,t as m,x as h}from"./vue.esm-bundler-DwhgfrFn.js";import{C as g,D as _,S as v,T as y,i as b}from"./string-CevuJH_I.js";import{n as x}from"./useNyxProps-St-cgklA.js";import{t as S}from"./composables-BJ-rw_s4.js";import{i as C,n as w,r as T,t as E}from"./NyxTable-C89s6a2f.js";var D=e((()=>{})),O,k=e((()=>{m(),D(),b(),w(),C(),S(),O=a({__name:`NyxLogViewer`,props:n({timestampFormat:{default:`HH:mm:ss`},sort:{default:g.None},theme:{},size:{default:v.XSmall}},{modelValue:{default:()=>[]},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let t=[`timestamp`,`value`,`origin`,`theme`],n=e,a=r(e,`modelValue`),{nyxTheme:m,nyxSize:v}=x(n,{origin:`NyxLogViewer`}),y=u(()=>a.value.some(e=>!!e.origin)),b=u(()=>y.value?`auto auto 1fr`:`auto 1fr`);function S(e){return e instanceof Date?e.getTime():typeof e==`number`?e:new Date(e).getTime()}let C=u(()=>n.sort===g.None?a.value:[...a.value].sort((e,t)=>{let r=S(e.timestamp)-S(t.timestamp);return n.sort===g.Asc?r:-r}));function w(e,t){let n=e instanceof Date?e:new Date(e);if(isNaN(n.getTime()))return String(e);let r=e=>String(e).padStart(2,`0`);return t.replace(`YYYY`,String(n.getFullYear())).replace(`MM`,r(n.getMonth()+1)).replace(`DD`,r(n.getDate())).replace(`HH`,r(n.getHours())).replace(`mm`,r(n.getMinutes())).replace(`ss`,r(n.getSeconds()))}return(e,r)=>(i(),l(E,{"model-value":C.value,header:!1,variant:d(_).Ghost,gridTemplateColumns:b.value,"col-include":t,size:d(v),class:`nyx-log-viewer`},{default:f(({item:e})=>[h(T,{class:p([`nyx-log-viewer__timestamp`,n.theme===void 0?void 0:`theme-${d(m)}`])},{default:f(()=>[c(s(w(e.timestamp,n.timestampFormat)),1)]),_:2},1032,[`class`]),y.value?(i(),l(T,{key:0,class:`nyx-log-viewer__origin`},{default:f(()=>[c(s(e.origin),1)]),_:2},1024)):o(``,!0),h(T,{class:p([`nyx-log-viewer__value`,e.theme?`theme-${e.theme}`:void 0])},{default:f(()=>[c(s(e.value),1)]),_:2},1032,[`class`])]),_:1},8,[`model-value`,`variant`,`gridTemplateColumns`,`size`]))}})})),A,j=e((()=>{k(),k(),A=O,O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{exportName:`default`,displayName:`NyxLogViewer`,description:``,tags:{},props:[{name:`timestampFormat`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'HH:mm:ss'`}},{name:`sort`,required:!1,type:{name:`NyxSort`},defaultValue:{func:!1,value:`NyxSort.None`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`},defaultValue:{func:!1,value:`NyxSize.XSmall`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxLogViewer/NyxLogViewer.vue`]})})),M,N,P,F,I,L,R,z,B;e((()=>{m(),j(),b(),M={title:`Components/Data/NyxLogViewer`,component:A,argTypes:{timestampFormat:{control:`text`},sort:{control:{type:`select`},options:Object.values(g)},theme:{control:{type:`select`},options:[void 0,...Object.values(y)]}}},N=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing services...`,origin:`core`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`,origin:`server`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,origin:`db`,theme:y.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss for key "user:123"`,origin:`cache`,theme:y.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: connection timeout`,origin:`api`,theme:y.Danger},{timestamp:new Date(`2024-01-15T10:23:49`),value:`Retrying in 5s...`,origin:`api`,theme:y.Info},{timestamp:new Date(`2024-01-15T10:23:54`),value:`Reconnected successfully`,origin:`api`,theme:y.Success}],P=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing...`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,theme:y.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss detected`,theme:y.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: timeout`,theme:y.Danger}],F=e=>({components:{NyxLogViewer:A},setup(){return{args:e,logs:t(N)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`}),I=Object.assign(F.bind({}),{args:{}}),L=Object.assign(F.bind({}),{args:{timestampFormat:`DD/MM/YYYY HH:mm:ss`}}),R=Object.assign((e=>({components:{NyxLogViewer:A},setup(){return{args:e,logs:t(P)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`})).bind({}),{args:{}}),z=()=>a({components:{NyxLogViewer:A},setup(){return{logs:t(Object.values(y).map((e,t)=>({timestamp:new Date(Date.now()+t*1e3),value:`Log entry with theme: ${e}`,origin:e,theme:e})))}},template:`<NyxLogViewer v-model="logs" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {} as NyxLogViewerProps
})`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    timestampFormat: 'DD/MM/YYYY HH:mm:ss'
  } as NyxLogViewerProps
})`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`Object.assign(((args: NyxLogViewerProps) => ({
  components: {
    NyxLogViewer
  },
  setup() {
    const logs = ref(logsNoOrigin);
    return {
      args,
      logs
    };
  },
  template: \`<NyxLogViewer v-model="logs" v-bind="args" />\`
})).bind({}), {
  args: {} as NyxLogViewerProps
})`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxLogViewer
  },
  setup() {
    const themes = Object.values(NyxTheme);
    const logs = ref<NyxLogEntry[]>(themes.map((theme, i) => ({
      timestamp: new Date(Date.now() + i * 1000),
      value: \`Log entry with theme: \${theme}\`,
      origin: theme,
      theme
    })));
    return {
      logs
    };
  },
  template: \`<NyxLogViewer v-model="logs" />\`
})`,...z.parameters?.docs?.source}}},B=[`Default`,`CustomTimestampFormat`,`WithoutOrigin`,`AllThemes`]}))();export{z as AllThemes,L as CustomTimestampFormat,I as Default,R as WithoutOrigin,B as __namedExportsOrder,M as default};