export default {
  props: {
    columns: { type: Array, required: true, default: [] },
    dataset: { type: Array, required: true, default: [] },
    total: { type: Number, required: false, default: undefined },
    pageSize: { type: Array, required: false, default: [10, 20, 30, 40, 50] },
    query: { type: Object },
    summary: Object,
    xprops: Object,
    tableClass: [String, Object, Array],
    tableStyle: [String, Object, Array],
    isResponsive: [String, Boolean],
    isServerSide: [String, Boolean],
    dataMethod: { type: Function, required: false, default: null }
  },
  data() {
    let datatableInstance = this
    while (datatableInstance.$options.name !== 'RGrid') {
      datatableInstance = datatableInstance.$parent
    }
    return {
      // the source of dynamic components (thComp / tdComp / nested components)
      comp: datatableInstance.$parent.$options.components,
    }
  },
  methods: {
    // usage: <component :is="forDynCompIs(XXX)" ... />
    forDynCompIs(component) {
      // according to https://vuejs.org/v2/guide/components.html#Dynamic-Components
      // dynamic components can be names (string) or component objects
      return typeof component === 'object' ? component : this.comp[component.includes("filter") ? component : component + "Filter"]
    }
  }
}