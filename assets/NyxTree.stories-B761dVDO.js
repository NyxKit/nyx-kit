import{n as e}from"./chunk-BneVvdWh.js";import{F as t,N as n,T as r,X as i,_ as a,b as o,d as s,et as c,g as l,h as u,j as d,m as f,nt as p,p as m,t as h,v as g,z as _}from"./vue.esm-bundler-BYSzMkkg.js";var v=e((()=>{})),y,b=e((()=>{y=function(e){return e.Active=`active`,e.Open=`open`,e.Closed=`closed`,e}({})})),x,S,C,w,T=e((()=>{h(),b(),x=[`aria-expanded`,`aria-selected`,`aria-disabled`,`tabindex`],S={key:0,class:`nyx-tree-node__toggle`},C=[`inert`],w=o({name:`NyxTreeNode`,__name:`NyxTreeNode`,props:{node:{},disabled:{type:Boolean}},emits:[`select`],setup(e,{emit:r}){let i=e,o=r,h=m(()=>i.node.children.length>0),_=m(()=>i.node.status===y.Open||i.node.status===y.Active),v=m(()=>i.node.status===y.Active),b=m(()=>i.disabled||i.node.disabled);function w(){b.value||o(`select`,i.node)}return(r,i)=>{let m=t(`NyxTreeNode`,!0);return d(),a(`li`,{class:c([`nyx-tree-node`,{"nyx-tree-node--branch":h.value,"nyx-tree-node--leaf":!h.value,"nyx-tree-node--expanded":h.value&&_.value,"nyx-tree-node--active":v.value,"nyx-tree-node--disabled":b.value}]),role:`treeitem`,"aria-expanded":h.value?_.value:void 0,"aria-selected":v.value,"aria-disabled":b.value||void 0,tabindex:v.value?0:-1},[f(`span`,{class:`nyx-tree-node__label`,onClick:w},[h.value?(d(),a(`span`,S,p(_.value?`▾`:`▸`),1)):l(``,!0),g(` `+p(e.node.label),1)]),h.value?(d(),a(`ul`,{key:0,class:`nyx-tree-children`,role:`group`,inert:!_.value||void 0},[(d(!0),a(s,null,n(e.node.children,e=>(d(),u(m,{key:e.id,node:e,disabled:b.value,onSelect:i[0]||=e=>o(`select`,e)},null,8,[`node`,`disabled`]))),128))],8,C)):l(``,!0)],10,x)}}})})),E,D=e((()=>{T(),T(),E=w,w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{name:`NyxTreeNode`,exportName:`default`,displayName:`NyxTreeNode`,description:``,tags:{},props:[{name:`node`,required:!0,type:{name:`NyxTreeNodeBase`}},{name:`disabled`,required:!1,type:{name:`boolean`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTreeNode.vue`]})})),O,k,A=e((()=>{h(),v(),D(),b(),O=[`aria-disabled`],k=o({__name:`NyxTree`,props:r({disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:r([`select`],[`update:modelValue`]),setup(e,{emit:t}){let r=e,o=_(e,`modelValue`),c=t,l=i(null);function f(){return l.value?Array.from(l.value.querySelectorAll(`[role="treeitem"]`)).filter(e=>!e.closest(`[inert]`)):[]}function p(e){if(r.disabled)return;let t=f(),n=document.activeElement,i=t.indexOf(n);if(e.key===`ArrowDown`){e.preventDefault();let n=t[i+1];n&&n.focus()}else if(e.key===`ArrowUp`){e.preventDefault();let n=t[i-1];n&&n.focus()}else (e.key===`Enter`||e.key===` `||e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),(n?.querySelector(`.nyx-tree-node__label`))?.click())}function m(e){for(let t of e)t.status===y.Active&&(t.status=y.Closed),t.children.length&&m(t.children)}function h(e){e.children.length===0?(m(o.value),e.status=y.Active):e.status=e.status===y.Open||e.status===y.Active?y.Closed:y.Open,c(`select`,e)}return(e,t)=>(d(),a(`ul`,{ref_key:`treeRef`,ref:l,class:`nyx-tree`,role:`tree`,"aria-disabled":r.disabled||void 0,tabindex:0,onKeydown:p},[(d(!0),a(s,null,n(o.value,e=>(d(),u(E,{key:e.id,node:e,disabled:r.disabled,onSelect:h},null,8,[`node`,`disabled`]))),128))],40,O))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxTree`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTree.vue`]})})),N,P,F,I,L,R,z,B,V;e((()=>{h(),M(),b(),N={title:`Components/Data/NyxTree`,component:j,argTypes:{disabled:{control:{type:`boolean`}},onSelect:{action:`select`}}},P=[{id:`alpha`,label:`Alpha`,children:[]},{id:`beta`,label:`Beta`,children:[]},{id:`gamma`,label:`Gamma`,children:[]}],F=[{id:`fruits`,label:`Fruits`,children:[{id:`tropical`,label:`Tropical`,children:[{id:`mango`,label:`Mango`,children:[]},{id:`pineapple`,label:`Pineapple`,children:[]},{id:`papaya`,label:`Papaya`,children:[]}]},{id:`berries`,label:`Berries`,children:[{id:`strawberry`,label:`Strawberry`,children:[]},{id:`blueberry`,label:`Blueberry`,children:[]},{id:`raspberry`,label:`Raspberry`,children:[]}]},{id:`apple`,label:`Apple`,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Vegetables`,children:[{id:`root-veg`,label:`Root Vegetables`,children:[{id:`carrot`,label:`Carrot`,children:[]},{id:`parsnip`,label:`Parsnip`,children:[]},{id:`beetroot`,label:`Beetroot`,children:[]}]},{id:`broccoli`,label:`Broccoli`,children:[]},{id:`spinach`,label:`Spinach`,children:[]}]},{id:`grains`,label:`Grains`,children:[{id:`wheat`,label:`Wheat`,children:[]},{id:`rice`,label:`Rice`,children:[]},{id:`oats`,label:`Oats`,children:[]}]}],I=()=>o({components:{NyxTree:j},setup(){return{model:i(JSON.parse(JSON.stringify(P)))}},template:`<NyxTree v-model="model" />`}),L=()=>o({components:{NyxTree:j},setup(){return{model:i(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" />`}),R=()=>o({components:{NyxTree:j},setup(){return{model:i([{id:`fruits`,label:`Fruits`,status:y.Open,children:[{id:`apple`,label:`Apple`,status:y.Active,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Veggies`,children:[{id:`carrot`,label:`Carrot`,children:[]}]}])}},template:`<NyxTree v-model="model" />`}),z=()=>o({components:{NyxTree:j},setup(){return{model:i([{id:`fruits`,label:`Fruits (disabled)`,disabled:!0,children:[{id:`apple`,label:`Apple`,children:[]}]},{id:`beta`,label:`Beta`,children:[]}])}},template:`<NyxTree v-model="model" />`}),B=()=>o({components:{NyxTree:j},setup(){return{model:i(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" :disabled="true" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTree
  },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(flatModel)));
    return {
      model
    };
  },
  template: \`<NyxTree v-model="model" />\`
})`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTree
  },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(nestedModel)));
    return {
      model
    };
  },
  template: \`<NyxTree v-model="model" />\`
})`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTree
  },
  setup() {
    const model = ref<NyxTreeNodeBase[]>([{
      id: 'fruits',
      label: 'Fruits',
      status: NyxTreeNodeStatus.Open,
      children: [{
        id: 'apple',
        label: 'Apple',
        status: NyxTreeNodeStatus.Active,
        children: []
      }, {
        id: 'banana',
        label: 'Banana',
        children: []
      }]
    }, {
      id: 'veggies',
      label: 'Veggies',
      children: [{
        id: 'carrot',
        label: 'Carrot',
        children: []
      }]
    }]);
    return {
      model
    };
  },
  template: \`<NyxTree v-model="model" />\`
})`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTree
  },
  setup() {
    const model = ref<NyxTreeNodeBase[]>([{
      id: 'fruits',
      label: 'Fruits (disabled)',
      disabled: true,
      children: [{
        id: 'apple',
        label: 'Apple',
        children: []
      }]
    }, {
      id: 'beta',
      label: 'Beta',
      children: []
    }]);
    return {
      model
    };
  },
  template: \`<NyxTree v-model="model" />\`
})`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxTree
  },
  setup() {
    const model = ref<NyxTreeNodeBase[]>(JSON.parse(JSON.stringify(nestedModel)));
    return {
      model
    };
  },
  template: \`<NyxTree v-model="model" :disabled="true" />\`
})`,...B.parameters?.docs?.source}}},V=[`Default`,`Nested`,`WithStatus`,`NodeDisabled`,`Disabled`]}))();export{I as Default,B as Disabled,L as Nested,z as NodeDisabled,R as WithStatus,V as __namedExportsOrder,N as default};