<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i :class="['fa fa-filter', { 'text-muted': !keyword } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:relative; width:400px; padding:2px; border:2px solid gray">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="closeToogle"><span aria-hidden="true">&times;</span></button>
      <div class="form-row">
        <div v-bind:class="CurrentCollClass">
          <select v-model="SelectedCondition" class="form-control custom-select-sm"> <option v-for="option in ConditionArray" :key="option" :value="option"> {{ option }} </option></select>
        </div>
        <div class="col-12" v-if="SelectedCondition == 'Between'">
          <input  type="datetime-local" class="form-control form-control-sm" ref="input" v-model="keywordStart">
        </div>
        <div class="col">
          <div class="input-group input-group-sm ">
            <input type="datetime-local" class="form-control" ref="input" v-model="keyword" @keydown.enter="search" :placeholder="`Search ${field}...`">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary" @click="search">Right</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import props from '../../Utils/PropsMixin'
  export default {
    name: "DateTimeFilter",
    props: ['field', 'title'],
    mixins: [props],
    data: () => ({
      keyword: '',
      keywordStart: '',
      SelectedCondition: 'Equal',
      CurrentCollClass : 'col-3',
      CanClose: false,
      ConditionArray: ["Equal", "NotEqual", "GreaterThan", "LessThen", "Between"],
    }),
    mounted() {
      $(this.$el).on('hide.bs.dropdown', e => { if (!this.CanClose) e.preventDefault() });
    },
    watch: {
      keyword(kw) { if (kw === '') this.search() },
      SelectedCondition(sc) {
        if (sc === 'Between') {
          this.CurrentCollClass = 'col-12';
        }
        else {
          this.CurrentCollClass = 'col-3';
        } 
      },
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
        query.filter.push({ field: field, condition: this.SelectedCondition, keyword: (this.SelectedCondition === 'Between' ?   this.keywordStart + ";"   : "")  + this.keyword })
      },
      closeToogle() {
        this.CanClose = true;
        $(this.$el.children[0]).dropdown('hide');
        this.CanClose = false;
      },  

    }
  }
</script>
<style>
  input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
    cursor: pointer;
  }
</style>