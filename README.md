# RGrid
Datatable for Vue JS

## Install
```
npm i vuejs-rgrid
```

## Documentation
#### Table Propery

 | Propery Name  | Type  | Required   | Default   |
| ------------ | :------------: | :------------: | :------------: |
|columns|Array|true|[]|
|dataset|Array|false|[]|
|total|Number|false|undefined|
|pagination|Boolean|false|true|
|pageSize|Array|false|[10, 20, 30, 40, 50]|
|query|Object|false|{ limit: 10, offset: 0, sort: [], filter: [] }|
|summary|Object|false|{}|
|xprops|Object|false|{}|
|tableClass|String, Object, Array|false|   |
|tableStyle|String, Object, Array|false|   |
|height|Number, String|false|0|
|isResponsive|Boolean|false|true|
|showToolbar|Boolean|false|false|
|serverside|Boolean|false|false|
|clientside|Boolean|false|false|
|dataMethod|Function|false|null| 

         

#### Columns Propery

 | Propery Name  | Type  | Required   | Default   |
| ------------ | :------------: | :------------: | :------------: |
|title|String|true||
|field|String|true||
|visible|Boolean|true| |
|comp|Object|false| |
|filter|Object|false| |
|style|String, Object, Array|false|   |
|class|String, Object, Array|false|   |


```html
<RGrid :columns="tableColumns"
	:summary="tableSummary"
	:tableClass="tableClass"
	:query="query"
	:pageSize="pageSize"
	:dataMethod="getTableData"
	:isResponsive="true"
	:xprops="xprops"
	serverside 
	/> 
```
```javascript
export default {
	  data() {
		return { 
			tableColumns: [
				{ title: "ID", field: "Id", visible: true },
				{ title: "Name", field: "Name", visible: true, sortable: true },
         		{ title: "Active", field: "IsActive", visible: true, comp: activeDisplay, style: "width:80px; text-align:center" } 
        	],
        	tableSummary: {},
        	tableClass: "table-striped table-bordered table-sm",
        	pageSize: [10, 20, 30, 40],
        	query: {},
        	xprops: {
            	refresh: false
        	}
     	};
	},
    methods: {
		getTableData() {
        	return service.getData(this.query)
		},
	}
 }
```
