import{n as e}from"./chunk-BneVvdWh.js";import{A as t,G as n,I as r,J as i,N as a,T as o,X as s,_ as c,f as l,g as u,h as d,i as f,j as p,m,v as h,x as g,y as _}from"./iframe-DKH6pIYo.js";var v=e((()=>{})),y,b=e((()=>{y=function(e){return e.Active=`active`,e.Open=`open`,e.Closed=`closed`,e}({})})),x,S,C,w,T=e((()=>{f(),b(),x=[`aria-expanded`,`aria-selected`,`aria-disabled`,`tabindex`],S={key:0,class:`nyx-tree-node__toggle`},C=[`inert`],w=g({name:`NyxTreeNode`,__name:`NyxTreeNode`,props:{node:{},disabled:{type:Boolean}},emits:[`select`],setup(e,{emit:n}){let r=e,o=n,f=m(()=>r.node.children.length>0),g=m(()=>r.node.status===y.Open||r.node.status===y.Active),v=m(()=>r.node.status===y.Active),b=m(()=>r.disabled||r.node.disabled);function w(){b.value||o(`select`,r.node)}return(n,r)=>{let m=a(`NyxTreeNode`,!0);return t(),h(`li`,{class:i([`nyx-tree-node`,{"nyx-tree-node--branch":f.value,"nyx-tree-node--leaf":!f.value,"nyx-tree-node--expanded":f.value&&g.value,"nyx-tree-node--active":v.value,"nyx-tree-node--disabled":b.value}]),role:`treeitem`,"aria-expanded":f.value?g.value:void 0,"aria-selected":v.value,"aria-disabled":b.value||void 0,tabindex:v.value?0:-1},[d(`span`,{class:`nyx-tree-node__label`,onClick:w},[f.value?(t(),h(`span`,S,s(g.value?`▾`:`▸`),1)):c(``,!0),_(` `+s(e.node.label),1)]),f.value?(t(),h(`ul`,{key:0,class:`nyx-tree-children`,role:`group`,inert:!g.value||void 0},[(t(!0),h(l,null,p(e.node.children,e=>(t(),u(m,{key:e.id,node:e,disabled:b.value,onSelect:r[0]||=e=>o(`select`,e)},null,8,[`node`,`disabled`]))),128))],8,C)):c(``,!0)],10,x)}}})})),E,D=e((()=>{T(),T(),E=w,w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{name:`NyxTreeNode`,exportName:`default`,displayName:`NyxTreeNode`,description:``,tags:{},props:[{name:`node`,required:!0,type:{name:`NyxTreeNodeBase`}},{name:`disabled`,required:!1,type:{name:`boolean`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTreeNode.vue`]})})),O,k,A=e((()=>{f(),v(),D(),b(),O=[`aria-disabled`],k=g({__name:`NyxTree`,props:o({disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:o([`select`],[`update:modelValue`]),setup(e,{emit:i}){let a=e,o=r(e,`modelValue`),s=i,c=n(null);function d(){return c.value?Array.from(c.value.querySelectorAll(`[role="treeitem"]`)).filter(e=>!e.closest(`[inert]`)):[]}function f(e){if(a.disabled)return;let t=d(),n=document.activeElement,r=t.indexOf(n);if(e.key===`ArrowDown`){e.preventDefault();let n=t[r+1];n&&n.focus()}else if(e.key===`ArrowUp`){e.preventDefault();let n=t[r-1];n&&n.focus()}else (e.key===`Enter`||e.key===` `||e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),(n?.querySelector(`.nyx-tree-node__label`))?.click())}function m(e){for(let t of e)t.status===y.Active&&(t.status=y.Closed),t.children.length&&m(t.children)}function g(e){e.children.length===0?(m(o.value),e.status=y.Active):e.status=e.status===y.Open||e.status===y.Active?y.Closed:y.Open,s(`select`,e)}return(e,n)=>(t(),h(`ul`,{ref_key:`treeRef`,ref:c,class:`nyx-tree`,role:`tree`,"aria-disabled":a.disabled||void 0,tabindex:0,onKeydown:f},[(t(!0),h(l,null,p(o.value,e=>(t(),u(E,{key:e.id,node:e,disabled:a.disabled,onSelect:g},null,8,[`node`,`disabled`]))),128))],40,O))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxTree`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTree.vue`]})})),N,P,F,I,L,R,z,B,V;e((()=>{f(),M(),b(),N={title:`Components/NyxTree`,component:j,argTypes:{disabled:{control:{type:`boolean`}},onSelect:{action:`select`}}},P=[{id:`alpha`,label:`Alpha`,children:[]},{id:`beta`,label:`Beta`,children:[]},{id:`gamma`,label:`Gamma`,children:[]}],F=[{id:`fruits`,label:`Fruits`,children:[{id:`tropical`,label:`Tropical`,children:[{id:`mango`,label:`Mango`,children:[]},{id:`pineapple`,label:`Pineapple`,children:[]},{id:`papaya`,label:`Papaya`,children:[]}]},{id:`berries`,label:`Berries`,children:[{id:`strawberry`,label:`Strawberry`,children:[]},{id:`blueberry`,label:`Blueberry`,children:[]},{id:`raspberry`,label:`Raspberry`,children:[]}]},{id:`apple`,label:`Apple`,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Vegetables`,children:[{id:`root-veg`,label:`Root Vegetables`,children:[{id:`carrot`,label:`Carrot`,children:[]},{id:`parsnip`,label:`Parsnip`,children:[]},{id:`beetroot`,label:`Beetroot`,children:[]}]},{id:`broccoli`,label:`Broccoli`,children:[]},{id:`spinach`,label:`Spinach`,children:[]}]},{id:`grains`,label:`Grains`,children:[{id:`wheat`,label:`Wheat`,children:[]},{id:`rice`,label:`Rice`,children:[]},{id:`oats`,label:`Oats`,children:[]}]}],I=()=>g({components:{NyxTree:j},setup(){return{model:n(JSON.parse(JSON.stringify(P)))}},template:`<NyxTree v-model="model" />`}),L=()=>g({components:{NyxTree:j},setup(){return{model:n(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" />`}),R=()=>g({components:{NyxTree:j},setup(){return{model:n([{id:`fruits`,label:`Fruits`,status:y.Open,children:[{id:`apple`,label:`Apple`,status:y.Active,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Veggies`,children:[{id:`carrot`,label:`Carrot`,children:[]}]}])}},template:`<NyxTree v-model="model" />`}),z=()=>g({components:{NyxTree:j},setup(){return{model:n([{id:`fruits`,label:`Fruits (disabled)`,disabled:!0,children:[{id:`apple`,label:`Apple`,children:[]}]},{id:`beta`,label:`Beta`,children:[]}])}},template:`<NyxTree v-model="model" />`}),B=()=>g({components:{NyxTree:j},setup(){return{model:n(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" :disabled="true" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
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