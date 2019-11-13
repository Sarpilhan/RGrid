<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i :class="['fa fa-filter' , { 'text-muted': !keyword } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:relative; width:400px; padding:2px; border:2px solid gray">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="closeToogle"><span aria-hidden="true">&times;</span></button>
      <div class="form-row" v-if="SelectedCondition != 'In'">
        <div class="col-sm-3">
          <select v-model="SelectedCondition" class="form-control custom-select-sm"> <option v-for="option in ConditionArray" :key="option" :value="option"> {{ option }} </option></select>
        </div>
        <div class="col-sm-4" v-if="SelectedCondition == 'Between'">
          <input type="text" class="form-control form-control-sm" @keypress="isNumber($event)" ref="input" v-model="keywordStart">
        </div>
        <div class="col">
          <div class="input-group input-group-sm ">
            <input type="text" class="form-control" ref="input" v-model="keyword" @keypress="isNumber($event)" @keydown.enter="search" :placeholder="`Search ${field}...`">
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
            <input type="search" class="form-control" v-model="tagKeyword" ref="input" @keypress="isNumber($event)" @keydown.enter="addTag" :placeholder="`Add ${field}...`">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary" @click="addTag"><i class="far fa-plus-square"></i></button>
            </div>
          </div>
        </div>

        <div class="col-12 mb-2">
          <span class="badge badge-pill badge-light" v-for="(item, index) in tagList" :key="index" style="font-size:14px;">
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
    name: "NumericFilter",
    props: ['field', 'title'],
    mixins: [props],
    data: () => ({
      keyword: '',
      keywordStart: '',
      tagKeyword: '',
      tagList: [],
      SelectedCondition: 'Equal',
      CanClose: false,
      ConditionArray: ["Equal", "NotEqual", "GreaterThan", "LessThen", "In", "Between"],
    }),
    mounted() {
      //eslint-disable-next-line
      $(this.$el).on('hide.bs.dropdown', e => { if (!this.CanClose) e.preventDefault() });
    },
    watch: { keyword(kw) { if (kw === '') this.search() } },
    methods: {
      search() {
        const { query, field } = this
        query.offset = 0
        this.closeToogle();
        var ItemIndex = query.filter.map(x => x.field).indexOf(field);
        if (ItemIndex >= 0) {
          query.filter.splice(ItemIndex, 1);
          if (this.keyword === '') { return; }
        }
        query.filter.push({ field: field, condition: this.SelectedCondition, keyword: (this.SelectedCondition === 'Between' ? this.keywordStart + ";" : "") + this.keyword })
      },
      searchTag() { 
        this.keyword = this.tagList;
        this.search();
      },
      closeToogle() {
        this.CanClose = true; 
        this.$el.children[1].classList.remove("show");
        this.CanClose = false;
      },
      addTag() {
        this.tagList.push(this.tagKeyword);
        this.tagKeyword = '';
      },
      removeTag(tag) {
        this.tagList = this.tagList.filter(x => x != tag);
      },
      isNumber: function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && charCode !== 44) {
          evt.preventDefault();
        } else {
          return true;
        }
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



