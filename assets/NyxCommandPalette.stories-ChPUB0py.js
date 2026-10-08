import{n as e}from"./chunk-BneVvdWh.js";import{$ as t,A as n,B as r,C as i,D as a,F as o,G as s,H as c,I as l,N as u,O as d,S as f,U as p,V as m,_ as h,at as g,b as _,d as ee,f as v,g as y,h as b,j as te,k as ne,m as x,n as re,nt as S,p as ie,q as C,r as ae,t as w,v as T,x as E,y as D,z as oe}from"./vue.esm-bundler-DwhgfrFn.js";import{A as se,O,S as ce,T as le,k}from"./string-CevuJH_I.js";import{n as ue,t as de}from"./useNyxProps-St-cgklA.js";import{n as fe,t as pe}from"./NyxIcon-j2DTiZ18.js";function me(e){let t=new Set,n=new Set;return e.flatMap(e=>!e||!j(e.id)||t.has(e.id)||!Array.isArray(e.items)?[]:(t.add(e.id),[{group:e,items:e.items.filter(e=>!e||!j(e.id)||!j(e.label)||n.has(e.id)?!1:(n.add(e.id),!0))}]))}function he(e,t){let n=ge(t),r=n.split(` `);return e.flatMap(({group:e,items:t})=>{let i=!n||e.ignoreFilter?t:t.map((e,t)=>{let i=A(e.label),a=[i,A(e.description??``),...(e.keywords??[]).map(A)],o=r.every(e=>a.some(t=>_e(e,t)));return{item:e,index:t,rank:i===n?0:i.startsWith(n)?1:r.every(e=>a.some(t=>t.includes(e)))?2:3,matches:o}}).filter(e=>e.matches).sort((e,t)=>e.rank-t.rank||e.index-t.index).map(e=>e.item);return i.length?[{group:e,items:i}]:[]})}var A,ge,_e,j,ve=e((()=>{A=e=>e.normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase(),ge=e=>A(e).trim().split(/\s+/u).filter(Boolean).join(` `),_e=(e,t)=>{let n=Array.from(e),r=0;for(let e of t)e===n[r]&&r++;return r===n.length},j=e=>typeof e==`string`&&!!e.trim()}));function M(e){if(!e?.trim())return;let t=e.split(`+`).map(e=>N(e.trim())),n=t.filter(e=>!P.has(e));if(!(n.length!==1||!n[0]||new Set(t).size!==t.length||t.includes(`SUPER`)&&(t.includes(`CTRL`)||t.includes(`META`))))return{key:n[0],modifiers:new Set(t.filter(e=>P.has(e)))}}function ye(e,t){let n=e.modifiers;return N(t.key)===e.key&&t.altKey===n.has(`ALT`)&&t.shiftKey===n.has(`SHIFT`)&&(n.has(`SUPER`)?t.ctrlKey!==t.metaKey:t.ctrlKey===n.has(`CTRL`)&&t.metaKey===n.has(`META`))}function be(e,t,r){let i=x(()=>{let t=M(e.shortcut);return e.shortcut?.trim(),t}),a,o,c={root:t,toggle:r,accepts:t=>!e.inline&&!e.disabled&&!!i.value&&ye(i.value,t)},l=e=>{if(!a||e.defaultPrevented||e.repeat||e.isComposing||e.keyCode===229)return;let n=e.composedPath()[0];if(!(n instanceof HTMLElement))return;let i=a.activeElement?.closest(`dialog[open]`),o=[...F.get(a)??[]].reverse().filter(t=>t.accepts(e)&&(!i||t.root.value===i));(o.find(e=>e.root.value?.contains(n))??o[0])===c&&(n.closest(`input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]`)&&!t.value?.contains(n)||(e.preventDefault(),r()))};return te(()=>{if(a=t.value?.ownerDocument,!a)return;let n=F.get(a)??new Set;n.add(c),F.set(a,n),o=s(()=>!e.inline&&!e.disabled&&!!i.value,e=>{e?a?.addEventListener(`keydown`,l):a?.removeEventListener(`keydown`,l)},{immediate:!0})}),n(()=>{if(o?.(),a?.removeEventListener(`keydown`,l),a){let e=F.get(a);e?.delete(c),e?.size||F.delete(a)}}),{matches:c.accepts}}var xe,N,P,F,I=e((()=>{w(),xe={CONTROL:`CTRL`,COMMAND:`META`,CMD:`META`,OPTION:`ALT`,MOD:`SUPER`," ":`SPACE`,"+":`PLUS`,ESC:`ESCAPE`},N=e=>xe[e.toUpperCase()]??e.toUpperCase(),P=new Set([`CTRL`,`META`,`ALT`,`SHIFT`,`SUPER`]),F=new WeakMap}));function L(){let e,t=()=>{e?.cancel(),e=void 0};return{play:(n,r,i=!1)=>{let a=n.ownerDocument.defaultView;if(!a||!n.animate||a.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return t(),Promise.resolve();let o=a.getComputedStyle(n),s=i?`0`:o.opacity,c=i?`translateY(${o.getPropertyValue(`--nyx-gap-lg`).trim()||`0px`}) scale(0.97)`:o.transform,l=o.getPropertyValue(r?`--nyx-command-palette-enter-duration`:`--nyx-command-palette-exit-duration`).trim(),u=Number.parseFloat(l)*(l.endsWith(`ms`)?1:1e3);return t(),e=n.animate([{opacity:s,transform:c},{opacity:r?1:0,transform:r?`translateY(0) scale(1)`:`translateY(0) scale(0.98)`}],{duration:Number.isFinite(u)?u:0,easing:r?`cubic-bezier(0.22, 1, 0.36, 1)`:`cubic-bezier(0.4, 0, 1, 1)`,fill:`both`}),e.finished.catch(()=>{})},cancel:t,finish:()=>e?.finish()}}var Se=e((()=>{}));function Ce(e,r,i,a,o){let c=t(!1),l=t(!1),u=L(),d=0,f,p=()=>{f?.matches&&u.finish()},m=null,h=null,g=!1,_=!1,ee=()=>e.inline||!!m?.open,v=()=>{c.value&&ee()&&!l.value&&!e.disabled&&a.value?.focus()},y=()=>{d++,u.cancel(),l.value=!1;let e=m;if(!e)return;let t=e.ownerDocument,n=R.get(t),r=n&&[...n.owners].slice(-1)[0]===e&&(e.contains(t.activeElement)||t.activeElement===t.body);m=null,e.open&&e.close(),n?.owners.delete(e),n&&!n.owners.size&&(t.body.style.getPropertyValue(`overflow`)===`hidden`&&(n.value?t.body.style.setProperty(`overflow`,n.value,n.priority):t.body.style.removeProperty(`overflow`)),R.delete(t)),r&&h?.isConnected&&!h.closest(`[inert]`)&&!h.matches(`:disabled`)&&h.getClientRects().length&&h.focus(),h=null,g=!1},b=async()=>{if(!m||l.value)return;let e=++d;l.value=!0,await u.play(m,!1),e===d&&!r.value&&y()};s(()=>e.inline,y,{flush:`pre`}),s([c,r,()=>e.inline,i],async()=>{if(!c.value||e.inline){y();return}if(!r.value){b();return}let t=i.value;if(!t||t.tagName!==`DIALOG`||m===t&&!l.value)return;let n=++d,a=m!==t;l.value=!1,m=t;let o=t.ownerDocument;a&&(h=o.activeElement instanceof HTMLElement?o.activeElement:null,m.showModal());let s=R.get(o);s||(s={owners:new Set,value:o.body.style.getPropertyValue(`overflow`),priority:o.body.style.getPropertyPriority(`overflow`)},R.set(o,s),o.body.style.setProperty(`overflow`,`hidden`)),s.owners.add(m);let f=u.play(m,!0,a);await ne(),!(m!==t||!r.value||e.inline)&&(e.disabled?(z(t)[0]??t).focus():v(),await f,n===d&&u.cancel())},{flush:`post`});let x=()=>{if(e.inline){o();return}!m?.open||!r.value||[...R.get(m.ownerDocument)?.owners??[]].slice(-1)[0]===m&&(r.value=!1,o())},re=e=>{if(!(e.isComposing||_||e.keyCode===229)){if(e.key===`Escape`)e.preventDefault(),e.stopPropagation(),x();else if(e.key===`Tab`&&m?.open){let t=z(m),n=m.ownerDocument.activeElement;if(!t.length){e.preventDefault(),m.focus();return}e.shiftKey&&(n===t[0]||!t.includes(n))?(e.preventDefault(),t[t.length-1]?.focus()):!e.shiftKey&&(n===t[t.length-1]||!t.includes(n))&&(e.preventDefault(),t[0].focus())}}},S=e=>{if(!m||e.target!==m)return!1;let t=m.getBoundingClientRect();return e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom};return te(()=>{c.value=!0,f=i.value?.ownerDocument.defaultView?.matchMedia?.(`(prefers-reduced-motion: reduce)`),f?.addEventListener(`change`,p),e.inline&&e.autofocus&&v()}),n(()=>{f?.removeEventListener(`change`,p),y()}),{mounted:c,closing:l,focus:v,dismiss:x,onKeydown:re,toggle:()=>{r.value?x():r.value=!0},onCancel:e=>{e.preventDefault(),_||x()},onComposition:e=>{_=e},onPointerDown:e=>{g=e.button===0&&S(e)},onPointerUp:e=>{let t=g&&S(e);g=!1,t&&x()},onPointerCancel:()=>{g=!1}}}var R,z,we=e((()=>{Se(),w(),R=new WeakMap,z=e=>Array.from(e.querySelectorAll(`button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])`)).filter(e=>e.tabIndex>=0&&!e.closest(`[inert]`)&&e.getClientRects().length>0)})),Te=e((()=>{})),Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,B,Ve=e((()=>{w(),O(),de(),fe(),se(),ve(),I(),we(),Te(),Ee={class:`nyx-command-palette__search`},De=[`id`,`aria-label`,`aria-controls`,`aria-expanded`,`aria-activedescendant`,`placeholder`,`value`,`disabled`],Oe=[`aria-label`],ke=[`data-visible`,`inert`,`aria-hidden`],Ae={class:`nyx-command-palette__results-content`},je=[`id`,`aria-label`,`aria-busy`],Me=[`id`],Ne=[`id`,`data-active`,`aria-selected`,`aria-disabled`,`aria-label`,`aria-describedby`,`onPointermove`,`onClick`],Pe={key:0,class:`nyx-command-palette__leading`},Fe={class:`nyx-command-palette__label`},Ie=[`id`],Le={key:1,class:`nyx-command-palette__trailing`},Re={class:`nyx-command-palette__status`,role:`status`},ze={key:0,class:`nyx-command-palette__footer`},Be=[`aria-label`,`title`,`aria-controls`,`disabled`],B=f({inheritAttrs:!1,__name:`NyxCommandPalette`,props:a({groups:{},inline:{type:Boolean,default:!1},shortcut:{},viewportMode:{default:k.AfterInteraction},showResultsLabel:{default:`Show results`},placeholder:{default:`Search commands...`},label:{default:`Search commands`},loading:{type:Boolean,default:!1},loadingText:{default:`Loading commands...`},emptyText:{default:`No commands found.`},disabled:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},loop:{type:Boolean,default:!0},closeable:{type:Boolean,default:!1},closeLabel:{default:`Close command palette`},theme:{},size:{}},{modelValue:{},modelModifiers:{},searchTerm:{},searchTermModifiers:{},open:{type:Boolean,default:!1},openModifiers:{}}),emits:a([`select`,`close`],[`update:modelValue`,`update:searchTerm`,`update:open`]),setup(e,{expose:n,emit:a}){let f=e,te=c(e,`modelValue`),w=c(e,`searchTerm`),D=c(e,`open`),se=a,O=p(),le=r(),{classList:de}=ue(f,{origin:`NyxCommandPalette`}),fe=t(null),A=t(null),_e=t(null),j=Ce(f,D,fe,A,()=>se(`close`)),{mounted:ve,closing:M}=j,ye=be(f,fe,j.toggle),xe=i(),N=()=>{let e=xe.vnode.props??{};return`modelValue`in e||`model-value`in e},P=t(te.value),F=x(()=>N()?te.value:P.value),I=x(()=>w.value??``),L=t(!1),Se=t(!1);s([I,()=>f.viewportMode],([e,t],n)=>{n&&t!==n[1]&&(L.value=!1),Se.value=!1,e.trim()&&(L.value=!0)},{immediate:!0,flush:`sync`}),s(D,e=>{!e&&!f.inline?(L.value=!1,Se.value=!1):e&&!f.inline&&I.value.trim()&&(L.value=!0)},{flush:`sync`});let R=x(()=>f.viewportMode===k.Always||!!I.value.trim()||Se.value||f.viewportMode===k.AfterInteraction&&L.value),z=()=>{f.disabled||M.value||(j.focus(),L.value=!0,Se.value=!0)},we=x(()=>me(f.groups)),Te=x(()=>he(we.value,I.value)),B=x(()=>R.value?Te.value.reduce((e,t)=>e+t.items.length,0):0),Ve=x(()=>f.disabled||f.loading||!R.value||M.value?[]:Te.value.flatMap(({items:e})=>e.filter(e=>!e.disabled))),V=t();s([()=>ge(I.value),Ve,F],([e,t,n],r)=>{let i=t[0]?.id;r?.length&&e!==r[0]?V.value=i:(!r?.length||n!==r[2])&&t.some(e=>e.id===n)?V.value=n:t.some(e=>e.id===V.value)||(V.value=i)},{immediate:!0}),s(we,e=>{!N()&&!e.some(({items:e})=>e.some(e=>e.id===P.value))&&(P.value=void 0)});let He=m(),H=(e,t=``)=>`${He}-${e}-${Array.from(t,e=>e.codePointAt(0).toString(16)).join(`-`)}`,U=(e,t,n)=>({item:e,group:t,index:n,active:V.value===e.id,selected:F.value===e.id,disabled:f.disabled||f.loading||M.value||!R.value||!!e.disabled,searchTerm:I.value}),Ue=(e,t,n)=>{if(!f.inline&&!D.value||!Ve.value.some(t=>t.id===e.id))return;j.focus();let r=!N()&&P.value!==e.id&&te.value===e.id;P.value=e.id,r?xe.emit(`update:modelValue`,e.id):te.value=e.id,se(`select`,{item:e,group:t,originalEvent:n})},We=!1,Ge=e=>{We=e,j.onComposition(e)},W=e=>{if(We||e.isComposing||e.keyCode===229||ye.matches(e))return;if(e.key===`ArrowDown`&&!R.value){e.preventDefault(),e.repeat||z();return}let t=Ve.value;if(e.key===`Enter`){if(e.preventDefault(),e.repeat)return;if(!R.value){z();return}let t=Te.value.find(e=>e.items.some(e=>e.id===V.value)),n=t?.items.find(e=>e.id===V.value);n&&t&&Ue(n,t.group,e);return}let n=t.findIndex(e=>e.id===V.value);if(e.key===`ArrowDown`)n++;else if(e.key===`ArrowUp`)n=n<0?t.length-1:n-1;else if(e.altKey&&e.key===`Home`)n=0;else if(e.altKey&&e.key===`End`)n=t.length-1;else return;e.preventDefault(),t.length&&(n=f.loop?(n+t.length)%t.length:Math.max(0,Math.min(n,t.length-1)),V.value=t[n]?.id)},G=()=>{if(!R.value||!f.inline&&!D.value)return;let e=_e.value,t=V.value&&e?.ownerDocument.getElementById(H(`option`,V.value));if(!e?.clientHeight||!t)return;let n=t.offsetTop,r=t.offsetParent;for(;r&&r!==e;)n+=r.offsetTop,r=r.offsetParent;n<e.scrollTop?e.scrollTop=n:n+t.offsetHeight>e.scrollTop+e.clientHeight&&(e.scrollTop=n+t.offsetHeight-e.clientHeight)};s([V,R,()=>f.inline||ve.value&&D.value],async()=>{await ne(),G()},{immediate:!0}),s(_e,(e,t,n)=>{if(!e||typeof ResizeObserver>`u`)return;let r=new ResizeObserver(G);r.observe(e),n(()=>r.disconnect())});let Ke=e=>{e.setAttribute(`aria-hidden`,`true`),e.setAttribute(`inert`,``)},K=e=>{e.removeAttribute(`aria-hidden`),e.removeAttribute(`inert`)},qe=()=>Object.fromEntries(Object.entries(le).filter(([e])=>e!==`class`&&e!==`style`));return n({focus:j.focus}),(t,n)=>(u(),y(ie,{to:`body`,disabled:e.inline||!S(ve)},[(u(),y(oe(e.inline?`div`:`dialog`),d({ref_key:`root`,ref:fe},qe(),{class:[`nyx-command-palette`,[S(de),S(le).class]],style:S(le).style,"data-closing":S(M),"data-results-visible":R.value,"aria-label":e.inline?void 0:e.label,"aria-modal":e.inline?void 0:!0,tabindex:`-1`,onKeydown:S(j).onKeydown,onCancel:S(j).onCancel,onPointerdown:S(j).onPointerDown,onPointerup:S(j).onPointerUp,onPointercancel:S(j).onPointerCancel}),{default:C(()=>[b(`div`,Ee,[E(pe,{name:`search`,"aria-hidden":`true`}),b(`input`,{id:H(`input`),ref_key:`input`,ref:A,class:`nyx-command-palette__input`,type:`text`,role:`combobox`,"aria-label":e.label,"aria-autocomplete":`list`,"aria-controls":H(`list`),"aria-expanded":(e.inline||S(ve)&&D.value)&&!e.disabled&&R.value&&!S(M),"aria-activedescendant":V.value?H(`option`,V.value):void 0,placeholder:e.placeholder,value:I.value,disabled:e.disabled,autocomplete:`off`,onInput:n[0]||=e=>w.value=e.target.value,onKeydown:W,onCompositionstart:n[1]||=e=>Ge(!0),onCompositionend:n[2]||=e=>Ge(!1)},null,40,De),e.closeable?(u(),T(`button`,{key:0,class:`nyx-command-palette__close`,type:`button`,"aria-label":e.closeLabel,onClick:n[3]||=(...e)=>S(j).dismiss&&S(j).dismiss(...e)},[E(pe,{name:`x`,"aria-hidden":`true`})],8,Oe)):h(``,!0)]),b(`div`,{class:`nyx-command-palette__results`,"data-visible":R.value,inert:!R.value,"aria-hidden":!R.value},[b(`div`,{ref_key:`viewport`,ref:_e,class:`nyx-command-palette__viewport`},[b(`div`,Ae,[b(`div`,{id:H(`list`),role:`listbox`,"aria-label":e.label,"aria-busy":e.loading},[(u(!0),T(v,null,o(Te.value,({group:e,items:r})=>(u(),y(ae,{key:e.id,tag:`div`,role:`group`,appear:``,name:`nyx-command-palette-result`,onBeforeLeave:Ke,onBeforeEnter:K,onLeaveCancelled:K,"aria-labelledby":e.label?.trim()||O[`group-label`]?H(`group`,e.id):void 0,class:`nyx-command-palette__group`},{default:C(()=>[e.label?.trim()||O[`group-label`]?(u(),T(`div`,{key:`heading`,id:H(`group`,e.id),class:`nyx-command-palette__heading`},[l(t.$slots,`group-label`,{group:e,searchTerm:I.value},()=>[_(g(e.label),1)])],8,Me)):h(``,!0),(u(!0),T(v,null,o(r,(r,i)=>(u(),T(`button`,{id:H(`option`,r.id),key:`item:${r.id}`,type:`button`,role:`option`,tabindex:`-1`,class:`nyx-command-palette__option`,"data-active":V.value===r.id,"aria-selected":F.value===r.id,"aria-disabled":U(r,e,i).disabled,"aria-label":r.label,"aria-describedby":!O.item&&!O[`item-label`]&&r.description?H(`description`,r.id):void 0,onPointermove:t=>!U(r,e,i).disabled&&(V.value=r.id),onMousedown:n[4]||=ee(()=>{},[`prevent`]),onClick:t=>Ue(r,e,t)},[O.item?l(t.$slots,`item`,d({key:0,ref_for:!0},U(r,e,i))):(u(),T(v,{key:1},[O[`item-leading`]||r.icon?(u(),T(`span`,Pe,[l(t.$slots,`item-leading`,d({ref_for:!0},U(r,e,i)),()=>[E(pe,{name:r.icon,"aria-hidden":`true`},null,8,[`name`])])])):h(``,!0),b(`span`,Fe,[l(t.$slots,`item-label`,d({ref_for:!0},U(r,e,i)),()=>[b(`span`,null,g(r.label),1),r.description?(u(),T(`span`,{key:0,id:H(`description`,r.id),class:`nyx-command-palette__description`},g(r.description),9,Ie)):h(``,!0)])]),O[`item-trailing`]||r.shortcuts?.length?(u(),T(`span`,Le,[l(t.$slots,`item-trailing`,d({ref_for:!0},U(r,e,i)),()=>[(u(!0),T(v,null,o(r.shortcuts,(e,t)=>(u(),T(`kbd`,{key:t,"aria-hidden":`true`},g(e),1))),128))])])):h(``,!0)],64))],40,Ne))),128))]),_:2},1032,[`aria-labelledby`]))),128))],8,je),E(re,{name:`nyx-command-palette-state`,mode:`out-in`,onBeforeLeave:Ke},{default:C(()=>[e.loading||!B.value?(u(),T(`div`,{key:e.loading?`loading`:`empty`,class:`nyx-command-palette__state`},[e.loading?l(t.$slots,`loading`,{key:0,searchTerm:I.value},()=>[E(pe,{name:`loader-circle`,"aria-hidden":`true`}),_(g(e.loadingText),1)]):l(t.$slots,`empty`,{key:1,searchTerm:I.value},()=>[_(g(e.emptyText),1)])])):h(``,!0)]),_:3})])],512)],8,ke),b(`span`,Re,g(R.value?e.loading?e.loadingText:B.value?``:e.emptyText:``),1),O.footer||!R.value?(u(),T(`div`,ze,[l(t.$slots,`footer`,{searchTerm:I.value,resultCount:B.value}),R.value?h(``,!0):(u(),T(`button`,{key:0,class:`nyx-command-palette__reveal`,type:`button`,"aria-label":e.showResultsLabel,title:e.showResultsLabel,"aria-controls":H(`list`),"aria-expanded":!1,disabled:e.disabled||S(M),onClick:z},[E(pe,{name:`chevrons-down`,size:S(ce).XSmall,"aria-hidden":`true`},null,8,[`size`])],8,Be))])):h(``,!0)]),_:3},16,[`class`,`style`,`data-closing`,`data-results-visible`,`aria-label`,`aria-modal`,`onKeydown`,`onCancel`,`onPointerdown`,`onPointerup`,`onPointercancel`]))],8,[`disabled`]))}})})),V,He=e((()=>{Ve(),Ve(),V=B,B.__docgenInfo=Object.assign({displayName:B.name??B.__name},{exportName:`default`,displayName:`NyxCommandPalette`,description:``,tags:{},expose:[{name:`focus`}],props:[{name:`groups`,required:!0,type:{name:`TSTypeOperator`}},{name:`inline`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`shortcut`,required:!1,type:{name:`string`}},{name:`viewportMode`,required:!1,type:{name:`NyxCommandPaletteViewportMode`},defaultValue:{func:!1,value:`NyxCommandPaletteViewportMode.AfterInteraction`}},{name:`showResultsLabel`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Show results'`}},{name:`placeholder`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Search commands...'`}},{name:`label`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Search commands'`}},{name:`loading`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`loadingText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Loading commands...'`}},{name:`emptyText`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'No commands found.'`}},{name:`disabled`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`autofocus`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`loop`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`closeable`,required:!1,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`closeLabel`,required:!1,type:{name:`string`},defaultValue:{func:!1,value:`'Close command palette'`}},{name:`theme`,required:!1,type:{name:`NyxTheme`}},{name:`size`,required:!1,type:{name:`NyxSize`}}],events:[{name:`select`,type:{names:[`NyxCommandPaletteSelectEvent`],elements:[{name:`T`}]}},{name:`close`}],slots:[{name:`group-label`,scoped:!0,bindings:[{name:`group`,title:`binding`},{name:`search-term`,title:`binding`}]},{name:`item`,scoped:!0,bindings:[]},{name:`item-leading`,scoped:!0,bindings:[]},{name:`item-label`,scoped:!0,bindings:[]},{name:`item-trailing`,scoped:!0,bindings:[]},{name:`loading`,scoped:!0,bindings:[{name:`search-term`,title:`binding`}]},{name:`empty`,scoped:!0,bindings:[{name:`search-term`,title:`binding`}]},{name:`footer`,scoped:!0,bindings:[{name:`search-term`,title:`binding`},{name:`result-count`,title:`binding`}]}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/NyxCommandPalette.vue`]})})),H,U,Ue,We,Ge,W,G,Ke=e((()=>{w(),He(),H={style:{display:`grid`,gap:`var(--nyx-gap-lg)`,"max-width":`100%`}},U={key:1},Ue={"aria-hidden":`true`},We={style:{display:`block`}},Ge={"aria-live":`polite`},{action:W}=__STORYBOOK_MODULE_ACTIONS__,G=f({__name:`NyxCommandPaletteDemo`,props:{args:{},controlled:{type:Boolean},custom:{type:Boolean},fullItem:{type:Boolean}},setup(e){let n=e,r=t(!1),i=t(``),a=t(),o=t(0),c=t(`None`);s(()=>n.args.open,e=>{r.value=!!e}),s(r,W(`update:open`)),s(i,W(`update:searchTerm`)),s(a,W(`update:modelValue`));let l=e=>{W(`select`)(e),o.value++,c.value=e.item.label,n.args.inline||(r.value=!1)};return(t,n)=>(u(),T(`section`,H,[e.args.inline?h(``,!0):(u(),T(`button`,{key:0,type:`button`,onClick:n[0]||=e=>r.value=!0},`Search commands`+g(e.args.shortcut?` (${e.args.shortcut})`:``),1)),e.controlled?(u(),T(`div`,U,[b(`button`,{type:`button`,onClick:n[1]||=e=>{i.value=`settings`,a.value=`settings`}},`Choose settings externally`),b(`button`,{type:`button`,onClick:n[2]||=e=>i.value=``},`Clear query`)])):h(``,!0),E(V,d(e.args,{open:r.value,"onUpdate:open":n[3]||=e=>r.value=e,"search-term":i.value,"onUpdate:searchTerm":n[4]||=e=>i.value=e,modelValue:a.value,"onUpdate:modelValue":n[5]||=e=>a.value=e,onSelect:l,onClose:n[6]||=e=>S(W)(`close`)()}),D({footer:C(()=>[n[8]||=_(`↑ ↓ navigate · Enter run`,-1)]),_:2},[e.custom?{name:`group-label`,fn:C(({group:e})=>[_(g(e.label||`Commands`)+` · Application`,1)]),key:`0`}:void 0,e.custom?{name:`item-leading`,fn:C(({index:e})=>[b(`span`,Ue,g(e+1)+`.`,1)]),key:`1`}:void 0,e.custom?{name:`item-label`,fn:C(({item:e})=>[b(`strong`,null,g(e.label),1),b(`small`,We,g(e.description),1)]),key:`2`}:void 0,e.custom?{name:`item-trailing`,fn:C(({selected:e})=>[_(g(e?`Last used`:`Run`),1)]),key:`3`}:void 0,e.fullItem?{name:`item`,fn:C(({item:e})=>[_(`Custom command: `+g(e.label),1)]),key:`4`}:void 0,e.custom?{name:`empty`,fn:C(({searchTerm:e})=>[_(`Try another phrase for “`+g(e)+`”.`,1)]),key:`5`}:void 0,e.custom?{name:`loading`,fn:C(()=>[n[7]||=_(`Looking up your commands…`,-1)]),key:`6`}:void 0]),1040,[`open`,`search-term`,`modelValue`]),b(`output`,Ge,`Last command: `+g(c.value)+` · Selected: `+g(a.value||`None`)+` · Activations: `+g(o.value),1)]))}})})),K,qe=e((()=>{Ke(),Ke(),K=G,G.__docgenInfo=Object.assign({displayName:G.name??G.__name},{exportName:`default`,displayName:`NyxCommandPaletteDemo`,description:``,tags:{},props:[{name:`args`,required:!0,type:{name:`intersection`,elements:[{name:`NyxCommandPaletteProps`},{name:`{ open?: boolean }`}]}},{name:`controlled`,required:!1,type:{name:`boolean`}},{name:`custom`,required:!1,type:{name:`boolean`}},{name:`fullItem`,required:!1,type:{name:`boolean`}}],sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteDemo.vue`]})})),Je,Ye,Xe=e((()=>{w(),He(),{action:Je}=__STORYBOOK_MODULE_ACTIONS__,Ye=f({__name:`NyxCommandPaletteRemoteDemo`,setup(e){let r=t(``),i=t(!1),a=t([]),o=t(`None`),c=t(0),l=new Set,d=0,f=(e,t)=>{let n=setTimeout(()=>{l.delete(n),e()},t);return l.add(n),n};s(r,(e,t,n)=>{Je(`update:searchTerm`)(e);let r=++d;i.value=!0;let o=f(()=>{c.value++,f(()=>{r===d&&(a.value=e===`none`?[]:[{id:`remote`,label:`Remote matches`,ignoreFilter:!0,items:[{id:`remote-${e}`,label:`Server result for ${e||`all commands`}`,description:`Order supplied by the server`}]}],i.value=!1)},e.length===1?900:100)},150);n(()=>{clearTimeout(o),l.delete(o)})},{immediate:!0}),n(()=>{d++,l.forEach(clearTimeout)});let p=e=>{o.value=e.item.id,Je(`select`)(e)};return(e,t)=>(u(),T(`section`,null,[t[1]||=b(`p`,null,`Try “a”, then “ab” while loading. Only the latest response appears. Search “none” for no matches.`,-1),E(V,{inline:``,"search-term":r.value,"onUpdate:searchTerm":t[0]||=e=>r.value=e,groups:a.value,loading:i.value,onSelect:p},null,8,[`search-term`,`groups`,`loading`]),b(`output`,null,`Selected: `+g(o.value)+` · Requests: `+g(c.value),1)]))}})})),Ze,Qe=e((()=>{Xe(),Xe(),Ze=Ye,Ye.__docgenInfo=Object.assign({displayName:Ye.name??Ye.__name},{exportName:`default`,displayName:`NyxCommandPaletteRemoteDemo`,description:``,tags:{},sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteRemoteDemo.vue`]})})),$e,et,tt,nt,rt,it=e((()=>{w(),se(),He(),$e={style:{display:`grid`,gap:`var(--nyx-gap-lg)`}},et={key:0,"aria-live":`polite`},tt={key:1},{action:nt}=__STORYBOOK_MODULE_ACTIONS__,rt=f({__name:`NyxCommandPaletteConversationsDemo`,setup(e){let r=[{id:`release`,label:`Release planning`,description:`Maya: Shall we ship the search improvements on Friday?`,icon:`messages-square`,to:`/conversations/release`,updated:`Today`},{id:`design`,label:`Design feedback`,description:`Jonas: The quieter search focus feels much better.`,icon:`messages-square`,to:`/conversations/design`,updated:`Yesterday`},{id:`support`,label:`Customer support`,description:`Ari: How do I find an earlier conversation?`,icon:`messages-square`,to:`/conversations/support`,updated:`Monday`}],i=t(!1),a=t(``),o=t(!1),c=t([]),l=t(),d=t(`/conversations`),f=x(()=>[{id:`conversations`,label:`Conversations`,ignoreFilter:!0,items:c.value}]),p;s(a,(e,t,n)=>{if(nt(`update:searchTerm`)(e),o.value=!!e.trim(),!e.trim()){c.value=[];return}p=setTimeout(()=>{let t=e.toLowerCase().trim();c.value=r.filter(e=>`${e.label} ${e.description}`.toLowerCase().includes(t)),o.value=!1},250),n(()=>clearTimeout(p))}),n(()=>clearTimeout(p));let m=({item:e})=>{d.value=e.to,l.value=e,i.value=!1,nt(`navigate`)(e.to)};return(e,t)=>(u(),T(`section`,$e,[b(`button`,{type:`button`,onClick:t[0]||=e=>i.value=!0},`Find a conversation`),E(V,{open:i.value,"onUpdate:open":t[1]||=e=>i.value=e,"search-term":a.value,"onUpdate:searchTerm":t[2]||=e=>a.value=e,groups:f.value,loading:o.value,"viewport-mode":S(k).WhileSearching,label:`Find conversations`,placeholder:`Search conversations...`,closeable:``,onSelect:m},{"item-trailing":C(({item:e})=>[b(`small`,null,g(e.updated),1)]),footer:C(()=>[...t[3]||=[_(`Search titles and messages. Try “release” or “design”.`,-1)]]),_:1},8,[`open`,`search-term`,`groups`,`loading`,`viewport-mode`]),b(`code`,null,g(d.value),1),l.value?(u(),T(`article`,et,[b(`h2`,null,g(l.value.label),1),b(`p`,null,g(l.value.description),1)])):(u(),T(`p`,tt,`Open a conversation from search to view it here.`))]))}})})),at,ot=e((()=>{it(),it(),at=rt,rt.__docgenInfo=Object.assign({displayName:rt.name??rt.__name},{exportName:`default`,displayName:`NyxCommandPaletteConversationsDemo`,description:``,tags:{},sourceFiles:[`/home/arnedecant/Projects/nyxkit/nyx-kit/src/components/NyxCommandPalette/storybook/NyxCommandPaletteConversationsDemo.vue`]})})),q,J,Y,X,st,ct,Z,Q,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt,$,bt,xt,St,Ct,wt,Tt,Et,Dt;e((()=>{se(),O(),He(),qe(),Qe(),ot(),{expect:q,userEvent:J,within:Y,waitFor:X}=__STORYBOOK_MODULE_TEST__,st=[{id:`actions`,label:`Actions`,items:[{id:`settings`,label:`Open settings`,description:`Manage your workspace`,icon:`settings`,keywords:[`preferences`],shortcuts:[`Ctrl`,`,`]},{id:`file`,label:`Create file`,icon:`file-plus`,shortcuts:[`Ctrl`,`N`]},{id:`locked`,label:`Delete workspace`,description:`Administrator access required`,disabled:!0,icon:`lock`}]},{id:`destinations`,label:`Destinations`,items:[{id:`cafe`,label:`Café dashboard`,description:`Project overview`,icon:`layout-dashboard`},{id:`docs`,label:`Documentation`,description:`Read the user guide`,icon:`book-open`,keywords:[`help`]}]}],ct={title:`Components/Navigation/NyxCommandPalette`,component:V,tags:[`autodocs`],args:{groups:st,viewportMode:k.Always,inline:!1,open:!1,closeable:!0},parameters:{docs:{description:{component:'Standalone native-dialog command palette, or inline with `inline`. `v-model` is the last activated ID, `v-model:search-term` controls discovery, and `v-model:open` controls the overlay. `select` supplies { item, group, originalEvent }; selection never closes automatically. `close` reports user dismissal. Item content slots retain option semantics; do not add interactive descendants. Slots: item, item-leading, item-label, item-trailing, group-label, empty, loading, footer. Public focus() focuses visible enabled search. Set shortcut="SUPER+K" to opt into Ctrl/Meta+K toggling, or pass a custom chord. viewportMode defaults to AfterInteraction: reveal on typing, footer button, or Enter and keep results visible after clearing. WhileSearching hides on clear; Always shows immediately. Requests and navigation remain consumer-owned.'}}},argTypes:{shortcut:{control:`text`},viewportMode:{control:`select`,options:Object.values(k)},showResultsLabel:{control:`text`},open:{control:`boolean`},inline:{control:`boolean`},theme:{control:`select`,options:[void 0,...Object.values(le)]},size:{control:`select`,options:[void 0,...Object.values(ce)]},placeholder:{control:`text`},label:{control:`text`},loading:{control:`boolean`},disabled:{control:`boolean`},loop:{control:`boolean`},autofocus:{control:`boolean`},closeable:{control:`boolean`},onSelect:{action:`select`},onClose:{action:`close`}},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" />`})},Z={args:{viewportMode:k.AfterInteraction}},Q={args:{viewportMode:k.Always}},lt={args:{inline:!0}},ut={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" controlled />`}),play:async({canvasElement:e})=>{let t=Y(e);await J.click(t.getByRole(`button`,{name:`Choose settings externally`})),await q(t.getByRole(`combobox`)).toHaveValue(`settings`),await q(t.getByRole(`option`,{name:`Open settings`})).toHaveAttribute(`aria-selected`,`true`),await q(t.getByText(/Activations: 0/)).toBeVisible()}},dt={args:{inline:!0},play:async({canvasElement:e})=>{let t=Y(e),n=t.getByRole(`combobox`);await J.type(n,`CAFE dashboard`),await q(t.getAllByRole(`option`)).toHaveLength(1),await q(t.getByRole(`option`)).toHaveAccessibleName(`Café dashboard`),await J.clear(n),await J.type(n,`opst{Enter}`),await q(t.getByText(/Activations: 1/)).toBeVisible()}},ft={args:{inline:!0},play:async({canvasElement:e})=>{let t=Y(e);await J.click(t.getByRole(`combobox`)),await J.keyboard(`{ArrowDown}{ArrowDown}{Enter}`),await q(t.getByText(/Last command: Café dashboard/)).toBeVisible(),await J.click(t.getByRole(`option`,{name:`Delete workspace`})),await q(t.getByText(/Activations: 1/)).toBeVisible()}},pt={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" custom />`}),play:async({canvasElement:e})=>{let t=Y(e);await J.click(t.getByRole(`option`,{name:`Create file`})),await q(t.getByText(/Last command: Create file/)).toBeVisible()}},mt={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<NyxCommandPaletteDemo :args="args" custom full-item />`})},ht={args:{inline:!0,groups:[]}},gt={args:{inline:!0,loading:!0}},_t={args:{inline:!0,disabled:!0}},vt={args:{inline:!0,groups:[{id:`locked`,items:st[0].items.map(e=>({...e,disabled:!0}))}]}},yt={render:()=>({components:{NyxCommandPaletteRemoteDemo:Ze},template:`<NyxCommandPaletteRemoteDemo />`})},$={args:{shortcut:`SUPER+K`},play:async({canvasElement:e})=>{let t=Y(e),n=Y(e.ownerDocument.body),r=t.getByRole(`button`,{name:`Search commands (SUPER+K)`});r.focus(),await J.keyboard(`{Control>}k{/Control}`),await X(()=>q(n.getByRole(`dialog`)).toBeVisible()),await q(n.getByRole(`combobox`)).toHaveFocus(),await J.keyboard(`{Escape}`),await X(()=>q(r).toHaveFocus()),await J.keyboard(`{Meta>}k{/Meta}`),await X(()=>q(n.getByRole(`dialog`)).toBeVisible()),await J.keyboard(`{Enter}`),await q(t.getByText(/Activations: 1/)).toBeVisible(),await X(()=>q(r).toHaveFocus())}},bt={render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e,values:[void 0,...Object.values(le)]}),template:`<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo v-for="theme in values" :key="theme || 'inherited'" :args="{ ...args, theme, inline: true }" /></div>`})},xt={render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e,values:[void 0,...Object.values(ce)]}),template:`<div style="display: grid; gap: var(--nyx-gap-xl); width: min(100%, 320px)"><NyxCommandPaletteDemo v-for="size in values" :key="size || 'inherited'" :args="{ ...args, size, inline: true, groups: [{ id: 'long', items: [{ id: 'long', label: 'Open workspace settings and manage notification preferences for your entire team' }] }] }" /></div>`})},St={args:{inline:!0},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo :args="args" /><NyxCommandPaletteDemo :args="args" /></div>`})},Ct={args:{inline:!0,viewportMode:k.WhileSearching},play:async({canvasElement:e})=>{let t=Y(e).getByRole(`combobox`);await q(t).toHaveAttribute(`aria-expanded`,`false`),await J.type(t,`settings`),await q(t).toHaveAttribute(`aria-expanded`,`true`),await J.clear(t),await q(t).toHaveAttribute(`aria-expanded`,`false`)}},wt={args:{shortcut:`Ctrl+Enter`,viewportMode:k.AfterInteraction},render:e=>({components:{NyxCommandPaletteDemo:K},setup:()=>({args:e}),template:`<p>Focus this preview before using the shortcut, or open the story in a new tab. Browser and OS shortcuts may take precedence.</p><NyxCommandPaletteDemo :args="args" />`})},Tt={render:()=>({components:{NyxCommandPaletteConversationsDemo:at},template:`<NyxCommandPaletteConversationsDemo />`}),play:async({canvasElement:e})=>{let t=Y(e),n=Y(e.ownerDocument.body);await J.click(t.getByRole(`button`,{name:`Find a conversation`})),await J.type(n.getByRole(`combobox`),`release`);let r=await n.findByRole(`option`,{name:`Release planning`});await J.click(r),await X(()=>q(t.getByRole(`heading`,{name:`Release planning`})).toBeVisible()),await X(()=>q(t.getByText(`/conversations/release`)).toBeVisible())}},Et={args:{inline:!0,viewportMode:k.AfterInteraction},play:async({canvasElement:e})=>{let t=Y(e),n=t.getByRole(`combobox`);await q(n).toHaveAttribute(`aria-expanded`,`false`),await J.click(t.getByRole(`button`,{name:`Show results`})),await q(n).toHaveFocus(),await q(n).toHaveAttribute(`aria-expanded`,`true`),await J.type(n,`settings`),await J.clear(n),await q(n).toHaveAttribute(`aria-expanded`,`true`)}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    viewportMode: NyxCommandPaletteViewportMode.AfterInteraction
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    viewportMode: NyxCommandPaletteViewportMode.Always
  }
}`,...Q.parameters?.docs?.source}}},lt.parameters={...lt.parameters,docs:{...lt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true
  }
}`,...lt.parameters?.docs?.source}}},ut.parameters={...ut.parameters,docs:{...ut.parameters?.docs,source:{originalSource:`{
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
}`,...ut.parameters?.docs?.source}}},dt.parameters={...dt.parameters,docs:{...dt.parameters?.docs,source:{originalSource:`{
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
}`,...dt.parameters?.docs?.source}}},ft.parameters={...ft.parameters,docs:{...ft.parameters?.docs,source:{originalSource:`{
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
}`,...ft.parameters?.docs?.source}}},pt.parameters={...pt.parameters,docs:{...pt.parameters?.docs,source:{originalSource:`{
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
}`,...pt.parameters?.docs?.source}}},mt.parameters={...mt.parameters,docs:{...mt.parameters?.docs,source:{originalSource:`{
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
}`,...mt.parameters?.docs?.source}}},ht.parameters={...ht.parameters,docs:{...ht.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    groups: []
  }
}`,...ht.parameters?.docs?.source}}},gt.parameters={...gt.parameters,docs:{...gt.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    loading: true
  }
}`,...gt.parameters?.docs?.source}}},_t.parameters={..._t.parameters,docs:{..._t.parameters?.docs,source:{originalSource:`{
  args: {
    inline: true,
    disabled: true
  }
}`,..._t.parameters?.docs?.source}}},vt.parameters={...vt.parameters,docs:{...vt.parameters?.docs,source:{originalSource:`{
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
}`,...vt.parameters?.docs?.source}}},yt.parameters={...yt.parameters,docs:{...yt.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      NyxCommandPaletteRemoteDemo
    },
    template: '<NyxCommandPaletteRemoteDemo />'
  })
}`,...yt.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source}}},bt.parameters={...bt.parameters,docs:{...bt.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args,
      values: [undefined, ...Object.values(NyxTheme)]
    }),
    template: '<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo v-for="theme in values" :key="theme || \\'inherited\\'" :args="{ ...args, theme, inline: true }" /></div>'
  })
}`,...bt.parameters?.docs?.source}}},xt.parameters={...xt.parameters,docs:{...xt.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      NyxCommandPaletteDemo
    },
    setup: () => ({
      args,
      values: [undefined, ...Object.values(NyxSize)]
    }),
    template: '<div style="display: grid; gap: var(--nyx-gap-xl); width: min(100%, 320px)"><NyxCommandPaletteDemo v-for="size in values" :key="size || \\'inherited\\'" :args="{ ...args, size, inline: true, groups: [{ id: \\'long\\', items: [{ id: \\'long\\', label: \\'Open workspace settings and manage notification preferences for your entire team\\' }] }] }" /></div>'
  })
}`,...xt.parameters?.docs?.source}}},St.parameters={...St.parameters,docs:{...St.parameters?.docs,source:{originalSource:`{
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
    template: '<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo :args="args" /><NyxCommandPaletteDemo :args="args" /></div>'
  })
}`,...St.parameters?.docs?.source}}},Ct.parameters={...Ct.parameters,docs:{...Ct.parameters?.docs,source:{originalSource:`{
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
}`,...Ct.parameters?.docs?.source}}},wt.parameters={...wt.parameters,docs:{...wt.parameters?.docs,source:{originalSource:`{
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
    template: '<p>Focus this preview before using the shortcut, or open the story in a new tab. Browser and OS shortcuts may take precedence.</p><NyxCommandPaletteDemo :args="args" />'
  })
}`,...wt.parameters?.docs?.source}}},Tt.parameters={...Tt.parameters,docs:{...Tt.parameters?.docs,source:{originalSource:`{
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
}`,...Tt.parameters?.docs?.source}}},Et.parameters={...Et.parameters,docs:{...Et.parameters?.docs,source:{originalSource:`{
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
}`,...Et.parameters?.docs?.source}}},Dt=[`Default`,`AlwaysShown`,`Inline`,`Controlled`,`Search`,`KeyboardNavigation`,`CustomSlots`,`ItemSlotPrecedence`,`Empty`,`Loading`,`Disabled`,`AllDisabled`,`RemoteSearch`,`Overlay`,`Themes`,`Sizes`,`MultipleInstances`,`SearchOnly`,`CustomShortcut`,`ConversationSearch`,`RevealAndKeepOpen`]}))();export{vt as AllDisabled,Q as AlwaysShown,ut as Controlled,Tt as ConversationSearch,wt as CustomShortcut,pt as CustomSlots,Z as Default,_t as Disabled,ht as Empty,lt as Inline,mt as ItemSlotPrecedence,ft as KeyboardNavigation,gt as Loading,St as MultipleInstances,$ as Overlay,yt as RemoteSearch,Et as RevealAndKeepOpen,dt as Search,Ct as SearchOnly,xt as Sizes,bt as Themes,Dt as __namedExportsOrder,ct as default};