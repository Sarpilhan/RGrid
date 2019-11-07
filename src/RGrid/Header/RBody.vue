<template>
  <tbody>
    <tr v-for="(data,index) in visibleDataset" :key="index">
      <td v-for="(column,colindex) in visibleColumns" :key="colindex"> 
        <component v-if="column.comp" :is="forDynCompIs(column.comp)" :column="column" :row="data" :xprops="xprops"> </component>
        <span v-else> {{ data[column.field] }} </span> 
      </td>
    </tr>
  </tbody>
</template>

<script>
  import props from '../Utils/PropsMixin'
  export default {
    name: "RBody", 
    mixins: [props],
    computed: {
      visibleColumns() {
        return this.columns.filter(c => c.visible)
      },
      visibleDataset() {
        return this.dataset.slice(this.query.offset, this.query.limit + this.query.offset)
      }
    },
  }
</script>