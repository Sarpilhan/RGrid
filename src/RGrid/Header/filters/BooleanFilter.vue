<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i :class="['fa fa-filter', { 'text-muted': !keyword } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:relative; width:123px; padding:2px; border:2px solid gray; min-width:123px;">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="closeToogle"><span aria-hidden="true">&times;</span></button>

      <div class="btn-group" role="group">

        <button type="button" :class="['btn btn-secondary', { 'active': keyword == 'true'}]" @click="CheckChange('true')"><i class="far fa-check-square"></i></button>
        <button type="button" :class="['btn btn-secondary', { 'active': keyword == ''}]" @click="CheckChange('')"><i class="far fa-square"></i></button>
        <button type="button" :class="['btn btn-secondary', { 'active': keyword == 'false'}]" @click="CheckChange('false')"><i class="fas fa-times"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
  import props from '../../Utils/PropsMixin'
  export default {
    name: "BooleanFilter",
    props: ['field', 'title'],
    mixins: [props],
    data: () => ({
      keyword: '',
      SelectedCondition: 'Equal',
      CanClose: false,
      ConditionArray: ["Equal", "NotEqual", "GreaterThan", "LessThen"],
    }),
    mounted() {
      //eslint-disable-next-line
      $(this.$el).on('hide.bs.dropdown', e => { if (!this.CanClose) e.preventDefault() });
    },
    methods: {
      search() {
        const { query, field } = this
        query.offset = 0
        this.closeToogle();
        var ItemIndex = query.filter.map(x => x.field).indexOf(field); 
        if (ItemIndex >= 0) {
          query.filter.splice(ItemIndex, 1); 
          if (this.keyword === '') {  return; } 
        }
        query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword })
      },
      closeToogle() {
        this.CanClose = true;
        //eslint-disable-next-line
        $(this.$el.children[0]).dropdown('hide');
        this.CanClose = false;
      },
      CheckChange(state) {
        this.keyword = state;
        this.search();
      }

    }
  }
</script>
<style>
  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
    cursor: pointer;
  }
</style>