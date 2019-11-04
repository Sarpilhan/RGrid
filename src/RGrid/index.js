import Vue from 'vue'
import RHeader from './Header/RHeader';
import RFooter from './Header/RFooter';
import RBody from './Header/RBody';
import RPagination from './Header/RPagination'; 
import RGrid from './RGrid';
import StringFilter from './Header/filters/StringFilter';
import NumericFilter from './Header/filters/NumericFilter';
import DateFilter from './Header/filters/DateFilter';
import DateTimeFilter from './Header/filters/DateTimeFilter';
import BoolenFilter from './Header/filters/BoolenFilter';



Vue.component('StringFilter', StringFilter);
Vue.component('NumericFilter', NumericFilter);
Vue.component('DateFilter', DateFilter);
Vue.component('DateTimeFilter', DateTimeFilter);
Vue.component('BoolenFilter', BoolenFilter);


Vue.component('RGrid', RGrid);
Vue.component('RHeader', RHeader);
Vue.component('RFooter', RFooter);
Vue.component('RBody', RBody);
Vue.component('RPagination', RPagination); 

export default RGrid;