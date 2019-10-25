<template>
  <th :class="Column.class" style="white-space: nowrap;" :style=" Column.style">
    {{ Column.title }}  &nbsp;&nbsp;&nbsp;
    <i v-if="Column.sortable" :class="['CursorPointer', cls ]" @click="ChangeSort"></i>
    <component v-if="Column.filter"
               :is="forDynCompIs(Column.filter)"
               :column="Column"
               :field="Column.field"
               :title="Column.title"
               v-bind="$props">
    </component>
    
  </th>
</template>

<script>
  import props from '../Utils/PropsMixin'
  export default {
    name: "RHEader",
    props: {
      Column: { type: Object, required: true },
      Query: { type: Object, required: true }
    },
    mixins: [props ],
    data: () => ({
      order: '',
      orderArray: ['', 'asc', 'desc']
    }),
    watch: {
      Query: {
        handler({ sort  }) {  
          var indexOfitem = sort.map(x => x.field).indexOf(this.Column.field);
          if (indexOfitem >= 0) {
            this.order = sort[indexOfitem].order;
          }

          //this.order = field === this.field ? order : ''
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
      ChangeSort() {
        const { Query, orderArray } = this;
          var indexOfitem = Query.sort.map(x => x.field).indexOf(this.Column.field);
          if (indexOfitem >= 0) {
            var indexOfOrder = this.orderArray.indexOf(Query.sort[indexOfitem].order);
            indexOfOrder = (indexOfOrder + 1) % 3;
            if (indexOfOrder === 0) { 
              Query.sort.splice(indexOfitem, 1);
              this.order = '';
              return;
            }
            Query.sort[indexOfitem].order = orderArray[indexOfOrder];
            this.order = orderArray[indexOfOrder];
          }
          else {
            Query.sort.push({ field: this.Column.field, order: orderArray[1] })
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