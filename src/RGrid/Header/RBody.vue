<template>
  <tbody>
    <tr v-for="(data,index) in dataset" :key="index">
      <td v-for="column in columns" :key="column.field" v-if="column.visible"> 
        <component v-if="column.filter" :is="forDynCompIs(column.filter)"  v-bind="$props"> </component>
        <span v-else> {{ data[column.field] }} </span>
      </td>
    </tr>
  </tbody>
</template>

<script>
  export default {
    name: "RBody",
    props: {
      dataset: { type: Array, required: false },
      columns: { type: Array, required: false },
    } 
  }
</script>