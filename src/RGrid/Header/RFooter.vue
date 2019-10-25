<template> 
  <th> {{ Summary }}</th> 
</template>

<script>
  export default {
    name: "RFooter",
    props: {
      Summary: { type: String, required: false },
    } 
  }
</script>