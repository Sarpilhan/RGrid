<template>
<div>
  <div class="float-left mt-3">
    <span>Total: {{ totalLength }}</span>
  </div>
  <div class="text-center">
    <select class="form-control" v-model="selectedPageSize" style="width:100px; display:inline-flex">
      <option v-for="(page,index) in pageSize" :key="index" v-bind:value="page">{{ page }}</option>
    </select> &nbsp;&nbsp;&nbsp;
    <ul class="pagination" style="margin: 0; display:inline-flex" name="Pagination">
      <li v-if="!isFirstPage" class="page-item" @click="turnPage(-1)">
        <a href="#" class="page-link" @click.prevent>
          <i class="fa fa-arrow-left"></i>
        </a>
      </li>
      <li v-for="(i, index) in dspBtns" :key="index" :class="['page-item', { 'active': i === curPage }]">
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
</div>
</template>
<script>
  import PropsMixin from '../Utils/PropsMixin'
  export default {
    name: 'Pagination', 
    data: () => ({
      selectedPageSize: 0
    }),
    created() {
      console.log("rpagination created");
      this.selectedPageSize = this.query.limit
    },
    watch: {
      selectedPageSize: {
        handler(val, oldVal) {
          if (val !== oldVal) {
            this.query.limit = val;
          }
        },
        deep: true
      },
      rgridTotal: {
        handler(val) {
          console.log(val);
        }
      }
    },
    mixins: [PropsMixin],
    computed: {
      totalLength() {
        // console.log(this.rgridTotal || this.rgridDataset.length);
        return this.rgridDataset.length
      },
      isFirstPage() {
        return +this.query.offset === 0 || +this.query.limit >= this.totalLength
      },
      isLastPage() {
        return +this.query.offset + +this.query.limit >= this.totalLength
      },
      totalPage() {
        return Math.ceil(this.totalLength / +this.query.limit)
      },
      curPage() {
        return Math.ceil(+this.query.offset / +this.query.limit) + 1
      },
      dspBtns() {
        const i = this.curPage
        const n = this.totalPage

        /* eslint-disable */
        if (n <= 9) return ((n) => {
          const arr = Array(n)
          while (n) { arr[n - 1] = n-- }
          return arr
        })(n)
        if (i <= 5) return [1, 2, 3, 4, 5, 6, 7, 0, n] // 0 represents `���`
        if (i >= n - 4) return [1, 0, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1, n]
        return [1, 0, i - 2, i - 1, i, i + 1, i + 2, 0, n]
        /* eslint-enable */
      }
    },
    methods: {
      handleClick(n) {
        this.query.offset = (n - 1) * +this.query.limit
      },
      turnPage(i) {
        if (i < 0 && this.isFirstPage || i > 0 && this.isLastPage) return
        this.query.offset = +this.query.offset + i * +this.query.limit
      }
    }
  }
</script>