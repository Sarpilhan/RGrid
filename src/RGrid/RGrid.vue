<template>
  <div>
    <div v-if="showToolbar" style="text-align:right"> 
              <RColumns v-bind="$props"></RColumns>
              <RFilters v-bind="$props"></RFilters>

    </div>
    <div :class="{ 'table-reponsive' : isResponsive, 'table-scroll' : height }" :style="[height ? {'height': `${height}px`} : {}]">
      <!-- LOADING (data: 'isLoading') -->
      <table :class="['table', tableClass]" :style="tableStyle">
        <thead> 
          <tr>
            <RHeader v-for="(column, index) in rgridColumns" :key="index" :column="column" v-bind="$props"></RHeader>
          </tr>
        </thead>
        <RBodyServerSide v-if="serverside" :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBodyServerSide>
        <RBodyClientSide v-else-if="clientside && dataset.length > 0" :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBodyClientSide>
        <RBody v-else :rgridDataset.sync="rgridDataset" :rgridTotal.sync="rgridTotal" v-bind="$props"></RBody>
        <tfoot v-if="summary !== null && summary !== undefined">
          <tr>
            <RFooter v-for="column in columns" :key="column.field" :summary="summary[column.field]"></RFooter>
          </tr>
        </tfoot>
      </table>
    </div> 
    <RPagination v-if="pagination" v-bind="$props" :rgridDataset="rgridDataset" :rgridTotal="rgridTotal"></RPagination>
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
        rgridTotal: 0
      }
    },
    watch: {
      dataset: {
        handler() {
          this.rgridDataset = this.dataset
          this.rgridTotal = this.total
        },
        deep: true
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

<style>
  .table-scroll { 
    overflow-y: auto;
  }
  .table-scroll th { 
    position: sticky; 
    top: -1px;
  }
  table  { 
    border-collapse: collapse; 
    width: 100%;
    margin-bottom: 3px !important;
  }
  th { 
    background:#eee;
  }
</style>