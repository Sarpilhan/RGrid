<template>
  <div class="home">
    {{msg}}
    <RGrid :Columns="DeviceColumns" :Summary="DeviceSummary" :Dataset="TableData" :TableClass="TableClass" :IsResponsive="IsResponsive" :Query="Query" :Total="Total" :PageSize="PageSize"></RGrid>
    {{ Query }} 
  </div>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      msg: String
    },
    data() {
      return {
        DeviceColumns: [
          { title: "BErkan", field: "id", sortable: true, visible: true, filter:"DateFilter", style:"text-align:center;"}, 
          { title: "Name", field: "Name", sortable: true, visible: true, filter:"StringFilter" }
        ],
        DeviceSummary: { Name: "Total"  } ,
        TableData: [{ id: 1, Name: "Selam" }, { id: 2, Name: "Selam2" }, { id: 3, Name: "Selam3" }, { id: 4, Name: "Selam4" } ],
        TableClass: "table-striped table-bordered table-sm",
        Total: 40,
        PageSize : [10, 20, 30, 40],
        IsResponsive: "table-responsive",
        IsServerSide: false,
        Query: {}, 

      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<!-- 
  - Condition 'In' Tag konusu 
  - Condition 'Beetween' 2 parça bölünsün
  - IsServerSide kavramı
  - Api Kullnacağız.
  - Columns içerisine component koymasına izin vereceğiz. td Component
 -->