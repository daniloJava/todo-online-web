import Vue from 'vue';

import { firstLetter } from '@/filters/first-letter.filter';
import { formatDate, formatTime, formatDateTime } from '@/filters/moment.filter';
import { lookup } from '@/filters/lookup.filter';
import { normalize } from '@/filters/normalize.filter';
import { startCase } from '@/filters/startCase.filter';

const install: any = (vue: Vue, opts = {}) => {
  if (install.installed) {
    return;
  }

  Vue.filter('firstLetter', firstLetter);
  Vue.filter('formatDate', formatDate);
  Vue.filter('formatTime', formatTime);
  Vue.filter('formatDateTime', formatDateTime);
  Vue.filter('lookup', lookup);
  Vue.filter('normalize', normalize);
  Vue.filter('startCase', startCase);
};

export default {
  install,
};
