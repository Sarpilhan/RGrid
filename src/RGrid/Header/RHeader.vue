<template>
  <th :class="column.class" style="white-space: nowrap;" :style=" column.style">
    {{ column.title }}  &nbsp;&nbsp;&nbsp;
    <i v-if="column.sortable" :class="['CursorPointer', cls ]" @click="changeSort"></i>
    <component v-if="column.filter"
               :is="forDynCompIs(column.filter)"
               :column="column"
               :field="column.field"
               :title="column.title"
               v-bind="$props">
    </component>
    
  </th>
</template>

<script>
  import props from '../Utils/PropsMixin'
  export default {
    name: "RHeader",
    props: {
      column: { type: Object, required: true },
      query: { type: Object, required: true }
    },
    mixins: [props],
    data: () => ({
      order: '',
      orderArray: ['', 'asc', 'desc']
    }),
    watch: {
      query: {
        handler({ sort }) {  
          var indexOfitem = sort.map(x => x.field).indexOf(this.column.field);
          if (indexOfitem >= 0) {
            this.order = sort[indexOfitem].order;
          } 
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      cls() {
        const { order } = this
        return [
          'fas',
          {
            'fa-sort text-muted': !order,
            'fa-sort-up': order === 'asc',
            'fa-sort-down': order === 'desc'
          }
        ]
      }
    },
    methods: {
      changeSort() {
        const { query, orderArray } = this;
          var indexOfitem = query.sort.map(x => x.field).indexOf(this.column.field);
          if (indexOfitem >= 0) {
            var indexOfOrder = this.orderArray.indexOf(query.sort[indexOfitem].order);
            indexOfOrder = (indexOfOrder + 1) % 3;
            if (indexOfOrder === 0) { 
              query.sort.splice(indexOfitem, 1);
              this.order = '';
              return;
            }
            query.sort[indexOfitem].order = orderArray[indexOfOrder];
            this.order = orderArray[indexOfOrder];
          }
          else {
            query.sort.push({ field: this.column.field, order: orderArray[1] })
            this.order = orderArray[1];
          } 
      }
    }
  }
</script>

<style>
  .CursorPointer {
    cursor: pointer;
  }
</style>