import Vue from 'vue';
import RHeader from './Header/RHeader';
import RFooter from './Header/RFooter';
import RBodyClientSide from './Header/RBodyClientSide';
import RBodyServerSide from './Header/RBodyServerSide';
import RPagination from './Header/RPagination';
import RGrid from './RGrid';
import StringFilter from './Header/filters/StringFilter';
import NumericFilter from './Header/filters/NumericFilter';
import DateFilter from './Header/filters/DateFilter';
import DateTimeFilter from './Header/filters/DateTimeFilter';
import BooleanFilter from './Header/filters/BooleanFilter';



Vue.component('StringFilter', StringFilter);
Vue.component('NumericFilter', NumericFilter);
Vue.component('DateFilter', DateFilter);
Vue.component('DateTimeFilter', DateTimeFilter);
Vue.component('BooleanFilter', BooleanFilter);


Vue.component('RGrid', RGrid);
Vue.component('RHeader', RHeader);
Vue.component('RFooter', RFooter);
Vue.component('RBodyClientSide', RBodyClientSide);
Vue.component('RBodyServerSide', RBodyServerSide);
Vue.component('RPagination', RPagination);

export default RGrid;