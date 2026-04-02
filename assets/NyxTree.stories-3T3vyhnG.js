import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,M as r,P as i,R as a,Y as o,_ as s,f as c,g as l,h as u,m as d,p as f,t as p,tt as m,u as h,w as g,y as _}from"./vue.esm-bundler-C_Vkk7g_.js";var v=e((()=>{})),y,b=e((()=>{y=function(e){return e.Active=`active`,e.Open=`open`,e.Closed=`closed`,e}({})})),x,S,C,w,T=e((()=>{p(),b(),x=[`aria-expanded`,`aria-selected`,`aria-disabled`,`tabindex`],S={key:0,class:`nyx-tree-node__toggle`},C=[`inert`],w=_({name:`NyxTreeNode`,__name:`NyxTreeNode`,props:{node:{},disabled:{type:Boolean}},emits:[`select`],setup(e,{emit:a}){let o=e,p=a,g=c(()=>o.node.children.length>0),_=c(()=>o.node.status===y.Open||o.node.status===y.Active),v=c(()=>o.node.status===y.Active),b=c(()=>o.disabled||o.node.disabled);function w(){b.value||p(`select`,o.node)}return(a,o)=>{let c=i(`NyxTreeNode`,!0);return n(),l(`li`,{class:t([`nyx-tree-node`,{"nyx-tree-node--branch":g.value,"nyx-tree-node--leaf":!g.value,"nyx-tree-node--expanded":g.value&&_.value,"nyx-tree-node--active":v.value,"nyx-tree-node--disabled":b.value}]),role:`treeitem`,"aria-expanded":g.value?_.value:void 0,"aria-selected":v.value,"aria-disabled":b.value||void 0,tabindex:v.value?0:-1},[f(`span`,{class:`nyx-tree-node__label`,onClick:w},[g.value?(n(),l(`span`,S,m(_.value?`▾`:`▸`),1)):u(``,!0),s(` `+m(e.node.label),1)]),g.value?(n(),l(`ul`,{key:0,class:`nyx-tree-children`,role:`group`,inert:!_.value||void 0},[(n(!0),l(h,null,r(e.node.children,e=>(n(),d(c,{key:e.id,node:e,disabled:b.value,onSelect:o[0]||=e=>p(`select`,e)},null,8,[`node`,`disabled`]))),128))],8,C)):u(``,!0)],10,x)}}})})),E,D=e((()=>{T(),T(),E=w,w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{name:`NyxTreeNode`,exportName:`default`,displayName:`NyxTreeNode`,description:``,tags:{},props:[{name:`node`,required:!0,type:{name:`NyxTreeNodeBase`}},{name:`disabled`,required:!1,type:{name:`boolean`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTreeNode.vue`]})})),O,k,A=e((()=>{p(),v(),D(),b(),O=[`aria-disabled`],k=_({__name:`NyxTree`,props:g({disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:g([`select`],[`update:modelValue`]),setup(e,{emit:t}){let i=e,s=a(e,`modelValue`),c=t,u=o(null);function f(){return u.value?Array.from(u.value.querySelectorAll(`[role="treeitem"]`)).filter(e=>!e.closest(`[inert]`)):[]}function p(e){if(i.disabled)return;let t=f(),n=document.activeElement,r=t.indexOf(n);if(e.key===`ArrowDown`){e.preventDefault();let n=t[r+1];n&&n.focus()}else if(e.key===`ArrowUp`){e.preventDefault();let n=t[r-1];n&&n.focus()}else (e.key===`Enter`||e.key===` `||e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),(n?.querySelector(`.nyx-tree-node__label`))?.click())}function m(e){for(let t of e)t.status===y.Active&&(t.status=y.Closed),t.children.length&&m(t.children)}function g(e){e.children.length===0?(m(s.value),e.status=y.Active):e.status=e.status===y.Open||e.status===y.Active?y.Closed:y.Open,c(`select`,e)}return(e,t)=>(n(),l(`ul`,{ref_key:`treeRef`,ref:u,class:`nyx-tree`,role:`tree`,"aria-disabled":i.disabled||void 0,tabindex:0,onKeydown:p},[(n(!0),l(h,null,r(s.value,e=>(n(),d(E,{key:e.id,node:e,disabled:i.disabled,onSelect:g},null,8,[`node`,`disabled`]))),128))],40,O))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxTree`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTree.vue`]})})),N,P,F,I,L,R,z,B,V;e((()=>{p(),M(),b(),N={title:`Components/NyxTree`,component:j,argTypes:{disabled:{control:{type:`boolean`}},onSelect:{action:`select`}}},P=[{id:`alpha`,label:`Alpha`,children:[]},{id:`beta`,label:`Beta`,children:[]},{id:`gamma`,label:`Gamma`,children:[]}],F=[{id:`fruits`,label:`Fruits`,children:[{id:`tropical`,label:`Tropical`,children:[{id:`mango`,label:`Mango`,children:[]},{id:`pineapple`,label:`Pineapple`,children:[]},{id:`papaya`,label:`Papaya`,children:[]}]},{id:`berries`,label:`Berries`,children:[{id:`strawberry`,label:`Strawberry`,children:[]},{id:`blueberry`,label:`Blueberry`,children:[]},{id:`raspberry`,label:`Raspberry`,children:[]}]},{id:`apple`,label:`Apple`,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Vegetables`,children:[{id:`root-veg`,label:`Root Vegetables`,children:[{id:`carrot`,label:`Carrot`,children:[]},{id:`parsnip`,label:`Parsnip`,children:[]},{id:`beetroot`,label:`Beetroot`,children:[]}]},{id:`broccoli`,label:`Broccoli`,children:[]},{id:`spinach`,label:`Spinach`,children:[]}]},{id:`grains`,label:`Grains`,children:[{id:`wheat`,label:`Wheat`,children:[]},{id:`rice`,label:`Rice`,children:[]},{id:`oats`,label:`Oats`,children:[]}]}],I=()=>_({components:{NyxTree:j},setup(){return{model:o(JSON.parse(JSON.stringify(P)))}},template:`<NyxTree v-model="model" />`}),L=()=>_({components:{NyxTree:j},setup(){return{model:o(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" />`}),R=()=>_({components:{NyxTree:j},setup(){return{model:o([{id:`fruits`,label:`Fruits`,status:y.Open,children:[{id:`apple`,label:`Apple`,status:y.Active,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Veggies`,children:[{id:`carrot`,label:`Carrot`,children:[]}]}])}},template:`<NyxTree v-model="model" />`}),z=()=>_({components:{NyxTree:j},setup(){return{model:o([{id:`fruits`,label:`Fruits (disabled)`,disabled:!0,children:[{id:`apple`,label:`Apple`,children:[]}]},{id:`beta`,label:`Beta`,children:[]}])}},template:`<NyxTree v-model="model" />`}),B=()=>_({components:{NyxTree:j},setup(){return{model:o(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" :disabled="true" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
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