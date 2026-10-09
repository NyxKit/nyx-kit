import{n as e}from"./chunk-BneVvdWh.js";import{A as t,G as n,K as r,L as i,M as a,P as o,S as s,T as c,W as l,_ as u,et as d,h as ee,it as f,j as p,m,ot as h,st as g,t as _,v}from"./vue.esm-bundler-BCs4lh10.js";import{D as y,S as b,T as x,i as S,v as C}from"./string-CevuJH_I.js";import{n as w,t as T}from"./NyxButton-DXBWTIf7.js";import{r as E,t as D}from"./lucide-vue-next-BOqtMoDC.js";import{n as O,t as k}from"./NyxCard-PSnmnI06.js";var A=e((()=>{})),j,M,N,P,F,I=e((()=>{_(),A(),S(),j={key:0,class:`nyx-grid__header`},M={key:1,class:`nyx-grid__title`},N={key:1,class:`nyx-grid__footer`},P=3,F=s({__name:`NyxGrid`,props:{title:{},mode:{default:C.Grid},columns:{default:P},gap:{default:b.Medium}},setup(e){let s={[b.XSmall]:.25,[b.Small]:.5,[b.Medium]:.75,[b.Large]:1,[b.XLarge]:1.25,[b.XXLarge]:1.5},c=e,d=l(),_=n(`elGrid`),y=n(`elContent`),x=0,S=null,w=null,T=new Set,E=m(()=>!!d.header||!!c.title),D=m(()=>!!d.footer),O=m(()=>c.mode===C.Masonry?C.Masonry:C.Grid),k=m(()=>{let e=Number(c.columns);return Number.isInteger(e)&&e>0?e:P}),A=m(()=>Object.values(b).includes(c.gap)?c.gap:b.Medium),F=m(()=>typeof c.gap==`number`&&Number.isFinite(c.gap)&&c.gap>=0?`${c.gap}rem`:`calc(var(--nyx-gap-${A.value}) * 1.5)`),I=m(()=>({"--nyx-grid-gap":F.value,"--nyx-grid-columns":String(k.value)}));function L(){return y.value?Array.from(y.value.children).filter(e=>e instanceof HTMLElement):[]}function R(e){e.style.removeProperty(`--nyx-grid-item-width`),e.style.removeProperty(`--nyx-grid-item-left`),e.style.removeProperty(`--nyx-grid-item-top`)}function z(){if(!S)return;let e=new Set(L());T.forEach(t=>{e.has(t)||(S?.unobserve(t),T.delete(t))}),e.forEach(e=>{T.has(e)||(S?.observe(e),T.add(e))})}function B(){if(typeof window>`u`)return 0;let e=`--nyx-gap-${A.value}`,t=_.value??document.documentElement,n=Number.parseFloat(getComputedStyle(document.documentElement).fontSize)||16;if(typeof c.gap==`number`&&Number.isFinite(c.gap)&&c.gap>=0)return c.gap*n;let r=getComputedStyle(t).getPropertyValue(e).trim(),i=Number.parseFloat(r);return Number.isFinite(i)&&i>0?r.endsWith(`rem`)?i*n*1.5:(r.endsWith(`px`),i*1.5):s[A.value]*n*1.5}function V(){let e=y.value;if(!e||O.value!==`masonry`)return;let t=L();if(z(),t.length===0){e.style.removeProperty(`--nyx-grid-masonry-height`);return}let n=B(),r=e.clientWidth;if(!r){e.style.removeProperty(`--nyx-grid-masonry-height`),t.forEach(R);return}let i=Math.max(0,(r-n*Math.max(0,k.value-1))/k.value);if(!i){e.style.removeProperty(`--nyx-grid-masonry-height`),t.forEach(R);return}let a=Array.from({length:k.value},()=>0);t.forEach((e,t)=>{let r=t%k.value,o=r*(i+n),s=a[r];e.style.setProperty(`--nyx-grid-item-width`,`${i}px`),e.style.setProperty(`--nyx-grid-item-left`,`${o}px`),e.style.setProperty(`--nyx-grid-item-top`,`${s}px`),a[r]+=e.offsetHeight+n}),e.style.setProperty(`--nyx-grid-masonry-height`,`${Math.max(0,...a.map(e=>e-n))}px`)}function H(){let e=y.value;e&&(e.style.removeProperty(`--nyx-grid-masonry-height`),L().forEach(R))}function U(){typeof window>`u`||(x&&cancelAnimationFrame(x),t(()=>{x=requestAnimationFrame(()=>{if(x=0,O.value===C.Masonry){V();return}H()})}))}return r([O,k,A],()=>{U()}),a(()=>{typeof window<`u`&&`ResizeObserver`in window&&(S=new ResizeObserver(()=>{U()}),y.value&&S.observe(y.value)),typeof window<`u`&&`MutationObserver`in window&&y.value&&(w=new MutationObserver(()=>{U()}),w.observe(y.value,{childList:!0})),window.addEventListener(`resize`,U),U()}),p(()=>{x&&cancelAnimationFrame(x),window.removeEventListener(`resize`,U),w?.disconnect(),S?.disconnect(),w=null,S=null,T.clear()}),(e,t)=>(o(),v(`section`,{ref_key:`elGrid`,ref:_,class:f([`nyx-grid`,[`nyx-grid--${O.value}`]]),style:h(I.value)},[E.value?(o(),v(`header`,j,[e.$slots.header?i(e.$slots,`header`,{key:0}):(o(),v(`h2`,M,g(c.title),1))])):u(``,!0),ee(`div`,{ref_key:`elContent`,ref:y,class:`nyx-grid__content`},[i(e.$slots,`default`)],512),D.value?(o(),v(`footer`,N,[i(e.$slots,`footer`)])):u(``,!0)],6))}})})),L,R=e((()=>{I(),I(),L=F,F.__docgenInfo=Object.assign({displayName:F.name??F.__name},{exportName:`default`,displayName:`NyxGrid`,description:``,tags:{},props:[{name:`title`,required:!1,type:{name:`string`}},{name:`mode`,required:!1,type:{name:`NyxGridMode`},defaultValue:{func:!1,value:`NyxGridMode.Grid`}},{name:`columns`,required:!1,type:{name:`number`},defaultValue:{func:!1,value:`DEFAULT_COLUMNS`}},{name:`gap`,required:!1,type:{name:`union`,elements:[{name:`NyxSize`},{name:`number`}]},defaultValue:{func:!1,value:`NyxSize.Medium`}}],slots:[{name:`header`},{name:`default`},{name:`footer`}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxGrid/NyxGrid.vue`]})}));function z(e,t){return c(k,{key:e.id,title:e.title,variant:y.Soft},{default:()=>c(`div`,{style:`display:flex;flex-direction:column;gap:0.5rem;`},e.lines.map((t,n)=>c(`p`,{key:`${e.id}-${n}`,style:`margin:0;color:var(--nyx-c-text-2);`},t))),footer:t})}function B(e){return e.map(e=>z(e))}function V(e){return t=>s({setup(){return()=>c(L,t,{header:e?.headerSlot,default:()=>B(e?.cards??W),footer:e?.footerText?()=>c(`small`,{style:`color:var(--nyx-c-text-2);`},e.footerText):void 0})}})}var H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{_(),D(),S(),w(),O(),R(),H={"NyxGridMode.Grid":C.Grid,"NyxGridMode.Masonry":C.Masonry},U={"NyxSize.XSmall":b.XSmall,"NyxSize.Small":b.Small,"NyxSize.Medium":b.Medium,"NyxSize.Large":b.Large,"NyxSize.XLarge":b.XLarge},W=[{id:`alpha`,title:`Alpha`,lines:[`Short summary block.`,`Useful for compact cards.`]},{id:`beta`,title:`Beta`,lines:[`A slightly longer card.`,`This one gives the layout more height.`,`Good for masonry demos.`]},{id:`gamma`,title:`Gamma`,lines:[`Medium sized content.`,`Balanced placeholder copy.`]},{id:`delta`,title:`Delta`,lines:[`Tall card example.`,`Adds visible stagger to the column flow.`,`Useful for checking reflow.`,`Keeps the demo lively.`]},{id:`epsilon`,title:`Epsilon`,lines:[`Another compact block.`,`Works well in tighter rows.`]}],G={title:`Components/Data/NyxGrid`,component:L,argTypes:{mode:{control:{type:`select`},options:Object.keys(H),mapping:H},columns:{control:{type:`number`}},gap:{control:{type:`select`},options:Object.keys(U),mapping:U}}},K={render:V(),args:{title:`Overview`,columns:3,gap:b.Medium}},q={render:V({footerText:`${W.length} placeholder cards`}),args:{title:`Overview`,columns:3,gap:b.Medium}},J={render:V({headerSlot:()=>c(`div`,{style:`display:flex;justify-content:space-between;gap:1rem;align-items:center;`},[c(`div`,[c(`h2`,{style:`margin:0;`},`Gallery`),c(`p`,{style:`margin:0;color:var(--nyx-c-text-2);`},`Header slot overrides the title prop.`)]),c(T,{theme:x.Primary},{default:()=>`Refresh`})]),footerText:`Custom footer content`}),args:{title:`Fallback title`,columns:2,gap:b.Large}},Y={render:V({cards:W.slice(0,3)}),args:{columns:2,gap:b.Small}},X={render:V(),args:{title:`Masonry Layout`,mode:C.Masonry,columns:3,gap:b.Medium}},Z={render:()=>s({setup(){let e=d([...W]),t=d(3),n=d(W.length+1),r=()=>{let t=n.value;e.value=[...e.value,{id:`stub-${t}`,title:`Stub ${t}`,lines:[`Newly added placeholder card.`,t%2==0?`Compact body copy.`:`A little extra content to vary the height.`,...t%3==0?[`Additional line to exaggerate masonry movement.`]:[]]}],n.value+=1},i=t=>{e.value=e.value.filter(e=>e.id!==t)};return()=>c(L,{title:`Dynamic Reflow`,mode:C.Masonry,columns:t.value,gap:b.Medium},{header:()=>c(`div`,{style:`display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;`},[c(`div`,[c(`h2`,{style:`margin:0;`},`Dynamic Reflow`),c(`p`,{style:`margin:0;color:var(--nyx-c-text-2);`},`Add and remove NyxCard placeholders to observe animated realignment.`)]),c(`div`,{style:`display:flex;gap:0.5rem;flex-wrap:wrap;`},[c(T,{theme:x.Success,onClick:r},{default:()=>`Add card`}),c(T,{theme:x.Info,variant:y.Outline,onClick:()=>{t.value=t.value===3?2:3}},{default:()=>`Toggle columns`})])]),default:()=>e.value.map(e=>z(e,()=>c(`div`,{style:`display:flex;justify-content:flex-end;`},[c(T,{theme:x.Danger,variant:y.Ghost,onClick:()=>i(e.id)},{default:()=>c(E,{size:16})})]))),footer:()=>c(`small`,{style:`color:var(--nyx-c-text-2);`},`${e.value.length} cards in the grid`)})}})},Q={render:V(),args:{title:`Zero Gap`,columns:3,gap:0}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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