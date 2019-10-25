<template>
  <tbody>
    <tr v-for="data in Dataset" :key="data.id">
      <td v-for="column in Columns" :key="column.field"  v-if="column.visible"> {{ data[column.field] }}</td>
    </tr>
  </tbody>
</template>

<script>
  export default {
    name: "RBody",
    props: {
      Dataset: { type: Array, required: false },
      Columns: { type: Array, required: false },
    } 
  }
</script>