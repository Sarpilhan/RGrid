<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggle">
      <i :class="['fa fa-columns', { 'text-muted': !false } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:absolute; width:auto; padding:4px 5px; border:1px solid gray">
      <button type="button" class="close" style="position:absolute; right:-10px; top:-15px;" @click="toggle">
        <span aria-hidden="true">&times;</span>
      </button>
      <div v-for="col in columns" :key="col.field" class="form-check">
        <input class="form-check-input" type="checkbox" :id="col.field"
               :checked="col.visible" :disabled="col.disabled" @change="handleChange(col, $event.target.checked)"
        >
        <label class="small form-check-label" :for="col.field">
          {{ col.title }}  
        </label>
      </div>
      <div class="pull-right">
        <button type="button" class="pull-right btn btn-primary btn-sm" @click="apply()">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import PropsMixin from '../../Utils/PropsMixin';
export default {
  mixins: [PropsMixin],
  data() {
    return {
      changes: []
    }
  },
  created() {
    this.columns.filter(x => x.visible === false).forEach(col => this.$set(col, "disabled", true))
  },
  methods: {
    handleChange(col, visible) {
      console.log(visible);
      this.changes.push({ col, visible })
    },
    apply() {
      console.log(this.changes);
      this.changes.forEach(({col, visible}) => {
        this.$set(col, "visible", visible)
      })
      this.changes = []
    },
    toggle() {
      const classList = this.$el.children[1].classList
      if(classList.contains("show")) {
        classList.remove("show");
      } else {
        classList.add("show");
      }
    },
  }
}
</script>

<style>

</style>