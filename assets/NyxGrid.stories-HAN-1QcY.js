import{n as e}from"./chunk-BneVvdWh.js";import{A as t,C as n,D as r,E as i,G as a,J as o,L as s,M as c,O as l,R as u,X as d,Y as ee,_ as f,h as p,i as m,m as h,v as g,x as _,z as v}from"./iframe-w6ztlrld.js";import{D as y,N as b,P as x,g as S,j as C}from"./composables-BBoL0ZNj.js";import{n as w,t as T}from"./NyxButton-D_bEl-jx.js";import{n as E,t as D}from"./NyxCard-CMCpzkkH.js";import{n as O,t as k}from"./lucide-vue-next-D0EOIR-l.js";var A=e((()=>{})),j,M,N,P,F,I=e((()=>{m(),A(),S(),j={key:0,class:`nyx-grid__header`},M={key:1,class:`nyx-grid__title`},N={key:1,class:`nyx-grid__footer`},P=3,F=_({__name:`NyxGrid`,props:{title:{},mode:{default:y.Grid},columns:{default:P},gap:{default:C.Medium}},setup(e){let n={[C.XSmall]:.25,[C.Small]:.5,[C.Medium]:.75,[C.Large]:1,[C.XLarge]:1.25},a=e,m=s(),_=u(`elGrid`),b=u(`elContent`),x=0,S=null,w=null,T=new Set,E=h(()=>!!m.header||!!a.title),D=h(()=>!!m.footer),O=h(()=>a.mode===y.Masonry?y.Masonry:y.Grid),k=h(()=>{let e=Number(a.columns);return Number.isInteger(e)&&e>0?e:P}),A=h(()=>Object.values(C).includes(a.gap)?a.gap:C.Medium),F=h(()=>typeof a.gap==`number`&&Number.isFinite(a.gap)&&a.gap>=0?`${a.gap}rem`:`calc(var(--nyx-gap-${A.value}) * 1.5)`),I=h(()=>({"--nyx-grid-gap":F.value,"--nyx-grid-columns":String(k.value)}));function L(){return b.value?Array.from(b.value.children).filter(e=>e instanceof HTMLElement):[]}function R(e){e.style.removeProperty(`--nyx-grid-item-width`),e.style.removeProperty(`--nyx-grid-item-left`),e.style.removeProperty(`--nyx-grid-item-top`)}function z(){if(!S)return;let e=new Set(L());T.forEach(t=>{e.has(t)||(S?.unobserve(t),T.delete(t))}),e.forEach(e=>{T.has(e)||(S?.observe(e),T.add(e))})}function B(){if(typeof window>`u`)return 0;let e=`--nyx-gap-${A.value}`,t=_.value??document.documentElement,r=Number.parseFloat(getComputedStyle(document.documentElement).fontSize)||16;if(typeof a.gap==`number`&&Number.isFinite(a.gap)&&a.gap>=0)return a.gap*r;let i=getComputedStyle(t).getPropertyValue(e).trim(),o=Number.parseFloat(i);return Number.isFinite(o)&&o>0?i.endsWith(`rem`)?o*r*1.5:(i.endsWith(`px`),o*1.5):n[A.value]*r*1.5}function V(){let e=b.value;if(!e||O.value!==`masonry`)return;let t=L();if(z(),t.length===0){e.style.removeProperty(`--nyx-grid-masonry-height`);return}let n=B(),r=e.clientWidth;if(!r){e.style.removeProperty(`--nyx-grid-masonry-height`),t.forEach(R);return}let i=Math.max(0,(r-n*Math.max(0,k.value-1))/k.value);if(!i){e.style.removeProperty(`--nyx-grid-masonry-height`),t.forEach(R);return}let a=Array.from({length:k.value},()=>0);t.forEach((e,t)=>{let r=t%k.value,o=r*(i+n),s=a[r];e.style.setProperty(`--nyx-grid-item-width`,`${i}px`),e.style.setProperty(`--nyx-grid-item-left`,`${o}px`),e.style.setProperty(`--nyx-grid-item-top`,`${s}px`),a[r]+=e.offsetHeight+n}),e.style.setProperty(`--nyx-grid-masonry-height`,`${Math.max(0,...a.map(e=>e-n))}px`)}function H(){let e=b.value;e&&(e.style.removeProperty(`--nyx-grid-masonry-height`),L().forEach(R))}function U(){typeof window>`u`||(x&&cancelAnimationFrame(x),i(()=>{x=requestAnimationFrame(()=>{if(x=0,O.value===y.Masonry){V();return}H()})}))}return v([O,k,A],()=>{U()}),l(()=>{typeof window<`u`&&`ResizeObserver`in window&&(S=new ResizeObserver(()=>{U()}),b.value&&S.observe(b.value)),typeof window<`u`&&`MutationObserver`in window&&b.value&&(w=new MutationObserver(()=>{U()}),w.observe(b.value,{childList:!0})),window.addEventListener(`resize`,U),U()}),r(()=>{x&&cancelAnimationFrame(x),window.removeEventListener(`resize`,U),w?.disconnect(),S?.disconnect(),w=null,S=null,T.clear()}),(e,n)=>(t(),g(`section`,{ref_key:`elGrid`,ref:_,class:o([`nyx-grid`,[`nyx-grid--${O.value}`]]),style:ee(I.value)},[E.value?(t(),g(`header`,j,[e.$slots.header?c(e.$slots,`header`,{key:0}):(t(),g(`h2`,M,d(a.title),1))])):f(``,!0),p(`div`,{ref_key:`elContent`,ref:b,class:`nyx-grid__content`},[c(e.$slots,`default`)],512),D.value?(t(),g(`footer`,N,[c(e.$slots,`footer`)])):f(``,!0)],6))}})})),L,R=e((()=>{I(),I(),L=F,F.__docgenInfo=Object.assign({displayName:F.name??F.__name},{exportName:`default`,displayName:`NyxGrid`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`mode`,required:!1,type:{name:`NyxGridMode`},defaultValue:{func:!1,value:`NyxGridMode.Grid`}},{name:`columns`,required:!1,type:{name:`number`},defaultValue:{func:!1,value:`DEFAULT_COLUMNS`}},{name:`gap`,required:!1,type:{name:`union`,elements:[{name:`NyxSize`},{name:`number`}]},defaultValue:{func:!1,value:`NyxSize.Medium`}}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxGrid/NyxGrid.vue`]})}));function z(e,t){return n(D,{key:e.id,title:e.title,variant:x.Soft},{default:()=>n(`div`,{style:`display:flex;flex-direction:column;gap:0.5rem;`},e.lines.map((t,r)=>n(`p`,{key:`${e.id}-${r}`,style:`margin:0;color:var(--nyx-c-text-2);`},t))),footer:t})}function B(e){return e.map(e=>z(e))}function V(e){return t=>_({setup(){return()=>n(L,t,{header:e?.headerSlot,default:()=>B(e?.cards??W),footer:e?.footerText?()=>n(`small`,{style:`color:var(--nyx-c-text-2);`},e.footerText):void 0})}})}var H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{m(),k(),S(),w(),E(),R(),H={"NyxGridMode.Grid":y.Grid,"NyxGridMode.Masonry":y.Masonry},U={"NyxSize.XSmall":C.XSmall,"NyxSize.Small":C.Small,"NyxSize.Medium":C.Medium,"NyxSize.Large":C.Large,"NyxSize.XLarge":C.XLarge},W=[{id:`alpha`,title:`Alpha`,lines:[`Short summary block.`,`Useful for compact cards.`]},{id:`beta`,title:`Beta`,lines:[`A slightly longer card.`,`This one gives the layout more height.`,`Good for masonry demos.`]},{id:`gamma`,title:`Gamma`,lines:[`Medium sized content.`,`Balanced placeholder copy.`]},{id:`delta`,title:`Delta`,lines:[`Tall card example.`,`Adds visible stagger to the column flow.`,`Useful for checking reflow.`,`Keeps the demo lively.`]},{id:`epsilon`,title:`Epsilon`,lines:[`Another compact block.`,`Works well in tighter rows.`]}],G={title:`Components/NyxGrid`,component:L,argTypes:{mode:{control:{type:`select`},options:Object.keys(H),mapping:H},columns:{control:{type:`number`}},gap:{control:{type:`select`},options:Object.keys(U),mapping:U}}},K={render:V(),args:{title:`Overview`,columns:3,gap:C.Medium}},q={render:V({footerText:`${W.length} placeholder cards`}),args:{title:`Overview`,columns:3,gap:C.Medium}},J={render:V({headerSlot:()=>n(`div`,{style:`display:flex;justify-content:space-between;gap:1rem;align-items:center;`},[n(`div`,[n(`h2`,{style:`margin:0;`},`Gallery`),n(`p`,{style:`margin:0;color:var(--nyx-c-text-2);`},`Header slot overrides the title prop.`)]),n(T,{theme:b.Primary},{default:()=>`Refresh`})]),footerText:`Custom footer content`}),args:{title:`Fallback title`,columns:2,gap:C.Large}},Y={render:V({cards:W.slice(0,3)}),args:{columns:2,gap:C.Small}},X={render:V(),args:{title:`Masonry Layout`,mode:y.Masonry,columns:3,gap:C.Medium}},Z={render:()=>_({setup(){let e=a([...W]),t=a(3),r=a(W.length+1),i=()=>{let t=r.value;e.value=[...e.value,{id:`stub-${t}`,title:`Stub ${t}`,lines:[`Newly added placeholder card.`,t%2==0?`Compact body copy.`:`A little extra content to vary the height.`,...t%3==0?[`Additional line to exaggerate masonry movement.`]:[]]}],r.value+=1},o=t=>{e.value=e.value.filter(e=>e.id!==t)};return()=>n(L,{title:`Dynamic Reflow`,mode:y.Masonry,columns:t.value,gap:C.Medium},{header:()=>n(`div`,{style:`display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;`},[n(`div`,[n(`h2`,{style:`margin:0;`},`Dynamic Reflow`),n(`p`,{style:`margin:0;color:var(--nyx-c-text-2);`},`Add and remove NyxCard placeholders to observe animated realignment.`)]),n(`div`,{style:`display:flex;gap:0.5rem;flex-wrap:wrap;`},[n(T,{theme:b.Success,onClick:i},{default:()=>`Add card`}),n(T,{theme:b.Info,variant:x.Outline,onClick:()=>{t.value=t.value===3?2:3}},{default:()=>`Toggle columns`})])]),default:()=>e.value.map(e=>z(e,()=>n(`div`,{style:`display:flex;justify-content:flex-end;`},[n(T,{theme:b.Danger,variant:x.Ghost,onClick:()=>o(e.id)},{default:()=>n(O,{size:16})})]))),footer:()=>n(`small`,{style:`color:var(--nyx-c-text-2);`},`${e.value.length} cards in the grid`)})}})},Q={render:V(),args:{title:`Zero Gap`,columns:3,gap:0}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: createGridStory(),
  args: {
    title: 'Overview',
    columns: 3,
    gap: NyxSize.Medium
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: createGridStory({
    footerText: \`\${baseCards.length} placeholder cards\`
  }),
  args: {
    title: 'Overview',
    columns: 3,
    gap: NyxSize.Medium
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: createGridStory({
    headerSlot: () => h('div', {
      style: 'display:flex;justify-content:space-between;gap:1rem;align-items:center;'
    }, [h('div', [h('h2', {
      style: 'margin:0;'
    }, 'Gallery'), h('p', {
      style: 'margin:0;color:var(--nyx-c-text-2);'
    }, 'Header slot overrides the title prop.')]), h(NyxButton, {
      theme: NyxTheme.Primary
    }, {
      default: () => 'Refresh'
    })]),
    footerText: 'Custom footer content'
  }),
  args: {
    title: 'Fallback title',
    columns: 2,
    gap: NyxSize.Large
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: createGridStory({
    cards: baseCards.slice(0, 3)
  }),
  args: {
    columns: 2,
    gap: NyxSize.Small
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: createGridStory(),
  args: {
    title: 'Masonry Layout',
    mode: NyxGridMode.Masonry,
    columns: 3,
    gap: NyxSize.Medium
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => defineComponent({
    setup() {
      const cards = ref([...baseCards]);
      const columns = ref(3);
      const nextId = ref(baseCards.length + 1);
      const addCard = () => {
        const index = nextId.value;
        cards.value = [...cards.value, {
          id: \`stub-\${index}\`,
          title: \`Stub \${index}\`,
          lines: ['Newly added placeholder card.', index % 2 === 0 ? 'Compact body copy.' : 'A little extra content to vary the height.', ...(index % 3 === 0 ? ['Additional line to exaggerate masonry movement.'] : [])]
        }];
        nextId.value += 1;
      };
      const removeCard = (id: string) => {
        cards.value = cards.value.filter(card => card.id !== id);
      };
      return () => h(NyxGrid, {
        title: 'Dynamic Reflow',
        mode: NyxGridMode.Masonry,
        columns: columns.value,
        gap: NyxSize.Medium
      }, {
        header: () => h('div', {
          style: 'display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;'
        }, [h('div', [h('h2', {
          style: 'margin:0;'
        }, 'Dynamic Reflow'), h('p', {
          style: 'margin:0;color:var(--nyx-c-text-2);'
        }, 'Add and remove NyxCard placeholders to observe animated realignment.')]), h('div', {
          style: 'display:flex;gap:0.5rem;flex-wrap:wrap;'
        }, [h(NyxButton, {
          theme: NyxTheme.Success,
          onClick: addCard
        }, {
          default: () => 'Add card'
        }), h(NyxButton, {
          theme: NyxTheme.Info,
          variant: NyxVariant.Outline,
          onClick: () => {
            columns.value = columns.value === 3 ? 2 : 3;
          }
        }, {
          default: () => 'Toggle columns'
        })])]),
        default: () => cards.value.map(card => renderCard(card, () => h('div', {
          style: 'display:flex;justify-content:flex-end;'
        }, [h(NyxButton, {
          theme: NyxTheme.Danger,
          variant: NyxVariant.Ghost,
          onClick: () => removeCard(card.id)
        }, {
          default: () => h(LucideX, {
            size: 16
          })
        })]))),
        footer: () => h('small', {
          style: 'color:var(--nyx-c-text-2);'
        }, \`\${cards.value.length} cards in the grid\`)
      });
    }
  })
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: createGridStory(),
  args: {
    title: 'Zero Gap',
    columns: 3,
    gap: 0
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Footer`,`CustomHeader`,`ContentOnly`,`Masonry`,`DynamicReflow`,`ZeroGap`]}))();export{Y as ContentOnly,J as CustomHeader,K as Default,Z as DynamicReflow,q as Footer,X as Masonry,Q as ZeroGap,$ as __namedExportsOrder,G as default};