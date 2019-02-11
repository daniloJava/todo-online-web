import { Component, Vue, Watch } from 'vue-property-decorator';

const { body } = document;
const WIDTH = 1024;
const RATIO = 3;

@Component
export default class ResizeHandlerMixin extends Vue {
  get device() {
    return '';
  }

  get sidebar() {
    return '';
  }

  @Watch('$route')
  private OnRouteChange() {
    // todo
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  private mounted() {
    const isMobile = this.isMobile();
  }

  private isMobile() {
    const rect = body.getBoundingClientRect();
    return rect.width - RATIO < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
    }
  }
}
