import Vue from 'vue';

// Vue HighlightJS => https://github.com/metachris/vue-highlightjs
import VueHighlightJS from 'vue-highlightjs';

Vue.use(VueHighlightJS);

// Vue Awesome Swiper => http://idangero.us/swiper/api/
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

// Bootstrap => https://bootstrap-vue.js.org/docs/
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

// Element UI => https://element.eleme.io/#/en-US
import {
  Autocomplete,
  Button,
  Carousel,
  CarouselItem,
  Checkbox,
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  InputNumber,
  Loading,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Popover,
  Select,
  Switch,
  Tabs,
  TabPane,
  TimePicker,
  Tooltip,
} from 'element-ui';
import { ElNotificationOptions} from 'element-ui/types/notification';
import { MessageType } from 'element-ui/types/message';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import lang from 'element-ui/lib/locale/lang/pt-br';
import locale from 'element-ui/lib/locale';

locale.use(lang);

// APP UI
import Card from './card.vue';
import NetworkStatus from './network-status.vue';
import PageHeader from './page-header.vue';
import TableCollapse from './table-collapse.vue';

const components: any = {
  Card,
  NetworkStatus,
  PageHeader,
  TableCollapse,
};

const install: any = (vue: Vue, opts = {}) => {
  if (install.installed) {
    return;
  }

  // Install custom components
  Object.keys(components).forEach((key) => {
    Vue.component('app' + key, components[key]);
  });

  // Install element ui
  // Vue.use(Loading.directive);

  Vue.component(Autocomplete.name, Autocomplete);
  Vue.component(Button.name, Button);
  Vue.component(Carousel.name, Carousel);
  Vue.component(CarouselItem.name, CarouselItem);
  Vue.component(Checkbox.name, Checkbox);
  Vue.component(CollapseTransition.name, CollapseTransition);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(Dropdown.name, Dropdown);
  Vue.component(DropdownMenu.name, DropdownMenu);
  Vue.component(DropdownItem.name, DropdownItem);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Input.name, Input);
  Vue.component(InputNumber.name, InputNumber);
  Vue.component(Option.name, Option);
  Vue.component(Pagination.name, Pagination);
  Vue.component(Popover.name, Popover);
  Vue.component(Select.name, Select);
  Vue.component(Switch.name, Switch);
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);
  Vue.component(TimePicker.name, TimePicker);
  Vue.component(Tooltip.name, Tooltip);

  Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$message = Message;

  /**
   * Customização do componente de notificação para aplicar a classe CSS
   * de acordo com seu tipo de mensagem. Essa abordagem foi necessária para
   * evitar criar um utilitário somente para fazer isso, perdendo o mecanismo
   * de prover instâncias de componentes globais fornecidos pelo VueJS.
   *
   * A chamada do método será a mesma demonstrada na documentação do Element.
   * Exemplo: this.$notify.error('Mensagem de erro')
   */
  const messageTypes = [
    { type: 'success', title: 'Sucesso' },
    { type: 'warning', title: 'Atenção' },
    { type: 'info', title: 'Informativo' },
    { type: 'error', title: 'Erro' },
  ];

  messageTypes.forEach((messageType) => {
    Notification[messageType.type as MessageType] = (options: any) => {
      if (typeof options === 'string' || isVNode(options)) {
        options = {
          message: options,
        };
      }

      options.type = messageType.type as MessageType;
      options.title = messageType.title;
      options.customClass = `el-notification-${messageType.type}`;
      options.duration = 7500;

      return Notification(options);
    };
  });

  Vue.prototype.$notify = Notification;

};

export default {
  install,
};

function isVNode(node: any) {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions');
}
