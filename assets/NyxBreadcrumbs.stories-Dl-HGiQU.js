import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,N as n,P as r,W as i,_ as a,b as o,d as s,et as c,g as l,h as u,j as d,m as f,nt as p,p as m,t as h,v as g,y as _}from"./vue.esm-bundler-BYSzMkkg.js";import{n as v,t as y}from"./iframe-cH42C3vW.js";import{A as b,F as x,N as S,f as C}from"./utils-D7ENd3Hb.js";import{ft as w,t as T}from"./composables-BpSFaobz.js";import{n as E,t as D}from"./NyxIcon-BS6U-qDJ.js";var O=e((()=>{})),k,A,j,M=e((()=>{h(),C(),E(),k={class:`nyx-breadcrumbs__item-content`},A={class:`nyx-breadcrumbs__label`},j=o({__name:`NyxBreadcrumbItem`,props:{item:{},size:{}},setup(e){let n=e;return(e,r)=>(d(),a(`span`,k,[n.item.icon?(d(),u(D,{key:0,class:`nyx-breadcrumbs__icon`,name:n.item.icon,size:n.size??t(b).Medium,stroke:t(b).Small,"aria-hidden":`true`},null,8,[`name`,`size`,`stroke`])):l(``,!0),f(`span`,A,p(n.item.label),1)]))}})})),N,P=e((()=>{M(),M(),N=j,j.__docgenInfo=Object.assign({displayName:j.name??j.__name},{exportName:`default`,displayName:`NyxBreadcrumbItem`,description:``,tags:{},props:[{name:`item`,required:!0,type:{name:`NyxBreadcrumb`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBreadcrumbs/NyxBreadcrumbItem.vue`]})})),F,I,L,R,z=e((()=>{h(),O(),v(),E(),P(),T(),F=[`href`,`onClick`],I={key:2,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--static`},L={key:3,class:`nyx-breadcrumbs__separator`,"aria-hidden":`true`},R=o({__name:`NyxBreadcrumbs`,props:{items:{},separator:{default:`/`},theme:{},size:{},variant:{}},emits:[`click`],setup(e,{emit:o}){let f=e,h=o,{classList:v}=w(f,{origin:`NyxBreadcrumbs`}),b=m(()=>f.items.map(e=>typeof e==`string`?{label:e}:e)),x=m(()=>C(f.separator)),S=m(()=>T(f.separator));function C(e){return typeof e==`object`&&!!e&&typeof e.icon==`string`}function T(e){return C(e)?e.icon:void 0}function E(e){return!!(e.route||e.href)}function O(e){E(e)&&h(`click`,e)}return(e,o)=>(d(),a(`nav`,{class:c([`nyx-breadcrumbs`,t(v)])},[(d(!0),a(s,null,n(b.value,(n,o)=>(d(),a(s,{key:o},[n.route?(d(),u(t(y),{key:0,to:n.route,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--link`,onClick:e=>O(n)},{default:i(()=>[r(e.$slots,`item`,{item:n},()=>[_(N,{item:n,size:f.size},null,8,[`item`,`size`])])]),_:2},1032,[`to`,`onClick`])):n.href?(d(),a(`a`,{key:1,href:n.href,class:`nyx-breadcrumbs__item nyx-breadcrumbs__item--link`,onClick:e=>O(n)},[r(e.$slots,`item`,{item:n},()=>[_(N,{item:n,size:f.size},null,8,[`item`,`size`])])],8,F)):(d(),a(`span`,I,[r(e.$slots,`item`,{item:n},()=>[_(N,{item:n,size:f.size},null,8,[`item`,`size`])])])),o<b.value.length-1?(d(),a(`span`,L,[r(e.$slots,`separator`,{},()=>[x.value?(d(),u(D,{key:0,name:S.value,size:f.size},null,8,[`name`,`size`])):(d(),a(s,{key:1},[g(p(f.separator),1)],64))])])):l(``,!0)],64))),128))],2))}})})),B,V=e((()=>{z(),z(),B=R,R.__docgenInfo=Object.assign({displayName:R.name??R.__name},{exportName:`default`,displayName:`NyxBreadcrumbs`,description:``,tags:{},props:[{name:`items`,required:!0,type:{name:`union`,elements:[{name:`Array`,elements:[{name:`string`}]},{name:`Array`,elements:[{name:`NyxBreadcrumb`}]}]}},{name:`separator`,required:!1,type:{name:`NyxBreadcrumbsSeparator`},defaultValue:{func:!1,value:`'/'`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}},{name:`variant`,required:!1,type:{name:`union`,elements:[{name:`TSTypeReference`},{name:`TSTypeReference`}]}}],events:[{name:`click`,type:{names:[`NyxBreadcrumb`]}}],slots:[{name:`item`,scoped:!0,bindings:[{name:`item`,title:`binding`}]},{name:`separator`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxBreadcrumbs/NyxBreadcrumbs.vue`]})}));function H(e=`<nyx-breadcrumbs v-bind="args" />`){return t=>o({components:{NyxBreadcrumbs:B},setup(){return{args:t}},template:e})}var U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),V(),C(),U=[`lorem`,`ipsum`,`dolor`,`sit`,`amet`].map(e=>({label:e,href:`#`})),W=[{label:`Home`,icon:`house`,href:`/`},{label:`Library`,icon:`folder-open`,href:`/library`},{label:`Breadcrumbs`,icon:`file-text`}],G=[{label:`Home`,icon:`house`,route:`/`},{label:`Library`,route:{name:`library`,query:{filter:`all`}}},{label:`Breadcrumbs`,href:`/docs/breadcrumbs`}],K={title:`Components/Navigation/NyxBreadcrumbs`,component:B,argTypes:{theme:{control:{type:`select`},options:Object.values(S)},size:{control:{type:`select`},options:Object.values(b)},variant:{control:{type:`select`},options:Object.values(x)}},args:{items:U}},q={render:H(),args:{items:U}},J={render:H(),args:{items:W}},Y={render:H(),args:{items:G}},X={render:()=>o({components:{NyxBreadcrumbs:B},setup(){return{args:{items:W,separator:{icon:`chevron-right`}}}},template:`<nyx-breadcrumbs v-bind="args" />`})},Z={render:H(`
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