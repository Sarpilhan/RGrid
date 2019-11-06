<template>
  <div> 
    <div :class="isResponsive == true ? 'table-responsive' : ''">
      <table :class="['table', tableClass]" :style="tableStyle">
        <thead>
          <tr>
            <RHeader v-for="(column, index) in visibleColumns" :key="index" :column="column" v-bind="$props" ></RHeader>
          </tr>
        </thead>
        <RBody :dataset="dataset" :columns="columns" v-if="dataset.length > 0" v-bind="$props"></RBody> 
        <tfoot v-if="summary !== null && summary !== undefined">
          <tr>
            <RFooter v-for="column in visibleColumns" :key="column.field" :summary="summary[column.field]"></RFooter>
          </tr>
        </tfoot>
      </table>
    </div>
    <RPagination v-bind="$props"></RPagination>
  </div>
</template>

<script>
  import PropsMixin from './Utils/PropsMixin';
  export default {
    name: "RGrid",
    mixins: [PropsMixin],
    computed: {
      visibleColumns() {
        return this.columns.filter(c => c.visible)
      }
    },
    created() {
      const q = { limit: this.pageSize[0], offset: 0, sort: [], filter: [], ...this.query }
      Object.keys(q).forEach(key => { this.$set(this.query, key, q[key]) })
    }, 
    watch: {
      Query : {
        handler() {
          if (!this.isServerSide) {  
            //consoe
          } 
        },
        deep: true
      },
    },
  }
</script>