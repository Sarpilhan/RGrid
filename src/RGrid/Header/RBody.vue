<template> 
  <tbody v-if="totalLength">
    <tr v-for="(data,index) in rgridDataset" :key="index">
      <td v-for="(column,colindex) in visibleColumns" :key="colindex">
        <component v-if="column.comp" :is="forDynCompIs(column.comp)" :column="column" :row="data" :xprops="xprops"> </component>
        <span v-else> {{ data[column.field] }} </span>
      </td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td colspan="9999" height="100px" style="vertical-align: middle;">
        <h5 class="text-center"> No Record Found </h5>
      </td>
    </tr>
  </tbody>
</template>

<script>
  import props from '../Utils/PropsMixin'
  export default {
    name: "RBody", 
    mixins: [props],
    props: {
      rgridDataset: { type: Array, required: false, default: () => [] },
      rgridTotal: { type: Number, required: false, default: 0 },
    },
    watch: {
      dataset: {
        handler() {
          this.$emit("update:rgridDataset", this.dataset)
          this.$emit("update:rgridTotal", this.total)
        },
        deep: true
      }
    },
    computed: {
      visibleColumns() {
        return this.columns.filter(c => c.visible)
      }, 
      totalLength() {
        return this.rgridDataset.length
      },
    },
  }
</script>