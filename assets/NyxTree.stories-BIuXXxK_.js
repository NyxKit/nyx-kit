import{n as e}from"./chunk-BneVvdWh.js";import{I as t,O as n,P as r,R as i,S as a,U as o,_ as s,b as c,et as l,f as u,g as d,h as f,it as p,m,st as h,t as g,v as _}from"./vue.esm-bundler-BCs4lh10.js";var v=e((()=>{})),y,b=e((()=>{y=function(e){return e.Active=`active`,e.Open=`open`,e.Closed=`closed`,e}({})})),x,S,C,w,T=e((()=>{g(),b(),x=[`aria-expanded`,`aria-selected`,`aria-disabled`,`tabindex`],S={key:0,class:`nyx-tree-node__toggle`},C=[`inert`],w=a({name:`NyxTreeNode`,__name:`NyxTreeNode`,props:{node:{},disabled:{type:Boolean}},emits:[`select`],setup(e,{emit:n}){let a=e,o=n,l=m(()=>a.node.children.length>0),g=m(()=>a.node.status===y.Open||a.node.status===y.Active),v=m(()=>a.node.status===y.Active),b=m(()=>a.disabled||a.node.disabled);function w(){b.value||o(`select`,a.node)}return(n,a)=>{let m=i(`NyxTreeNode`,!0);return r(),_(`li`,{class:p([`nyx-tree-node`,{"nyx-tree-node--branch":l.value,"nyx-tree-node--leaf":!l.value,"nyx-tree-node--expanded":l.value&&g.value,"nyx-tree-node--active":v.value,"nyx-tree-node--disabled":b.value}]),role:`treeitem`,"aria-expanded":l.value?g.value:void 0,"aria-selected":v.value,"aria-disabled":b.value||void 0,tabindex:v.value?0:-1},[f(`span`,{class:`nyx-tree-node__label`,onClick:w},[l.value?(r(),_(`span`,S,h(g.value?`▾`:`▸`),1)):s(``,!0),c(` `+h(e.node.label),1)]),l.value?(r(),_(`ul`,{key:0,class:`nyx-tree-children`,role:`group`,inert:!g.value||void 0},[(r(!0),_(u,null,t(e.node.children,e=>(r(),d(m,{key:e.id,node:e,disabled:b.value,onSelect:a[0]||=e=>o(`select`,e)},null,8,[`node`,`disabled`]))),128))],8,C)):s(``,!0)],10,x)}}})})),E,D=e((()=>{T(),T(),E=w,w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{name:`NyxTreeNode`,exportName:`default`,displayName:`NyxTreeNode`,description:``,tags:{},props:[{name:`node`,required:!0,type:{name:`NyxTreeNodeBase`}},{name:`disabled`,required:!1,type:{name:`boolean`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTreeNode.vue`]})})),O,k,A=e((()=>{g(),v(),D(),b(),O=[`aria-disabled`],k=a({__name:`NyxTree`,props:n({disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:n([`select`],[`update:modelValue`]),setup(e,{emit:n}){let i=e,a=o(e,`modelValue`),s=n,c=l(null);function f(){return c.value?Array.from(c.value.querySelectorAll(`[role="treeitem"]`)).filter(e=>!e.closest(`[inert]`)):[]}function p(e){if(i.disabled)return;let t=f(),n=document.activeElement,r=t.indexOf(n);if(e.key===`ArrowDown`){e.preventDefault();let n=t[r+1];n&&n.focus()}else if(e.key===`ArrowUp`){e.preventDefault();let n=t[r-1];n&&n.focus()}else (e.key===`Enter`||e.key===` `||e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),(n?.querySelector(`.nyx-tree-node__label`))?.click())}function m(e){for(let t of e)t.status===y.Active&&(t.status=y.Closed),t.children.length&&m(t.children)}function h(e){e.children.length===0?(m(a.value),e.status=y.Active):e.status=e.status===y.Open||e.status===y.Active?y.Closed:y.Open,s(`select`,e)}return(e,n)=>(r(),_(`ul`,{ref_key:`treeRef`,ref:c,class:`nyx-tree`,role:`tree`,"aria-disabled":i.disabled||void 0,tabindex:0,onKeydown:p},[(r(!0),_(u,null,t(a.value,e=>(r(),d(E,{key:e.id,node:e,disabled:i.disabled,onSelect:h},null,8,[`node`,`disabled`]))),128))],40,O))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxTree`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTree.vue`]})})),N,P,F,I,L,R,z,B,V;e((()=>{g(),M(),b(),N={title:`Components/Data/NyxTree`,component:j,argTypes:{disabled:{control:{type:`boolean`}},onSelect:{action:`select`}}},P=[{id:`alpha`,label:`Alpha`,children:[]},{id:`beta`,label:`Beta`,children:[]},{id:`gamma`,label:`Gamma`,children:[]}],F=[{id:`fruits`,label:`Fruits`,children:[{id:`tropical`,label:`Tropical`,children:[{id:`mango`,label:`Mango`,children:[]},{id:`pineapple`,label:`Pineapple`,children:[]},{id:`papaya`,label:`Papaya`,children:[]}]},{id:`berries`,label:`Berries`,children:[{id:`strawberry`,label:`Strawberry`,children:[]},{id:`blueberry`,label:`Blueberry`,children:[]},{id:`raspberry`,label:`Raspberry`,children:[]}]},{id:`apple`,label:`Apple`,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Vegetables`,children:[{id:`root-veg`,label:`Root Vegetables`,children:[{id:`carrot`,label:`Carrot`,children:[]},{id:`parsnip`,label:`Parsnip`,children:[]},{id:`beetroot`,label:`Beetroot`,children:[]}]},{id:`broccoli`,label:`Broccoli`,children:[]},{id:`spinach`,label:`Spinach`,children:[]}]},{id:`grains`,label:`Grains`,children:[{id:`wheat`,label:`Wheat`,children:[]},{id:`rice`,label:`Rice`,children:[]},{id:`oats`,label:`Oats`,children:[]}]}],I=()=>a({components:{NyxTree:j},setup(){return{model:l(JSON.parse(JSON.stringify(P)))}},template:`<NyxTree v-model="model" />`}),L=()=>a({components:{NyxTree:j},setup(){return{model:l(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" />`}),R=()=>a({components:{NyxTree:j},setup(){return{model:l([{id:`fruits`,label:`Fruits`,status:y.Open,children:[{id:`apple`,label:`Apple`,status:y.Active,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Veggies`,children:[{id:`carrot`,label:`Carrot`,children:[]}]}])}},template:`<NyxTree v-model="model" />`}),z=()=>a({components:{NyxTree:j},setup(){return{model:l([{id:`fruits`,label:`Fruits (disabled)`,disabled:!0,children:[{id:`apple`,label:`Apple`,children:[]}]},{id:`beta`,label:`Beta`,children:[]}])}},template:`<NyxTree v-model="model" />`}),B=()=>a({components:{NyxTree:j},setup(){return{model:l(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" :disabled="true" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
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