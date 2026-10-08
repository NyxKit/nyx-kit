import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,M as n,N as r,S as i,U as a,_ as o,at as s,b as c,f as l,g as u,h as ee,m as d,nt as f,q as p,rt as m,t as h,v as g,w as _,x as v}from"./vue.esm-bundler-DwhgfrFn.js";import{S as y,T as b,i as te}from"./string-CevuJH_I.js";import{n as ne,t as re}from"./useNyxProps-St-cgklA.js";import{n as ie,t as x}from"./NyxButton-C4Pl6wfC.js";import{a as ae,c as S,i as oe,n as se,o as ce,r as le,s as ue,t as de}from"./markdown-it-YKboFVRo.js";function fe(e,t){let n=new se(`commonmark`,{html:!1,linkify:!1,typographer:!1}).enable([`table`,`strikethrough`]);if(n.validateLink=()=>!0,!t.length)return n.parse(e,{});let r=0;for(let[e,t]of[[`link`,ce],[`image`,le]])n.inline.ruler.at(e,(e,n)=>{r++;try{return t(e,n)}finally{r--}});let i=(e,n)=>{if(r||"`\\".includes(e.src[n]))return null;for(let r of t){let t=r.match(e.src,n);if(!(!t||!Number.isInteger(t.length)||t.length<=0||n+t.length>e.posMax))return{name:r.name,value:t.value,raw:e.src.slice(n,n+t.length),length:t.length}}return null};return n.inline.ruler.push(`nyx_inline`,(e,t)=>{let n=i(e,e.pos);return n?(t||(e.push(`nyx_inline`,``,0).meta=n),e.pos+=n.length,!0):!1}),n.inline.ruler.at(`text`,(e,t)=>{if(r)return S(e,t);let n=e.pos,a=e.pending;if(!S(e,!0))return!1;let o=e.pos;for(let r=n;r<o;r++)if(i(e,r))return e.pos=r,e.pending=a,r===n?!1:(t||(e.pending+=e.src.slice(n,r)),!0);return t||(e.pending+=e.src.slice(n,o)),!0}),n.parse(e,{})}var pe=e((()=>{de(),ae(),oe(),ue()}));function me(e){if(!(!e||/[\u0000-\u0020\u007f\\]/.test(e))){if(e.startsWith(`#`))return e;if(/^https?:\/\//i.test(e))try{let t=new URL(e);if(t.hostname&&[`http:`,`https:`].includes(t.protocol))return e}catch{}}}function C(e){return e.children?.map(e=>e.type===`image`?C(e):e.type===`softbreak`||e.type===`hardbreak`?` `:e.nesting===0?e.content:``).join(``)||e.content||`Image omitted`}function w(e,t,n){let r=0,i=a=>{let o=[];for(;r<e.length;){let s=r++,c=e[s];if(c.nesting===-1)break;let u=`${a}/${s}`;if(c.nesting===1){let e=i(u);if(c.hidden||!T.has(c.tag)){o.push(...e);continue}let n=c.tag,r={key:u};if(/^h[1-6]$/.test(n)&&(n=`h${Math.min(6,Math.max(1,Number(n[1])+(Number.isFinite(t)?Math.trunc(t):0)))}`),n===`a`){let t=me(c.attrGet(`href`));if(!t){o.push(_(l,{key:u},e));continue}r.href=t,t.startsWith(`#`)||(r.target=`_blank`,r.rel=`noopener noreferrer`);let n=c.attrGet(`title`);n&&(r.title=n)}if(n===`ol`&&c.attrGet(`start`)&&(r.start=Number(c.attrGet(`start`))),n===`th`||n===`td`){let e=c.attrGet(`style`)?.match(/^text-align:(left|center|right)$/)?.[1];e&&(r.style={textAlign:e}),n===`th`&&(r.scope=`col`)}let a=_(n,r,e);o.push(n===`table`?_(`div`,{key:u,class:`nyx-markdown__table`,tabindex:0,role:`region`,"aria-label":`Markdown table`},[a]):a)}else if(c.type===`inline`)o.push(...w(c.children??[],t,n));else if(c.type===`nyx_inline`){let e=c.meta;o.push(_(l,{key:u},[n?n(e):e.raw]))}else if(c.type===`code_inline`)o.push(_(`code`,{key:u},c.content));else if(c.type===`fence`||c.type===`code_block`){let e=c.info.trim().split(/\s+/)[0];o.push(_(`div`,{key:u,class:`nyx-markdown__code`},[e?_(`div`,{class:`nyx-markdown__language`},e):null,_(`pre`,{tabindex:0,role:`region`,"aria-label":e?`${e} code block`:`Code block`},[_(`code`,c.content)])]))}else c.type===`image`?o.push(C(c)):c.type===`softbreak`?o.push(`
`):c.type===`hardbreak`||c.type===`hr`?o.push(_(c.type===`hr`?`hr`:`br`,{key:u})):o.push(c.content)}return o};return i(``)}var T,he=e((()=>{h(),T=new Set([`p`,`em`,`strong`,`s`,`blockquote`,`ul`,`ol`,`li`,`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`table`,`thead`,`tbody`,`tr`,`th`,`td`,`a`])})),ge=e((()=>{})),E,D=e((()=>{h(),re(),pe(),he(),ge(),E=i({__name:`NyxMarkdown`,props:{content:{default:``},inlineRules:{default:()=>[]},headingOffset:{default:0},theme:{},size:{}},setup(e){let t=e,n=a(),{classList:i}=ne(t,{origin:`NyxMarkdown`}),o=d(()=>{try{return fe(t.content,t.inlineRules)}catch{return null}}),s=()=>o.value?w(o.value,t.headingOffset,n.inline):t.content;return(e,t)=>(r(),g(`div`,{class:m([`nyx-markdown`,f(i)])},[v(s)],2))}})})),O,k=e((()=>{D(),D(),O=E,E.__docgenInfo=Object.assign({displayName:E.name??E.__name},{exportName:`default`,displayName:`NyxMarkdown`,description:``,tags:{},props:[{name:`content`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`inlineRules`,required:!1,type:{name:`TSTypeOperator`},defaultValue:{func:!1,value:`() => []`}},{name:`headingOffset`,required:!1,type:{name:`number`},defaultValue:{func:!1,value:`0`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],slots:[{name:`inline`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxMarkdown/NyxMarkdown.vue`]})})),A,j,M,N,P,F=e((()=>{A=new Map([[`p1:m2`,{reference:`p1:m2`,label:`Message 2`,accessibleLabel:`Jump to rehearsal message`}],[`p1:m3`,{reference:`p1:m3`,label:`Message 3`,accessibleLabel:`Jump to notebook message`}]]),j=[{name:`citation`,match(e,t){if(!e.startsWith(`[[`,t))return null;let n=/^\[\[(p\d+:m\d+)\]\]/.exec(e.slice(t)),r=n?A.get(n[1]):void 0;return n&&r?{length:n[0].length,value:r}:null}}],M=`**A short explanation**

- **“The rehearsal starts at noon.”**  
  The speaker is giving a start time.  
  *There is no location in this sentence.* [[p1:m2]]

- **“Please bring the blue notebook.”**  
  This is a request to bring an item. [[p1:m3]]

___

What would you like to clarify?`,N=`| Item | Quantity | Notes |
| :--- | ---: | :---: |
| Notebook | 3 | Blue cover |
| Pencil | 12 | Shared supplies |

Inline \`code\` stays in its paragraph.

\`\`\`typescript
const rehearsal = { location: "Studio", startsAt: "12:00", supplies: ["notebook", "pencil"] }
\`\`\`

    Indented code keeps    spaces.
`,P=`<script>alert("synthetic")<\/script>

<img src="https://example.com/unrequested.png" onerror="alert(1)">

![A synthetic landscape](https://example.com/never-fetched.png)

[Unsafe](javascript:alert(1)) [Protocol relative](//example.com) [Safe](https://example.com)

\`\`\`<svg/onload=alert(1)>
Literal code.
\`\`\``})),I,L,R=e((()=>{h(),k(),ie(),F(),I={role:`status`},L=i({__name:`NyxMarkdownExample`,props:{streaming:{type:Boolean}},setup(e){let i=e,a=t(M),l=t(`None`),d;function m(){clearInterval(d),a.value=``,d=setInterval(()=>{a.value=M.slice(0,a.value.length+7),a.value.length===M.length&&clearInterval(d)},40)}return n(()=>clearInterval(d)),(e,t)=>(r(),g(`div`,null,[i.streaming?(r(),u(x,{key:0,onClick:m},{default:p(()=>[...t[0]||=[c(`Replay stream`,-1)]]),_:1})):o(``,!0),v(O,{content:a.value,"inline-rules":f(j),"heading-offset":2},{inline:p(({value:e})=>[v(x,{type:`button`,"aria-label":e.accessibleLabel,onClick:t=>l.value=e.reference},{default:p(()=>[c(s(e.label),1)]),_:2},1032,[`aria-label`,`onClick`])]),_:1},8,[`content`,`inline-rules`]),ee(`p`,I,`Selected reference: `+s(l.value),1)]))}})})),z,_e=e((()=>{R(),R(),z=L,L.__docgenInfo=Object.assign({displayName:L.name??L.__name},{exportName:`default`,displayName:`NyxMarkdownExample`,description:``,tags:{},props:[{name:`streaming`,required:!1,type:{name:`boolean`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxMarkdown/NyxMarkdownExample.vue`]})})),B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{h(),k(),_e(),F(),te(),B={title:`Components/Data/NyxMarkdown`,component:O,args:{content:`A **short introduction** with *emphasis*, ~~a correction~~, and a [link](https://example.com).`},argTypes:{content:{control:`text`},headingOffset:{control:{type:`number`,min:-5,max:5}},theme:{control:`select`,options:Object.values(b)},size:{control:`select`,options:Object.values(y)}}},V={},H={},U={args:{content:M+`

3. First numbered item
4. Second item
   - Nested bullet

   A continuation paragraph.`}},W={args:{headingOffset:1,content:`# Rehearsal notes

## Preparation

> Bring a notebook.
>
> **Check the start time.**

### On arrival

Find your seat.

---

Closing notes.`}},G={args:{content:N}},K={render:()=>({components:{NyxMarkdownExample:z},template:`<NyxMarkdownExample />`})},q={render:()=>({components:{NyxMarkdownExample:z},template:`<NyxMarkdownExample streaming />`})},J={args:{content:P}},Y={args:{content:N+`

https://example.com/`+`long-path-`.repeat(30)},render:e=>({components:{NyxMarkdown:O},setup:()=>({args:e}),template:`<div style="display: grid; width: min(100%, 20rem)"><NyxMarkdown v-bind="args" /></div>`})},X={render:()=>({components:{NyxMarkdown:O,NyxMarkdownExample:z},template:`<div><NyxMarkdownExample /><NyxMarkdown content="An independent **response**: [[p1:m2]]" /></div>`})},Z={render:()=>({components:{NyxMarkdown:O},setup:()=>({sizes:Object.values(y),themes:Object.values(b)}),template:`<div><NyxMarkdown v-for="(size, index) in sizes" :key="size" :size="size" :theme="themes[index]" content="Readable **prose** and a [link](https://example.com)." /></div>`})},Q={args:{content:M+`

`+N},render:e=>({components:{NyxMarkdown:O},setup(){let r=document.documentElement.getAttribute(`data-nyx-mode`),i=t(r===`light`);return n(()=>{r===null?document.documentElement.removeAttribute(`data-nyx-mode`):document.documentElement.setAttribute(`data-nyx-mode`,r)}),{args:e,light:i,toggle:()=>{i.value=!i.value,document.documentElement.setAttribute(`data-nyx-mode`,i.value?`light`:`dark`)}}},template:`<div style="background: var(--nyx-c-bg); color: var(--nyx-c-text-1); padding: var(--nyx-pad-lg)"><button @click="toggle">Switch to {{ light ? "dark" : "light" }} mode</button><NyxMarkdown v-bind="args" /></div>`})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    content: acceptance + '\\n\\n3. First numbered item\\n4. Second item\\n   - Nested bullet\\n\\n   A continuation paragraph.'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    headingOffset: 1,
    content: '# Rehearsal notes\\n\\n## Preparation\\n\\n> Bring a notebook.\\n>\\n> **Check the start time.**\\n\\n### On arrival\\n\\nFind your seat.\\n\\n---\\n\\nClosing notes.'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    content: tablesAndCode
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxMarkdownExample
    },
    template: '<NyxMarkdownExample />'
  })
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxMarkdownExample
    },
    template: '<NyxMarkdownExample streaming />'
  })
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    content: untrusted
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    content: tablesAndCode + '\\n\\nhttps://example.com/' + 'long-path-'.repeat(30)
  },
  render: args => ({
    components: {
      NyxMarkdown
    },
    setup: () => ({
      args
    }),
    template: '<div style="display: grid; width: min(100%, 20rem)"><NyxMarkdown v-bind="args" /></div>'
  })
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxMarkdown,
      NyxMarkdownExample
    },
    template: '<div><NyxMarkdownExample /><NyxMarkdown content="An independent **response**: [[p1:m2]]" /></div>'
  })
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxMarkdown
    },
    setup: () => ({
      sizes: Object.values(NyxSize),
      themes: Object.values(NyxTheme)
    }),
    template: '<div><NyxMarkdown v-for="(size, index) in sizes" :key="size" :size="size" :theme="themes[index]" content="Readable **prose** and a [link](https://example.com)." /></div>'
  })
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    content: acceptance + '\\n\\n' + tablesAndCode
  },
  render: args => ({
    components: {
      NyxMarkdown
    },
    setup() {
      const previous = document.documentElement.getAttribute('data-nyx-mode');
      const light = ref(previous === 'light');
      const toggle = () => {
        light.value = !light.value;
        document.documentElement.setAttribute('data-nyx-mode', light.value ? 'light' : 'dark');
      };
      onUnmounted(() => {
        if (previous === null) document.documentElement.removeAttribute('data-nyx-mode');else document.documentElement.setAttribute('data-nyx-mode', previous);
      });
      return {
        args,
        light,
        toggle
      };
    },
    template: '<div style="background: var(--nyx-c-bg); color: var(--nyx-c-text-1); padding: var(--nyx-pad-lg)"><button @click="toggle">Switch to {{ light ? "dark" : "light" }} mode</button><NyxMarkdown v-bind="args" /></div>'
  })
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`BasicProse`,`ListsAndBreaks`,`HeadingsAndQuotes`,`TablesAndCode`,`InlineExtensions`,`Streaming`,`UntrustedContent`,`NarrowContainer`,`IndependentInstances`,`SizesAndThemes`,`ColourModes`]}))();export{H as BasicProse,Q as ColourModes,V as Default,W as HeadingsAndQuotes,X as IndependentInstances,K as InlineExtensions,U as ListsAndBreaks,Y as NarrowContainer,Z as SizesAndThemes,q as Streaming,G as TablesAndCode,J as UntrustedContent,$ as __namedExportsOrder,B as default};