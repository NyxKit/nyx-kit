import{d as N,m as U,g as j,r as h,c as d,a as F,b as V,j as T,E as O,e as z,G as k,h as p,y as I,F as X,x as D,n as G,u as H,f as E}from"./vue.esm-bundler-CwA91l8u.js";import{b as _,c as C}from"./common-D9Lon2f2.js";import{r as $}from"./useTeleportPosition-l4NVNVbP.js";import{_ as J}from"./NyxTooltip-mbQ8rc7X.js";import{u as Q}from"./useNyxProps-zgUh7OTQ.js";import"./style-DbUoAtrk.js";const W=["min","max","step","aria-valuenow","aria-valuemin","aria-valuemax"],Y=["aria-valuenow","aria-valuemin","aria-valuemax"],Z=["min","max","step","aria-valuenow","aria-valuemin","aria-valuemax"],ee=["aria-valuenow","aria-valuemin","aria-valuemax"],y=N({__name:"NyxSlider",props:U({min:{default:0},max:{default:100},step:{},tooltip:{default:"interact"},theme:{default:_.Default},shape:{default:C.Circle},direction:{default:"row"}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(u){const a=u,t=j(u,"modelValue"),i=h(null),r=h(null),o=d(()=>Array.isArray(t.value)),m=d(()=>o.value?t.value[0]:t.value),v=d(()=>o.value?t.value[1]:null),A=d(()=>(m.value-a.min)/(a.max-a.min)*100),L=d(()=>o.value?(v.value-a.min)/(a.max-a.min)*100:0),R=l=>a.step?$(l,a.step,a.min):l,w=(l,n)=>{if(n=R(n),o.value){let e=[...t.value];e[l]=n,e[0]>e[1]&&(e=[e[1],e[0]],r.value=r.value===0?1:0),t.value=e}else t.value=n},S=(l,n)=>{n.preventDefault(),r.value=l,document.addEventListener("mousemove",g),document.addEventListener("mouseup",b)},g=l=>{if(r.value===null||!i.value)return;const n=i.value.getBoundingClientRect();let e=(l.clientX-n.left)/n.width;e=Math.min(Math.max(e,0),1);const s=a.min+e*(a.max-a.min);w(r.value,s)},b=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",b),r.value=null},q=l=>{if(!i.value)return;const n=i.value.getBoundingClientRect();let e=(l.clientX-n.left)/n.width;e=Math.min(Math.max(e,0),1);const s=a.min+e*(a.max-a.min);if(o.value){const K=Math.abs(s-m.value),P=Math.abs(s-v.value);let M=K<P?0:1;w(M,s),r.value=M}else t.value=s},c=(l,n)=>{let e=o.value?t.value[n]:t.value;const s=a.step??1;switch(l.key){case"ArrowLeft":case"ArrowDown":e=Math.max(a.min,e-s);break;case"ArrowRight":case"ArrowUp":e=Math.min(a.max,e+s);break;case"Home":e=a.min;break;case"End":e=a.max;break;default:return}l.preventDefault(),w(n,e)},{classList:B}=Q(a);return F(()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",b)}),(l,n)=>(E(),V("div",{class:G(["nyx-slider",H(B)]),ref_key:"track",ref:i,onMousedown:q},[T(p("input",{type:"range",min:a.min,max:a.max,step:a.step||"any","onUpdate:modelValue":n[0]||(n[0]=e=>t.value=e),onKeydown:n[1]||(n[1]=e=>c(e,0)),"aria-label":"Slider value","aria-valuenow":m.value,"aria-valuemin":a.min,"aria-valuemax":a.max,class:"sr-only"},null,40,W),[[k,t.value]]),O(J,{text:m.value},{default:I(()=>[p("div",{class:"nyx-slider__thumb",style:D({left:A.value+"%"}),role:"slider",tabindex:"0","aria-valuenow":m.value,"aria-valuemin":a.min,"aria-valuemax":a.max,onMousedown:n[2]||(n[2]=e=>S(0,e)),onKeydown:n[3]||(n[3]=e=>c(e,0))},null,44,Y)]),_:1},8,["text"]),o.value&&Array.isArray(t.value)&&t.value[1]?(E(),V(X,{key:0},[T(p("input",{type:"range",min:a.min,max:a.max,step:a.step||"any","onUpdate:modelValue":n[4]||(n[4]=e=>t.value[1]=e),onKeydown:n[5]||(n[5]=e=>c(e,1)),"aria-label":"Slider second value","aria-valuenow":v.value??void 0,"aria-valuemin":a.min,"aria-valuemax":a.max,class:"sr-only"},null,40,Z),[[k,t.value[1]]]),p("div",{class:"nyx-slider__thumb",style:D({left:L.value+"%"}),role:"slider",tabindex:"0","aria-valuenow":v.value??void 0,"aria-valuemin":a.min,"aria-valuemax":a.max,onMousedown:n[6]||(n[6]=e=>S(1,e)),onKeydown:n[7]||(n[7]=e=>c(e,1))},null,44,ee)],64)):z("",!0)],34))}});y.__docgenInfo={exportName:"default",displayName:"NyxSlider",description:"",tags:{},props:[{name:"min",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"max",required:!1,type:{name:"number"},defaultValue:{func:!1,value:"100"}},{name:"step",required:!1,type:{name:"number"}},{name:"tooltip",required:!1,type:{name:"union",elements:[{name:'"never"'},{name:'"always"'},{name:'"interact"'}]},defaultValue:{func:!1,value:"'interact'"}},{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"shape",required:!1,type:{name:"NyxShape"},defaultValue:{func:!1,value:"NyxShape.Circle"}},{name:"direction",required:!1,type:{name:"union",elements:[{name:'"row"'},{name:'"column"'}]},defaultValue:{func:!1,value:"'row'"}}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxSlider/NyxSlider.vue"]};const ie={title:"Components/NyxSlider",component:y,argTypes:{theme:{control:{type:"select"},options:Object.values(_)},shape:{control:{type:"select"},options:Object.values(C)}},args:{}},ae=u=>N({components:{NyxSlider:y},setup(){return{args:u}},template:`
    <nyx-slider v-bind="args"></nyx-slider>
  `}),ne=u=>()=>N({components:{NyxSlider:y},setup(){const a=h([30,70]);return{args:u,range:a}},template:`
    <div class="flex-col gap-xl">
      <nyx-slider v-model="range"></nyx-slider>
      <pre>{{ range }}</pre>
    </div>
  `}),f=ae({}),x=ne({});f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"Template({})",...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"TemplateRange({})",...x.parameters?.docs?.source}}};const me=["Default","Range"];export{f as Default,x as Range,me as __namedExportsOrder,ie as default};
