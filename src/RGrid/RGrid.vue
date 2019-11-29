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
        <RBodyServerSide v-if="serverside" :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBodyServerSide> 
        <RBodyClientSide v-else-if="clientside && dataset.length > 0" :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBodyClientSide> 
        <RBody v-else :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBody> 
        <tfoot v-if="summary !== null && summary !== undefined">
          <tr>
            <RFooter v-for="column in visibleColumns" :key="column.field" :summary="summary[column.field]"></RFooter>
          </tr>
        </tfoot>
      </table>
    </div>
    <RPagination v-if="pagination" v-bind="$props" :rgridDataset="rgridDataset" :rgridTotal="rgridTotal"></RPagination>
    <RColumns v-bind="$props"></RColumns>
    <RFilters v-bind="$props"></RFilters>
  </div>
</template>

<script>
  import PropsMixin from './Utils/PropsMixin';
  import RHeader from './Header/RHeader'
  import RBody from './Header/RBody'
  import RFooter from './Header/RFooter'
  import RBodyClientSide from './Header/RBodyClientSide'
  import RBodyServerSide from './Header/RBodyServerSide'
  import RPagination from './Header/RPagination'
  import RColumns from './Header/settings/RColumns'
  import RFilters from './Header/settings/RFilters'

  export default {
    name: "RGrid",
    mixins: [PropsMixin],
    components: {
      RHeader, RBody, RFooter, RBodyServerSide, RBodyClientSide, RPagination, RColumns, RFilters
    },
    data() {
      return {
        rgridDataset: [],
        rgridTotal: 0,
      }
    },
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
    }
  }
</script>