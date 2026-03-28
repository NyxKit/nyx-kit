import{n as e}from"./chunk-BneVvdWh.js";import{i as t,x as n}from"./iframe-UZltYRQm.js";import{n as r,t as i}from"./NyxMedia-CAEGZryJ.js";import{N as a,P as o,g as s,j as c}from"./composables-CJuhraA_.js";import{n as l,t as u}from"./NyxButton-Cef6wilO.js";import{n as d,t as f}from"./NyxCard-BCu1hPZ6.js";var p,m,h,g,_,v,y;e((()=>{t(),d(),s(),l(),r(),p=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus auctor pellentesque. Sed
  consectetur nulla eget metus consequat vulputate. Nulla venenatis diam dolor, nec ultricies elit cursus a.`,m={title:`Components/NyxCard`,component:f,argTypes:{theme:{control:{type:`select`},options:Object.values(a)},gradient:{control:{type:`select`},options:[!0,!1,...Object.values(a)]},backlight:{control:{type:`select`},options:[!0,!1,...Object.values(a)]},variant:{control:{type:`select`},options:Object.values(o)},size:{control:{type:`select`},options:Object.values(c)},textAlign:{control:{type:`select`},options:[`left`,`center`,`right`,`justify`]},layout:{control:{type:`select`},options:[`media-first`,`header-first`]}},args:{title:`Lorem Ipsum`,src:`https://plus.unsplash.com/premium_photo-1739009671609-f28ec1b83346?q=80&w=3750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,default:p,theme:a.Primary,gradient:a.Success,textAlign:`center`,layout:`header-first`,blendMedia:!0}},h=e=>n({components:{NyxCard:f},setup(){return{args:e}},template:`
    <nyx-card v-bind="args">Card</nyx-card>
  `}),g=e=>()=>n({components:{NyxCard:f,NyxButton:u,NyxMedia:i},setup(){return{args:e,lipsum:p,NyxTheme:a,NyxSize:c,NyxVariant:o}},template:`
    <nyx-card
      v-bind="args"
      title="Lorem Ipsum"
      textAlign="center"
      layout="header-first"
      blendMedia
    >
      <template #media>
        <NyxMedia #media src="https://placehold.co/400x300" />
      </template>
      <p>{{ lipsum }}</p>
      <template #footer>
        <nyx-button :theme="NyxTheme.Primary" :size="NyxSize.Large" :variant="NyxVariant.Outline">View more</nyx-button>
      </template>
    </nyx-card>
  `}),_=h({}),v=g({}),_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`Template({})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`TemplateExample({})`,...v.parameters?.docs?.source}}},y=[`Default`,`Example`]}))();export{_ as Default,v as Example,y as __namedExportsOrder,m as default};