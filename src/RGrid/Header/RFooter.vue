<template> 
  <th v-if="summary"> {{ summary }}</th> 
</template>

<script>
  export default {
    name: "RFooter",
    props: {
      summary: { type: String, required: false },
    } 
  }
</script>