<template>
  <div class="btn-group" v-if="filters.length > 0" >
    <button type="button" class="btn btn btn-link py-1 border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggle">
      <i :class="['fa fa-filter', { 'text-muted': !filters.length } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:absolute; width:300px; left:-270px; min-height:20px; padding:4px 5px; box-shadow:rgb(197, 200, 206) 4px 4px 5px 2px; border:1px solid #c5c8ce">
      <div v-for="(filter, i) in filters" :key="i" class="fade show w-auto">
        <ul class="list-group">
          <li class="list-group-item small py-1 px-2" v-show="!filter.remove">
            <span class="text-nowrap bd-highlight"> {{ filter.field }} </span> |
            <span class="badge badge-primary text-wrap"> {{ filter.condition }} </span> |
            <span class="text-nowrap bd-highlight"> {{ filter.keyword }} </span>
            <button type="button" class="close" aria-label="Close" @click="removeFilter(filter, i)">
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-primary btn-sm btn-block" @click="apply()">Apply</button>
    </div>
  </div>
</template>

<script>
import PropsMixin from '../../Utils/PropsMixin';
export default {
  mixins: [PropsMixin],
  data() {
    return {
      filters: [],
    }
  },
  created() {
    this.filters = this.getVisibleFilters()
  },
  watch: {
    'query.filter': {
      handler() {
        this.filters = this.getVisibleFilters() 
      },
      deep: true
    }
  },
  methods: {
    getVisibleFilters() {
      return  this.query.filter.filter(x => x.visible === undefined ? true : x.visible)
    },
    apply() {
      this.filters.forEach(x => {
        const index = this.query.filter.findIndex(y => y.field === x.field)
        if(index > -1) {
          if(x.remove) this.$delete(this.query.filter, index)
          else this.$set(this.query.filter, index, x)
        }
      })
      this.toggle()
    },
    // handleChange(filter) {
    //  this.filters.push(filter)
    // },
    removeFilter(filter, index) {
      this.$set(this.filters, index, {...filter, remove: true})
    },
    toggle() {
      const classList = this.$el.children[1].classList
      if(classList.contains('show')) {
        classList.remove('show');
      } else {
        this.filters = this.getVisibleFilters().map(x => ((x.remove = false), x))
        classList.add('show');
      }
    },
  }
}
</script>

<style>

</style>