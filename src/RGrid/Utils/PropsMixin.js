export default {
  props: {
    Columns: { type: Array, required: true },
    Dataset: { type: Array, required: true }, 
    Total: { type: Number, required: true },
    Query: { type: Object, required: true },
    PageSize: { type: Array, required: true },
    Summary: Object, 
    xprops: Object, 
    TableClass: [String, Object, Array], 
    TableStyle: [String, Object, Array],  
    IsResponsive : String
  },
  data() {
    let datatableInstance = this
    while (datatableInstance.$options.name !== 'RGrid') {
      datatableInstance = datatableInstance.$parent 
    }
    return {
      // the source of dynamic components (thComp / tdComp / nested components)
      comp: datatableInstance.$parent.$options.components
    }
  }, 
  methods: {
    // usage: <component :is="forDynCompIs(XXX)" ... />
    forDynCompIs(component) {
      // according to https://vuejs.org/v2/guide/components.html#Dynamic-Components
      // dynamic components can be names (string) or component objects
      return typeof component === 'object' ? component : this.comp[component]
    }
  }
}