<template>
  <div class="home">
    {{msg}}
    <RGrid :columns="productColumns" :summary="productSummary" :dataset="productData" :tableClass="TableClass" :isResponsive="IsResponsive" :query="Query" :total="Total" :pageSize="PageSize" :isServerSide="IsServerSide"></RGrid>
    {{ Query }} 
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Home',
    props: {
      msg: String
    },
    data() {
      return {
        productColumns: [
          { title: "ID", field: "Id", sortable: true, visible: false },
          { title: "Category Id", field: "CategoryId", visible: false },
          { title: "Product Name", field: "Name", sortable: true, visible: true },
          { title: "Sales Price", field: "SalesPrice", visible: true,  filter: "DateFilter", },
          { title: "Purchase Price", field: "PurchasePricese", visible: false },
          { title: "Producer", field: "Producer", visible: false },
          { title: "Photo", field: "Photo", sortable: true, visible: false },
          { title: "Vendor Id", field: "VendorId", visible: false },
          { title: "Nutrition Facts", field: "NutritionFacts", visible: false },
          { title: "Description", field: "Description", visible: false },
          { title: "Tax Rate", field: "TaxRate", visible: false },
          { title: "Shelf Life", field: "ShelfLife", visible: true },
          { title: "Status", field: "IsActive", visible: true, tdComp: "ActiveDisplay", filter: "BooleanFilter" },
          { title: "Operation", tdComp: "operation", buttons: ["delete","edit", "epc"] }
        ],
        productSummary: { Name: "Total"  } ,
        productData: [],
        TableClass: "table-striped table-bordered table-sm",
        Total: 0,
        PageSize : [10, 20, 30, 40],
        IsResponsive: "table-responsive",
        IsServerSide: false,
        Query: {}, 

      };
    },
    
    watch: {
      Query : {
        handler() {
          this.getTableData();
        },
        deep: true
      },
    },
    created() {
      
      axios.defaults.baseURL = "http://localhost/Smartreat.Api/Api";
      this.getTableData();
    },
    methods: {
      getTableData() {
        this.isLoading = true;
        axios.post("Account/GetList/GetList",  this.Query).then(response => {
          this.productData = response.data.ItemList;
          this.Total = response.data.Count;
        }).catch(error => {
          this.$Notice.warning({ title: "Warning", desc: error.message });
        }).then(() => {
          this.isLoading = false;
        });
      },
    }

    
  };
</script>


<style scoped>
</style>

<!-- 
  - Condition 'In' Tag konusu 
  - Condition 'Beetween' 2 parça bölünsün
  - IsServerSide kavramı
  - Api Kullnacağız.
  - Columns içerisine component koymasına izin vereceğiz. td Component
 -->