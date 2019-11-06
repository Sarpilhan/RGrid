<template>
  <tbody>
    <tr v-for="(data,index) in dataset" :key="index">
      <td v-for="(column,colindex) in columns" :key="colindex" v-if="column.visible"> 
        <component v-if="column.comp" :is="forDynCompIs(column.comp)" :column="column" :row="data" :xprops="xprops"> </component>
        <span v-else> {{ data[column.field] }} </span> 
      </td>
    </tr>
  </tbody>
</template>

<script>
  import props from '../Utils/PropsMixin'
  export default {
    name: "RBody", 
    mixins: [props],
  }
</script>