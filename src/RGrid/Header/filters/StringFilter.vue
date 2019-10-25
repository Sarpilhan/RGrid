<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i :class="['fa fa-filter', { 'text-muted': !keyword } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:relative; width:400px; padding:2px; border:2px solid gray">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="closeToogle"><span aria-hidden="true">&times;</span></button>
      <div class="form-row" v-if="SelectedCondition != 'In'">
        <div class="col-sm-3">
          <select v-model="SelectedCondition" class="form-control custom-select-sm"> <option v-for="option in ConditionArray" :key="option" :value="option"> {{ option }} </option></select>
        </div>
        <div class="col">
          <div class="input-group input-group-sm ">
            <input type="search" class="form-control" ref="input" v-model="keyword" @keydown.enter="search" :placeholder="`Search ${field}...`">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary" @click="search">Right</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row" v-if="SelectedCondition == 'In'">
        <div class="col-12  mb-2">
          <select v-model="SelectedCondition" class="form-control custom-select-sm"> <option v-for="option in ConditionArray" :key="option" :value="option"> {{ option }} </option></select>
        </div>
        <div class="col-12  mb-2">
          <div class="input-group input-group-sm ">
            <input type="search" class="form-control" v-model="tagKeyword" ref="input" @keydown.enter="addTag" :placeholder="`Add ${field}...`">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary" @click="addTag"><i class="far fa-plus-square"></i></button>
            </div>
          </div>
        </div>

        <div class="col-12 mb-2">
          <span class="badge badge-pill badge-light" v-for="item in tagList"  style="font-size:14px;">
            {{ item }}   &nbsp;&nbsp;
            <span aria-hidden="true" style="font-size:14px; cursor:pointer" @click="removeTag(item)">&times;</span>
          </span>
        </div>

        <div class="col-12">
          <button type="button" class="btn btn-secondary btn-sm btn-block" @click="searchTag">Right </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import props from '../../Utils/PropsMixin'
  export default {
    name: "StringFilter",
    props: ['field', 'title'],
    mixins: [props],
    data: () => ({
      keyword: '',
      tagKeyword: '',
      tagList: [],
      SelectedCondition: 'Equal',
      CanClose: false,
      ConditionArray: ["Equal", "NotEqual", "Like", "NotLike", "In"],
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
          Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword })
        }
        else { Query.filter.push({ field: field, condition: this.SelectedCondition, keyword: this.keyword }) }

        Query.offset = 0
        this.closeToogle();
      },
      searchTag() {
        console.log(this.tagList);
        this.keyword = this.tagList;
        this.search();
      },
      closeToogle() {
        this.CanClose = true;
        $(this.$el.children[0]).dropdown('hide');
        this.CanClose = false;
      },
      addTag() {
        this.tagList.push(this.tagKeyword);
        this.tagKeyword = '';
      },
      removeTag(tag) {
        this.tagList = this.tagList.filter(x => x != tag);
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