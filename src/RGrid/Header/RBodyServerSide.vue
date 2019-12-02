<template>
  <tbody>
    <tr v-for="(data,index) in rgridDataset" :key="index">
      <td v-for="(column,colindex) in rgridColumns" :key="colindex"> 
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
    props: {
      rgridDataset: { type: Array, required: false, default: () => [] },
      rgridTotal: { type: Number, required: false, default: 0 },
    },
    data() {
      return {
        isLoading: false,
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
      xprops: {
        handler(xp) {
          if(xp.refresh) {
            this.getTableData()
          }
        },
        deep: true
      }
    },
    methods: {
      getTableData() {
        this.isLoading = true
        this.dataMethod(this.query).then((res) => {
          this.$emit("update:rgridDataset", res.data.ItemList)
          this.$emit("update:rgridTotal", res.data.Count)
        }).catch((err) => {
          console.error(err);
        }).then(() => {
          this.isLoading = false
          if(this.xprops.refresh) this.xprops.refresh = false
        })
      }
    }
  }
</script>