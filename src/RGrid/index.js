import RGrid from './RGrid';
import StringFilter from './Header/filters/StringFilter';
import NumericFilter from './Header/filters/NumericFilter';
import DateFilter from './Header/filters/DateFilter';
import DateTimeFilter from './Header/filters/DateTimeFilter';
import BooleanFilter from './Header/filters/BooleanFilter';

const components = {
  RGrid,
  StringFilter,
  NumericFilter,
  DateFilter,
  DateTimeFilter,
  BooleanFilter
}

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  RGrid
};
