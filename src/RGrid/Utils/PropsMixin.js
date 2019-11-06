export default {
  props: {
    columns: { type: Array, required: true },
    dataset: { type: Array, required: true }, 
    total: { type: Number, required: true },
    pageSize: { type: Array, required: true },
    query: { type: Object, required: true, default: { limit: 0, offset: 0, sort: [], filter: [] },
    summary: Object, 
    xprops: Object, 
    tableClass: [String, Object, Array], 
    tableStyle: [String, Object, Array],  
    isResponsive: [String, Boolean],
    isServerSide: [String, Boolean]
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