import{a as o}from"./common-BBDHxksy.js";import{c as l}from"./vue.esm-bundler-CJj2rol9.js";class g{static getFormattedMessage(t,e){let s=t,n=e;return(typeof t!="string"||!t.toLowerCase().startsWith("nyx"))&&(s="NYX",n=[t,...e]),`%c${s}%c ${n.join(" ")}`}static getPrefixStyle(){return"background: #9F50F0; color: white; padding: 4px 8px; border-radius: 2px; font-weight: bold; line-height: 1.5; margin-bottom: 4px; display: inline-flex;"}static getMessageStyle(t){switch(t){case"info":return"color: #4CAF50; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;";case"warn":return"color: #FF9800; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;";case"error":return"color: #F44336; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;";default:return""}}static getArgsStrings(t){return t.filter(e=>typeof e=="string")}static getArgsOther(t){return t.filter(e=>typeof e!="string")}static getCaller(){const t=new Error().stack;return t?t.split(`
`)[3]??"unknown":"unknown"}static info(t,...e){console.log.apply(console,[this.getFormattedMessage(t,this.getArgsStrings(e)),this.getPrefixStyle(),this.getMessageStyle("info"),...this.getArgsOther(e)])}static warn(t,...e){console.warn.apply(console,[this.getFormattedMessage(t,this.getArgsStrings(e)),this.getPrefixStyle(),this.getMessageStyle("warn"),...this.getArgsOther(e)])}static error(t,...e){console.error.apply(console,[this.getFormattedMessage(t,this.getArgsStrings(e)),this.getPrefixStyle(),this.getMessageStyle("error"),...this.getArgsOther(e)])}}const c=["theme","size","shape","variant","gradient","backlight"],f=(i,t="Nyx")=>{const e=l(()=>i.gradient!==!1&&i.variant!==o.Solid?(g.error(t,"Gradients are only supported by NyxVariant.Solid"),i.theme):i.gradient===!0?i.theme:i.gradient),s=l(()=>i.backlight===!0?i.theme:i.backlight);return{classList:l(()=>{const a=[];for(const r of c)i[r]===void 0||i[r]===!1||(i[r]===!0&&i.theme!==void 0?a.push(`${r}-${i.theme}`):a.push(`${r}-${i[r]}`));return a}),gradient:e,backlight:s}};export{g as N,f as u};
