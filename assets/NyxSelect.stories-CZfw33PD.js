import{n as e}from"./chunk-BneVvdWh.js";import{Y as t,t as n,y as r}from"./vue.esm-bundler-C_Vkk7g_.js";import{D as i,O as a,T as o,l as s,p as c,t as l,u}from"./utils-CWkZdHks.js";import{i as d,n as f,r as p,t as m}from"./NyxFormField-DUcC2BUu.js";import{n as h,t as g}from"./NyxSelect-DxHESRr8.js";var _,v,y,b,x,S,C,w,T,E,D,O,k;e((()=>{n(),h(),u(),l(),d(),f(),_=Object.values(i).map(e=>({label:e,value:e})),v=[{label:`Brand`,options:[{label:`Primary`,value:i.Primary},{label:`Secondary`,value:i.Secondary}]},{label:`Status`,options:[{label:`Info`,value:i.Info},{label:`Success`,value:i.Success},{label:`Warning`,value:i.Warning},{label:`Danger`,value:i.Danger}]}],y={title:`Components/NyxSelect`,component:g,argTypes:{type:{control:{type:`select`},options:Object.values(c)},theme:{control:{type:`select`},options:Object.values(i)},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(o)}},args:{options:_}},b=e=>r({components:{NyxSelect:g},inheritAttrs:!1,setup(){return{args:e}},template:`
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `}),x=(e,t)=>()=>r({components:{NyxSelect:g,NyxForm:p,NyxFormField:m},setup(){return{prop:e,values:Object.values(t),getLabel:e=>s(t,e),options:_}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-select
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
            :options="options"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),S=b({options:_}),C=()=>r({components:{NyxSelect:g},setup(){return{options:v}},template:`<nyx-select :options="options" placeholder="NyxSelect" />`}),w=()=>r({components:{NyxSelect:g},setup(){let e=t(i.Primary);return{modelValue:e,options:_,cycleValue:()=>{e.value=e.value===i.Primary?i.Danger:i.Primary},clearValue:()=>{e.value=``}}},template:`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <div style="display:flex;gap:0.5rem;">
        <button type="button" @click="cycleValue">Toggle value</button>
        <button type="button" @click="clearValue">Clear</button>
      </div>
      <nyx-select v-model="modelValue" :options="options" placeholder="NyxSelect" />
      <p>External value: {{ modelValue }}</p>
    </div>
  `}),T=x(`type`,c),E=x(`theme`,i),D=x(`variant`,a),O=x(`size`,o),S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`Template({
  options
})`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    return {
      options: groupedOptions
    };
  },
  template: \`<nyx-select :options="options" placeholder="NyxSelect" />\`
})`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    const modelValue = ref<string>(NyxTheme.Primary);
    const cycleValue = () => {
      modelValue.value = modelValue.value === NyxTheme.Primary ? NyxTheme.Danger : NyxTheme.Primary;
    };
    const clearValue = () => {
      modelValue.value = '';
    };
    return {
      modelValue,
      options,
      cycleValue,
      clearValue
    };
  },
  template: \`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <div style="display:flex;gap:0.5rem;">
        <button type="button" @click="cycleValue">Toggle value</button>
        <button type="button" @click="clearValue">Clear</button>
      </div>
      <nyx-select v-model="modelValue" :options="options" placeholder="NyxSelect" />
      <p>External value: {{ modelValue }}</p>
    </div>
  \`
})`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxSelectType)`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...O.parameters?.docs?.source}}},k=[`Default`,`WithGroups`,`ExternalModelSync`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{S as Default,w as ExternalModelSync,O as Sizes,E as Themes,T as Types,D as Variants,C as WithGroups,k as __namedExportsOrder,y as default};