<template>
  <div> 
    <div :class="IsResponsive">
      <table :class="['table', TableClass]" :style="TableStyle">
        <thead>
          <tr>
            <RHeader v-for="(column, index) in Columns" :key="index" :Column="column" v-if="column.visible" v-bind="$props"></RHeader>
          </tr>
        </thead>
        <RBody :Dataset="Dataset" :Columns="Columns"></RBody> 
        <tfoot>
          <tr>
            <RFooter v-for="column in Columns" :key="column.field" :Summary="Summary[column.field]" v-if="column.visible"></RFooter>
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
    created() {
      const q = { limit: this.PageSize[0], offset: 0, sort: [], filter: [], ...this.Query }
      Object.keys(q).forEach(key => { this.$set(this.Query, key, q[key]) })
    }
  }
</script>