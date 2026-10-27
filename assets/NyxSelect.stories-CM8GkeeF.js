import{n as e}from"./chunk-BneVvdWh.js";import{J as t,P as n,S as r,et as i,h as a,m as o,st as s,t as c,v as l,x as u}from"./vue.esm-bundler-BCs4lh10.js";import{D as d,S as f,T as p,i as m,o as h}from"./string-CevuJH_I.js";import{c as g,t as _}from"./utils-DImGTvri.js";import{i as v,n as y,r as b,t as x}from"./NyxFormField-CNhQyKk5.js";import{n as S,t as C}from"./NyxSelect-5tUFUjB2.js";import{n as w,t as T}from"./_plugin-vue_export-helper-BSghlFYG.js";var E,D,O,k,A,j=e((()=>{c(),S(),E={class:`select-option-demo`},D={class:`discussion-option`},O={class:`discussion-option__title`},k={class:`discussion-option__date`},A=r({__name:`NyxSelectOptionContentDemo`,props:{grouped:{type:Boolean}},setup(e){let r=e,c=i(1),d=i([{label:`Planning the next release and following up on feedback from the team`,value:1},{label:`Discussion switcher improvements`,value:2},{label:`Archived discussion`,value:3,disabled:!0}]),f=o(()=>r.grouped?[{label:`Active`,options:d.value.filter(e=>!e.disabled)},{label:`Archive`,options:d.value.filter(e=>e.disabled)}]:d.value),p={1:`27 Oct`,2:`26 Oct`,3:`20 Oct`},m=e=>p[e],h=()=>{d.value=[...d.value].reverse()},g=()=>{let e=d.value.find(e=>e.value===c.value);e&&(e.label=`Renamed discussion with the same selected value`)};return(e,r)=>(n(),l(`div`,E,[a(`div`,{class:`select-option-demo__actions`},[a(`button`,{type:`button`,onClick:h},`Reorder options`),a(`button`,{type:`button`,onClick:g},`Rename selected`)]),u(C,{modelValue:c.value,"onUpdate:modelValue":r[0]||=e=>c.value=e,options:f.value},{option:t(({option:e})=>[a(`span`,D,[a(`span`,O,s(e.label),1),a(`span`,k,s(m(e.value)),1)])]),_:1},8,[`modelValue`,`options`]),a(`p`,null,`Selected value: `+s(c.value),1)]))}})})),M=e((()=>{})),N,P=e((()=>{j(),j(),M(),w(),N=T(A,[[`__scopeId`,`data-v-08bd6d76`]]),A.__docgenInfo=Object.assign({displayName:A.name??A.__name},{exportName:`default`,displayName:`NyxSelectOptionContentDemo`,description:``,tags:{},props:[{name:`grouped`,required:!1,type:{name:`boolean`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxSelect/storybook/NyxSelectOptionContentDemo.vue`]})})),F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;e((()=>{c(),S(),m(),_(),v(),y(),P(),F=Object.values(p).map(e=>({label:e,value:e})),I=[{label:`Brand`,options:[{label:`Primary`,value:p.Primary},{label:`Secondary`,value:p.Secondary}]},{label:`Status`,options:[{label:`Info`,value:p.Info},{label:`Success`,value:p.Success},{label:`Warning`,value:p.Warning},{label:`Danger`,value:p.Danger}]}],L={title:`Components/Form/NyxSelect`,component:C,argTypes:{type:{control:{type:`select`},options:Object.values(h)},theme:{control:{type:`select`},options:Object.values(p)},variant:{control:{type:`select`},options:Object.values(d)},size:{control:{type:`select`},options:Object.values(f)}},args:{options:F}},R=e=>r({components:{NyxSelect:C},inheritAttrs:!1,setup(){return{args:e}},template:`
    <nyx-select v-bind="args" :placeholder="'NyxSelect'" />
  `}),z=(e,t)=>()=>r({components:{NyxSelect:C,NyxForm:b,NyxFormField:x},setup(){return{prop:e,values:Object.values(t),getLabel:e=>g(t,e),options:F}},template:`
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
  `}),B=R({options:F}),V={render:()=>({components:{NyxSelectOptionContentDemo:N},template:`<NyxSelectOptionContentDemo />`})},H={render:()=>({components:{NyxSelectOptionContentDemo:N},template:`<NyxSelectOptionContentDemo grouped />`})},U=()=>r({components:{NyxSelect:C},setup(){return{options:I}},template:`<nyx-select :options="options" placeholder="NyxSelect" />`}),W=()=>r({components:{NyxSelect:C},setup(){let e=i(p.Primary);return{modelValue:e,options:F,cycleValue:()=>{e.value=e.value===p.Primary?p.Danger:p.Primary},clearValue:()=>{e.value=``}}},template:`
    <div style="display:grid;gap:1rem;max-width:24rem;">
      <div style="display:flex;gap:0.5rem;">
        <button type="button" @click="cycleValue">Toggle value</button>
        <button type="button" @click="clearValue">Clear</button>
      </div>
      <nyx-select v-model="modelValue" :options="options" placeholder="NyxSelect" />
      <p>External value: {{ modelValue }}</p>
    </div>
  `}),G=()=>r({components:{NyxSelect:C},setup(){return{modelValue:i(42),numericOptions:[{label:`Ten`,value:10},{label:`Forty-two`,value:42},{label:`One hundred`,value:100}]}},template:`
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
  `}),K=function(e){return e.Open=`open`,e.InProgress=`in_progress`,e.Done=`done`,e}(K||{}),q=()=>r({components:{NyxSelect:C},setup(){return{modelValue:i(K.Open),enumOptions:[{label:`Open`,value:K.Open},{label:`In progress`,value:K.InProgress},{label:`Done`,value:K.Done}]}},template:`
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
  `}),J=z(`type`,h),Y=z(`theme`,p),X=z(`variant`,d),Z=z(`size`,f),B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`Template({
  options
})`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxSelectOptionContentDemo
    },
    template: '<NyxSelectOptionContentDemo />'
  })
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxSelectOptionContentDemo
    },
    template: '<NyxSelectOptionContentDemo grouped />'
  })
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxSelect
  },
  setup() {
    return {
      options: groupedOptions
    };
  },
  template: \`<nyx-select :options="options" placeholder="NyxSelect" />\`
})`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => defineComponent({
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
})`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`TemplateAll('type', NyxSelectType)`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`TemplateAll('theme', NyxTheme)`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`TemplateAll('variant', NyxVariant)`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`TemplateAll('size', NyxSize)`,...Z.parameters?.docs?.source}}},Q=[`Default`,`CustomOptionContent`,`CustomGroupedOptionContent`,`WithGroups`,`ExternalModelSync`,`NumericValues`,`EnumValues`,`Types`,`Themes`,`Variants`,`Sizes`]}))();export{H as CustomGroupedOptionContent,V as CustomOptionContent,B as Default,q as EnumValues,W as ExternalModelSync,G as NumericValues,Z as Sizes,Y as Themes,J as Types,X as Variants,U as WithGroups,Q as __namedExportsOrder,L as default};