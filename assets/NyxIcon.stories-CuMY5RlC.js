import{n as e}from"./chunk-BneVvdWh.js";import{t,y as n}from"./vue.esm-bundler-C_Vkk7g_.js";import{O as r,j as i,l as a,t as o,u as s}from"./utils-I3j1AIuu.js";import{n as c,t as l}from"./NyxIcon-qPhKzAEA.js";var u,d,f,p,m,h,g,_,v,y,b;e((()=>{t(),c(),s(),o(),u=[`arrow-right`,`arrow-left`,`chevron-down`,`chevron-up`,`menu`,`x`,`plus`,`minus`,`edit`,`trash`],d={title:`Components/NyxIcon`,component:l,tags:[`autodocs`],argTypes:{name:{control:{type:`select`},options:u},theme:{control:{type:`select`},options:Object.values(i)},size:{control:{type:`select`},options:Object.values(r)},stroke:{control:{type:`select`},options:Object.values(r)}},parameters:{docs:{description:{component:`A wrapper component for Lucide Vue icons. Supports string-based icon names, optional theme coloring, and size control.

[View all Lucide icons](https://lucide.dev/icons/)`}}}},f=e=>n({components:{NyxIcon:l},setup(){return{args:e}},template:`<nyx-icon v-bind="args" />`}),p=f({name:`arrow-right`}),m=(e,t)=>()=>n({components:{NyxIcon:l},setup(){return{prop:e,values:Object.values(t),getLabel:e=>a(t,e)}},template:`
    <div class="flex">
      <nyx-icon
        v-for="value of values"
        :key="value"
        v-bind="{ [prop]: value }"
      >{{ getLabel(value) }}</nyx-icon>
    </div>
  `}),h=m(`theme`,i),g=m(`size`,r),_=m(`stroke`,r),v=()=>n({components:{NyxIcon:l},setup(){return{sizes:[10,20,32,48,64],ICONS:u}},template:`
    <div>
      <div v-for="size in sizes" :key="size" style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">{{ size }}px:</span>
        <nyx-icon v-for="icon in ICONS" :key="icon" :name="icon" :size="size" />
      </div>
    </div>
  `}),y=()=>n({components:{NyxIcon:l},template:`
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-right" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-right</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-left" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-left</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-down" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-down</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-up" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-up</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="menu" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">menu</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="plus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">plus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="minus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">minus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="edit" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">edit</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="trash" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">trash</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="check-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">check-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="alert-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">alert-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="star" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">star</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="heart" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">heart</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="settings" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">settings</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="home" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">home</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="search" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">search</span>
      </div>
    </div>
  `}),p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`Template({
  name: 'arrow-right'
})`,...p.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`TemplateAllProp('theme', NyxTheme as KeyDict<string>)`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`TemplateAllProp('size', NyxSize as KeyDict<string>)`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`TemplateAllProp('stroke', NyxSize as KeyDict<string>)`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxIcon
  },
  setup() {
    const sizes = [10, 20, 32, 48, 64];
    return {
      sizes,
      ICONS
    };
  },
  template: \`
    <div>
      <div v-for="size in sizes" :key="size" style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:60px">{{ size }}px:</span>
        <nyx-icon v-for="icon in ICONS" :key="icon" :name="icon" :size="size" />
      </div>
    </div>
  \`
})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => defineComponent({
  components: {
    NyxIcon
  },
  template: \`
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px">
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-right" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-right</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="arrow-left" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">arrow-left</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-down" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-down</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="chevron-up" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">chevron-up</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="menu" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">menu</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="plus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">plus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="minus" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">minus</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="edit" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">edit</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="trash" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">trash</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="check-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">check-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="x-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">x-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="alert-circle" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">alert-circle</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="star" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">star</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="heart" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">heart</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="settings" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">settings</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="home" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">home</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
        <nyx-icon name="search" />
        <span style="font-size:9px;color:var(--nyx-text-muted)">search</span>
      </div>
    </div>
  \`
})`,...y.parameters?.docs?.source}}},b=[`Default`,`Themes`,`Sizes`,`Strokes`,`CustomSizes`,`IconGallery`]}))();export{v as CustomSizes,p as Default,y as IconGallery,g as Sizes,_ as Strokes,h as Themes,b as __namedExportsOrder,d as default};