import{d as m,m as h,g as v,c as k,b as f,j as N,h as x,e as g,v as _,t as z,n as C,f as y}from"./vue.esm-bundler-CwA91l8u.js";import{b as d,N as i}from"./common-D9Lon2f2.js";import{g as T,a as S,_ as V}from"./NyxFormField-CH1JRivP.js";import{g as D}from"./keydict-BK3rIzaC.js";const B=["disabled","aria-label","id"],M=["for"],n=m({__name:"NyxCheckbox",props:h({label:{default:""},disabled:{type:Boolean,default:!1},size:{default:i.Medium},theme:{default:d.Default},id:{}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:["update:modelValue"],setup(a){const e=a,l=v(a,"modelValue"),c=k(()=>e.id??`nyx-checkbox-${T(16)}`);return(u,s)=>(y(),f("div",{class:C(["nyx-checkbox",[`theme-${e.theme}`,`size-${e.size}`]])},[N(x("input",{type:"checkbox","onUpdate:modelValue":s[0]||(s[0]=p=>l.value=p),disabled:e.disabled,"aria-label":e.label,id:c.value},null,8,B),[[_,l.value]]),x("span",{class:"nyx-checkbox__checkbox",onClick:s[1]||(s[1]=p=>l.value=!l.value)}),e.label?(y(),f("label",{key:0,for:c.value,class:"nyx-checkbox__label"},z(e.label),9,M)):g("",!0)],2))}});n.__docgenInfo={exportName:"default",displayName:"NyxCheckbox",description:"",tags:{},props:[{name:"label",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"disabled",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"size",required:!1,type:{name:"NyxSize"},defaultValue:{func:!1,value:"NyxSize.Medium"}},{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"id",required:!1,type:{name:"string"}}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxCheckbox/NyxCheckbox.vue"]};const O={title:"Components/NyxCheckbox",component:n,argTypes:{theme:{control:{type:"select"},options:Object.values(d)},size:{control:{type:"select"},options:Object.values(i)}}},$=a=>m({components:{NyxCheckbox:n},setup(){return{args:a}},template:`
    <nyx-checkbox v-bind="args" :placeholder="'NyxCheckbox'" />
  `}),b=(a,e)=>()=>m({components:{NyxCheckbox:n,NyxForm:V,NyxFormField:S},setup(){const l=Object.values(e);return{prop:a,values:l,getLabel:u=>D(e,u)}},template:`
    <nyx-form>
      <nyx-form-field v-for="value of values" :key="value" :label="getLabel(value)">
        <template #default="{ id }">
          <nyx-checkbox
            v-bind="{ [prop]: value }"
            :placeholder="getLabel(value)"
            :id="id"
            :label="'I agree for the terms and conditions for ' + getLabel(value)"
          />
        </template>
      </nyx-form-field>
    </nyx-form>
  `}),t=$({}),o=b("theme",d),r=b("size",i);t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"Template({})",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"TemplateAll('theme', NyxTheme)",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"TemplateAll('size', NyxSize)",...r.parameters?.docs?.source}}};const A=["Default","Themes","Sizes"];export{t as Default,r as Sizes,o as Themes,A as __namedExportsOrder,O as default};
