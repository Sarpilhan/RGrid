<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i :class="['fa fa-filter', { 'text-muted': !keyword } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:relative; width:500px; padding:2px; border:2px solid gray">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="closeToogle"><span aria-hidden="true">&times;</span></button>
      <div class="form-row">
        <div class="col-sm-3">
          <select v-model="SelectedCondition" class="form-control custom-select-sm"> <option v-for="option in ConditionArray" :key="option" :value="option"> {{ option }} </option></select>
        </div>
        <div class="col-sm-4" v-if="SelectedCondition == 'Between'">
          <input type="date" class="form-control form-control-sm" ref="input" v-model="keywordEnd">  
        </div>
        <div class="col">
          <div class="input-group input-group-sm ">
            <input type="date" class="form-control" ref="input" v-model="keyword"  @keydown.enter="search" :placeholder="`Search ${field}...`">
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
    name: "DateFilter",
    props: ['field', 'title'],
    mixins: [props],
    data: () => ({
      keyword: '',
      keywordEnd: '',
      SelectedCondition: 'Equal',
      CanClose: false,
      ConditionArray: ["Equal", "NotEqual", "GreaterThan", "LessThen", 'Between'],
    }),
    mounted() {
      $(this.$el).on('hide.bs.dropdown', e => { if (!this.CanClose) e.preventDefault() });
    },
    watch: { keyword(kw) { if (kw === '') this.search() } },
    methods: {
      search() {
        const { Query, field } = this
        var ItemIndex = Query.filter.map(x => x.field).indexOf(field);
        if (ItemIndex >= 0) {
          this.closeToogle();
          if (this.keyword === '') { Query.filter.splice(ItemIndex, 1); return; }
          Query.filter.splice(ItemIndex, 1);
          if (this.SelectedCondition === 'Between') {
            Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword + ';' + this.keywordEnd })
          }
          else {
            Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword });
          }
        }
        else {
          if (this.SelectedCondition === 'Between') {
            Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword + ';' + this.keywordEnd })
          }
          else {
            Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword });
          }
        }

        Query.offset = 0
        this.closeToogle();
      },
      closeToogle() {
        this.CanClose = true;
        $(this.$el.children[0]).dropdown('hide');
        this.CanClose = false;
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