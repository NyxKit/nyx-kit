import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,Q as r,R as i,U as a,Y as o,_ as s,f as c,h as l,m as u,t as d,tt as f,v as p,w as m,y as h}from"./vue.esm-bundler-C_Vkk7g_.js";import{E as g,O as _,k as v,u as y}from"./utils-CVfGrNSp.js";import{o as b,t as x}from"./composables-BsMwJOZk.js";import{i as S,n as C,r as w,t as T}from"./NyxTable-BQKyG7kL.js";var E=e((()=>{})),D,O=e((()=>{d(),E(),y(),C(),S(),x(),D=h({__name:`NyxLogViewer`,props:m({timestampFormat:{default:`HH:mm:ss`},sort:{default:g.None},theme:{}},{modelValue:{default:()=>[]},modelModifiers:{}}),emits:[`update:modelValue`],setup(e){let o=[`timestamp`,`value`,`origin`,`theme`],d=e,m=i(e,`modelValue`),{nyxTheme:h}=b(d,{origin:`NyxLogViewer`}),_=c(()=>m.value.some(e=>!!e.origin)),y=c(()=>_.value?`auto auto 1fr`:`auto 1fr`);function x(e){return e instanceof Date?e.getTime():typeof e==`number`?e:new Date(e).getTime()}let S=c(()=>d.sort===g.None?m.value:[...m.value].sort((e,t)=>{let n=x(e.timestamp)-x(t.timestamp);return d.sort===g.Asc?n:-n}));function C(e,t){let n=e instanceof Date?e:new Date(e);if(isNaN(n.getTime()))return String(e);let r=e=>String(e).padStart(2,`0`);return t.replace(`YYYY`,String(n.getFullYear())).replace(`MM`,r(n.getMonth()+1)).replace(`DD`,r(n.getDate())).replace(`HH`,r(n.getHours())).replace(`mm`,r(n.getMinutes())).replace(`ss`,r(n.getSeconds()))}return(e,i)=>(n(),u(T,{"model-value":S.value,header:!1,variant:r(v).Ghost,gridTemplateColumns:y.value,"col-include":o,class:`nyx-log-viewer`},{default:a(({item:e})=>[p(w,{class:t([`nyx-log-viewer__timestamp`,d.theme===void 0?void 0:`theme-${r(h)}`])},{default:a(()=>[s(f(C(e.timestamp,d.timestampFormat)),1)]),_:2},1032,[`class`]),_.value?(n(),u(w,{key:0,class:`nyx-log-viewer__origin`},{default:a(()=>[s(f(e.origin),1)]),_:2},1024)):l(``,!0),p(w,{class:t([`nyx-log-viewer__value`,e.theme?`theme-${e.theme}`:void 0])},{default:a(()=>[s(f(e.value),1)]),_:2},1032,[`class`])]),_:1},8,[`model-value`,`variant`,`gridTemplateColumns`]))}})})),k,A=e((()=>{O(),O(),k=D,D.__docgenInfo=Object.assign({displayName:D.name??D.__name},{exportName:`default`,displayName:`NyxLogViewer`,description:``,tags:{},props:[{name:`timestampFormat`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'HH:mm:ss'`}},{name:`sort`,required:!1,type:{name:`NyxSort`},defaultValue:{func:!1,value:`NyxSort.None`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxLogViewer/NyxLogViewer.vue`]})})),j,M,N,P,F,I,L,R,z;e((()=>{d(),A(),y(),j={title:`Components/NyxLogViewer`,component:k,argTypes:{timestampFormat:{control:`text`},sort:{control:{type:`select`},options:Object.values(g)},theme:{control:{type:`select`},options:[void 0,...Object.values(_)]}}},M=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing services...`,origin:`core`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`,origin:`server`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,origin:`db`,theme:_.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss for key "user:123"`,origin:`cache`,theme:_.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: connection timeout`,origin:`api`,theme:_.Danger},{timestamp:new Date(`2024-01-15T10:23:49`),value:`Retrying in 5s...`,origin:`api`,theme:_.Info},{timestamp:new Date(`2024-01-15T10:23:54`),value:`Reconnected successfully`,origin:`api`,theme:_.Success}],N=[{timestamp:new Date(`2024-01-15T10:23:44`),value:`Initializing...`},{timestamp:new Date(`2024-01-15T10:23:45`),value:`Server started on port 3000`},{timestamp:new Date(`2024-01-15T10:23:46`),value:`Database connected`,theme:_.Success},{timestamp:new Date(`2024-01-15T10:23:47`),value:`Cache miss detected`,theme:_.Warning},{timestamp:new Date(`2024-01-15T10:23:48`),value:`Request failed: timeout`,theme:_.Danger}],P=e=>({components:{NyxLogViewer:k},setup(){return{args:e,logs:o(M)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`}),F=Object.assign(P.bind({}),{args:{}}),I=Object.assign(P.bind({}),{args:{timestampFormat:`DD/MM/YYYY HH:mm:ss`}}),L=Object.assign((e=>({components:{NyxLogViewer:k},setup(){return{args:e,logs:o(N)}},template:`<NyxLogViewer v-model="logs" v-bind="args" />`})).bind({}),{args:{}}),R=()=>h({components:{NyxLogViewer:k},setup(){return{logs:o(Object.values(_).map((e,t)=>({timestamp:new Date(Date.now()+t*1e3),value:`Log entry with theme: ${e}`,origin:e,theme:e})))}},template:`<NyxLogViewer v-model="logs" />`}),F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {} as NyxLogViewerProps
})`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`Object.assign(Template.bind({}), {
  args: {
    timestampFormat: 'DD/MM/YYYY HH:mm:ss'
  } as NyxLogViewerProps
})`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`Object.assign(((args: NyxLogViewerProps) => ({
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
})`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...R.parameters?.docs?.source}}},z=[`Default`,`CustomTimestampFormat`,`WithoutOrigin`,`AllThemes`]}))();export{R as AllThemes,I as CustomTimestampFormat,F as Default,L as WithoutOrigin,z as __namedExportsOrder,j as default};