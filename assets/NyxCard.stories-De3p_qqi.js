import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{O as r,T as i,k as a,u as o}from"./utils-CVfGrNSp.js";import{n as s,t as c}from"./NyxButton-D5qXYlFj.js";import{n as l,t as u}from"./NyxMedia-DhrFDBNQ.js";import{n as d,t as f}from"./NyxCard-CaNq_uR0.js";var p,m,h,g,_,v,y;e((()=>{t(),d(),o(),s(),l(),p=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus auctor pellentesque. Sed
  consectetur nulla eget metus consequat vulputate. Nulla venenatis diam dolor, nec ultricies elit cursus a.`,m={title:`Components/NyxCard`,component:f,argTypes:{theme:{control:{type:`select`},options:Object.values(r)},gradient:{control:{type:`select`},options:[!0,!1,...Object.values(r)]},backlight:{control:{type:`select`},options:[!0,!1,...Object.values(r)]},variant:{control:{type:`select`},options:Object.values(a)},size:{control:{type:`select`},options:Object.values(i)},textAlign:{control:{type:`select`},options:[`left`,`center`,`right`,`justify`]},layout:{control:{type:`select`},options:[`media-first`,`header-first`]}},args:{title:`Lorem Ipsum`,src:`https://plus.unsplash.com/premium_photo-1739009671609-f28ec1b83346?q=80&w=3750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,default:p,theme:r.Primary,gradient:r.Success,textAlign:`center`,layout:`header-first`,blendMedia:!0}},h=e=>n({components:{NyxCard:f},setup(){return{args:e}},template:`
    <nyx-card v-bind="args">Card</nyx-card>
  `}),g=e=>()=>n({components:{NyxCard:f,NyxButton:c,NyxMedia:u},setup(){return{args:e,lipsum:p,NyxTheme:r,NyxSize:i,NyxVariant:a}},template:`
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