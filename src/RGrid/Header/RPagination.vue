<template>
  <div class="text-center">
    <select class="form-control" v-model="SelectedPageSize" style="width:100px; display:inline-flex">
      <option v-for="page in PageSize" v-bind:value="page">{{ page }}</option>
    </select> &nbsp;&nbsp;&nbsp;
    <ul class="pagination" style="margin: 0; display:inline-flex" name="Pagination">
      <li v-if="!isFirstPage" class="page-item" @click="turnPage(-1)">
        <a href="#" class="page-link" @click.prevent>
          <i class="fa fa-arrow-left"></i>
        </a>
      </li>
      <li v-for="i in dspBtns" :class="['page-item', { 'active': i === curPage }]">
        <a v-if="i" href="#" class="page-link" @click.prevent="handleClick(i)">
          {{ i }}
        </a>
        <a v-else class="page-link">
          <i class="fa fa-ellipsis-h"></i>
        </a>
      </li>
      <li v-if="!isLastPage" class="page-item" @click="turnPage(1)">
        <a href="#" class="page-link" @click.prevent>
          <i class="fa fa-arrow-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import PropsMixin from '../Utils/PropsMixin'
  export default {
    name: 'Pagination',
    props: {
      Total: { type: Number, required: true },
      Query: { type: Object, required: true },
      PageSize: { type: Array, required: true },
    },
    data: () => ({
      SelectedPageSize: 0
    }),
    created() {
      this.SelectedPageSize = this.Query.limit;
    },
    watch: {
      SelectedPageSize: {
        handler(val, oldVal) {
          if (val !== oldVal) {
            this.Query.limit = val;
          }
        },
        deep: true
      },
    },
    mixins: [PropsMixin],
    computed: {
      isFirstPage() {
        return +this.Query.offset === 0 || +this.Query.limit >= this.Total
      },
      isLastPage() {
        return +this.Query.offset + +this.Query.limit >= this.Total
      },
      TotalPage() {
        return Math.ceil(this.Total / +this.Query.limit)
      },
      curPage() {
        return Math.ceil(+this.Query.offset / +this.Query.limit) + 1
      },
      dspBtns() {
        const n = this.TotalPage
        const i = this.curPage

        /* eslint-disable */
        if (n <= 9) return ((n) => {
          const arr = Array(n)
          while (n) { arr[n - 1] = n-- }
          return arr
        })(n)
        if (i <= 5) return [1, 2, 3, 4, 5, 6, 7, 0, n] // 0 represents `···`
        if (i >= n - 4) return [1, 0, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1, n]
        return [1, 0, i - 2, i - 1, i, i + 1, i + 2, 0, n]
        /* eslint-enable */
      }
    },
    methods: {
      handleClick(n) {
        this.Query.offset = (n - 1) * +this.Query.limit
      },
      turnPage(i) {
        if (i < 0 && this.isFirstPage || i > 0 && this.isLastPage) return
        this.Query.offset = +this.Query.offset + i * +this.Query.limit
      }
    }
  }
</script>