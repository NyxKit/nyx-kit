import{n as e}from"./chunk-BneVvdWh.js";import{A as t,B as n,C as r,H as i,I as a,J as o,K as s,L as c,M as l,O as u,P as d,S as f,U as p,V as m,W as h,_ as g,at as _,b as v,d as y,et as b,f as x,g as S,h as C,j as w,k as T,m as E,n as D,p as ee,r as te,rt as O,st as k,t as A,v as j,w as M,x as N,y as ne}from"./vue.esm-bundler-BCs4lh10.js";import{A as P,O as re,S as ie,T as F,k as I}from"./string-CevuJH_I.js";import{n as ae,t as L}from"./useNyxProps-BBDE2PJZ.js";import{n as oe,t as se}from"./NyxIcon-Db6nFVw3.js";var ce=e((()=>{})),le,ue,de,fe,pe,me,he,ge,_e,ve=e((()=>{A(),oe(),le={class:`nyx-command-palette__results-content`},ue=[`id`,`aria-label`,`aria-busy`],de=[`id`],fe=[`id`,`data-active`,`aria-selected`,`aria-disabled`,`aria-label`,`aria-describedby`,`onPointermove`,`onClick`],pe={key:0,class:`nyx-command-palette__leading`},me={class:`nyx-command-palette__label`},he=[`id`],ge={key:1,class:`nyx-command-palette__trailing`},_e=f({__name:`NyxCommandPaletteResults`,props:{filtered:{},loading:{type:Boolean},loadingText:{},emptyText:{},resultCount:{},label:{},query:{},active:{},domId:{type:Function},scope:{type:Function}},emits:[`activate`,`highlight`],setup(e,{emit:t}){let n=h(),r=t,i=e=>{e.setAttribute(`aria-hidden`,`true`),e.setAttribute(`inert`,``)},s=e=>{e.removeAttribute(`aria-hidden`),e.removeAttribute(`inert`)};return(t,l)=>(d(),j(`div`,le,[C(`div`,{id:e.domId(`list`),role:`listbox`,"aria-label":e.label,"aria-busy":e.loading},[(d(!0),j(x,null,a(e.filtered,({group:u,items:f})=>(d(),S(te,{key:u.id,tag:`div`,role:`group`,appear:``,name:`nyx-command-palette-result`,onBeforeLeave:i,onBeforeEnter:s,onLeaveCancelled:s,"aria-labelledby":u.label?.trim()||n[`group-label`]?e.domId(`group`,u.id):void 0,class:`nyx-command-palette__group`},{default:o(()=>[u.label?.trim()||n[`group-label`]?(d(),j(`div`,{key:`heading`,id:e.domId(`group`,u.id),class:`nyx-command-palette__heading`},[c(t.$slots,`group-label`,{group:u,searchTerm:e.query},()=>[v(k(u.label),1)])],8,de)):g(``,!0),(d(!0),j(x,null,a(f,(i,o)=>(d(),j(`button`,{id:e.domId(`option`,i.id),key:`item:${i.id}`,type:`button`,role:`option`,tabindex:`-1`,class:`nyx-command-palette__option`,"data-active":e.active===i.id,"aria-selected":e.scope(i,u,o).selected,"aria-disabled":e.scope(i,u,o).disabled,"aria-label":i.label,"aria-describedby":!n.item&&!n[`item-label`]&&i.description?e.domId(`description`,i.id):void 0,onPointermove:t=>!e.scope(i,u,o).disabled&&r(`highlight`,i.id),onMousedown:l[0]||=y(()=>{},[`prevent`]),onClick:e=>r(`activate`,i,u,e)},[n.item?c(t.$slots,`item`,T({key:0,ref_for:!0},e.scope(i,u,o))):(d(),j(x,{key:1},[n[`item-leading`]||i.icon?(d(),j(`span`,pe,[c(t.$slots,`item-leading`,T({ref_for:!0},e.scope(i,u,o)),()=>[i.icon?(d(),S(se,{key:0,name:i.icon,"aria-hidden":`true`},null,8,[`name`])):g(``,!0)])])):g(``,!0),C(`span`,me,[c(t.$slots,`item-label`,T({ref_for:!0},e.scope(i,u,o)),()=>[C(`span`,null,k(i.label),1),i.description?(d(),j(`span`,{key:0,id:e.domId(`description`,i.id),class:`nyx-command-palette__description`},k(i.description),9,he)):g(``,!0)])]),n[`item-trailing`]||i.shortcuts?.length?(d(),j(`span`,ge,[c(t.$slots,`item-trailing`,T({ref_for:!0},e.scope(i,u,o)),()=>[(d(!0),j(x,null,a(i.shortcuts,(e,t)=>(d(),j(`kbd`,{key:t,"aria-hidden":`true`},k(e),1))),128))])])):g(``,!0)],64))],40,fe))),128))]),_:2},1032,[`aria-labelledby`]))),128))],8,ue),N(D,{name:`nyx-command-palette-state`,mode:`out-in`,onBeforeLeave:i},{default:o(()=>[e.loading||!e.resultCount?(d(),j(`div`,{key:e.loading?`loading`:`empty`,class:`nyx-command-palette__state`},[e.loading?c(t.$slots,`loading`,{key:0,searchTerm:e.query},()=>[N(se,{name:`loader-circle`,"aria-hidden":`true`}),v(k(e.loadingText),1)]):c(t.$slots,`empty`,{key:1,searchTerm:e.query},()=>[v(k(e.emptyText),1)])])):g(``,!0)]),_:3})]))}})})),ye,be=e((()=>{ve(),ve(),ye=_e,_e.__docgenInfo=Object.assign({displayName:_e.name??_e.__name},{exportName:`default`,displayName:`NyxCommandPaletteResults`,description:``,tags:{},props:[{name:`filtered`,required:!0,type:{name:`Array`,elements:[{name:`{
    group: NyxCommandPaletteGroup<T>;
    items: T[];
}`}]}},{name:`loading`,required:!0,type:{name:`boolean`}},{name:`loadingText`,required:!0,type:{name:`string`}},{name:`emptyText`,required:!0,type:{name:`string`}},{name:`resultCount`,required:!0,type:{name:`number`}},{name:`label`,required:!0,type:{name:`string`}},{name:`query`,required:!0,type:{name:`string`}},{name:`active`,required:!1,type:{name:`string`}},{name:`domId`,required:!0,type:{name:`TSFunctionType`}},{name:`scope`,required:!0,type:{name:`TSFunctionType`}}],events:[{name:`activate`,type:{names:[`T`]}},{name:`highlight`,type:{names:[`string`]}}],slots:[{name:`group-label`,scoped:!0,bindings:[{name:`group`,title:`binding`},{name:`search-term`,title:`binding`}]},{name:`item`,scoped:!0,bindings:[]},{name:`item-leading`,scoped:!0,bindings:[]},{name:`item-label`,scoped:!0,bindings:[]},{name:`item-trailing`,scoped:!0,bindings:[]},{name:`loading`,scoped:!0,bindings:[{name:`search-term`,title:`binding`}]},{name:`empty`,scoped:!0,bindings:[{name:`search-term`,title:`binding`}]},{}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/NyxCommandPaletteResults.vue`]})}));function xe(e){let t=new Set,n=new Set;return e.flatMap(e=>!e||!Ee(e.id)||t.has(e.id)||!Array.isArray(e.items)?[]:(t.add(e.id),[{group:e,items:e.items.filter(e=>!e||!Ee(e.id)||!Ee(e.label)||n.has(e.id)?!1:(n.add(e.id),!0))}]))}function Se(e,t){let n=we(t),r=n.split(` `);return e.flatMap(({group:e,items:t})=>{let i=!n||e.ignoreFilter?t:t.map((e,t)=>{let i=Ce(e.label),a=[i,Ce(e.description??``),...(e.keywords??[]).map(Ce)],o=r.every(e=>a.some(t=>Te(e,t)));return{item:e,index:t,rank:i===n?0:i.startsWith(n)?1:r.every(e=>a.some(t=>t.includes(e)))?2:3,matches:o}}).filter(e=>e.matches).sort((e,t)=>e.rank-t.rank||e.index-t.index).map(e=>e.item);return i.length?[{group:e,items:i}]:[]})}var Ce,we,Te,Ee,De=e((()=>{Ce=e=>e.normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase(),we=e=>Ce(e).trim().split(/\s+/u).filter(Boolean).join(` `),Te=(e,t)=>{let n=Array.from(e),r=0;for(let e of t)e===n[r]&&r++;return r===n.length},Ee=e=>typeof e==`string`&&!!e.trim()}));function Oe(e){if(!e?.trim())return;let t=e.split(`+`).map(e=>Me(e.trim())),n=t.filter(e=>!Ne.has(e));if(!(n.length!==1||!n[0]||new Set(t).size!==t.length||t.includes(`SUPER`)&&(t.includes(`CTRL`)||t.includes(`META`))))return{key:n[0],modifiers:new Set(t.filter(e=>Ne.has(e)))}}function ke(e,t){let n=e.modifiers;return Me(t.key)===e.key&&t.altKey===n.has(`ALT`)&&t.shiftKey===n.has(`SHIFT`)&&(n.has(`SUPER`)?t.ctrlKey!==t.metaKey:t.ctrlKey===n.has(`CTRL`)&&t.metaKey===n.has(`META`))}function Ae(e,t,n){let r=E(()=>{let t=Oe(e.shortcut);return e.shortcut?.trim(),t}),i,a,o={root:t,toggle:n,accepts:t=>!e.inline&&!e.disabled&&!!r.value&&ke(r.value,t)},c=e=>{if(!i||e.defaultPrevented||e.repeat||e.isComposing||e.keyCode===229)return;let r=e.composedPath()[0];if(!(r instanceof HTMLElement))return;let a=i.activeElement?.closest(`dialog[open]`),s=[...R.get(i)??[]].reverse().filter(t=>t.accepts(e)&&(!a||t.root.value===a));(s.find(e=>e.root.value?.contains(r))??s[0])===o&&(r.closest(`input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]`)&&!t.value?.contains(r)||(e.preventDefault(),n()))};return l(()=>{if(i=t.value?.ownerDocument,!i)return;let n=R.get(i)??new Set;n.add(o),R.set(i,n),a=s(()=>!e.inline&&!e.disabled&&!!r.value,e=>{e?i?.addEventListener(`keydown`,c):i?.removeEventListener(`keydown`,c)},{immediate:!0})}),w(()=>{if(a?.(),i?.removeEventListener(`keydown`,c),i){let e=R.get(i);e?.delete(o),e?.size||R.delete(i)}}),{matches:o.accepts}}var je,Me,Ne,R,Pe=e((()=>{A(),je={CONTROL:`CTRL`,COMMAND:`META`,CMD:`META`,OPTION:`ALT`,MOD:`SUPER`," ":`SPACE`,"+":`PLUS`,ESC:`ESCAPE`},Me=e=>je[e.toUpperCase()]??e.toUpperCase(),Ne=new Set([`CTRL`,`META`,`ALT`,`SHIFT`,`SUPER`]),R=new WeakMap}));function Fe(){let e,t=()=>{e?.cancel(),e=void 0};return{play:(n,r,i=!1)=>{let a=n.ownerDocument.defaultView;if(!a||!n.animate||a.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return t(),Promise.resolve();let o=a.getComputedStyle(n),s=i?`0`:o.opacity,c=i?`translateY(${o.getPropertyValue(`--nyx-gap-lg`).trim()||`0px`}) scale(0.97)`:o.transform,l=o.getPropertyValue(r?`--nyx-command-palette-enter-duration`:`--nyx-command-palette-exit-duration`).trim(),u=Number.parseFloat(l)*(l.endsWith(`ms`)?1:1e3);return t(),e=n.animate([{opacity:s,transform:c},{opacity:r?1:0,transform:r?`translateY(0) scale(1)`:`translateY(0) scale(0.98)`}],{duration:Number.isFinite(u)?u:0,easing:r?`cubic-bezier(0.22, 1, 0.36, 1)`:`cubic-bezier(0.4, 0, 1, 1)`,fill:`both`}),e.finished.catch(()=>{})},cancel:t,finish:()=>e?.finish()}}var Ie=e((()=>{}));function Le(e,n,r,i,a){let o=b(!1),c=b(!1),u=Fe(),d=0,f,p=()=>{f?.matches&&u.finish()},m=null,h=null,g=!1,_=!1,v=()=>e.inline||!!m?.open,y=()=>{o.value&&v()&&!c.value&&!e.disabled&&i.value?.focus()},x=()=>{d++,u.cancel(),c.value=!1;let e=m;if(!e)return;let t=e.ownerDocument,n=z.get(t),r=n&&[...n.owners].slice(-1)[0]===e&&(e.contains(t.activeElement)||t.activeElement===t.body);m=null,e.open&&e.close(),n?.owners.delete(e),n&&!n.owners.size&&(t.body.style.getPropertyValue(`overflow`)===`hidden`&&(n.value?t.body.style.setProperty(`overflow`,n.value,n.priority):t.body.style.removeProperty(`overflow`)),z.delete(t)),r&&h?.isConnected&&!h.closest(`[inert]`)&&!h.matches(`:disabled`)&&h.getClientRects().length&&h.focus(),h=null,g=!1},S=async()=>{if(!m||c.value)return;let e=++d;c.value=!0,await u.play(m,!1),e===d&&!n.value&&x()};s(()=>e.inline,x,{flush:`pre`}),s([o,n,()=>e.inline,r],async()=>{if(!o.value||e.inline){x();return}if(!n.value){S();return}let i=r.value;if(!i||i.tagName!==`DIALOG`||m===i&&!c.value)return;let a=++d,s=m!==i;c.value=!1,m=i;let l=i.ownerDocument;s&&(h=l.activeElement instanceof HTMLElement?l.activeElement:null,m.showModal());let f=z.get(l);f||(f={owners:new Set,value:l.body.style.getPropertyValue(`overflow`),priority:l.body.style.getPropertyPriority(`overflow`)},z.set(l,f),l.body.style.setProperty(`overflow`,`hidden`)),f.owners.add(m);let p=u.play(m,!0,s);await t(),!(m!==i||!n.value||e.inline)&&(e.disabled?(Re(i)[0]??i).focus():y(),await p,a===d&&u.cancel())},{flush:`post`});let C=()=>{if(e.inline){a();return}!m?.open||!n.value||[...z.get(m.ownerDocument)?.owners??[]].slice(-1)[0]===m&&(n.value=!1,a())},T=e=>{if(!(e.isComposing||_||e.keyCode===229)){if(e.key===`Escape`)e.preventDefault(),e.stopPropagation(),C();else if(e.key===`Tab`&&m?.open){let t=Re(m),n=m.ownerDocument.activeElement;if(!t.length){e.preventDefault(),m.focus();return}e.shiftKey&&(n===t[0]||!t.includes(n))?(e.preventDefault(),t[t.length-1]?.focus()):!e.shiftKey&&(n===t[t.length-1]||!t.includes(n))&&(e.preventDefault(),t[0].focus())}}},E=e=>{if(!m||e.target!==m)return!1;let t=m.getBoundingClientRect();return e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom};return l(()=>{o.value=!0,f=r.value?.ownerDocument.defaultView?.matchMedia?.(`(prefers-reduced-motion: reduce)`),f?.addEventListener(`change`,p),e.inline&&e.autofocus&&y()}),w(()=>{f?.removeEventListener(`change`,p),x()}),{mounted:o,closing:c,focus:y,dismiss:C,onKeydown:T,toggle:()=>{n.value?C():n.value=!0},onCancel:e=>{e.preventDefault(),_||C()},onComposition:e=>{_=e},onPointerDown:e=>{g=e.button===0&&E(e)},onPointerUp:e=>{let t=g&&E(e);g=!1,t&&C()},onPointerCancel:()=>{g=!1}}}var z,Re,ze=e((()=>{Ie(),A(),z=new WeakMap,Re=e=>Array.from(e.querySelectorAll(`button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])`)).filter(e=>e.tabIndex>=0&&!e.closest(`[inert]`)&&e.getClientRects().length>0)}));function Be(e,n,a,o,c){let l=m(),u=b(null),d=b(null),f=b(null),p=Le(e,o,u,d,()=>c(`close`)),{mounted:h,closing:g}=p,_=Ae(e,u,p.toggle),v=r(),y=()=>{let e=v.vnode.props??{};return`modelValue`in e||`model-value`in e},x=b(n.value),S=E(()=>y()?n.value:x.value),C=E(()=>a.value??``),w=b(!1),T=b(!1);s([C,()=>e.viewportMode],([e,t],n)=>{n&&t!==n[1]&&(w.value=!1),T.value=!1,e.trim()&&(w.value=!0)},{immediate:!0,flush:`sync`}),s(o,t=>{!t&&!e.inline?(w.value=!1,T.value=!1):t&&!e.inline&&C.value.trim()&&(w.value=!0)},{flush:`sync`});let D=E(()=>e.viewportMode===I.Always||!!C.value.trim()||T.value||e.viewportMode===I.AfterInteraction&&w.value),ee=()=>{e.disabled||g.value||(p.focus(),w.value=!0,T.value=!0)},te=E(()=>xe(e.groups)),O=E(()=>Se(te.value,C.value)),k=E(()=>D.value?O.value.reduce((e,t)=>e+t.items.length,0):0),A=E(()=>e.disabled||e.loading||!D.value||g.value?[]:O.value.flatMap(({items:e})=>e.filter(e=>!e.disabled))),j=b();s([()=>we(C.value),A,S],([e,t,n],r)=>{let i=t[0]?.id;r?.length&&e!==r[0]?j.value=i:(!r?.length||n!==r[2])&&t.some(e=>e.id===n)?j.value=n:t.some(e=>e.id===j.value)||(j.value=i)},{immediate:!0}),s(te,e=>{!y()&&!e.some(({items:e})=>e.some(e=>e.id===x.value))&&(x.value=void 0)});let M=i(),N=(e,t=``)=>`${M}-${e}-${Array.from(t,e=>e.codePointAt(0).toString(16)).join(`-`)}`,ne=(t,n,r)=>({item:t,group:n,index:r,active:j.value===t.id,selected:S.value===t.id,disabled:e.disabled||e.loading||g.value||!D.value||!!t.disabled,searchTerm:C.value}),P=(t,r,i)=>{if(!e.inline&&!o.value||!A.value.some(e=>e.id===t.id))return;p.focus();let a=!y()&&x.value!==t.id&&n.value===t.id;x.value=t.id,a?v.emit(`update:modelValue`,t.id):n.value=t.id,c(`select`,{item:t,group:r,originalEvent:i})},re=!1,ie=e=>{re=e,p.onComposition(e)},F=t=>{if(re||t.isComposing||t.keyCode===229||_.matches(t))return;if(t.key===`ArrowDown`&&!D.value){t.preventDefault(),t.repeat||ee();return}let n=A.value;if(t.key===`Enter`){if(t.preventDefault(),t.repeat)return;if(!D.value){ee();return}let e=O.value.find(e=>e.items.some(e=>e.id===j.value)),n=e?.items.find(e=>e.id===j.value);n&&e&&P(n,e.group,t);return}let r=n.findIndex(e=>e.id===j.value);if(t.key===`ArrowDown`)r++;else if(t.key===`ArrowUp`)r=r<0?n.length-1:r-1;else if(t.altKey&&t.key===`Home`)r=0;else if(t.altKey&&t.key===`End`)r=n.length-1;else return;t.preventDefault(),n.length&&(r=e.loop?(r+n.length)%n.length:Math.max(0,Math.min(r,n.length-1)),j.value=n[r]?.id)},ae=()=>{if(!D.value||!e.inline&&!o.value)return;let t=f.value,n=j.value&&t?.ownerDocument.getElementById(N(`option`,j.value));if(!t?.clientHeight||!n)return;let r=n.offsetTop,i=n.offsetParent;for(;i&&i!==t;)r+=i.offsetTop,i=i.offsetParent;r<t.scrollTop?t.scrollTop=r:r+n.offsetHeight>t.scrollTop+t.clientHeight&&(t.scrollTop=r+n.offsetHeight-t.clientHeight)};return s([j,D,()=>e.inline||h.value&&o.value],async()=>{await t(),ae()},{immediate:!0}),s(f,(e,t,n)=>{if(!e||typeof ResizeObserver>`u`)return;let r=new ResizeObserver(ae);r.observe(e),n(()=>r.disconnect())}),{attrs:l,root:u,input:d,viewport:f,overlay:p,mounted:h,closing:g,query:C,resultsVisible:D,revealResults:ee,filtered:O,resultCount:k,active:j,domId:N,scope:ne,activate:P,composition:ie,onInputKeydown:F,rootAttrs:()=>Object.fromEntries(Object.entries(l).filter(([e])=>e!==`class`&&e!==`style`))}}var Ve=e((()=>{A(),P(),De(),Pe(),ze()})),He,Ue,We,Ge,Ke,qe,Je,Ye,Xe=e((()=>{A(),ce(),L(),re(),oe(),be(),Ve(),P(),He={class:`nyx-command-palette__search`},Ue=[`id`,`aria-label`,`aria-controls`,`aria-expanded`,`aria-activedescendant`,`placeholder`,`value`,`disabled`],We=[`aria-label`],Ge=[`data-visible`,`inert`,`aria-hidden`],Ke={class:`nyx-command-palette__status`,role:`status`},qe={key:0,class:`nyx-command-palette__footer`},Je=[`aria-label`,`title`,`aria-controls`,`disabled`],Ye=f({inheritAttrs:!1,__name:`NyxCommandPalette`,props:u({groups:{},inline:{type:Boolean,default:!1},shortcut:{},viewportMode:{default:I.AfterInteraction},showResultsLabel:{default:`Show results`},placeholder:{default:`Search commands...`},label:{default:`Search commands`},loading:{type:Boolean,default:!1},loadingText:{default:`Loading commands...`},emptyText:{default:`No commands found.`},disabled:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},loop:{type:Boolean,default:!0},closeable:{type:Boolean,default:!1},closeLabel:{default:`Close command palette`},theme:{},size:{}},{modelValue:{},modelModifiers:{},searchTerm:{},searchTermModifiers:{},open:{type:Boolean,default:!1},openModifiers:{}}),emits:u([`select`,`close`],[`update:modelValue`,`update:searchTerm`,`update:open`]),setup(e,{expose:t,emit:r}){let i=e,a=p(e,`modelValue`),s=p(e,`searchTerm`),l=p(e,`open`),u=r,f=h(),{classList:m}=ae(i,{origin:`NyxCommandPalette`}),{attrs:v,root:y,input:b,viewport:x,overlay:w,mounted:E,closing:D,query:te,resultsVisible:A,revealResults:P,filtered:re,resultCount:F,active:I,domId:L,scope:oe,activate:ce,composition:le,onInputKeydown:ue,rootAttrs:de}=Be(i,a,s,l,u);return t({focus:w.focus}),(t,r)=>(d(),S(ee,{to:`body`,disabled:e.inline||!O(E)},[(d(),S(n(e.inline?`div`:`dialog`),T({ref_key:`root`,ref:y},O(de)(),{class:[`nyx-command-palette`,[O(m),O(v).class]],style:O(v).style,"data-closing":O(D),"data-results-visible":O(A),"aria-label":e.inline?void 0:e.label,"aria-modal":e.inline?void 0:!0,tabindex:`-1`,onKeydown:O(w).onKeydown,onCancel:O(w).onCancel,onPointerdown:O(w).onPointerDown,onPointerup:O(w).onPointerUp,onPointercancel:O(w).onPointerCancel}),{default:o(()=>[C(`div`,He,[N(se,{name:`search`,"aria-hidden":`true`}),C(`input`,{id:O(L)(`input`),ref_key:`input`,ref:b,class:`nyx-command-palette__input`,type:`text`,role:`combobox`,"aria-label":e.label,"aria-autocomplete":`list`,"aria-controls":O(L)(`list`),"aria-expanded":(e.inline||O(E)&&l.value)&&!e.disabled&&O(A)&&!O(D),"aria-activedescendant":O(I)?O(L)(`option`,O(I)):void 0,placeholder:e.placeholder,value:O(te),disabled:e.disabled,autocomplete:`off`,onInput:r[0]||=e=>s.value=e.target.value,onKeydown:r[1]||=(...e)=>O(ue)&&O(ue)(...e),onCompositionstart:r[2]||=e=>O(le)(!0),onCompositionend:r[3]||=e=>O(le)(!1)},null,40,Ue),e.closeable?(d(),j(`button`,{key:0,class:`nyx-command-palette__close`,type:`button`,"aria-label":e.closeLabel,onClick:r[4]||=(...e)=>O(w).dismiss&&O(w).dismiss(...e)},[N(se,{name:`x`,"aria-hidden":`true`})],8,We)):g(``,!0)]),C(`div`,{class:`nyx-command-palette__results`,"data-visible":O(A),inert:!O(A),"aria-hidden":!O(A)},[C(`div`,{ref_key:`viewport`,ref:x,class:`nyx-command-palette__viewport`},[N(ye,{filtered:O(re),loading:e.loading,"loading-text":e.loadingText,"empty-text":e.emptyText,"result-count":O(F),label:e.label,query:O(te),active:O(I),"dom-id":O(L),scope:O(oe),onActivate:O(ce),onHighlight:r[5]||=e=>I.value=e},ne({_:2},[f.item?{name:`item`,fn:o(e=>[c(t.$slots,`item`,_(M(e)))]),key:`0`}:void 0,f[`item-leading`]?{name:`item-leading`,fn:o(e=>[c(t.$slots,`item-leading`,_(M(e)))]),key:`1`}:void 0,f[`item-label`]?{name:`item-label`,fn:o(e=>[c(t.$slots,`item-label`,_(M(e)))]),key:`2`}:void 0,f[`item-trailing`]?{name:`item-trailing`,fn:o(e=>[c(t.$slots,`item-trailing`,_(M(e)))]),key:`3`}:void 0,f[`group-label`]?{name:`group-label`,fn:o(e=>[c(t.$slots,`group-label`,_(M(e)))]),key:`4`}:void 0,f.loading?{name:`loading`,fn:o(e=>[c(t.$slots,`loading`,_(M(e)))]),key:`5`}:void 0,f.empty?{name:`empty`,fn:o(e=>[c(t.$slots,`empty`,_(M(e)))]),key:`6`}:void 0]),1032,[`filtered`,`loading`,`loading-text`,`empty-text`,`result-count`,`label`,`query`,`active`,`dom-id`,`scope`,`onActivate`])],512)],8,Ge),C(`span`,Ke,k(O(A)?e.loading?e.loadingText:O(F)?``:e.emptyText:``),1),f.footer||!O(A)?(d(),j(`div`,qe,[c(t.$slots,`footer`,{searchTerm:O(te),resultCount:O(F)}),O(A)?g(``,!0):(d(),j(`button`,{key:0,class:`nyx-command-palette__reveal`,type:`button`,"aria-label":e.showResultsLabel,title:e.showResultsLabel,"aria-controls":O(L)(`list`),"aria-expanded":!1,disabled:e.disabled||O(D),onClick:r[6]||=(...e)=>O(P)&&O(P)(...e)},[N(se,{name:`chevrons-down`,size:O(ie).XSmall,"aria-hidden":`true`},null,8,[`size`])],8,Je))])):g(``,!0)]),_:3},16,[`class`,`style`,`data-closing`,`data-results-visible`,`aria-label`,`aria-modal`,`onKeydown`,`onCancel`,`onPointerdown`,`onPointerup`,`onPointercancel`]))],8,[`disabled`]))}})})),Ze,Qe=e((()=>{Xe(),Xe(),Ze=Ye,Ye.__docgenInfo=Object.assign({displayName:Ye.name??Ye.__name},{exportName:`default`,displayName:`NyxCommandPalette`,description:``,tags:{},expose:[{name:`focus`}],props:[{name:`groups`,required:!0,type:{name:`TSTypeOperator`}},{name:`inline`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`shortcut`,required:!1,type:{name:`string`}},{name:`viewportMode`,required:!1,type:{name:`NyxCommandPaletteViewportMode`},defaultValue:{func:!1,value:`NyxCommandPaletteViewportMode.AfterInteraction`}},{name:`showResultsLabel`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Show results'`}},{name:`placeholder`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Search commands...'`}},{name:`label`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Search commands'`}},{name:`loading`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`loadingText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Loading commands...'`}},{name:`emptyText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'No commands found.'`}},{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`autofocus`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`loop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`closeable`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`closeLabel`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close command palette'`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],events:[{name:`select`,type:{names:[`NyxCommandPaletteSelectEvent`],elements:[{name:`T`}]}},{name:`close`}],slots:[{name:`item`,scoped:!0,bindings:[]},{name:`item-leading`,scoped:!0,bindings:[]},{name:`item-label`,scoped:!0,bindings:[]},{name:`item-trailing`,scoped:!0,bindings:[]},{name:`group-label`,scoped:!0,bindings:[]},{name:`loading`,scoped:!0,bindings:[]},{name:`empty`,scoped:!0,bindings:[]},{name:`footer`,scoped:!0,bindings:[{name:`search-term`,title:`binding`},{name:`result-count`,title:`binding`}]}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/NyxCommandPalette.vue`]})})),$e,et,tt,nt,rt,B,it,at=e((()=>{A(),Qe(),$e={style:{display:`grid`,gap:`var(--nyx-gap-lg)`,"max-width":`100%`}},et={key:1},tt={"aria-hidden":`true`},nt={style:{display:`block`}},rt={"aria-live":`polite`},{action:B}=__STORYBOOK_MODULE_ACTIONS__,it=f({__name:`NyxCommandPaletteDemo`,props:{args:{},controlled:{type:Boolean},custom:{type:Boolean},fullItem:{type:Boolean}},setup(e){let t=e,n=b(!1),r=b(``),i=b(),a=b(0),c=b(`None`);s(()=>t.args.open,e=>{n.value=!!e}),s(n,B(`update:open`)),s(r,B(`update:searchTerm`)),s(i,B(`update:modelValue`));let l=e=>{B(`select`)(e),a.value++,c.value=e.item.label,t.args.inline||(n.value=!1)},u=()=>{r.value=`settings`,i.value=`settings`};return(t,s)=>(d(),j(`section`,$e,[e.args.inline?g(``,!0):(d(),j(`button`,{key:0,type:`button`,onClick:s[0]||=e=>n.value=!0},` Search commands`+k(e.args.shortcut?` (${e.args.shortcut})`:``),1)),e.controlled?(d(),j(`div`,et,[C(`button`,{type:`button`,onClick:u},` Choose settings externally `),C(`button`,{type:`button`,onClick:s[1]||=e=>r.value=``},` Clear query `)])):g(``,!0),N(Ze,T(e.args,{open:n.value,"onUpdate:open":s[2]||=e=>n.value=e,"search-term":r.value,"onUpdate:searchTerm":s[3]||=e=>r.value=e,modelValue:i.value,"onUpdate:modelValue":s[4]||=e=>i.value=e,onSelect:l,onClose:s[5]||=e=>O(B)(`close`)()}),ne({footer:o(()=>[s[7]||=v(`↑ ↓ navigate · Enter run`,-1)]),_:2},[e.custom?{name:`group-label`,fn:o(({group:e})=>[v(k(e.label||`Commands`)+` · Application`,1)]),key:`0`}:void 0,e.custom?{name:`item-leading`,fn:o(({index:e})=>[C(`span`,tt,k(e+1)+`.`,1)]),key:`1`}:void 0,e.custom?{name:`item-label`,fn:o(({item:e})=>[C(`strong`,null,k(e.label),1),C(`small`,nt,k(e.description),1)]),key:`2`}:void 0,e.custom?{name:`item-trailing`,fn:o(({selected:e})=>[v(k(e?`Last used`:`Run`),1)]),key:`3`}:void 0,e.fullItem?{name:`item`,fn:o(({item:e})=>[v(`Custom command: `+k(e.label),1)]),key:`4`}:void 0,e.custom?{name:`empty`,fn:o(({searchTerm:e})=>[v(`Try another phrase for “`+k(e)+`”.`,1)]),key:`5`}:void 0,e.custom?{name:`loading`,fn:o(()=>[s[6]||=v(`Looking up your commands…`,-1)]),key:`6`}:void 0]),1040,[`open`,`search-term`,`modelValue`]),C(`output`,rt,`Last command: `+k(c.value)+` · Selected: `+k(i.value||`None`)+` · Activations: `+k(a.value),1)]))}})})),V,ot=e((()=>{at(),at(),V=it,it.__docgenInfo=Object.assign({displayName:it.name??it.__name},{exportName:`default`,displayName:`NyxCommandPaletteDemo`,description:``,tags:{},props:[{name:`args`,required:!0,type:{name:`intersection`,elements:[{name:`NyxCommandPaletteProps`},{name:`{ open?: boolean }`}]}},{name:`controlled`,required:!1,type:{name:`boolean`}},{name:`custom`,required:!1,type:{name:`boolean`}},{name:`fullItem`,required:!1,type:{name:`boolean`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteDemo.vue`]})})),st,ct,lt=e((()=>{A(),Qe(),{action:st}=__STORYBOOK_MODULE_ACTIONS__,ct=f({__name:`NyxCommandPaletteRemoteDemo`,setup(e){let t=b(``),n=b(!1),r=b([]),i=b(`None`),a=b(0),o=new Set,c=0,l=(e,t)=>{let n=setTimeout(()=>{o.delete(n),e()},t);return o.add(n),n};s(t,(e,t,i)=>{st(`update:searchTerm`)(e);let s=++c;n.value=!0;let u=l(()=>{a.value++,l(()=>{s===c&&(r.value=e===`none`?[]:[{id:`remote`,label:`Remote matches`,ignoreFilter:!0,items:[{id:`remote-${e}`,label:`Server result for ${e||`all commands`}`,description:`Order supplied by the server`}]}],n.value=!1)},e.length===1?900:100)},150);i(()=>{clearTimeout(u),o.delete(u)})},{immediate:!0}),w(()=>{c++,o.forEach(clearTimeout)});let u=e=>{i.value=e.item.id,st(`select`)(e)};return(e,o)=>(d(),j(`section`,null,[o[1]||=C(`p`,null,`Try “a”, then “ab” while loading. Only the latest response appears. Search “none” for no matches.`,-1),N(Ze,{inline:``,"search-term":t.value,"onUpdate:searchTerm":o[0]||=e=>t.value=e,groups:r.value,loading:n.value,onSelect:u},null,8,[`search-term`,`groups`,`loading`]),C(`output`,null,`Selected: `+k(i.value)+` · Requests: `+k(a.value),1)]))}})})),ut,dt=e((()=>{lt(),lt(),ut=ct,ct.__docgenInfo=Object.assign({displayName:ct.name??ct.__name},{exportName:`default`,displayName:`NyxCommandPaletteRemoteDemo`,description:``,tags:{},sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteRemoteDemo.vue`]})})),ft,pt,mt,ht,gt,_t=e((()=>{A(),P(),Qe(),ft={style:{display:`grid`,gap:`var(--nyx-gap-lg)`}},pt={key:0,"aria-live":`polite`},mt={key:1},{action:ht}=__STORYBOOK_MODULE_ACTIONS__,gt=f({__name:`NyxCommandPaletteConversationsDemo`,setup(e){let t=[{id:`release`,label:`Release planning`,description:`Maya: Shall we ship the search improvements on Friday?`,icon:`messages-square`,to:`/conversations/release`,updated:`Today`},{id:`design`,label:`Design feedback`,description:`Jonas: The quieter search focus feels much better.`,icon:`messages-square`,to:`/conversations/design`,updated:`Yesterday`},{id:`support`,label:`Customer support`,description:`Ari: How do I find an earlier conversation?`,icon:`messages-square`,to:`/conversations/support`,updated:`Monday`}],n=b(!1),r=b(``),i=b(!1),a=b([]),c=b(),l=b(`/conversations`),u=E(()=>[{id:`conversations`,label:`Conversations`,ignoreFilter:!0,items:a.value}]),f;s(r,(e,n,r)=>{if(ht(`update:searchTerm`)(e),i.value=!!e.trim(),!e.trim()){a.value=[];return}f=setTimeout(()=>{let n=e.toLowerCase().trim();a.value=t.filter(e=>`${e.label} ${e.description}`.toLowerCase().includes(n)),i.value=!1},250),r(()=>clearTimeout(f))}),w(()=>clearTimeout(f));let p=({item:e})=>{l.value=e.to,c.value=e,n.value=!1,ht(`navigate`)(e.to)};return(e,t)=>(d(),j(`section`,ft,[C(`button`,{type:`button`,onClick:t[0]||=e=>n.value=!0},` Find a conversation `),N(Ze,{open:n.value,"onUpdate:open":t[1]||=e=>n.value=e,"search-term":r.value,"onUpdate:searchTerm":t[2]||=e=>r.value=e,groups:u.value,loading:i.value,"viewport-mode":O(I).WhileSearching,label:`Find conversations`,placeholder:`Search conversations...`,closeable:``,onSelect:p},{"item-trailing":o(({item:e})=>[C(`small`,null,k(e.updated),1)]),footer:o(()=>[...t[3]||=[v(`Search titles and messages. Try “release” or “design”.`,-1)]]),_:1},8,[`open`,`search-term`,`groups`,`loading`,`viewport-mode`]),C(`code`,null,k(l.value),1),c.value?(d(),j(`article`,pt,[C(`h2`,null,k(c.value.label),1),C(`p`,null,k(c.value.description),1)])):(d(),j(`p`,mt,`Open a conversation from search to view it here.`))]))}})})),vt,yt=e((()=>{_t(),_t(),vt=gt,gt.__docgenInfo=Object.assign({displayName:gt.name??gt.__name},{exportName:`default`,displayName:`NyxCommandPaletteConversationsDemo`,description:``,tags:{},sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteConversationsDemo.vue`]})})),H,U,W,G,bt,xt,St,K,q,J,Y,X,Z,Ct,wt,Tt,Et,Dt,Q,Ot,kt,At,jt,Mt,Nt,Pt,$,Ft;e((()=>{P(),re(),Qe(),ot(),dt(),yt(),{expect:H,userEvent:U,within:W,waitFor:G}=__STORYBOOK_MODULE_TEST__,bt=[{id:`actions`,label:`Actions`,items:[{id:`settings`,label:`Open settings`,description:`Manage your workspace`,icon:`settings`,keywords:[`preferences`],shortcuts:[`Ctrl`,`,`]},{id:`file`,label:`Create file`,icon:`file-plus`,shortcuts:[`Ctrl`,`N`]},{id:`locked`,label:`Delete workspace`,description:`Administrator access required`,disabled:!0,icon:`lock`}]},{id:`destinations`,label:`Destinations`,items:[{id:`cafe`,label:`Café dashboard`,description:`Project overview`,icon:`layout-dashboard`},{id:`docs`,label:`Documentation`,description:`Read the user guide`,icon:`book-open`,keywords:[`help`]}]}],xt={title:`Components/Navigation/NyxCommandPalette`,component:Ze,tags:[`autodocs`],args:{groups:bt,viewportMode:I.Always,inline:!1,open:!1,closeable:!0},parameters:{docs:{description:{component:["Standalone native-dialog command palette, or inline with `inline`. `v-model` is the last","activated ID, `v-model:search-term` controls discovery, and `v-model:open` controls the overlay.","`select` supplies { item, group, originalEvent }; selection never closes automatically. `close`",`reports user dismissal. Item content slots retain option semantics; do not add interactive`,`descendants. Slots: item, item-leading, item-label, item-trailing, group-label, empty, loading,`,`footer. Public focus() focuses visible enabled search. Set shortcut="SUPER+K" to opt into`,`Ctrl/Meta+K toggling, or pass a custom chord. viewportMode defaults to AfterInteraction: reveal`,`on typing, footer button, or Enter and keep results visible after clearing. WhileSearching hides`,`on clear; Always shows immediately. Requests and navigation remain consumer-owned.`].join(` `)}}},argTypes:{shortcut:{control:`text`},viewportMode:{control:`select`,options:Object.values(I)},showResultsLabel:{control:`text`},open:{control:`boolean`},inline:{control:`boolean`},theme:{control:`select`,options:[void 0,...Object.values(F)]},size:{control:`select`,options:[void 0,...Object.values(ie)]},placeholder:{control:`text`},label:{control:`text`},loading:{control:`boolean`},disabled:{control:`boolean`},loop:{control:`boolean`},autofocus:{control:`boolean`},closeable:{control:`boolean`},onSelect:{action:`select`},onClose:{action:`close`}},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" />`})},St={args:{viewportMode:I.AfterInteraction}},K={args:{viewportMode:I.Always}},q={args:{inline:!0}},J={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" controlled />`}),play:async({canvasElement:e})=>{let t=W(e);await U.click(t.getByRole(`button`,{name:`Choose settings externally`})),await H(t.getByRole(`combobox`)).toHaveValue(`settings`),await H(t.getByRole(`option`,{name:`Open settings`})).toHaveAttribute(`aria-selected`,`true`),await H(t.getByText(/Activations: 0/)).toBeVisible()}},Y={args:{inline:!0},play:async({canvasElement:e})=>{let t=W(e),n=t.getByRole(`combobox`);await U.type(n,`CAFE dashboard`),await H(t.getAllByRole(`option`)).toHaveLength(1),await H(t.getByRole(`option`)).toHaveAccessibleName(`Café dashboard`),await U.clear(n),await U.type(n,`opst{Enter}`),await H(t.getByText(/Activations: 1/)).toBeVisible()}},X={args:{inline:!0},play:async({canvasElement:e})=>{let t=W(e);await U.click(t.getByRole(`combobox`)),await U.keyboard(`{ArrowDown}{ArrowDown}{Enter}`),await H(t.getByText(/Last command: Café dashboard/)).toBeVisible(),await U.click(t.getByRole(`option`,{name:`Delete workspace`})),await H(t.getByText(/Activations: 1/)).toBeVisible()}},Z={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" custom />`}),play:async({canvasElement:e})=>{let t=W(e);await U.click(t.getByRole(`option`,{name:`Create file`})),await H(t.getByText(/Last command: Create file/)).toBeVisible()}},Ct={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" custom full-item />`})},wt={args:{inline:!0,groups:[]}},Tt={args:{inline:!0,loading:!0}},Et={args:{inline:!0,disabled:!0}},Dt={args:{inline:!0,groups:[{id:`locked`,items:bt[0].items.map(e=>({...e,disabled:!0}))}]}},Q={render:()=>({components:{NyxCommandPaletteRemoteDemo:ut},template:`<NyxCommandPaletteRemoteDemo />`})},Ot={args:{shortcut:`SUPER+K`},play:async({canvasElement:e})=>{let t=W(e),n=W(e.ownerDocument.body),r=t.getByRole(`button`,{name:`Search commands (SUPER+K)`});r.focus(),await U.keyboard(`{Control>}k{/Control}`),await G(()=>H(n.getByRole(`dialog`)).toBeVisible()),await H(n.getByRole(`combobox`)).toHaveFocus(),await U.keyboard(`{Escape}`),await G(()=>H(r).toHaveFocus()),await U.keyboard(`{Meta>}k{/Meta}`),await G(()=>H(n.getByRole(`dialog`)).toBeVisible()),await U.keyboard(`{Enter}`),await H(t.getByText(/Activations: 1/)).toBeVisible(),await G(()=>H(r).toHaveFocus())}},kt={render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e,values:[void 0,...Object.values(F)]}),template:`
  <div style="display: grid; gap: var(--nyx-gap-xl)">
    <NyxCommandPaletteDemo
      v-for="theme in values"
      :key="theme || 'inherited'"
      :args="{ ...args, theme, inline: true }"
    />
  </div>
`})},At={render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e,values:[void 0,...Object.values(ie)]}),template:`
  <div style="display: grid; gap: var(--nyx-gap-xl); width: min(100%, 320px)">
    <NyxCommandPaletteDemo
      v-for="size in values"
      :key="size || 'inherited'"
      :args="{
        ...args,
        size,
        inline: true,
        groups: [
          {
            id: 'long',
            items: [
              {
                id: 'long',
                label:
                  'Open workspace settings and manage notification preferences for your entire team',
              },
            ],
          },
        ],
      }"
    />
  </div>
`})},jt={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`
  <div style="display: grid; gap: var(--nyx-gap-xl)">
    <NyxCommandPaletteDemo :args="args" /><NyxCommandPaletteDemo :args="args" />
  </div>
`})},Mt={args:{inline:!0,viewportMode:I.WhileSearching},play:async({canvasElement:e})=>{let t=W(e).getByRole(`combobox`);await H(t).toHaveAttribute(`aria-expanded`,`false`),await U.type(t,`settings`),await H(t).toHaveAttribute(`aria-expanded`,`true`),await U.clear(t),await H(t).toHaveAttribute(`aria-expanded`,`false`)}},Nt={args:{shortcut:`Ctrl+Enter`,viewportMode:I.AfterInteraction},render:e=>({components:{NyxCommandPaletteDemo:V},setup:()=>({args:e}),template:`
  <p>
    Focus this preview before using the shortcut, or open the story in a new tab. Browser and OS
    shortcuts may take precedence.
  </p>
  <NyxCommandPaletteDemo :args="args" />
`})},Pt={render:()=>({components:{NyxCommandPaletteConversationsDemo:vt},template:`<NyxCommandPaletteConversationsDemo />`}),play:async({canvasElement:e})=>{let t=W(e),n=W(e.ownerDocument.body);await U.click(t.getByRole(`button`,{name:`Find a conversation`})),await U.type(n.getByRole(`combobox`),`release`);let r=await n.findByRole(`option`,{name:`Release planning`});await U.click(r),await G(()=>H(t.getByRole(`heading`,{name:`Release planning`})).toBeVisible()),await G(()=>H(t.getByText(`/conversations/release`)).toBeVisible())}},$={args:{inline:!0,viewportMode:I.AfterInteraction},play:async({canvasElement:e})=>{let t=W(e),n=t.getByRole(`combobox`);await H(n).toHaveAttribute(`aria-expanded`,`false`),await U.click(t.getByRole(`button`,{name:`Show results`})),await H(n).toHaveFocus(),await H(n).toHaveAttribute(`aria-expanded`,`true`),await U.type(n,`settings`),await U.clear(n),await H(n).toHaveAttribute(`aria-expanded`,`true`)}},St.parameters={...St.parameters,docs:{...St.parameters?.docs,source:{originalSource:`{
  args: {
    viewportMode: NyxCommandPaletteViewportMode.AfterInteraction
  }
}`,...St.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    viewportMode: NyxCommandPaletteViewportMode.Always
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args
    }),
    template: '<NyxCommandPaletteDemo :args="args" controlled />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Choose settings externally'
    }));
    await expect(canvas.getByRole('combobox')).toHaveValue('settings');
    await expect(canvas.getByRole('option', {
      name: 'Open settings'
    })).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText(/Activations: 0/)).toBeVisible();
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'CAFE dashboard');
    await expect(canvas.getAllByRole('option')).toHaveLength(1);
    await expect(canvas.getByRole('option')).toHaveAccessibleName('Café dashboard');
    await userEvent.clear(input);
    await userEvent.type(input, 'opst{Enter}');
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible();
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await expect(canvas.getByText(/Last command: Café dashboard/)).toBeVisible();
    await userEvent.click(canvas.getByRole('option', {
      name: 'Delete workspace'
    }));
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible();
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args
    }),
    template: '<NyxCommandPaletteDemo :args="args" custom />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('option', {
      name: 'Create file'
    }));
    await expect(canvas.getByText(/Last command: Create file/)).toBeVisible();
  }
}`,...Z.parameters?.docs?.source}}},Ct.parameters={...Ct.parameters,docs:{...Ct.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args
    }),
    template: '<NyxCommandPaletteDemo :args="args" custom full-item />'
  })
}`,...Ct.parameters?.docs?.source}}},wt.parameters={...wt.parameters,docs:{...wt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    groups: []
  }
}`,...wt.parameters?.docs?.source}}},Tt.parameters={...Tt.parameters,docs:{...Tt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    loading: true
  }
}`,...Tt.parameters?.docs?.source}}},Et.parameters={...Et.parameters,docs:{...Et.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    disabled: true
  }
}`,...Et.parameters?.docs?.source}}},Dt.parameters={...Dt.parameters,docs:{...Dt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    groups: [{
      id: 'locked',
      items: groups[0].items.map(item => ({
        ...item,
        disabled: true
      }))
    }]
  }
}`,...Dt.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxCommandPaletteRemoteDemo
    },
    template: '<NyxCommandPaletteRemoteDemo />'
  })
}`,...Q.parameters?.docs?.source}}},Ot.parameters={...Ot.parameters,docs:{...Ot.parameters?.docs,source:{originalSource:`{
  args: {
    shortcut: 'SUPER+K'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', {
      name: 'Search commands (SUPER+K)'
    });
    trigger.focus();
    await userEvent.keyboard('{Control>}k{/Control}');
    await waitFor(() => expect(page.getByRole('dialog')).toBeVisible());
    await expect(page.getByRole('combobox')).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
    await userEvent.keyboard('{Meta>}k{/Meta}');
    await waitFor(() => expect(page.getByRole('dialog')).toBeVisible());
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible();
    await waitFor(() => expect(trigger).toHaveFocus());
  }
}`,...Ot.parameters?.docs?.source}}},kt.parameters={...kt.parameters,docs:{...kt.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args,
      values: [undefined, ...Object.values(NyxTheme)]
    }),
    template: \`
  <div style="display: grid; gap: var(--nyx-gap-xl)">
    <NyxCommandPaletteDemo
      v-for="theme in values"
      :key="theme || 'inherited'"
      :args="{ ...args, theme, inline: true }"
    />
  </div>
\`
  })
}`,...kt.parameters?.docs?.source}}},At.parameters={...At.parameters,docs:{...At.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args,
      values: [undefined, ...Object.values(NyxSize)]
    }),
    template: \`
  <div style="display: grid; gap: var(--nyx-gap-xl); width: min(100%, 320px)">
    <NyxCommandPaletteDemo
      v-for="size in values"
      :key="size || 'inherited'"
      :args="{
        ...args,
        size,
        inline: true,
        groups: [
          {
            id: 'long',
            items: [
              {
                id: 'long',
                label:
                  'Open workspace settings and manage notification preferences for your entire team',
              },
            ],
          },
        ],
      }"
    />
  </div>
\`
  })
}`,...At.parameters?.docs?.source}}},jt.parameters={...jt.parameters,docs:{...jt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  },
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args
    }),
    template: \`
  <div style="display: grid; gap: var(--nyx-gap-xl)">
    <NyxCommandPaletteDemo :args="args" /><NyxCommandPaletteDemo :args="args" />
  </div>
\`
  })
}`,...jt.parameters?.docs?.source}}},Mt.parameters={...Mt.parameters,docs:{...Mt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    viewportMode: NyxCommandPaletteViewportMode.WhileSearching
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.type(input, 'settings');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.clear(input);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  }
}`,...Mt.parameters?.docs?.source}}},Nt.parameters={...Nt.parameters,docs:{...Nt.parameters?.docs,source:{originalSource:`{
  args: {
    shortcut: 'Ctrl+Enter',
    viewportMode: NyxCommandPaletteViewportMode.AfterInteraction
  },
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args
    }),
    template: \`
  <p>
    Focus this preview before using the shortcut, or open the story in a new tab. Browser and OS
    shortcuts may take precedence.
  </p>
  <NyxCommandPaletteDemo :args="args" />
\`
  })
}`,...Nt.parameters?.docs?.source}}},Pt.parameters={...Pt.parameters,docs:{...Pt.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxCommandPaletteConversationsDemo
    },
    template: '<NyxCommandPaletteConversationsDemo />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Find a conversation'
    }));
    await userEvent.type(page.getByRole('combobox'), 'release');
    const result = await page.findByRole('option', {
      name: 'Release planning'
    });
    await userEvent.click(result);
    await waitFor(() => expect(canvas.getByRole('heading', {
      name: 'Release planning'
    })).toBeVisible());
    await waitFor(() => expect(canvas.getByText('/conversations/release')).toBeVisible());
  }
}`,...Pt.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    viewportMode: NyxCommandPaletteViewportMode.AfterInteraction
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Show results'
    }));
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.type(input, 'settings');
    await userEvent.clear(input);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
  }
}`,...$.parameters?.docs?.source}}},Ft=[`Default`,`AlwaysShown`,`Inline`,`Controlled`,`Search`,`KeyboardNavigation`,`CustomSlots`,`ItemSlotPrecedence`,`Empty`,`Loading`,`Disabled`,`AllDisabled`,`RemoteSearch`,`Overlay`,`Themes`,`Sizes`,`MultipleInstances`,`SearchOnly`,`CustomShortcut`,`ConversationSearch`,`RevealAndKeepOpen`]}))();export{Dt as AllDisabled,K as AlwaysShown,J as Controlled,Pt as ConversationSearch,Nt as CustomShortcut,Z as CustomSlots,St as Default,Et as Disabled,wt as Empty,q as Inline,Ct as ItemSlotPrecedence,X as KeyboardNavigation,Tt as Loading,jt as MultipleInstances,Ot as Overlay,Q as RemoteSearch,$ as RevealAndKeepOpen,Y as Search,Mt as SearchOnly,At as Sizes,kt as Themes,Ft as __namedExportsOrder,xt as default};