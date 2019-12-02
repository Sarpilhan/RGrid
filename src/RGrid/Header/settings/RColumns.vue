<template>
  <div class="btn-group">
    <button type="button" class="btn btn btn-link py-1 border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="toggle">
      <i :class="['fa fa-columns', { 'text-muted': !false } ]"></i>
    </button>
    <div class="dropdown-menu" style="position:absolute; width:300px; left:-270px; padding:4px 5px; box-shadow:rgb(197, 200, 206) 4px 4px 5px 2px; border:1px solid #c5c8ce">
      <ul class="list-group">
        <li class="list-group-item small py-1 px-2" v-for="col in columns" v-show="col.visible !== 'non'" :key="col.field">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" :id="col.field"
                   :checked="isColVisible(col)" :disabled="isColDisabled(col)" @change="handleChange(col, $event.target.checked)">
            <label class="form-check-label" :for="col.field">
              {{ col.title }}
            </label>
          </div>
        </li>
      </ul>  
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
      changes: [],
    }
  },
  methods: {
    handleChange(col, visible) {
      this.changes.push({ col, visible })
    },
    apply() {
      this.changes.forEach(({ col, visible }) => {
        this.$set(col, "visible", visible)
      })
      this.changes = [];
      this.toggle();
    },
    toggle() {
      const classList = this.$el.children[1].classList
      if(classList.contains("show")) {
        classList.remove("show");
      } else {
        classList.add("show");
      }
    }
  }
}
</script>

<style>

</style>