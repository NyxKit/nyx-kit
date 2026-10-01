import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,T as n,W as r,X as i,b as a,et as o,g as s,h as c,j as l,nt as u,p as d,t as f,v as p,y as m,z as h}from"./vue.esm-bundler-BYSzMkkg.js";import{A as g,F as _,N as v,f as y,j as b}from"./utils-D7ENd3Hb.js";import{ft as x,t as S}from"./composables-BpSFaobz.js";import{i as C,n as w,r as T,t as E}from"./NyxTable-x5gXz-eu.js";var D=e((()=>{})),O,k=e((()=>{f(),D(),y(),w(),C(),S(),O=a({__name:`NyxLogViewer`,props:n({timestampFormat:{default:`HH:mm:ss`},sort:{default:b.None},theme:{},size:{default:g.XSmall}},{modelValue:{default:()=>[]},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let n=[`timestamp`,`value`,`origin`,`theme`],i=e,a=h(e,`modelValue`),{nyxTheme:f,nyxSize:g}=x(i,{origin:`NyxLogViewer`}),v=d(()=>a.value.some(e=>!!e.origin)),y=d(()=>v.value?`auto auto 1fr`:`auto 1fr`);function S(e){return e instanceof Date?e.getTime():typeof e==`number`?e:new Date(e).getTime()}let C=d(()=>i.sort===b.None?a.value:[...a.value].sort((e,t)=>{let n=S(e.timestamp)-S(t.timestamp);return i.sort===b.Asc?n:-n}));function w(e,t){let n=e instanceof Date?e:new Date(e);if(isNaN(n.getTime()))return String(e);let r=e=>String(e).padStart(2,`0`);return t.replace(`YYYY`,String(n.getFullYear())).replace(`MM`,r(n.getMonth()+1)).replace(`DD`,r(n.getDate())).replace(`HH`,r(n.getHours())).replace(`mm`,r(n.getMinutes())).replace(`ss`,r(n.getSeconds()))}return(e,a)=>(l(),c(E,{"model-value":C.value,header:!1,variant:t(_).Ghost,gridTemplateColumns:y.value,"col-include":n,size:t(g),class:`nyx-log-viewer`},{default:r(({item:e})=>[m(T,{class:o([`nyx-log-viewer__timestamp`,i.theme===void 0?void 0:`theme-${t(f)}`])},{default:r(()=>[p(u(w(e.timestamp,i.timestampFormat)),1)]),_:2},1032,[`class`]),v.value?(l(),c(T,{key:0,class:`nyx-log-viewer__origin`},{default:r(()=>[p(u(e.origin),1)]),_:2},1024)):s(``,!0),m(T,{class:o([`nyx-log-viewer__value`,e.theme?`theme-${e.theme}`:void 0])},{default:r(()=>[p(u(e.value),1)]),_:2},1032,[`class`])]),_:1},8,[`model-value`,`variant`,`gridTemplateColumns`,`size`]))}})})),A,j=e((()=>{k(),k(),A=O,O.__docgenInfo=Object.assign({displayName:O.name??O.__name},{exportName:`default`,displayName:`NyxLogViewer`,description:``,tags:{},props:[{name:`timestampFormat`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'HH:mm:ss'`}},{name:`sort`,required:!1,type:{name:`NyxSort`},defaultValue:{func:!1,value:`NyxSort.None`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`},defaultValue:{func:!1,value:`NyxSize.XSmall`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxLogViewer/NyxLogViewer.vue`]})})),M,N,P,F,I,L,R,z,B;e((()=>{f(),j(),y(),M={title:`Components/Data/NyxLogViewer`,component:A,argTypes:{timestampFormat:{control:`text`},sort:{control:{type:`select`},options:Object.values(b)},theme:{control:{type:`select`},options:[void 0,...Object.values(v)]}}},N=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing services...`,origin:`core`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`,origin:`server`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,origin:`db`,theme:v.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss for key "user:123"`,origin:`cache`,theme:v.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: connection timeout`,origin:`api`,theme:v.Danger},{timestamp:new Date(`2024-01-15T10:23:49`),value:`Retrying in 5s...`,origin:`api`,theme:v.Info},{timestamp:new Date(`2024-01-15T10:23:54`),value:`Reconnected successfully`,origin:`api`,theme:v.Success}],P=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing...`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,theme:v.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss detected`,theme:v.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: timeout`,theme:v.Danger}],F=e=>({components:{NyxLogViewer:A},setup(){return{args:e,logs:i(N)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`}),I=Object.assign(F.bind({}),{args:{}}),L=Object.assign(F.bind({}),{args:{timestampFormat:`DD/MM/YYYY HH:mm:ss`}}),R=Object.assign((e=>({components:{NyxLogViewer:A},setup(){return{args:e,logs:i(P)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`})).bind({}),{args:{}}),z=()=>a({components:{NyxLogViewer:A},setup(){return{logs:i(Object.values(v).map((e,t)=>({timestamp:new Date(Date.now()+t*1e3),value:`Log entry with theme: ${e}`,origin:e,theme:e})))}},template:`<NyxLogViewer v-model="logs" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
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