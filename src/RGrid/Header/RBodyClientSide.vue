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
    name: "RBodyClientSide", 
    mixins: [props],
    props: {
      rgridDataset: { type: Array, required: false, default: () => [...this.dataset] },
      rgridTotal: { type: Number, required: false, default: () => this.total },
    },
    created() {
      this.$emit("update:rgridTotal", this.clientSideDataset.length)
    },
    data() {
      return {
        clientSideDataset: [...this.dataset]
      }
    },
    computed: {
      visibleColumns() {
        return this.columns.filter(c => c.visible)
      },
      visibleDataset() {
        return this.clientSideDataset.slice(this.query.offset, this.query.limit + this.query.offset)
      }
    },
    watch: {
      query: {
        handler() {
          this.clientSideDataset = [...this.dataset]
          this.filterBy()
          this.sortBy()
          this.$emit("update:rgridDataset", this.clientSideDataset)
          this.$emit("update:rgridTotal", this.clientSideDataset.length)
        },
        deep: true
      }
    },
    methods: {
      // "Like", "NotLike", "Equal", "NotEqual", "In"
      filterBy() {
        if(this.query.filter.length === 0) return
        this.clientSideDataset = this.clientSideDataset.filter((row) => {
          let result = true
          for(let filter of this.query.filter) {
            switch (filter.condition) {
              case "Like":
                result = result && (String(row[filter.field]).toLowerCase().includes(filter.keyword.toLowerCase()))
                break;
              case "NotLike":
                result = result && !(String(row[filter.field]).toLowerCase().includes(filter.keyword.toLowerCase()))
                break;
              case "Equal":
                result = result && (String(row[filter.field]).toLowerCase() === filter.keyword.toLowerCase())
                break;
              case "NotEqual":
                result = result && (String(row[filter.field]).toLowerCase() !== filter.keyword.toLowerCase())
                break;
              case "In":
                if(Array.isArray(row[filter.field])) {
                  result = result && (row[filter.field].some(x => String(x).toLowerCase() === filter.keyword.toLowerCase()))
                }
                else console.warn("'In' condition is for Array's.")
                break;
            }
          }
          return result
        })
      },
      sortBy() {
        for(let sort of this.query.sort) {
          this.clientSideDataset =  this.clientSideDataset.sort(this.dynamicSort((sort.order == "asc" ? "" : "-") + sort.field));
        }
      },
      dynamicSort(property) {
        let sortOrder = 1;
        let result = null;
        if (property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
        }
        return (a, b) => {
          switch (typeof a[property]) {
            case "string":
              result = a[property].localeCompare(b[property]);
              break;
            case "number":
              result = a[property] < b[property] ? -1 : 1;
              break;
            default:
              result = a[property] < b[property] ? -1 : 1;
              break;
          }
          return result * sortOrder;
        };
      },
    }
  }
</script>