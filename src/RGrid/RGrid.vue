<template>
  <div> 
    <div :class="isResponsive == true ? 'table-responsive' : ''">
      <!-- LOADING (data: 'isLoading') -->
      <table :class="['table', tableClass]" :style="tableStyle">
        <thead>
          <tr>
            <RHeader v-for="(column, index) in visibleColumns" :key="index" :column="column" v-bind="$props" ></RHeader>
          </tr>
        </thead>
        <RBodyServerSide v-if="isServerSide" :dataset="dataset" :columns="columns" v-bind="$props"></RBodyServerSide> 
        <RBodyClientSide v-else :dataset="dataset" :columns="columns" v-bind="$props"></RBodyClientSide> 
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
    mounted() {
      if(this.isServerSide && !this.dataMethod) {
        console.warn("You should give 'dataMethod' prop for ServerSide table works")
      }
      if(!this.isServerSide && !this.total) {
        console.warn("You should give 'total' prop for ClientSide table pagination");
      }
    }
  }
</script>