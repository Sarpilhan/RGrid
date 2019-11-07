<template>
  <tbody>
    <tr v-for="(data,index) in rgridDataset" :key="index">
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
    name: "RBodyServerSide", 
    mixins: [props],
    computed: {
      visibleColumns() {
        return this.columns.filter(c => c.visible)
      }
    },
    created() {
      this.getTableData()
    },
    watch: {
      query: {
        handler() {
          this.getTableData()
        },
        deep: true
      },
    },
    methods: {
      getTableData() {
        console.log(this);
        this.isLoading = true
        this.dataMethod(this.query).then((res) => {
          this.rgridDataset = res.data.ItemList
          this.rgridTotal = res.data.Count
        }).catch((err) => {
          console.error(err);
        }).then(() => {
          this.isLoading = false
        })
      }
    }
  }
</script>