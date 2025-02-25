import{d,m as r,h as f,e as p,k as c,B as y,j as h,n as q,u as x,g as b}from"./vue.esm-bundler-CW8VNZbY.js";import{u as g}from"./useNyxProps-DzKGUGIw.js";import{N as v,a as V,b as k}from"./common-D0hF21is.js";var s=(e=>(e.Text="text",e.Password="password",e.Email="email",e.Number="number",e.Tel="tel",e.Url="url",e.Search="search",e.Date="date",e.Time="time",e.DateTimeLocal="datetime-local",e.Month="month",e.Week="week",e.Color="color",e))(s||{});const B=["type","placeholder","disabled","readonly","maxlength","minlength","pattern","required","autocomplete","autofocus","id"],N=d({__name:"NyxInput",props:r({type:{default:s.Text},theme:{default:k.Default},variant:{default:V.Outline},size:{default:v.Medium},disabled:{type:Boolean},readonly:{type:Boolean},required:{type:Boolean},autofocus:{type:Boolean},placeholder:{},autocomplete:{},minlength:{},maxlength:{},pattern:{},id:{},pixel:{type:Boolean}},{modelValue:{},modelModifiers:{}}),emits:r(["click","focus","blur"],["update:modelValue"]),setup(e,{emit:m}){const a=e,n=m,o=f(e,"modelValue"),{classList:u}=g(a);return(i,t)=>(b(),p("div",{class:q(["nyx-input",x(u)])},[c(h("input",{type:a.type,placeholder:a.placeholder,disabled:a.disabled,readonly:a.readonly,maxlength:a.maxlength,minlength:a.minlength,pattern:a.pattern,required:a.required,autocomplete:a.autocomplete,autofocus:a.autofocus,id:i.id,"onUpdate:modelValue":t[0]||(t[0]=l=>o.value=l),onClick:t[1]||(t[1]=l=>n("click")),onFocus:t[2]||(t[2]=l=>n("focus")),onBlur:t[3]||(t[3]=l=>n("blur"))},null,40,B),[[y,o.value]])],2))}});N.__docgenInfo={exportName:"default",displayName:"NyxInput",description:"",tags:{},props:[{name:"type",required:!1,type:{name:"NyxInputType"},defaultValue:{func:!1,value:"NyxInputType.Text"}},{name:"theme",required:!1,type:{name:"NyxTheme"},defaultValue:{func:!1,value:"NyxTheme.Default"}},{name:"variant",required:!1,type:{name:"NyxVariant"},defaultValue:{func:!1,value:"NyxVariant.Outline"}},{name:"size",required:!1,type:{name:"NyxSize"},defaultValue:{func:!1,value:"NyxSize.Medium"}},{name:"disabled",required:!1,type:{name:"boolean"}},{name:"readonly",required:!1,type:{name:"boolean"}},{name:"required",required:!1,type:{name:"boolean"}},{name:"autofocus",required:!1,type:{name:"boolean"}},{name:"placeholder",required:!1,type:{name:"string"}},{name:"autocomplete",required:!1,type:{name:"string"}},{name:"minlength",required:!1,type:{name:"number"}},{name:"maxlength",required:!1,type:{name:"number"}},{name:"pattern",required:!1,type:{name:"string"}},{name:"id",required:!1,type:{name:"string"}},{name:"pixel",required:!1,type:{name:"boolean"}}],events:[{name:"click"},{name:"focus"},{name:"blur"}],sourceFiles:["/Users/arnedecant/Documents/projects/nyx-kit/src/components/NyxInput/NyxInput.vue"]};export{s as N,N as _};
