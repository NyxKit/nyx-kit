import{n as e}from"./chunk-BneVvdWh.js";import{M as t,P as n,Q as r,R as i,T as a,X as o,_ as s,f as c,g as l,h as u,i as d,j as f,m as p,q as m,v as h,x as g,y as _}from"./iframe-DbHJjvLx.js";var v=e((()=>{})),y,b=e((()=>{y=function(e){return e.Active=`active`,e.Open=`open`,e.Closed=`closed`,e}({})})),x,S,C,w,T=e((()=>{d(),b(),x=[`aria-expanded`,`aria-selected`,`aria-disabled`,`tabindex`],S={key:0,class:`nyx-tree-node__toggle`},C=[`inert`],w=g({name:`NyxTreeNode`,__name:`NyxTreeNode`,props:{node:{},disabled:{type:Boolean}},emits:[`select`],setup(e,{emit:i}){let a=e,d=i,m=p(()=>a.node.children.length>0),g=p(()=>a.node.status===y.Open||a.node.status===y.Active),v=p(()=>a.node.status===y.Active),b=p(()=>a.disabled||a.node.disabled);function w(){b.value||d(`select`,a.node)}return(i,a)=>{let p=n(`NyxTreeNode`,!0);return f(),h(`li`,{class:o([`nyx-tree-node`,{"nyx-tree-node--branch":m.value,"nyx-tree-node--leaf":!m.value,"nyx-tree-node--expanded":m.value&&g.value,"nyx-tree-node--active":v.value,"nyx-tree-node--disabled":b.value}]),role:`treeitem`,"aria-expanded":m.value?g.value:void 0,"aria-selected":v.value,"aria-disabled":b.value||void 0,tabindex:v.value?0:-1},[u(`span`,{class:`nyx-tree-node__label`,onClick:w},[m.value?(f(),h(`span`,S,r(g.value?`▾`:`▸`),1)):s(``,!0),_(` `+r(e.node.label),1)]),m.value?(f(),h(`ul`,{key:0,class:`nyx-tree-children`,role:`group`,inert:!g.value||void 0},[(f(!0),h(c,null,t(e.node.children,e=>(f(),l(p,{key:e.id,node:e,disabled:b.value,onSelect:a[0]||=e=>d(`select`,e)},null,8,[`node`,`disabled`]))),128))],8,C)):s(``,!0)],10,x)}}})})),E,D=e((()=>{T(),T(),E=w,w.__docgenInfo=Object.assign({displayName:w.name??w.__name},{name:`NyxTreeNode`,exportName:`default`,displayName:`NyxTreeNode`,description:``,tags:{},props:[{name:`node`,required:!0,type:{name:`NyxTreeNodeBase`}},{name:`disabled`,required:!1,type:{name:`boolean`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTreeNode.vue`]})})),O,k,A=e((()=>{d(),v(),D(),b(),O=[`aria-disabled`],k=g({__name:`NyxTree`,props:a({disabled:{type:Boolean,default:!1}},{modelValue:{required:!0},modelModifiers:{}}),emits:a([`select`],[`update:modelValue`]),setup(e,{emit:n}){let r=e,a=i(e,`modelValue`),o=n,s=m(null);function u(){return s.value?Array.from(s.value.querySelectorAll(`[role="treeitem"]`)).filter(e=>!e.closest(`[inert]`)):[]}function d(e){if(r.disabled)return;let t=u(),n=document.activeElement,i=t.indexOf(n);if(e.key===`ArrowDown`){e.preventDefault();let n=t[i+1];n&&n.focus()}else if(e.key===`ArrowUp`){e.preventDefault();let n=t[i-1];n&&n.focus()}else (e.key===`Enter`||e.key===` `||e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),(n?.querySelector(`.nyx-tree-node__label`))?.click())}function p(e){for(let t of e)t.status===y.Active&&(t.status=y.Closed),t.children.length&&p(t.children)}function g(e){e.children.length===0?(p(a.value),e.status=y.Active):e.status=e.status===y.Open||e.status===y.Active?y.Closed:y.Open,o(`select`,e)}return(e,n)=>(f(),h(`ul`,{ref_key:`treeRef`,ref:s,class:`nyx-tree`,role:`tree`,"aria-disabled":r.disabled||void 0,tabindex:0,onKeydown:d},[(f(!0),h(c,null,t(a.value,e=>(f(),l(E,{key:e.id,node:e,disabled:r.disabled,onSelect:g},null,8,[`node`,`disabled`]))),128))],40,O))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`NyxTree`,description:``,tags:{},props:[{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}}],events:[{name:`select`,type:{names:[`NyxTreeNodeBase`]}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxTree/NyxTree.vue`]})})),N,P,F,I,L,R,z,B,V;e((()=>{d(),M(),b(),N={title:`Components/NyxTree`,component:j,argTypes:{disabled:{control:{type:`boolean`}},onSelect:{action:`select`}}},P=[{id:`alpha`,label:`Alpha`,children:[]},{id:`beta`,label:`Beta`,children:[]},{id:`gamma`,label:`Gamma`,children:[]}],F=[{id:`fruits`,label:`Fruits`,children:[{id:`tropical`,label:`Tropical`,children:[{id:`mango`,label:`Mango`,children:[]},{id:`pineapple`,label:`Pineapple`,children:[]},{id:`papaya`,label:`Papaya`,children:[]}]},{id:`berries`,label:`Berries`,children:[{id:`strawberry`,label:`Strawberry`,children:[]},{id:`blueberry`,label:`Blueberry`,children:[]},{id:`raspberry`,label:`Raspberry`,children:[]}]},{id:`apple`,label:`Apple`,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Vegetables`,children:[{id:`root-veg`,label:`Root Vegetables`,children:[{id:`carrot`,label:`Carrot`,children:[]},{id:`parsnip`,label:`Parsnip`,children:[]},{id:`beetroot`,label:`Beetroot`,children:[]}]},{id:`broccoli`,label:`Broccoli`,children:[]},{id:`spinach`,label:`Spinach`,children:[]}]},{id:`grains`,label:`Grains`,children:[{id:`wheat`,label:`Wheat`,children:[]},{id:`rice`,label:`Rice`,children:[]},{id:`oats`,label:`Oats`,children:[]}]}],I=()=>g({components:{NyxTree:j},setup(){return{model:m(JSON.parse(JSON.stringify(P)))}},template:`<NyxTree v-model="model" />`}),L=()=>g({components:{NyxTree:j},setup(){return{model:m(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" />`}),R=()=>g({components:{NyxTree:j},setup(){return{model:m([{id:`fruits`,label:`Fruits`,status:y.Open,children:[{id:`apple`,label:`Apple`,status:y.Active,children:[]},{id:`banana`,label:`Banana`,children:[]}]},{id:`veggies`,label:`Veggies`,children:[{id:`carrot`,label:`Carrot`,children:[]}]}])}},template:`<NyxTree v-model="model" />`}),z=()=>g({components:{NyxTree:j},setup(){return{model:m([{id:`fruits`,label:`Fruits (disabled)`,disabled:!0,children:[{id:`apple`,label:`Apple`,children:[]}]},{id:`beta`,label:`Beta`,children:[]}])}},template:`<NyxTree v-model="model" />`}),B=()=>g({components:{NyxTree:j},setup(){return{model:m(JSON.parse(JSON.stringify(F)))}},template:`<NyxTree v-model="model" :disabled="true" />`}),I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => defineComponent({
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