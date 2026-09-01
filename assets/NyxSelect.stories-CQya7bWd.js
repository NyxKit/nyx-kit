import{n as e}from"./chunk-BneVvdWh.js";import{Y as t,t as n,y as r}from"./vue.esm-bundler-C_Vkk7g_.js";import{A as i,F as a,N as o,c as s,f as c,m as l,t as u}from"./utils-BN10c1sN.js";import{i as d,n as f,r as p,t as m}from"./NyxFormField-o__mqYdy.js";import{n as h,t as g}from"./NyxSelect-Dz6Brbet.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{n(),h(),c(),u(),d(),f(),_=Object.values(o).map(e=>({label:e,value:e})),v=[{label:`Brand`,options:[{label:`Primary`,value:o.Primary},{label:`Secondary`,value:o.Secondary}]},{label:`Status`,options:[{label:`Info`,value:o.Info},{label:`Success`,value:o.Success},{label:`Warning`,value:o.Warning},{label:`Danger`,value:o.Danger}]}],y={title:`Components/Form/NyxSelect`,component:g,argTypes:{type:{control:{type:`select`},options:Object.values(l)},theme:{control:{type:`select`},options:Object.values(o)},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(i)}},args:{options:_}},b=e=>r({components:{NyxSelect:g},inheritAttrs:!1,setup(){return{args:e}},template:`
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
  `}),S=b({options:_}),C=()=>r({components:{NyxSelect:g},setup(){return{options:v}},template:`<nyx-select :options="options" placeholder="NyxSelect" />`}),w=()=>r({components:{NyxSelect:g},setup(){let e=t(o.Primary);return{modelValue:e,options:_,cycleValue:()=>{e.value=e.value===o.Primary?o.Danger:o.Primary},clearValue:()=>{e.value=``}}},template:`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <div style="display:flex;gap:0.5rem;">
        <button type="button" @click="cycleValue">Toggle value</button>
        <button type="button" @click="clearValue">Clear</button>
      </div>
      <nyx-select v-model="modelValue" :options="options" placeholder="NyxSelect" />
      <p>External value: {{ modelValue }}</p>
    </div>
  `}),T=()=>r({components:{NyxSelect:g},setup(){return{modelValue:t(42),numericOptions:[{label:`Ten`,value:10},{label:`Forty-two`,value:42},{label:`One hundred`,value:100}]}},template:`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <nyx-select
        v-model="modelValue"
        :options="numericOptions"
        placeholder="Pick a number"
      />
      <p style="margin:0;font-family:monospace;font-size:0.875rem;">
        v-model: {{ modelValue }} — typeof: {{ typeof modelValue }}
      </p>
    </div>
  `}),E=function(e){return e.Open=`open`,e.InProgress=`in_progress`,e.Done=`done`,e}(E||{}),D=()=>r({components:{NyxSelect:g},setup(){return{modelValue:t(E.Open),enumOptions:[{label:`Open`,value:E.Open},{label:`In progress`,value:E.InProgress},{label:`Done`,value:E.Done}]}},template:`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <nyx-select
        v-model="modelValue"
        :options="enumOptions"
        placeholder="Issue state"
      />
      <p style="margin:0;font-family:monospace;font-size:0.875rem;">
        v-model: {{ modelValue }}
      </p>
    </div>
  `}),O=x(`type`,l),k=x(`theme`,o),A=x(`variant`,a),j=x(`size`,i),S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`Template({
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
})`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    const modelValue = ref<number>(42);
    const numericOptions: NyxSelectOption<number>[] = [{
      label: 'Ten',
      value: 10
    }, {
      label: 'Forty-two',
      value: 42
    }, {
      label: 'One hundred',
      value: 100
    }];
    return {
      modelValue,
      numericOptions
    };
  },
  template: \`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <nyx-select
        v-model="modelValue"
        :options="numericOptions"
        placeholder="Pick a number"
      />
      <p style="margin:0;font-family:monospace;font-size:0.875rem;">
        v-model: {{ modelValue }} — typeof: {{ typeof modelValue }}
      </p>
    </div>
  \`
})`,...T.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    const modelValue = ref<IssueState>(IssueState.Open);
    const enumOptions: NyxSelectOption<IssueState>[] = [{
      label: 'Open',
      value: IssueState.Open
    }, {
      label: 'In progress',
      value: IssueState.InProgress
    }, {
      label: 'Done',
      value: IssueState.Done
    }];
    return {
      modelValue,
      enumOptions
    };
  },
  template: \`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <nyx-select
        v-model="modelValue"
        :options="enumOptions"
        placeholder="Issue state"
      />
      <p style="margin:0;font-family:monospace;font-size:0.875rem;">
        v-model: {{ modelValue }}
      </p>
    </div>
  \`
})`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxSelectType)`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...j.parameters?.docs?.source}}},M=[`Default`,`WithGroups`,`ExternalModelSync`,`NumericValues`,`EnumValues`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{S as Default,D as EnumValues,w as ExternalModelSync,T as NumericValues,j as Sizes,k as Themes,O as Types,A as Variants,C as WithGroups,M as __namedExportsOrder,y as default};