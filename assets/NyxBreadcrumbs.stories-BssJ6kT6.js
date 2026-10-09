import{n as e}from"./chunk-BneVvdWh.js";import{I as t,J as n,L as r,P as i,S as a,_ as o,b as s,f as c,g as l,h as u,it as d,m as f,rt as p,st as m,t as h,v as g,x as _}from"./vue.esm-bundler-BCs4lh10.js";import{n as v,t as y}from"./iframe-ChXjb6er.js";import{D as b,S as x,T as S,i as C}from"./string-CevuJH_I.js";import{n as w}from"./useNyxProps-BBDE2PJZ.js";import{t as T}from"./composables-RdY_JjQA.js";import{n as E,t as D}from"./NyxIcon-Db6nFVw3.js";var O=e((()=>{})),k,A,j,M=e((()=>{h(),C(),E(),k={class:`nyx-breadcrumbs__item-content`},A={class:`nyx-breadcrumbs__label`},j=a({__name:`NyxBreadcrumbItem`,props:{item:{},size:{}},setup(e){let t=e;return(e,n)=>(i(),g(`span`,k,[t.item.icon?(i(),l(D,{key:0,class:`nyx-breadcrumbs__icon`,name:t.item.icon,size:t.size??p(x).Medium,stroke:p(x).Small,"aria-hidden":`true`},null,8,[`name`,`size`,`stroke`])):o(``,!0),u(`span`,A,m(t.item.label),1)]))}})})),N,P=e((()=>{M(),M(),N=j,j.__docgenInfo=Object.assign({displayName:j.name??j.__name},{exportName:`default`,displayName:`NyxBreadcrumbItem`,description:``,tags:{},props:[{name:`item`,required:!0,type:{name:`NyxBreadcrumb`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBreadcrumbs/NyxBreadcrumbItem.vue`]})})),F,I,L,R,z=e((()=>{h(),O(),v(),E(),P(),T(),F=[`href`,`onClick`],I={key:2,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--static`},L={key:3,class:`nyx-breadcrumbs__separator`,"aria-hidden":`true`},R=a({__name:`NyxBreadcrumbs`,props:{items:{},separator:{default:`/`},theme:{},size:{},variant:{}},emits:[`click`],setup(e,{emit:a}){let u=e,h=a,{classList:v}=w(u,{origin:`NyxBreadcrumbs`}),b=f(()=>u.items.map(e=>typeof e==`string`?{label:e}:e)),x=f(()=>C(u.separator)),S=f(()=>T(u.separator));function C(e){return typeof e==`object`&&!!e&&typeof e.icon==`string`}function T(e){return C(e)?e.icon:void 0}function E(e){return!!(e.route||e.href)}function O(e){E(e)&&h(`click`,e)}return(e,a)=>(i(),g(`nav`,{class:d([`nyx-breadcrumbs`,p(v)])},[(i(!0),g(c,null,t(b.value,(t,a)=>(i(),g(c,{key:a},[t.route?(i(),l(p(y),{key:0,to:t.route,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--link`,onClick:e=>O(t)},{default:n(()=>[r(e.$slots,`item`,{item:t},()=>[_(N,{item:t,size:u.size},null,8,[`item`,`size`])])]),_:2},1032,[`to`,`onClick`])):t.href?(i(),g(`a`,{key:1,href:t.href,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--link`,onClick:e=>O(t)},[r(e.$slots,`item`,{item:t},()=>[_(N,{item:t,size:u.size},null,8,[`item`,`size`])])],8,F)):(i(),g(`span`,I,[r(e.$slots,`item`,{item:t},()=>[_(N,{item:t,size:u.size},null,8,[`item`,`size`])])])),a<b.value.length-1?(i(),g(`span`,L,[r(e.$slots,`separator`,{},()=>[x.value?(i(),l(D,{key:0,name:S.value,size:u.size},null,8,[`name`,`size`])):(i(),g(c,{key:1},[s(m(u.separator),1)],64))])])):o(``,!0)],64))),128))],2))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxBreadcrumbs`,description:``,tags:{},props:[{name:`items`,required:!0,type:{name:`union`,elements:[{name:`Array`,elements:[{name:`string`}]},{name:`Array`,elements:[{name:`NyxBreadcrumb`}]}]}},{name:`separator`,required:!1,type:{name:`NyxBreadcrumbsSeparator`},defaultValue:{func:!1,value:`'/'`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`union`,elements:[{name:`TSTypeReference`},{name:`TSTypeReference`}]}}],events:[{name:`click`,type:{names:[`NyxBreadcrumb`]}}],slots:[{name:`item`,scoped:!0,bindings:[{name:`item`,title:`binding`}]},{name:`separator`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`]})}));function H(e=`<nyx-breadcrumbs v-bind="args" />`){return t=>a({components:{NyxBreadcrumbs:B},setup(){return{args:t}},template:e})}var U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),V(),C(),U=[`lorem`,`ipsum`,`dolor`,`sit`,`amet`].map(e=>({label:e,href:`#`})),W=[{label:`Home`,icon:`house`,href:`/`},{label:`Library`,icon:`folder-open`,href:`/library`},{label:`Breadcrumbs`,icon:`file-text`}],G=[{label:`Home`,icon:`house`,route:`/`},{label:`Library`,route:{name:`library`,query:{filter:`all`}}},{label:`Breadcrumbs`,href:`/docs/breadcrumbs`}],K={title:`Components/Navigation/NyxBreadcrumbs`,component:B,argTypes:{theme:{control:{type:`select`},options:Object.values(S)},size:{control:{type:`select`},options:Object.values(x)},variant:{control:{type:`select`},options:Object.values(b)}},args:{items:U}},q={render:H(),args:{items:U}},J={render:H(),args:{items:W}},Y={render:H(),args:{items:G}},X={render:()=>a({components:{NyxBreadcrumbs:B},setup(){return{args:{items:W,separator:{icon:`chevron-right`}}}},template:`<nyx-breadcrumbs v-bind="args" />`})},Z={render:H(`
    <nyx-breadcrumbs v-bind="args">
      <template #separator>
        <span class="custom-separator">|</span>
      </template>
    </nyx-breadcrumbs>
  `),args:{items:W}},Q={render:H(`
    <nyx-breadcrumbs v-bind="args">
      <template #item="{ item }">
        <span style="display:inline-flex;align-items:center;gap:0.4rem;text-transform:uppercase;letter-spacing:0.08em;">
          <strong>{{ item.label }}</strong>
        </span>
      </template>
    </nyx-breadcrumbs>
  `),args:{items:W}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbs
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbIcons
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: renderBreadcrumbs(),
  args: {
    items: breadcrumbRoutes
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    components: {
      NyxBreadcrumbs
    },
    setup() {
      const args: NyxBreadcrumbsProps = {
        items: breadcrumbIcons,
        separator: {
          icon: 'chevron-right'
        }
      };
      return {
        args
      };
    },
    template: '<nyx-breadcrumbs v-bind="args" />'
  })
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: renderBreadcrumbs(\`
    <nyx-breadcrumbs v-bind="args">
      <template #separator>
        <span class="custom-separator">|</span>
      </template>
    </nyx-breadcrumbs>
  \`),
  args: {
    items: breadcrumbIcons
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: renderBreadcrumbs(\`
    <nyx-breadcrumbs v-bind="args">
      <template #item="{ item }">
        <span style="display:inline-flex;align-items:center;gap:0.4rem;text-transform:uppercase;letter-spacing:0.08em;">
          <strong>{{ item.label }}</strong>
        </span>
      </template>
    </nyx-breadcrumbs>
  \`),
  args: {
    items: breadcrumbIcons
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`WithIcons`,`WithRouteItems`,`WithIconSeparator`,`WithCustomSeparator`,`WithCustomItemSlot`]}))();export{q as Default,Q as WithCustomItemSlot,Z as WithCustomSeparator,X as WithIconSeparator,J as WithIcons,Y as WithRouteItems,$ as __namedExportsOrder,K as default};